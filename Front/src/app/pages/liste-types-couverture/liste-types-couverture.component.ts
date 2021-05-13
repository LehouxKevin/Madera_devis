import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeCouverture} from 'src/app/class/type-couverture';
import {TypeCouvertureService} from 'src/app/services/type-couverture.service';

@Component({
  selector: 'app-liste-types-couverture',
  templateUrl: './liste-types-couverture.component.html',
  styleUrls: ['./liste-types-couverture.component.css']
})
export class ListeTypesCouvertureComponent implements OnInit, OnDestroy {

  tc: TypeCouverture;

  public typesCouverture: any[] = [];
  public typeCouverture;
  public display = true;
  public typeForm: boolean;

  constructor(private router: Router, private typeCouvertureService: TypeCouvertureService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeCouverture').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeCouverture').style.color = '#1d2932';
    document.getElementById('bouton_typeCouverture').setAttribute('onclick', 'return false');
    this.typeCouvertureService.getTypeCouvertures().pipe(
      map(typeCouverture => typeCouverture['hydra:member'])
    ).subscribe(
      typeCouverture => this.typesCouverture = typeCouverture
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeCouverture() {
    console.log('Créer un type de couverture !');
    // Si la fonction displayTypeCouverture n'a pas encore été exécuté
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('menu_parametres').style.display = 'none';
      document.getElementById('grand-titre').textContent = 'Création d\'un type de couverture';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeTypesCouverture').style.paddingTop = '6rem';
      document.getElementById('boutonTypeCouverture').setAttribute('src', 'assets\\icones\\displayList.svg');
      this.display = false;
      this.typeForm = true;
    }
    // Si la fonction displayTypeCouverture a déjà été exécuté
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
      document.getElementById('grand-titre').textContent = 'Liste des types de couverture';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeTypesCouverture').style.paddingTop = '2rem';
      document.getElementById('boutonTypeCouverture').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - typeCouvertureForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
   **/
  // tslint:disable-next-line:typedef
  async onSubmit(typeCouvertureForm: NgForm, typeForm: boolean) {
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
      if (typeCouvertureForm.value.libelle) {
        libelle = true;
      } else {
        document.getElementById('libelle').style.borderLeft = 'solid red 9px';
        document.getElementById('libelleError').textContent = 'Veuillez définir le libelle de votre type !';
        document.getElementById('libelleError').style.display = 'block';
      }

      // Test si le prix de la finition a bien été renseigné
      if (typeCouvertureForm.value.prix) {
        prix = true;
      } else {
        document.getElementById('prix').style.borderLeft = 'solid red 9px';
        document.getElementById('prixError').textContent = 'Veuillez définir le prix de votre type !';
        document.getElementById('prixError').style.display = 'block';
      }

      if (libelle && prix) {
        // tslint:disable-next-line:max-line-length
        this.tc = new TypeCouverture(typeCouvertureForm.value.libelle, typeCouvertureForm.value.prix, typeCouvertureForm.value.description);
        if (await this.typeCouvertureService.addTypeCouverture(this.tc)) {
          this.displayTypeCouverture();
          this.ngOnInit();
        } else {
          console.log('Importation échoué !');
        }
      }
    }
    // Si le formulaire est celui de la modification d'une finition intérieure
    else {
      console.log('Modification du type de couverture en question !');
    }
  }
}
