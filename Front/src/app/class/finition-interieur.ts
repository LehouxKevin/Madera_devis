export class FinitionInterieur {
    id?:number;
    prix:number;
    libelle:string;
    description:string;

    constructor(_prix:number,_libelle:string,_description:string)
    {
        this.prix = _prix;
        this.libelle = _libelle;
        this.description = _description;
    }
}
