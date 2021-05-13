import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';

@Component({
  selector: 'app-liste-qualites-huisseries',
  templateUrl: './liste-qualites-huisseries.component.html',
  styleUrls: ['./liste-qualites-huisseries.component.css']
})
export class ListeQualitesHuisseriesComponent implements OnInit, OnDestroy {

  qu: QualiteHuisseries;

  public qualitesHuisseries: any[] = [];
  public qualiteHuisserie;
  public display = true;
  public typeForm: boolean;

  constructor(private router: Router, private qualiteHuisserieService: QualiteHuisseriesService) { }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_qualiteHuisserie').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_qualiteHuisserie').style.color = '#1d2932';
    document.getElementById('bouton_qualiteHuisserie').setAttribute('onclick', 'return false');
    this.qualiteHuisserieService.getQualiteHuisseries().pipe(
      map(qualiteHuisserie => qualiteHuisserie['hydra:member'])
    ).subscribe(
      qualiteHuisserie => this.qualitesHuisseries = qualiteHuisserie
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayQualiteHuisserie()
  {
    console.log('Créer une qualité huisserie !');
    // Si la fonction displayQualiteHuisserie n'a pas encore été exécuté
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('menu_parametres').style.display = 'none';
      document.getElementById('grand-titre').textContent = 'Création d\'une qualité huisserie';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeQualitesHuisseries').style.paddingTop = '6rem';
      document.getElementById('boutonQualiteHuisserie').setAttribute('src', 'assets\\icones\\displayList.svg');
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
      document.getElementById('grand-titre').textContent = 'Liste des qualités de huisseries';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeQualitesHuisseries').style.paddingTop = '2rem';
      document.getElementById('boutonQualiteHuisserie').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      this.display = true;
    }
  }

  /**
   * Fonction permettant d'intéragir avec les formulaires de la page.
   * S'exécute lorsque l'on clique sur les boutons (de type submit) des formulaires de la page.
   * Paramètres :
   *  - creationQualitesHuisseriesForm -> Retourne les valeurs saisies dans le formulaire en question.
   *  - typeform              -> Retourne "true" si le formulaire est celui de la création d'une finition extérieur et "false" si c'est celui de la modifcation.
   **/
  // tslint:disable-next-line:typedef
  async onSubmit(qualitesHuisseriesForm: NgForm, typeForm: boolean) {
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
      if (qualitesHuisseriesForm.value.libelle) {
        libelle = true;
      } else {
        document.getElementById('libelle').style.borderLeft = 'solid red 9px';
        document.getElementById('libelleError').textContent = 'Veuillez définir le libelle de votre qualité !';
        document.getElementById('libelleError').style.display = 'block';
      }

      // Test si le prix de la finition a bien été renseigné
      if (qualitesHuisseriesForm.value.prix) {
        prix = true;
      } else {
        document.getElementById('prix').style.borderLeft = 'solid red 9px';
        document.getElementById('prixError').textContent = 'Veuillez définir le prix de votre qualité !';
        document.getElementById('prixError').style.display = 'block';
      }

      if (libelle && prix) {
        // tslint:disable-next-line:max-line-length
        this.qu = new QualiteHuisseries(qualitesHuisseriesForm.value.libelle, qualitesHuisseriesForm.value.prix, qualitesHuisseriesForm.value.description);
        if (await this.qualiteHuisserieService.addQualiteHuisserie(this.qu)) {
          this.displayQualiteHuisserie();
          this.ngOnInit();
        } else {
          console.log('Importation échoué !');
        }
      }
    }
    // Si le formulaire est celui de la modification d'une qualité huisserie
    else {
      console.log('Modification de la qualité en question !');
    }
  }
}
