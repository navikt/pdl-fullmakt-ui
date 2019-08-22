interface IBarn {
    barn: IBarnDTO[];
    erFlerling: boolean;
    index: number;
}

interface IBarnDTO {
    fodselsdato: string;
    fulltnavn: string;
}

export { IBarn, IBarnDTO };
