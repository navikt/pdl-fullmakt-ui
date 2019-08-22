import * as moment from 'moment';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { barnHentFeilet, barnHentOk, BarnTypeKeys } from './actions';
import { fetchBarn } from './api';
import { IBarn, IBarnDTO } from './types';

function genererFlerling(barn: IBarnDTO[]): IBarnDTO[][] {
    const powerSet = genererPowerSet(barn);
    const flerlinger = powerSet.filter(erEttBarnEllerFlerling);
    return flerlinger.sort((a, b) => a.length - b.length);
}

/**
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/power-set/bwPowerSet.js
 */
function genererPowerSet<T>(arr: T[]): T[][] {
    const subSets = [];

    const numberOfCombinations = 2 ** arr.length;

    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex++) {
        const subSet = [];
        for (let setElementIndex = 0; setElementIndex < arr.length; setElementIndex++) {
            // tslint:disable:no-bitwise
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(arr[setElementIndex]);
            }
        }
        subSets.push(subSet);
    }

    return subSets;
}

function erEttBarnEllerFlerling(set: IBarnDTO[]) {
    if (set.length === 0) {
        return false;
    } else if (set.length === 1) {
        return true;
    }
    const fodsesldatoMoments = set.map((barn: IBarnDTO) => moment(barn.fodselsdato, 'DD.MM.YYYY'));
    const min = moment.min(fodsesldatoMoments);
    const max = moment.max(fodsesldatoMoments);

    const granularity = 'days';
    const inclusivity = '[]';

    return min.isBetween(max.clone().subtract(2, 'days'), max, granularity, inclusivity);
}

function* fetchBarnSaga(): SagaIterator {
    try {
        const barnDTO: IBarnDTO[] = yield call(fetchBarn);
        const barnOgFlerlinger = yield call(genererFlerling, barnDTO);

        const barnContainere: IBarn[] = barnOgFlerlinger.map((b: IBarnDTO[], index: number) => {
            return {
                barn: b,
                erFlerling: b.length > 1,
                index,
            };
        });

        yield put(barnHentOk(barnContainere));
    } catch (err) {
        yield put(barnHentFeilet());
    }
}

function* barnSaga(): SagaIterator {
    yield takeEvery(BarnTypeKeys.HENT, fetchBarnSaga);
}

export { fetchBarnSaga, barnSaga, genererFlerling, genererPowerSet, erEttBarnEllerFlerling };
