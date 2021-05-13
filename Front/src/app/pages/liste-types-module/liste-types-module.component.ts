import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeModule} from 'src/app/class/type-module';
import {TypeModuleService} from 'src/app/services/type-module.service';
import {FamilleComposant} from "../../class/famille-composant";

@Component({
  selector: 'app-liste-types-module',
  templateUrl: './liste-types-module.component.html',
  styleUrls: ['./liste-types-module.component.css']
})
export class ListeTypesModuleComponent implements OnInit, OnDestroy {

  tm: TypeModule;

  public typesModule: any[] = [];
  public typeModule;
  public display = true;
  public typeForm: boolean;

  constructor(private router: Router, private typeModuleService: TypeModuleService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeModule').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeModule').style.color = '#1d2932';
    document.getElementById('bouton_typeModule').setAttribute('onclick', 'return false');
    this.typeModuleService.getTypesModule().pipe(
      map(typeModule => typeModule['hydra:member'])
    ).subscribe(
      typeModule => this.typesModule = typeModule
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeModule() {
    // Si la fonction displayFamilleComposant n'a pas encore été exécuté
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('menu_parametres').style.display = 'none';
      document.getElementById('grand-titre').textContent = 'Création d\'un type de module';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeTypesModule').style.paddingTop = '6rem';
      document.getElementById('boutonTypeModule').setAttribute('src', 'assets\\icones\\displayList.svg');
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
      document.getElementById('grand-titre').textContent = 'Liste des types de module';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeTypesModule').style.paddingTop = '2rem';
      document.getElementById('boutonTypeModule').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - typeModuleForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
   **/
  // tslint:disable-next-line:typedef
  async onSubmit(typeModuleForm: NgForm, typeForm: boolean) {
    // Si le formulaire est celui de la création d'un type de module
    if (typeForm) {

      // Initialisation de l'affichage des éléments du formulaire
      document.getElementById('libelle').style.borderLeft = 'none';
      document.getElementById('libelleError').style.display = 'none';

      // Initialisation des variables utilisés lors de la création du type
      const libelle = false;
      const prix = false;

      // Test si le libelle du type de module a bien été renseigné
      if (typeModuleForm.value.libelle) {
        this.tm = new TypeModule(typeModuleForm.value.libelle);
        if (await this.typeModuleService.addTypeModule(this.tm)) {
          this.displayTypeModule();
          this.ngOnInit();
        } else {
          console.log('Importation échoué !');
        }
      } else {
        document.getElementById('libelle').style.borderLeft = 'solid red 9px';
        document.getElementById('libelleError').textContent = 'Veuillez définir le libelle de votre type !';
        document.getElementById('libelleError').style.display = 'block';
      }
    }
    // Si le formulaire est celui de la modification d'une finition intérieure
    else {
      console.log('Modification du type module en question !');
    }
  }
}
