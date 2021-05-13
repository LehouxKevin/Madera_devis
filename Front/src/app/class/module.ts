export class Module {
id?: number;
  dateCreation: Date;
   libelle: string;
    details: string;
    prix: number;
    custom: boolean;
    gamme: string;
    typeModule: string;
    caracteristiques: string;

    constructor(libelle: string,
                dateCreation: Date,
                custom: boolean ,
                details: string,
                prix: number,
                gamme: string,
                typeModule: string,
                caracteristiques: string) {

      this.libelle = libelle;
      this.dateCreation = dateCreation;
      this.custom = custom;
      this.details = details;
      this.prix = prix;
      this.gamme = gamme;
      this.typeModule = typeModule;
      this.caracteristiques = caracteristiques;
    }
}
