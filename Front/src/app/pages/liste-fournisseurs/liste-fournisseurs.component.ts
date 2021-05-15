import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Fournisseur} from 'src/app/class/fournisseur';
import {FournisseurService} from 'src/app/services/fournisseur.service';
import {FamilleComposantService} from 'src/app/services/famille-composant.service';
import {ComposantService} from '../../services/composant.service';
import {Composant} from '../../class/composant';

@Component({
  selector: 'app-liste-fournisseurs',
  templateUrl: './liste-fournisseurs.component.html',
  styleUrls: ['./liste-fournisseurs.component.css']
})
export class ListeFournisseursComponent implements OnInit, OnDestroy {

  four: Fournisseur;
  public idFournisseurConsulter;
  public fournisseurs: any[] = [];
  public fournisseur;

  public famillesComposant: any[] = [];
  public familleComposant;

  cp: Composant;
  public composants: any[] = [];
  public composant;

  public display = true;
  public displayWindow = true;

  // Champs formulaires - Fournisseur
  public champsNom;
  public champsTel;
  public champsMail;

  // Champs formulaires - Composant
  public champsLibelleComposant;
  public champsDescriptionComposant;
  public champsFamilleComposant;
  public champsCaracteristiquesComposant;
  public champsPrixComposant;

  nom = '';
  telephone = '';
  mail = '';

