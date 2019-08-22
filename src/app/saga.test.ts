import { cloneableGenerator, SagaIteratorClone } from '@redux-saga/testing-utils';
import { push } from 'connected-react-router';
import { all, cancel, fork, put, race, select, take } from 'redux-saga/effects';
import { barnHent, BarnTypeKeys } from '../barn/actions';
import { selectBarn } from '../barn/selectors';
import { IBarnDTO } from '../barn/types';
import { landHent, LandTypeKeys } from '../land/actions';
import { sokerHent, SokerTypeKeys } from '../soker/actions';
import { teksterHent, TeksterTypeKeys } from '../tekster/actions';
import { ToggelsTypeKeys, togglesHent } from '../toggles/actions';
import { appEndreStatus, AppTypeKeys } from './actions';
import { autentiserBruker, forsteSidelastSaga, startAppSaga } from './saga';
import { AppStatus } from './types';

describe('app - saga', () => {
    describe('forsteSidelastSaga', () => {
        let saga: SagaIteratorClone;
        let clone: SagaIteratorClone;

        beforeAll(() => {
            saga = cloneableGenerator(forsteSidelastSaga)();
        });

        test('autentiserer bruker', () => {
            expect(saga.next().value).toEqual(fork(autentiserBruker));
        });

        test('venter på at bruker er autentisert', () => {
            expect(saga.next().value).toEqual(take([AppTypeKeys.PING_OK]));
        });

        test('henter toggles', () => {
            expect(saga.next(AppTypeKeys.PING_OK).value).toEqual(put(togglesHent()));
        });

        test('venter på svar fra toggles', () => {
            expect(saga.next().value).toEqual(
                take([ToggelsTypeKeys.HENT_FEILET, ToggelsTypeKeys.HENT_OK])
            );
        });

        test('henter tekster, land, søker og barn', () => {
            expect(saga.next().value).toEqual(put(teksterHent()));
            expect(saga.next().value).toEqual(put(landHent()));
            expect(saga.next().value).toEqual(put(sokerHent()));
            expect(saga.next().value).toEqual(put(barnHent()));
        });

        test('venter på svar fra alle endepunktene', () => {
            expect(saga.next().value).toEqual(
                all([
                    take(TeksterTypeKeys.HENT_OK),
                    take(LandTypeKeys.HENT_OK),
                    take(SokerTypeKeys.HENT_OK),
                    take(BarnTypeKeys.HENT_OK),
                ])
            );
        });

        test('henter ut barn fra state', () => {
            expect(
                saga.next([
                    TeksterTypeKeys.HENT_OK,
                    LandTypeKeys.HENT_OK,
                    SokerTypeKeys.HENT_OK,
                    BarnTypeKeys.HENT_OK,
                ]).value
            ).toEqual(select(selectBarn));
        });

        describe('har barn flyt', () => {
            let barn: IBarnDTO;
            beforeAll(() => {
                clone = saga.clone();
                barn = {
                    fodselsdato: '01.01.2020',
                    fulltnavn: 'Mock',
                };
            });

            test('setter status til klar', () => {
                expect(clone.next([barn]).value).toEqual(put(appEndreStatus(AppStatus.KLAR)));
            });
        });

        describe('ingen barn flyt', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('setter status feilsituasjon', () => {
                expect(clone.next([]).value).toEqual(put(appEndreStatus(AppStatus.FEILSITUASJON)));
            });

            test('går til /ingen-barn siden', () => {
                expect(clone.next().value).toEqual(put(push('/ingen-barn')));
            });
        });
    });

    describe('startAppSaga', () => {
        let saga: SagaIteratorClone;

        beforeAll(() => {
            saga = cloneableGenerator(startAppSaga)();
        });

        test('endrer status til STARTER', () => {
            expect(saga.next().value).toEqual(put(appEndreStatus(AppStatus.STARTER)));
        });

        test('starter forsteSidelastSaga', () => {
            expect(saga.next().value).toEqual(fork(forsteSidelastSaga));
        });

        test('venter på at et av kallene fra forsteSidelastSaga skal feile', () => {
            expect(saga.next().value).toEqual(
                race({
                    fortrolig_adresse: take([SokerTypeKeys.HENT_FORTROLIG_ADRESSE]),
                    hentFeilet: take([
                        TeksterTypeKeys.HENT_FEILET,
                        LandTypeKeys.HENT_FEILET,
                        SokerTypeKeys.HENT_FEILET,
                        BarnTypeKeys.HENT_FEILET,
                    ]),
                })
            );
        });

        describe('med fortroligAdresse', () => {
            let clone: SagaIteratorClone;

            beforeAll(() => {
                clone = saga.clone();
            });

            test('avbryt forsteSidelastSaga og endre app status', () => {
                expect(clone.next({ fortrolig_adresse: true }).value).toEqual(cancel());
                expect(clone.next().value).toEqual(put(appEndreStatus(AppStatus.FEILSITUASJON)));
            });

            test('sender bruker til fortrolig-adresse siden', () => {
                expect(clone.next().value).toEqual(put(push('/fortrolig-adresse')));
            });
        });

        describe('uten fortroligAdresse', () => {
            let clone: SagaIteratorClone;

            beforeAll(() => {
                clone = saga.clone();
            });

            test('avbryt forsteSidelastSaga', () => {
                expect(clone.next({}).value).toEqual(cancel());
                expect(clone.next().value).toEqual(put(appEndreStatus(AppStatus.FEILSITUASJON)));
            });

            test('sender bruker til fortrolig-adresse siden', () => {
                expect(clone.next().value).toEqual(put(push('/feilside')));
            });
        });
    });
});
