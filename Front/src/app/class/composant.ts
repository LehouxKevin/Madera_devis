export class Composant {
  id?: number;
  libelle: string;
  dateCreation: Date;
  description: string;
  prix: string;
  // tslint:disable-next-line:variable-name
  familleComposant: string;
  caracteristiques: string;
  fournisseurs: any[];

  // tslint:disable-next-line:variable-name max-line-length
  constructor(_libelle: string, _dateCreation: Date, _description: string, _prix: string, _famille_composant_id: string, _caracteristiques: string, _fournisseurs: any[]) {
    this.libelle = _libelle;
    this.dateCreation = _dateCreation;
    this.description = _description;
    this.prix = _prix;
    this.familleComposant = _famille_composant_id;
    this.caracteristiques = _caracteristiques;
    this.fournisseurs = _fournisseurs;
  }
}
