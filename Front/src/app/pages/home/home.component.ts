import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public utilisateurs:any[] = [];
  public utilisateur;
  public typesUtilisateur:any[] = [];
  public typeUtilisateur;

  constructor(private router:Router, private utilisateurService: UtilisateurService) { }
  ngOnInit(): void 
  {
    
    
    this.router.navigate(['accueil']);
    var tokken = JSON.parse(localStorage.getItem('tokken'));
    if (tokken['statut'] == "connecte") {
      document.getElementById('lien_iconeProfil').style.display = "none";
      document.getElementById('Ellipse_connexion2').style.fill = "green";
      document.getElementById('lien_iconeProfil').setAttribute('routerlink', '/devis');
      this.loadSidebar();
    }
    else {
      document.getElementById('lien_iconeProfil').style.display = "block";
      document.getElementById('lien_iconeProfil2').style.display = "none";
      document.getElementById('icone_statistiquesCommercial').remove();
      document.getElementById('icone_synchronisation').remove();
      document.getElementById('icone_listeGamme').remove();
      document.getElementById('icone_listeFournisseurs').remove();
      document.getElementById('icone_listeParametres').remove();
    }
  }

  async loadSidebar() {
    var getTokken = JSON.parse(localStorage.getItem('tokken'));
    this.utilisateur  = await this.utilisateurService.getOneUtilisateurById(getTokken["objet"]);

    // Type utilisateur : Administrateur
    if (this.utilisateur.typeUtilisateur.slice(23) == 1) {
      console.log("[Vous êtes connecté en tant qu'Administrateur]");
    }
    // Type utilisateur : Commercial
    else if (this.utilisateur.typeUtilisateur.slice(23) == 2) {
      document.getElementById('icone_listeGamme').remove();
      document.getElementById('icone_listeFournisseurs').remove();
      document.getElementById('icone_listeParametres').remove();
    }
    // Type utilisateur : Bureau d'études
    else if (this.utilisateur.typeUtilisateur.slice(23) == 3) {
      document.getElementById('icone_listeDevis').remove();
      document.getElementById('icone_statistiquesCommercial').remove();
      document.getElementById('icone_synchronisation').remove();
    }
  }
}