  public idFournisseur;
  public ancienIdFournisseur;
  public nomFournisseur;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private fournisseurService: FournisseurService, private familleComposantService: FamilleComposantService, private composantService: ComposantService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeFournisseurs').style.borderLeft = 'solid #BCE0FD 5px';
    this.fournisseurService.getFournisseurs().pipe(
      map(fournisseur => fournisseur['hydra:member'])
    ).subscribe(
      fournisseur => this.fournisseurs = fournisseur
    );
    this.champsNom = document.getElementById('nom');
    this.champsTel = document.getElementById('telephone');
    this.champsMail = document.getElementById('email');
    this.idFournisseur = 0;
    this.nomFournisseur = '';
    this.ancienIdFournisseur = 0;
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeFournisseurs').style.borderLeft = 'solid #BCE0FD 0px';
  }

  displayFournisseur(): void {
    if (this.display) {
      document.getElementById('displayList').style.display = 'none';
      document.getElementById('displayCreate').style.display = 'block';
      document.getElementById('boutonFournisseur').setAttribute('src', 'assets\\icones\\displayList.svg');
      document.getElementById('grand-titre').textContent = 'Création d\'un fournisseur';
      document.getElementById('content').style.paddingLeft = '15rem';
      document.getElementById('content').style.paddingRight = '15rem';
      document.getElementById('listeFournisseurs').style.paddingTop = '12rem';
      document.getElementById('titrefournisseur').style.display = 'none';
      document.getElementById('displayUpdate').style.display = 'none';
      // tslint:disable-next-line:triple-equals
      if (this.idFournisseur != 0) {
        document.getElementById('deleteWindow').style.display = 'none';
        document.getElementById('id_fournisseur' + this.idFournisseur).style.border = '0';
        this.idFournisseur = 0;
      }
      this.display = false;
    } else {
      document.getElementById('displayCreate').style.display = 'none';
      document.getElementById('displayList').style.display = 'block';
      document.getElementById('boutonFournisseur').setAttribute('src', 'assets\\icones\\displayCreate.svg');
      document.getElementById('grand-titre').textContent = 'Liste des fournisseurs';
      document.getElementById('content').style.paddingLeft = '3rem';
      document.getElementById('content').style.paddingRight = '3rem';
      document.getElementById('listeFournisseurs').style.paddingTop = '2rem';
      document.getElementById('titrefournisseur').style.display = 'none';
      document.getElementById('displayUpdate').style.display = 'none';
      this.display = true;
    }
  }

  displayWindowFounisseur(): void {
    if (this.displayWindow) {
      document.getElementById('boutonDisableWindow').style.display = 'none';
      document.getElementById('boutonDisplayWindow').style.visibility = 'visible';
      document.getElementById('listeFournisseurs').style.display = 'none';
      this.displayWindow = false;
    } else {
      document.getElementById('boutonDisplayWindow').style.visibility = 'hidden';
      document.getElementById('boutonDisableWindow').style.display = 'block';
      document.getElementById('listeFournisseurs').style.display = 'block';
      this.displayWindow = true;
    }
  }


  // tslint:disable-next-line:typedef
  async onSubmitFournisseur(FournisseurForm: NgForm, typeForm: boolean) {
    this.champsNom = document.getElementById('nom');
    this.champsTel = document.getElementById('telephone');
    this.champsMail = document.getElementById('email');
    if (typeForm) {
      if (FournisseurForm.value.nom && isNaN(FournisseurForm.value.nom)) {
        this.champsNom.style.borderLeft = 'none';
        document.getElementById('nomError').style.display = 'none';
        if (FournisseurForm.value.telephone && !isNaN(FournisseurForm.value.telephone) && FournisseurForm.value.telephone.length === 10) {
          this.champsTel.style.borderLeft = 'none';
          document.getElementById('telephoneError').style.display = 'none';
          // tslint:disable-next-line:max-line-length
          if (FournisseurForm.value.email && FournisseurForm.value.email.indexOf('@') !== -1 && FournisseurForm.value.email.indexOf('.') !== -1) {
            this.champsMail.style.borderLeft = 'none';
            document.getElementById('emailError').style.display = 'none';

            this.nom = FournisseurForm.value.nom;
            this.telephone = FournisseurForm.value.telephone;
            this.mail = FournisseurForm.value.email;
            this.four = new Fournisseur(this.nom, this.telephone, this.mail);
            if (await this.fournisseurService.addFournisseur(this.four)) {
              this.displayFournisseur();
              this.ngOnInit();
            } else {
              console.log('Importation échoué !');
            }
          } else {
            this.champsMail.style.borderLeft = 'solid red 9px';
            document.getElementById('emailError').textContent = 'Veuillez renseigner un e-mail valide ! (exemple : madera@contact.fr)';
            document.getElementById('emailError').style.display = 'block';
          }
        } else {
          this.champsTel.style.borderLeft = 'solid red 9px';
          document.getElementById('telephoneError').textContent = 'Veuillez renseigner un numéro de téléphone valide ! (exemple : 0102030405)';
          document.getElementById('telephoneError').style.display = 'block';
        }
      } else {
        this.champsNom.style.borderLeft = 'solid red 9px';
        document.getElementById('nomError').textContent = 'Veuillez renseigner un nom valide ! (sans chiffre)';
        document.getElementById('nomError').style.display = 'block';
      }
    } else {
      this.nom = document.getElementById('nomUpdate').getAttribute('placeholder');
      this.telephone = document.getElementById('telephoneUpdate').getAttribute('placeholder');
      this.mail = document.getElementById('emailUpdate').getAttribute('placeholder');

      this.champsNom = document.getElementById('nomUpdate');
      this.champsTel = document.getElementById('telephoneUpdate');
      this.champsMail = document.getElementById('emailUpdate');

      this.champsNom.style.borderLeft = '0';
      document.getElementById('nomUpdateError').style.display = 'none';
      this.champsTel.style.borderLeft = '0';
      document.getElementById('telephoneUpdateError').style.display = 'none';
      this.champsMail.style.borderLeft = '0';
      document.getElementById('emailUpdateError').style.display = 'none';

      if (FournisseurForm.value.nom) {
        if (isNaN(FournisseurForm.value.nom)) {
          this.nom = FournisseurForm.value.nom;
        } else {
          this.champsNom.style.borderLeft = 'solid red 9px';
          document.getElementById('nomUpdateError').textContent = 'Veuillez renseigner un nom valide ! (sans chiffre)';
          document.getElementById('nomUpdateError').style.display = 'block';
        }
      }

      if (FournisseurForm.value.telephone) {
        if (!isNaN(FournisseurForm.value.telephone) && FournisseurForm.value.telephone.length === 10) {
          this.telephone = FournisseurForm.value.telephone;
        } else {
          this.champsTel.style.borderLeft = 'solid red 9px';
          document.getElementById('telephoneUpdateError').textContent = 'Veuillez renseigner un numéro de téléphone valide ! (exemple : 0102030405)';
          document.getElementById('telephoneUpdateError').style.display = 'block';
        }
      }

      if (FournisseurForm.value.email) {
        if (FournisseurForm.value.email.indexOf('@') !== -1 && FournisseurForm.value.email.indexOf('.') !== -1) {
          this.mail = FournisseurForm.value.email;
        } else {
          this.champsMail.style.borderLeft = 'solid red 9px';
          // tslint:disable-next-line:max-line-length
          document.getElementById('emailUpdateError').textContent = 'Veuillez renseigner un e-mail valide ! (exemple : madera@contact.fr)';
          document.getElementById('emailUpdateError').style.display = 'block';
        }
      }
      /*
      // L'ID du fournisseur modifié :
        this.fournisseur.id
      // Les champs modifiés du formulaire :
        this.nom
        this.telephone
        this.mail
      */
      // tslint:disable-next-line:no-unused-expression
      this.fournisseur.nom !== this.nom ? this.fournisseur.nom = this.nom : 0;
      // tslint:disable-next-line:no-unused-expression
      this.fournisseur.telephone !== this.telephone ? this.fournisseur.telephone = this.telephone : 0;
      // tslint:disable-next-line:no-unused-expression
      this.fournisseur.email !== this.mail ? this.fournisseur.email = this.mail : 0;
      await this.fournisseurService.syncUpdateFournisseur(this.fournisseur);

      // À mettre quand le fournisseur à été modifié :
      document.getElementById('titrefournisseur').style.display = 'none';
      this.champsNom.style.borderLeft = 'solid green 9px';
      this.champsTel.style.borderLeft = 'solid green 9px';
      this.champsMail.style.borderLeft = 'solid green 9px';
      this.displayFournisseur();
      this.ngOnInit();
    }
  }

  // tslint:disable-next-line:typedef
  async onSubmitComposant(ComposantForm: NgForm, typeForm: boolean) {
    let libelleBool = false;
    let familleBool = false;
    let caracteristiqueBool = false;
    let prixBool = false;
    // Ajout d'un composant
    if (typeForm) {
      this.champsLibelleComposant = document.getElementById('libelleComposant');
      this.champsDescriptionComposant = document.getElementById('descriptionComposant');
      this.champsDescriptionComposant = document.getElementById('familleComposant');
      this.champsCaracteristiquesComposant = document.getElementById('caracteristiquesComposant');
      this.champsPrixComposant = document.getElementById('prixComposant');
      // TEST - Libelle
      if (ComposantForm.value.libelleComposant) {
        this.champsLibelleComposant.style.borderLeft = 'none';
        document.getElementById('libelleComposantError').style.display = 'none';
        libelleBool = true;
      }
      else {
        this.champsLibelleComposant.style.borderLeft = 'solid red 9px';
        document.getElementById('libelleComposantError').textContent = 'Veuillez renseigner un libelle !';
        document.getElementById('libelleComposantError').style.display = 'block';
      }
      // TEST - Caractéristiques
      if (ComposantForm.value.caracteristiquesComposant) {
        this.champsCaracteristiquesComposant.style.borderLeft = 'none';
        document.getElementById('caracteristiquesComposantError').style.display = 'none';
        caracteristiqueBool = true;
      }
      else {
        this.champsCaracteristiquesComposant.style.borderLeft = 'solid red 9px';
        document.getElementById('caracteristiquesComposantError').textContent = 'Veuillez renseigner les caractéristiques du composant !';
        document.getElementById('caracteristiquesComposantError').style.display = 'block';
      }

      // TEST - Famille
      if (ComposantForm.value.familleComposant) {
        document.getElementById('familleComposantError').style.display = 'none';
        familleBool = true;
      }
      else {
        document.getElementById('familleComposantError').textContent = 'Veuillez sélectionner une famille !';
        document.getElementById('familleComposantError').style.display = 'block';
      }

      // TEST - Prix
      if (ComposantForm.value.prixComposant) {
        this.champsPrixComposant.style.borderLeft = 'none';
        document.getElementById('prixComposantError').style.display = 'none';
        prixBool = true;
      }
      else {
        this.champsPrixComposant.style.borderLeft = 'solid red 9px';
        document.getElementById('prixComposantError').textContent = 'Veuillez renseigner le prix du composant !';
        document.getElementById('prixComposantError').style.display = 'block';
      }

      if (libelleBool && caracteristiqueBool && prixBool && familleBool) {
        const now = new Date();
        const annee   = String(now.getFullYear());
        const mois    = String(('0' + (now.getMonth() + 1)).slice(-2));
        const jour    = String(('0' + now.getDate()).slice(-2));
        const dateCreation = annee + '-' + mois + '-' + jour;
        console.log(dateCreation);

        // tslint:disable-next-line:max-line-length prefer-const
        const splittedFamilleComposant = ComposantForm.value.familleComposant.split(' - ');

        // TESTS
        console.log(typeof ComposantForm.value.libelleComposant);
        console.log(typeof now);
        console.log(typeof ComposantForm.value.descriptionComposant);
        // tslint:disable-next-line:radix
        console.log(typeof parseInt(ComposantForm.value.prixComposant));
        // tslint:disable-next-line:radix
        console.log(typeof parseInt(splittedFamilleComposant[0]));
        console.log(typeof ComposantForm.value.caracteristiquesComposant);

        // tslint:disable-next-line:max-line-length radix
        this.cp = new Composant(ComposantForm.value.libelleComposant, now, ComposantForm.value.descriptionComposant, ComposantForm.value.prixComposant, parseInt(splittedFamilleComposant[0]), ComposantForm.value.caracteristiquesComposant);
        if (await this.composantService.addComposant(this.cp)) {
          this.consulterFounisseur(this.idFournisseurConsulter);
          document.getElementById('pageComposant').style.display = 'none';
        } else {
          console.log('Importation échoué !');
        }
      }
    }
    else {}
  }

  consulterFounisseur(id: number): void {
    this.idFournisseur = id;
    this.idFournisseurConsulter = id;
    // Affichage de la page de consultation d'un fournisseur
    document.getElementById('consultation').style.display = 'block';
    document.getElementById('boutonDisableWindow').style.display = 'none';
    document.getElementById('boutonDisplayWindow').style.visibility = 'visible';
    document.getElementById('listeFournisseurs').style.display = 'none';

    // Récupération du fournisseur sélectionné
    this.fournisseurs.forEach((fournisseur, index) => {
      if (fournisseur.id === id) {
        this.fournisseur = fournisseur;
      }
    });

    // Récupération de toutes les familles de composant
    this.familleComposantService.getFamillesComposant().pipe(
      map(familleComposant => familleComposant['hydra:member'])
    ).subscribe(
      // On stocke ces valeurs dans une variable public (de type -> tableau)
      familleComposant => this.famillesComposant = familleComposant
    );

    // Récupération des composants
    this.composantService.getComposants().pipe(
      map(composant => composant['hydra:member'])
    ).subscribe(
      // On stocke ces valeurs dans une variable public (de type -> tableau)
      composant => this.composants = composant
    );

    // Remplissage de la fiche des informations du fournisseur sélectionné
    document.getElementById('nomFournisseur').innerHTML = this.fournisseur.nom;
    document.getElementById('telephoneFournisseur').innerHTML = this.fournisseur.telephone;
    document.getElementById('emailFournisseur').innerHTML = this.fournisseur.email;
    this.displayWindow = false;
  }

  modifierFournisseur(id: number): void {
    this.fournisseurs.forEach((fournisseur, index) => {
      if (fournisseur.id === id) {
        this.fournisseur = fournisseur;
      }
    });
    document.getElementById('displayList').style.display = 'none';
    document.getElementById('boutonFournisseur').setAttribute('src', 'assets\\icones\\displayList.svg');
    document.getElementById('grand-titre').textContent = 'Modification du fournisseur :';
    document.getElementById('titrefournisseur').textContent = this.fournisseur.nom;
    document.getElementById('titrefournisseur').style.display = 'block';
    document.getElementById('content').style.paddingLeft = '15rem';
    document.getElementById('content').style.paddingRight = '15rem';
    document.getElementById('listeFournisseurs').style.paddingTop = '12rem';
    document.getElementById('nomUpdate').setAttribute('placeholder', this.fournisseur.nom);
    document.getElementById('telephoneUpdate').setAttribute('placeholder', this.fournisseur.telephone);
    document.getElementById('emailUpdate').setAttribute('placeholder', this.fournisseur.email);

    if (this.idFournisseur !== 0) {
      document.getElementById('deleteWindow').style.display = 'none';
      document.getElementById('id_fournisseur' + this.idFournisseur).style.border = '0';
      this.idFournisseur = 0;
    }
    this.display = false;
    document.getElementById('displayList').style.display = 'none';
    document.getElementById('displayUpdate').style.display = 'block';
  }

  supprimerFounisseur(id: number): void {
    if (this.idFournisseur !== 0) {
      if (this.ancienIdFournisseur !== this.idFournisseur) {
        this.ancienIdFournisseur = this.idFournisseur;
        document.getElementById('id_fournisseur' + this.ancienIdFournisseur).style.border = '0';
      }
    }
    this.idFournisseur = id;
    this.fournisseurs.forEach((fournisseur, index) => {
      if (fournisseur.id === this.idFournisseur) {
        this.nomFournisseur = fournisseur.nom;
      }
    });
    document.getElementById('id_fournisseur' + id).style.border = 'solid #2699FB 6px';
    document.getElementById('fournisseurDelete').textContent = this.nomFournisseur;
    document.getElementById('deleteWindow').style.display = 'block';
  }

  confirmerSuppressionFounisseur(): void {
    this.fournisseurService.asyncDeleteFournisseur(this.idFournisseur);
    console.log('Suppression de ' + this.idFournisseur);
    document.getElementById('deleteWindow').style.display = 'none';
    this.ngOnDestroy();
    this.ngOnInit();
  }

  annulerSuppressionFounisseur(): void {
    document.getElementById('id_fournisseur' + this.idFournisseur).style.border = '0';
    this.idFournisseur = 0;
    document.getElementById('deleteWindow').style.display = 'none';
  }

  consulterComposant(id: number): void {
    // Récupération du fournisseur sélectionné
    this.composants.forEach((composant, index) => {
      if (composant.id === id) {
        this.composant = composant;
      }
    });
    // tslint:disable-next-line:prefer-const
    let idFamille = this.composant.familleComposant;
    this.famillesComposant.forEach((familleComposant, index) => {
      // tslint:disable-next-line:radix
      if (familleComposant.id === parseInt(idFamille.slice(24))) {
        this.familleComposant = familleComposant;
      }
    });
    document.getElementById('titreComposant_consultation').innerHTML = this.composant.libelle;
    document.getElementById('prixComposant_consulter').innerHTML = this.composant.prix + '€';
    document.getElementById('descriptionComposant_consulter').innerHTML = this.composant.description;
    document.getElementById('familleComposant_consulter').innerHTML = this.familleComposant.libelle;
    document.getElementById('caracteristiquesComposant_consulter').innerHTML = this.composant.caracteristiques;
    document.getElementById('dateCreationComposant_consulter').innerHTML = this.composant.dateCreation;
    document.getElementById('ajouterComposant').style.display = 'none';
    document.getElementById('consulterComposant').style.display = 'block';
    document.getElementById('pageComposant').style.display = 'block';
  }

  ajouterComposant(): void {
    document.getElementById('titreComposant_consultation').innerHTML = 'Création d\'un composant';
    document.getElementById('pageComposant').style.display = 'block';
    document.getElementById('ajouterComposant').style.display = 'block';
    document.getElementById('consulterComposant').style.display = 'none';
    document.getElementById('boutonDisplayWindow').style.visibility = 'visible';
    document.getElementById('listeFournisseurs').style.display = 'none';
  }

  modifierComposant(id: number): void {
    console.log('Modification du composant : ' + id);
  }

  supprimerComposant(id: number): void {
    console.log('Supression du composant : ' + id);
  }

  quitterPageComposant(): void {
    document.getElementById('pageComposant').style.display = 'none';
  }
}
