export class Utilisateur {
    id?: number;
    nom: string;
    prenom:string;
    mail:string;
    mdp:string;
    typeUtilisateur:string;

    constructor(_nom: string, _prenom:string, _mail:string, _mdp:string, _typeUtilisateur:string)
    {
        this.nom = _nom;
        this.prenom = _prenom;
        this.mail = _mail;
        this.mdp = _mdp;
        this.typeUtilisateur = _typeUtilisateur;
    }
}
