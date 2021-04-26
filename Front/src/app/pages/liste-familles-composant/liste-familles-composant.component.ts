import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FamilleComposant } from 'src/app/class/famille-composant';
import { FamilleComposantService } from 'src/app/services/famille-composant.service';

@Component({
  selector: 'app-liste-familles-composant',
  templateUrl: './liste-familles-composant.component.html',
  styleUrls: ['./liste-familles-composant.component.css']
})
export class ListeFamillesComposantComponent implements OnInit, OnDestroy {

  // Variable public utilisée dans les différentes fonctions
  fc:FamilleComposant;
  public famillesComposant:any[] = [];
  public familleComposant;
  public display:boolean = true;
  public typeForm:boolean;

  // Constructeur de la classe ListeFamillesComposantComponent
  constructor(private router:Router, private familleComposantService:FamilleComposantService) { }

  /**
   * Fonction permettant d'initialiser les éléments de la page.
   * S'exécute lors de l'initialisation de la page.
   * Ne prend aucun paramètre.
  **/
  ngOnInit(): void {
    // Ajout de la bordure de suivi dans la sidebar à côté de l'icone des paramètres
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    // Modification du bouton et du lien du menu des paramètres
    document.getElementById("bouton_familleComposant").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_familleComposant").style.color = "#1d2932";
    document.getElementById("bouton_familleComposant").setAttribute("onclick","return false");
    // Récupération de la totalité des familles de composant
    this.familleComposantService.getFamillesComposant().pipe(
      map(familleComposant => familleComposant['hydra:member'])
    ).subscribe(
      // On stocke ces valeurs dans une variable public (de type -> tableau)
      familleComposant => this.famillesComposant = familleComposant
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
  displayFamilleComposant()
  {
    // Si la fonction displayFamilleComposant n'a pas encore été exécuté
    if (this.display) {
      document.getElementById("displayList").style.display = "none";
      document.getElementById("menu_parametres").style.display = "none";
      document.getElementById("grand-titre").textContent = "Création d'une famille de composant";
      document.getElementById("displayCreate").style.display = "block";
      document.getElementById("content").style.paddingLeft = "15rem";
      document.getElementById("content").style.paddingRight = "15rem";
      document.getElementById("listeFamillesComposant").style.paddingTop = "6rem";
      document.getElementById("boutonFamilleComposant").setAttribute("src", 'assets\\icones\\displayList.svg');
      this.display = false;
      this.typeForm = true;
    }
    // Si la fonction displayFamilleComposant a déjà été exécuté
    else {
      if (this.typeForm) {
        document.getElementById("displayCreate").style.display = "none";
        document.getElementById("libelle").style.borderLeft = "none";
        document.getElementById("libelleError").style.display = "none";
      }
      else {
        // À FAIRE -> Reset le formulaire de modification !
      }
      document.getElementById("menu_parametres").style.display = "block";
      document.getElementById("displayList").style.display = "block";
      document.getElementById("grand-titre").textContent = "Liste des familles de composant";
      document.getElementById("content").style.paddingLeft = "3rem";
      document.getElementById("content").style.paddingRight = "3rem";
      document.getElementById("listeFamillesComposant").style.paddingTop = "2rem";
      document.getElementById("boutonFamilleComposant").setAttribute("src", "assets\\icones\\displayCreate.svg");
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - familleComposantForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
  **/
 async onSubmit(familleComposantForm: NgForm, typeForm:boolean) 
 {
   // Si le formulaire est celui de la création d'une finition intérieure
   if (typeForm) {

     // Initialisation de l'affichage des éléments du formulaire
     document.getElementById("libelle").style.borderLeft = "none";
     document.getElementById("libelleError").style.display = "none";

     // Initialisation des variables utilisés lors de la création de la finition intérieure 
     var libelle = false;
     var prix = false;
     
     // Test si le libelle de la finition a bien été renseigné
     if (familleComposantForm.value.libelle) {
      this.fc = new FamilleComposant(familleComposantForm.value.libelle);
      if(await this.familleComposantService.addFamilleComposant(this.fc))
      {
        this.displayFamilleComposant();
        this.ngOnInit();
      }
      else {
        console.log("Importation échoué !");
      }
     }
     else {
       document.getElementById("libelle").style.borderLeft = "solid red 9px";
       document.getElementById("libelleError").textContent = "Veuillez définir le libelle de votre finition !"
       document.getElementById("libelleError").style.display = "block";
     }
   }
   // Si le formulaire est celui de la modification d'une finition intérieure
   else {
     console.log("Modification de la finition en question !");
   }
  }
}
