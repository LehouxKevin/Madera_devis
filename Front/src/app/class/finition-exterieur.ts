export class FinitionExterieur {
  id?: number;
  prix: number;
  libelle: string;
  description: string;

  // tslint:disable-next-line:variable-name
  constructor(_libelle: string, _prix: number, _description: string) {
    this.libelle = _libelle;
    this.prix = _prix;
    this.description = _description;
  }
}
