export class TypeModule {
  id?: number;
  libelle: string;

  // tslint:disable-next-line:variable-name
  constructor(_libelle: string) {
    this.libelle = _libelle;
  }
}
