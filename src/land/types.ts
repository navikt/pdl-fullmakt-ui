interface ILandBundle {
    [language: string]: ILand;
}

interface ILand {
    [key: string]: string;
}

export { ILandBundle };
