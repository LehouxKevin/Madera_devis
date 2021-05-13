export class TypeCouverture {
  id?: number;
  libelle: string;
  prix: number;
  description: string;

  // tslint:disable-next-line:variable-name
  constructor(_libelle: string, _prix: number, description: string) {
    this.libelle = _libelle;
    this.prix = _prix;
    this.description = description;
  }
}
