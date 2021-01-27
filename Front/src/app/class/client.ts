export class Client {
    id?: number;
    nom: string;
    prenom:string;
    adresse:string;
    telephone:string;
    mail:string;

    constructor(_nom: string, _prenom:string, _adresse:string, _telephone:string, _mail:string)
    {
        this.nom = _nom;
        this.prenom = _prenom;
        this.adresse = _adresse;
        this.telephone = _telephone;
        this.mail = _mail;
    }
}
