export class Fournisseur {
  id?: number;
  nom: string;
  telephone: string;
  email: string;

  // tslint:disable-next-line:variable-name
  constructor(_nom: string, _telephone: string, _email: string) {
    this.nom = _nom;
    this.telephone = _telephone;
    this.email = _email;
  }
}

