export interface IFeil {
    tittel?: string;
    feilmelding: string;
}

export interface IFeltFeil {
    [key: string]: IFeil | undefined;
}
