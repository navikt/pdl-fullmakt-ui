/**
 * @jest-environment jsdom
 */

import { cloneableGenerator, SagaIteratorClone } from '@redux-saga/testing-utils';
import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, delay, put, select } from 'redux-saga/effects';
import { appEndreStatus } from '../app/actions';
import { AppStatus } from '../app/types';
import {
    soknadErstattVedlegg,
    soknadFjernVedlegg,
    soknadLeggTilVedlegg,
    soknadSettFelt,
} from '../soknad/actions';
import { selectFelt } from '../soknad/selectors';
import { IVedleggFelt, ValideringsStatus } from '../soknad/types';
import { vedleggLastOpp } from './actions';
import { ILastOppVedleggRespons, lastOppVedlegg } from './api';
import { lastOppEnkeltVedleggSaga, lastOppVedleggSaga, Status } from './saga';

describe('vedlegg - saga', () => {
    describe('lastOppEnkeltVedleggSaga', () => {
        describe('vedlegget blir lastet opp ok', () => {
            let saga: SagaIterator;
            const fil = new File([''], 'filnavn');

            beforeAll(() => {
                saga = lastOppEnkeltVedleggSaga('mineBarn', 'feltnavn', fil);
            });

            test('legger til midlertidig vedlegg', () => {
                expect(saga.next().value).toEqual(
                    put(
                        soknadLeggTilVedlegg(
                            'mineBarn',
                            'feltnavn',
                            expect.objectContaining({ fil, filnavn: '', isLoading: true })
                        )
                    )
                );
            });

            test('laster opp vedlegg', () => {
                expect(saga.next().value).toEqual(call(lastOppVedlegg, fil));
            });

            test('erstatt midlertidig vedlegg', () => {
                const mockResponse: ILastOppVedleggRespons = {
                    filnavn: 'filnavn',
                    vedleggsId: 'vedleggsId',
                };

                expect(saga.next(mockResponse).value).toEqual(
                    put(
                        soknadErstattVedlegg(
                            'mineBarn',
                            'feltnavn',
                            expect.any(String),
                            expect.objectContaining({
                                fil,
                                filnavn: mockResponse.filnavn,
                                filreferanse: mockResponse.vedleggsId,
                                isLoading: false,
                            })
                        )
                    )
                );
            });

            test('returnerer status OK', () => {
                expect(saga.next()).toEqual({ done: true, value: Status.OK });
            });
        });

        describe('vedlegg for stort', () => {
            let saga: SagaIterator;
            const fil = new File([''], 'filnavn');

            Object.defineProperty(fil, 'size', {
                value: 21 * 1000 * 1000,
            });

            beforeAll(() => {
                saga = lastOppEnkeltVedleggSaga('mineBarn', 'feltnavn', fil);
                saga.next();
            });

            test('størrelsesjekken feiler og man venter med å gå videre', () => {
                expect(saga.next().value).toEqual(delay(2000));
            });

            test('fjerner midlertidig vedlegg', () => {
                expect(saga.next().value).toEqual(
                    put(soknadFjernVedlegg('mineBarn', 'feltnavn', expect.any(String)))
                );
            });

            test('returnerer status VEDLEGG_FOR_STORT', () => {
                expect(saga.next()).toEqual({ value: Status.VEDLEGG_FOR_STORT, done: true });
            });
        });

        describe('nettverksfeil', () => {
            let saga: SagaIterator;
            const fil = new File([''], 'filnavn');

            beforeAll(() => {
                saga = lastOppEnkeltVedleggSaga('mineBarn', 'feltnavn', fil);
            });

            test('fjerner midlertidig vedlegg', () => {
                saga.next();
                saga.next();
                if (saga.throw) {
                    expect(
                        saga.throw({
                            request: {
                                status: 0,
                            },
                        }).value
                    ).toEqual(put(soknadFjernVedlegg('mineBarn', 'feltnavn', expect.any(String))));
                }
            });

            test('returnerer status ', () => {
                expect(saga.next()).toEqual({ value: Status.NETTVERKS_FEIL, done: true });
            });
        });

        describe('systemfeil', () => {
            let saga: SagaIterator;
            const fil = new File([''], 'filnavn');

            beforeAll(() => {
                saga = lastOppEnkeltVedleggSaga('mineBarn', 'feltnavn', fil);
            });

            test('fjerner midlertidig vedlegg', () => {
                saga.next();
                saga.next();
                if (saga.throw) {
                    expect(saga.throw({}).value).toEqual(
                        put(soknadFjernVedlegg('mineBarn', 'feltnavn', expect.any(String)))
                    );
                }
            });

            test('returnerer status ', () => {
                expect(saga.next()).toEqual({ value: Status.SYSTEMFEIL, done: true });
            });
        });
    });

    describe('lastOppVedleggSaga', () => {
        let saga: SagaIteratorClone;
        let clone: SagaIteratorClone;
        const felt: IVedleggFelt = {
            feilmeldingsNokkel: '',
            valideringsStatus: ValideringsStatus.IKKE_VALIDERT,
            verdi: [],
        };
        const fil1 = new File([''], 'filnavn1');
        const fil2 = new File([''], 'filnavn2');

        beforeAll(() => {
            saga = cloneableGenerator(lastOppVedleggSaga)(
                vedleggLastOpp('mineBarn', 'feltnavn', [fil1, fil2])
            );
        });

        test('starter en lastOppEnkeltVedleggSaga for hvert vedlegg', () => {
            expect(saga.next().value).toEqual(
                all([
                    call(lastOppEnkeltVedleggSaga, 'mineBarn', 'feltnavn', fil1),
                    call(lastOppEnkeltVedleggSaga, 'mineBarn', 'feltnavn', fil2),
                ])
            );
        });

        describe('status OK', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('henter ut felt', () => {
                expect(clone.next([Status.OK, Status.OK]).value).toEqual(
                    select(selectFelt, 'mineBarn', 'feltnavn')
                );
            });

            test('setter feltet med validerings status ok', () => {
                expect(clone.next(felt).value).toEqual(
                    put(
                        soknadSettFelt('mineBarn', 'feltnavn', {
                            ...felt,
                            valideringsStatus: ValideringsStatus.OK,
                        })
                    )
                );
            });
        });

        describe('status VEDLEGG_FOR_STORT', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('henter ut felt', () => {
                expect(clone.next([Status.VEDLEGG_FOR_STORT, Status.OK]).value).toEqual(
                    select(selectFelt, 'mineBarn', 'feltnavn')
                );
            });

            test('setter feltet med validerings status advarsel', () => {
                expect(clone.next(felt).value).toEqual(
                    put(
                        soknadSettFelt('mineBarn', 'feltnavn', {
                            ...felt,
                            feilmeldingsNokkel: 'feilmelding.generell.vedlegg.forStort',
                            valideringsStatus: ValideringsStatus.ADVARSEL,
                        })
                    )
                );
            });
        });

        describe('status NETTVERKS_FEIL', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('henter ut felt', () => {
                expect(clone.next([Status.NETTVERKS_FEIL, Status.OK]).value).toEqual(
                    select(selectFelt, 'mineBarn', 'feltnavn')
                );
            });

            test('setter feltet med validerings status advarsel', () => {
                expect(clone.next(felt).value).toEqual(
                    put(
                        soknadSettFelt('mineBarn', 'feltnavn', {
                            ...felt,
                            feilmeldingsNokkel: 'feilmelding.generell.vedlegg.nettverk',
                            valideringsStatus: ValideringsStatus.ADVARSEL,
                        })
                    )
                );
            });
        });

        describe('status SYSTEMFEIL', () => {
            beforeAll(() => {
                clone = saga.clone();
            });

            test('henter ut felt', () => {
                expect(clone.next([Status.SYSTEMFEIL, Status.OK]).value).toEqual(
                    select(selectFelt, 'mineBarn', 'feltnavn')
                );
            });

            test('setter app status til feilsituasjon', () => {
                expect(clone.next().value).toEqual(put(appEndreStatus(AppStatus.FEILSITUASJON)));
            });

            test('sender bruker til feilside', () => {
                expect(clone.next().value).toEqual(put(push('/vedlegg-opplasting-feilet')));
            });
        });
    });
});
