import { erEttBarnEllerFlerling, genererFlerling, genererPowerSet } from './saga';

describe('barn - saga', () => {
    describe('genererFlerling', () => {
        it('returnerer alle barna', () => {
            expect(
                genererFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test1', fodselsdato: '01.01.2016' },
                ])
            ).toEqual([
                [{ fulltnavn: 'test', fodselsdato: '01.01.2018' }],
                [{ fulltnavn: 'test1', fodselsdato: '01.01.2016' }],
            ]);
        });

        it('returnerer alle flerlinger', () => {
            expect(
                genererFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test1', fodselsdato: '01.01.2018' },
                ])
            ).toEqual([
                [{ fulltnavn: 'test', fodselsdato: '01.01.2018' }],
                [{ fulltnavn: 'test1', fodselsdato: '01.01.2018' }],
                [
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test1', fodselsdato: '01.01.2018' },
                ],
            ]);
        });
    });

    describe('genererPowerSet', () => {
        it('genererer powerSet', () => {
            expect(genererPowerSet([])).toEqual([[]]);
            expect(genererPowerSet([1])).toEqual([[], [1]]);
            expect(genererPowerSet([1, 2])).toEqual([[], [1], [2], [1, 2]]);
            expect(genererPowerSet([1, 2, 3])).toEqual([
                [],
                [1],
                [2],
                [1, 2],
                [3],
                [1, 3],
                [2, 3],
                [1, 2, 3],
            ]);
        });
    });

    describe('erEttBarnEllerFlerling', () => {
        it('returnerer false med tom liste', () => {
            expect(erEttBarnEllerFlerling([])).toEqual(false);
        });

        it('returnerer true med ett barn', () => {
            expect(
                erEttBarnEllerFlerling([{ fulltnavn: 'test', fodselsdato: '01.01.2018' }])
            ).toEqual(true);
        });

        it('returnerer false med to barn født mer enn to dager fra hverandre', () => {
            expect(
                erEttBarnEllerFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test', fodselsdato: '04.01.2018' },
                ])
            ).toEqual(false);
        });

        it('returnerer true med to barn født mindre enn to dager fra hverandre', () => {
            expect(
                erEttBarnEllerFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test', fodselsdato: '03.01.2018' },
                ])
            ).toEqual(true);
        });

        it('returnerer true med mange barn født mindre enn to dager fra hverandre', () => {
            expect(
                erEttBarnEllerFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test1', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test2', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test3', fodselsdato: '01.01.2018' },
                ])
            ).toEqual(true);
        });

        it('returnerer false med mange barn født mer enn to dager fra hverandre', () => {
            expect(
                erEttBarnEllerFlerling([
                    { fulltnavn: 'test', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test1', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test2', fodselsdato: '01.01.2018' },
                    { fulltnavn: 'test3', fodselsdato: '04.01.2018' },
                ])
            ).toEqual(false);
        });
    });
});
