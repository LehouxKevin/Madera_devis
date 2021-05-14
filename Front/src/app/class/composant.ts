export class Composant {
  id?: number;
  libelle: string;
  dateCreation: Date;
  description: string;
  prix: number;
  // tslint:disable-next-line:variable-name
  famille_composant_id: number;
  caracteristiques: string;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(_libelle: string, _dateCreation: Date, _description: string, _prix: number, _famille_composant_id: number, _caracteristiques: string) {
    this.libelle = _libelle;
    this.dateCreation = _dateCreation;
    this.description = _description;
    this.prix = _prix;
    this.famille_composant_id = _famille_composant_id;
    this.caracteristiques = _caracteristiques;
  }
}
