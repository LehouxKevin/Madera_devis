import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeIsolation} from 'src/app/class/type-isolation';
import {TypeIsolationService} from 'src/app/services/type-isolation.service';

@Component({
  selector: 'app-liste-types-isolation',
  templateUrl: './liste-types-isolation.component.html',
  styleUrls: ['./liste-types-isolation.component.css']
})
export class ListeTypesIsolationComponent implements OnInit, OnDestroy {

  ti: TypeIsolation;

  public typesIsolation: any[] = [];
  public typeIsolation;
  public display = true;
  public typeForm: boolean;

  constructor(private router: Router, private typeIsolationService: TypeIsolationService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeIsolation').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeIsolation').style.color = '#1d2932';
    document.getElementById('bouton_typeIsolation').setAttribute('onclick', 'return false');
    this.typeIsolationService.getTypeIsolations().pipe(
      map(typeIsolation => typeIsolation['hydra:member'])
    ).subscribe(
      typeIsolation => this.typesIsolation = typeIsolation
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeIsolation() {
    console.log('Créer un type d\'isolation !');
    // Si la fonction displayTypeIsolation n'a pas encore été exécuté
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('menu_parametres').style.display = 'none';
      document.getElementById('grand-titre').textContent = 'Création d\'un type d\'isolation';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeTypesIsolation').style.paddingTop = '6rem';
      document.getElementById('boutonTypeIsolation').setAttribute('src', 'assets\\icones\\displayList.svg');
      this.display = false;
      this.typeForm = true;
    }
    // Si la fonction displayTypeIsolation a déjà été exécuté
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
      document.getElementById('grand-titre').textContent = 'Liste des types d\'isolation';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeTypesIsolation').style.paddingTop = '2rem';
      document.getElementById('boutonTypeIsolation').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - typeIsolationForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
   **/
  // tslint:disable-next-line:typedef
  async onSubmit(typeIsolationForm: NgForm, typeForm: boolean) {
    // Si le formulaire est celui de la création d'un type de remplissage
    if (typeForm) {

      // Initialisation de l'affichage des éléments du formulaire
      document.getElementById('libelle').style.borderLeft = 'none';
      document.getElementById('prix').style.borderLeft = 'none';
      document.getElementById('description').style.borderLeft = 'none';
      document.getElementById('libelleError').style.display = 'none';
      document.getElementById('prixError').style.display = 'none';
      document.getElementById('descriptionError').style.display = 'none';

      // Initialisation des variables utilisés lors de la création du type d'isolation
      let libelle = false;
      let prix = false;

      // Test si le libelle du type a bien été renseigné
      if (typeIsolationForm.value.libelle) {
        libelle = true;
      } else {
        document.getElementById('libelle').style.borderLeft = 'solid red 9px';
        document.getElementById('libelleError').textContent = 'Veuillez définir le libelle de votre type !';
        document.getElementById('libelleError').style.display = 'block';
      }

      // Test si le prix de la finition a bien été renseigné
      if (typeIsolationForm.value.prix) {
        prix = true;
      } else {
        document.getElementById('prix').style.borderLeft = 'solid red 9px';
        document.getElementById('prixError').textContent = 'Veuillez définir le prix de votre type !';
        document.getElementById('prixError').style.display = 'block';
      }

      if (libelle && prix) {
        // tslint:disable-next-line:max-line-length
        this.ti = new TypeIsolation(typeIsolationForm.value.libelle, typeIsolationForm.value.prix, typeIsolationForm.value.description);
        if (await this.typeIsolationService.addTypeIsolation(this.ti)) {
          this.displayTypeIsolation();
          this.ngOnInit();
        } else {
          console.log('Importation échoué !');
        }
      }
    }
    // Si le formulaire est celui de la modification d'une finition intérieure
    else {
      console.log('Modification du type d\'isolation en question !');
    }
  }
}
