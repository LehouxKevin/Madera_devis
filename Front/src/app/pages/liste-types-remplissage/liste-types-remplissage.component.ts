import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeRemplissage} from 'src/app/class/type-remplissage';
import {TypeRemplissageService} from 'src/app/services/type-remplissage.service';

@Component({
  selector: 'app-liste-types-remplissage',
  templateUrl: './liste-types-remplissage.component.html',
  styleUrls: ['./liste-types-remplissage.component.css']
})
export class ListeTypesRemplissageComponent implements OnInit, OnDestroy {

  tr: TypeRemplissage;
  public typesRemplissage: any[] = [];
  public typeRemplissage;
  public display = true;
  public typeForm: boolean;

  constructor(private router: Router, private typeRemplissageService: TypeRemplissageService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeRemplissage').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeRemplissage').style.color = '#1d2932';
    document.getElementById('bouton_typeRemplissage').setAttribute('onclick', 'return false');
    this.typeRemplissageService.getTypeRemplissages().pipe(
      map(typeRemplissage => typeRemplissage['hydra:member'])
    ).subscribe(
      typeRemplissage => this.typesRemplissage = typeRemplissage
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeRemplissage() {
    console.log('Créer type remplissage !');
    // Si la fonction displayFamilleComposant n'a pas encore été exécuté
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('menu_parametres').style.display = 'none';
      document.getElementById('grand-titre').textContent = 'Création d\'un type de remplissage';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeTypesRemplissage').style.paddingTop = '6rem';
      document.getElementById('boutonTypeRemplissage').setAttribute('src', 'assets\\icones\\displayList.svg');
      this.display = false;
      this.typeForm = true;
    }
    // Si la fonction displayFamilleComposant a déjà été exécuté
    else {
      if (this.typeForm) {
        document.getElementById('displayCreate').style.display = 'none';
        document.getElementById('libelle').style.borderLeft = 'none';
        document.getElementById('libelleError').style.display = 'none';
      } else {
        // À FAIRE -> Reset le formulaire de modification !
      }
      document.getElementById('menu_parametres').style.display = 'block';
      document.getElementById('displayList').style.display = 'block';
      document.getElementById('grand-titre').textContent = 'Liste des types de remplissage';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeTypesRemplissage').style.paddingTop = '2rem';
      document.getElementById('boutonTypeRemplissage').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - typeRemplissageForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
   **/
  // tslint:disable-next-line:typedef
  async onSubmit(typeRemplissageForm: NgForm, typeForm: boolean) {
    // Si le formulaire est celui de la création d'un type de remplissage
    if (typeForm) {

      // Initialisation de l'affichage des éléments du formulaire
      document.getElementById('libelle').style.borderLeft = 'none';
      document.getElementById('prix').style.borderLeft = 'none';
      document.getElementById('description').style.borderLeft = 'none';
      document.getElementById('libelleError').style.display = 'none';
      document.getElementById('prixError').style.display = 'none';
      document.getElementById('descriptionError').style.display = 'none';

      // Initialisation des variables utilisés lors de la création du type de remplissage
      let libelle = false;
      let prix = false;

      // Test si le libelle de la finition a bien été renseigné
      if (typeRemplissageForm.value.libelle) {
        libelle = true;
      } else {
        document.getElementById('libelle').style.borderLeft = 'solid red 9px';
        document.getElementById('libelleError').textContent = 'Veuillez définir le libelle de votre type !';
        document.getElementById('libelleError').style.display = 'block';
      }

      // Test si le prix de la finition a bien été renseigné
      if (typeRemplissageForm.value.prix) {
        prix = true;
      } else {
        document.getElementById('prix').style.borderLeft = 'solid red 9px';
        document.getElementById('prixError').textContent = 'Veuillez définir le prix de votre type !';
        document.getElementById('prixError').style.display = 'block';
      }

      if (libelle && prix) {
        // tslint:disable-next-line:max-line-length
        this.tr = new TypeRemplissage(typeRemplissageForm.value.libelle, typeRemplissageForm.value.prix, typeRemplissageForm.value.description);
        if (await this.typeRemplissageService.addTypeRemplissage(this.tr)) {
          this.displayTypeRemplissage();
          this.ngOnInit();
        } else {
          console.log('Importation échoué !');
        }
      }
    }
    // Si le formulaire est celui de la modification d'une finition intérieure
    else {
      console.log('Modification du type de remplissage en question !');
    }
  }
}
