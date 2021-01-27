import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TypeUtilisateurService } from 'src/app/services/type-utilisateur.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {

  public utilisateurs:any[] = [];
  public utilisateur;
  public typesUtilisateur:any[] = [];
  public typeUtilisateur;

  public nomPrenom:string;

  constructor(private utilisateurService: UtilisateurService, private typeUtilisateurService: TypeUtilisateurService) { }

  ngOnInit(): void {
    this.loadProfil();
    document.getElementById("icone_profil").style.borderLeft = "solid #BCE0FD 5px";
  }

  ngOnDestroy() {
    document.getElementById("icone_profil").style.borderLeft = "solid #BCE0FD 0px";
  }

  async loadProfil() {
    var getTokken = JSON.parse(localStorage.getItem('tokken'));

    this.utilisateur  = await this.utilisateurService.getOneUtilisateurById(getTokken["objet"]);
    this.typeUtilisateur = await this.typeUtilisateurService.getOneTypeUtilisateurById(this.utilisateur.typeUtilisateur.slice(23));

    document.getElementById("numeroProfil").textContent = "Utilisateur n°"+this.utilisateur.id;
    document.getElementById("nomPrenomProfil").textContent = this.utilisateur.nom+" "+this.utilisateur.prenom;
    document.getElementById("emailProfil").textContent = this.utilisateur.mail;
    document.getElementById("typeUtilisateurProfil").textContent = this.typeUtilisateur.libelle;
  }

  deconnexion(): void
  {
    var setTokken = {statut:"deconnecte", email:""};
    localStorage.setItem('tokken', JSON.stringify(setTokken));
  }
}