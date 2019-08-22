import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { appEndreStatus, appNesteSteg, appSettHarForsoktNesteSteg } from '../app/actions';
import { selectAppSteg } from '../app/selectors';
import { AppStatus } from '../app/types';
import { sendInn } from '../innsending/actions';
import { ISteg, stegConfig } from '../stegConfig';
import {
    ISoknadValiderFelt,
    ISoknadValiderSteg,
    soknadSettFelt,
    SoknadTypeKeys,
    soknadValiderFelt,
    soknadValiderSteg,
} from './actions';
import { selectFelt, selectSoknad } from './selectors';
import {
    sjekkValideringForArbeidIUtlandet,
    sjekkValideringForBarnehageplass,
    sjekkValideringForFamilieforhold,
    sjekkValideringForSteg,
    sjekkValideringForTilknytningTilUtland,
    sjekkValideringForUtenlandskeYtelser,
    sjekkValideringForUtenlandskKontantstotte,
} from './stegSagaValidators';
import {
    arbeidIUtlandetFeltnavn,
    barnehageplassFeltnavn,
    familieforholdFeltnavn,
    Feltnavn,
    FeltTyper,
    IFelt,
    ISoknadState,
    IVedleggFelt,
    kravTilSokerFeltnavn,
    minebarnFeltnavn,
    oppsummeringFeltnavn,
    Stegnavn,
    tilknytningTilUtlandFeltnavn,
    utenlandskeYtelserFeltnavn,
    utenlandskKontantstotteFeltnavn,
    ValideringsStatus,
    veiledningFeltnavn,
} from './types';
import valideringsConfig, { ValideringsFunksjon } from './valideringsConfig';

function kjorValideringsFunksjoner(
    valideringsFunksjoner: ValideringsFunksjon[],
    felt: IFelt & IVedleggFelt
): FeltTyper {
    const validertFelt: FeltTyper = valideringsFunksjoner.reduce(
        (acc: FeltTyper, valideringsFunksjon) => {
            const nyttValidertFelt = valideringsFunksjon(felt);
            return acc.valideringsStatus === ValideringsStatus.FEIL ||
                acc.valideringsStatus === ValideringsStatus.ADVARSEL
                ? acc
                : nyttValidertFelt;
        },
        { verdi: '', valideringsStatus: ValideringsStatus.IKKE_VALIDERT, feilmeldingsNokkel: '' }
    );

    return validertFelt;
}

function* validerFeltSaga(action: ISoknadValiderFelt): SagaIterator {
    const felt = yield select(selectFelt, action.stegnavn, action.feltnavn);
    const feltMedOppdatertVerdi = {
        ...felt,
        verdi: action.verdi,
    };

    let validertFelt: FeltTyper = {
        feilmeldingsNokkel: '',
        valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
        verdi: action.verdi,
    };

    switch (action.stegnavn) {
        case 'veiledning':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.veiledning[action.feltnavn as veiledningFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'arbeidIUtlandet':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.arbeidIUtlandet[action.feltnavn as arbeidIUtlandetFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'barnehageplass':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.barnehageplass[action.feltnavn as barnehageplassFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'familieforhold':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.familieforhold[action.feltnavn as familieforholdFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'kravTilSoker':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.kravTilSoker[action.feltnavn as kravTilSokerFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'utenlandskKontantstotte':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.utenlandskKontantstotte[
                    action.feltnavn as utenlandskKontantstotteFeltnavn
                ],
                feltMedOppdatertVerdi
            );
            break;
        case 'mineBarn':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.mineBarn[action.feltnavn as minebarnFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'utenlandskeYtelser':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.utenlandskeYtelser[action.feltnavn as utenlandskeYtelserFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'oppsummering':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.oppsummering[action.feltnavn as oppsummeringFeltnavn],
                feltMedOppdatertVerdi
            );
            break;
        case 'tilknytningTilUtland':
            validertFelt = kjorValideringsFunksjoner(
                valideringsConfig.tilknytningTilUtland[
                    action.feltnavn as tilknytningTilUtlandFeltnavn
                ],
                feltMedOppdatertVerdi
            );
            break;
    }

    yield put(soknadSettFelt(action.stegnavn, action.feltnavn, validertFelt));
}

function* validerSteg(action: ISoknadValiderSteg) {
    const stegnavn = action.stegnavn;
    const soknadState = yield select(selectSoknad);

    yield all(
        Object.keys(soknadState[stegnavn]).map((feltKey: string) => {
            return call(
                validerFeltSaga,
                soknadValiderFelt(
                    stegnavn,
                    feltKey as Feltnavn,
                    soknadState[stegnavn][feltKey].verdi
                )
            );
        })
    );
}

function* nullstillNesteStegSaga() {
    yield put(appSettHarForsoktNesteSteg(false));
}

function* nesteStegSaga() {
    const appSteg = yield select(selectAppSteg);
    const soknadState: ISoknadState = yield select(selectSoknad);

    const tilSide: ISteg = Object.values(stegConfig).find(
        (side: ISteg) => side.stegIndeks === appSteg
    );
    let harFeil: boolean = false;

    yield put(soknadValiderSteg(tilSide.key as Stegnavn));
    switch (tilSide.key as Stegnavn) {
        case 'arbeidIUtlandet':
            harFeil = yield call(
                sjekkValideringForArbeidIUtlandet,
                soknadState.familieforhold,
                soknadState.arbeidIUtlandet
            );
            break;
        case 'barnehageplass':
            harFeil = yield call(sjekkValideringForBarnehageplass, soknadState.barnehageplass);
            break;
        case 'familieforhold':
            harFeil = yield call(sjekkValideringForFamilieforhold, soknadState.familieforhold);
            break;
        case 'utenlandskKontantstotte':
            harFeil = yield call(
                sjekkValideringForUtenlandskKontantstotte,
                soknadState.utenlandskKontantstotte
            );
            break;
        case 'utenlandskeYtelser':
            harFeil = yield call(
                sjekkValideringForUtenlandskeYtelser,
                soknadState.familieforhold,
                soknadState.utenlandskeYtelser
            );
            break;
        case 'tilknytningTilUtland':
            harFeil = yield call(
                sjekkValideringForTilknytningTilUtland,
                soknadState.tilknytningTilUtland,
                soknadState.familieforhold
            );
            break;
        default:
            harFeil = yield call(sjekkValideringForSteg, tilSide.key as Stegnavn, soknadState);
    }

    yield put(appSettHarForsoktNesteSteg(true));
    if (!harFeil) {
        if (tilSide.key === stegConfig.oppsummering.key) {
            yield put(sendInn());
            yield put(appEndreStatus(AppStatus.SENDT_INN));
        } else {
            yield put(appNesteSteg());
        }
    }
}

function* soknadSaga() {
    yield takeEvery(SoknadTypeKeys.NESTE_STEG, nesteStegSaga);
    yield takeEvery(SoknadTypeKeys.NULLSTILL_NESTE_STEG, nullstillNesteStegSaga);
    yield takeEvery(SoknadTypeKeys.VALIDER_STEG, validerSteg);
    yield takeEvery(SoknadTypeKeys.VALIDER_FELT, validerFeltSaga);
}

export { soknadSaga };
