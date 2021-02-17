import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';

@Component({
  selector: 'app-liste-conception-ossature',
  templateUrl: './liste-conception-ossature.component.html',
  styleUrls: ['./liste-conception-ossature.component.css']
})
export class ListeConceptionOssatureComponent implements OnInit, OnDestroy {

  // Variable public utilisée dans les différentes fonctions
  co:ConceptionOssature;
  public conceptionsOssatures:any[] = [];
  public conceptionOssature;
  public display:boolean = true;
  public typeForm:boolean;

  // Constructeur de la classe ListeConceptionOssature
  constructor(private router:Router, private conceptionOssatureService: ConceptionOssatureService) { }

  /**
   * Fonction permettant d'initialiser les éléments de la page.
   * S'exécute lors de l'initialisation de la page.
   * Ne prend aucun paramètre.
  **/
  ngOnInit(): void {
    // Ajout de la bordure de suivi dans la sidebar à côté de l'icone des paramètres
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    // Modification du bouton et du lien du menu des paramètres
    document.getElementById("bouton_conceptionOssature").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_conceptionOssature").style.color = "#1d2932";
    document.getElementById("bouton_conceptionOssature").setAttribute("onclick","return false");
    // Récupération de la totalité des conceptions ossatures
    this.conceptionOssatureService.getConceptionOssatures().pipe(
      map(conceptionOssature => conceptionOssature['hydra:member'])
    ).subscribe(
      conceptionOssature => this.conceptionsOssatures = conceptionOssature
    );
  }

   /**
   * Fonction permettant de fermer convenablement la page.
   * S'exécute lors de la fermeture de la page.
   * Ne prend aucun paramètre.
  **/
  ngOnDestroy() {
    // Suppression de la bordure de suivi de la sidebar qui était à côté de l'icone des paramètres
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  /**
   * Fonction permettant d'afficher les différentes fonctionnalités du CRUD.
   * S'exécute lorsque l'on clique sur les différentes boutons de la page.
   * Ne prend aucun paramètre.
  **/
  displayConceptionOssature() {
    // Si la fonction displayConceptionOssature n'a pas encore été exécuté
    if (this.display) {
      document.getElementById("displayList").style.display = "none";
      document.getElementById("menu_parametres").style.display = "none";
      document.getElementById("grand-titre").textContent = "Création d'une conception ossature";
      document.getElementById("displayCreate").style.display = "block";
      document.getElementById("content").style.paddingLeft = "15rem";
      document.getElementById("content").style.paddingRight = "15rem";
      document.getElementById("listeConceptionsOssatures").style.paddingTop = "6rem";
      document.getElementById("boutonConceptionOssature").setAttribute("src", 'assets\\icones\\displayList.svg');
      this.display = false;
      this.typeForm = true;
    }
    // Si la fonction displayConceptionOssature a déjà été exécuté
    else {
      if (this.typeForm) {
        document.getElementById("displayCreate").style.display = "none";
        document.getElementById("libelle").style.borderLeft = "none";
        document.getElementById("prix").style.borderLeft = "none";
        document.getElementById("libelleError").style.display = "none";
        document.getElementById("prixError").style.display = "none";
      }
      else {
        // À FAIRE -> Reset le formulaire de modification !
      }
      document.getElementById("menu_parametres").style.display = "block";
      document.getElementById("displayList").style.display = "block";
      document.getElementById("grand-titre").textContent = "Liste des finitions intérieures";
      document.getElementById("content").style.paddingLeft = "3rem";
      document.getElementById("content").style.paddingRight = "3rem";
      document.getElementById("listeConceptionsOssatures").style.paddingTop = "2rem";
      document.getElementById("boutonConceptionOssature").setAttribute("src", "assets\\icones\\displayCreate.svg");
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - conceptionOssatureForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
  **/
 async onSubmit(conceptionOssatureForm: NgForm, typeForm:boolean) 
 {
   // Si le formulaire est celui de la création d'une conception ossature
   if (typeForm) {

     // Initialisation de l'affichage des éléments du formulaire
     document.getElementById("libelle").style.borderLeft = "none";
     document.getElementById("prix").style.borderLeft = "none";
     document.getElementById("libelleError").style.display = "none";
     document.getElementById("prixError").style.display = "none";

     // Initialisation des variables utilisés lors de la création de la finition intérieure 
     var libelle = false;
     var prix = false;
     
     // Test si le libelle de la finition a bien été renseigné
     if (conceptionOssatureForm.value.libelle) {
       libelle = true;
     }
     else {
       document.getElementById("libelle").style.borderLeft = "solid red 9px";
       document.getElementById("libelleError").textContent = "Veuillez définir le libelle de votre finition !"
       document.getElementById("libelleError").style.display = "block";
     }

     // Test si le prix de la finition a bien été renseigné
     if (conceptionOssatureForm.value.prix) {
       prix = true;
     }
     else {
       document.getElementById("prix").style.borderLeft = "solid red 9px";
       document.getElementById("prixError").textContent = "Veuillez définir le prix de votre finition !"
       document.getElementById("prixError").style.display = "block";
     }

     if (libelle && prix) {
       this.co = new ConceptionOssature(conceptionOssatureForm.value.libelle, conceptionOssatureForm.value.prix, conceptionOssatureForm.value.description);
       if(await this.conceptionOssatureService.addConceptionOssature(this.co))
       {
         this.displayConceptionOssature();
         this.ngOnInit();
       }
       else {
         console.log("Importation échoué !");
       }
     }
   }
   // Si le formulaire est celui de la modification d'une finition intérieure
   else {
     console.log("Modification de la finition en question !");
   }
 }
}
