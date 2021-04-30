import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Utilisateur} from 'src/app/class/utilisateur';
import {TypeUtilisateurService} from 'src/app/services/type-utilisateur.service';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {

  user: Utilisateur;

  nom = '';
  prenom = '';
  mail = '';
  mdp = '';
  typeUtilisateur = '';

  public utilisateurs: any[] = [];
  public utilisateur;

  public typesUtilisateur: any[] = [];
  // tslint:disable-next-line:variable-name
  public type_utilisateur;

  public existanceMail;

  public champsNom;
  public champsPrenom;
  public champsCatUser;
  public champsEmail;
  public champsMdp;
  public champsConfirmed;
  public champsCheckConditions;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private utilisateurService: UtilisateurService, private typeUtilisateurService: TypeUtilisateurService) {
  }

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().pipe(
      map(utilisateur => utilisateur['hydra:member'])
    ).subscribe(
      utilisateur => this.utilisateurs = utilisateur
    );

    this.champsNom = document.getElementById('nom');
    this.champsPrenom = document.getElementById('prenom');
    this.champsCatUser = document.getElementById('categorieUtilisateur');
    this.champsEmail = document.getElementById('email');
    this.champsMdp = document.getElementById('password');
    this.champsConfirmed = document.getElementById('passwordConfirmed');
    this.champsCheckConditions = document.getElementById('checkConditionsUtilisation');
  }

  // tslint:disable-next-line:typedef
  async onSubmit(creationCompteForm: NgForm) {
    // Tester si le mail n'a pas déjà été utilisé
    this.existanceMail = false;
    this.utilisateurs.forEach((utilisateur, index) => {
      if (utilisateur.mail === creationCompteForm.value.email) {
        this.existanceMail = true;
      }
    });

    // Tester si il n'y a pas de numéro dans le nom et le prénom
    if (creationCompteForm.value.nom && isNaN(creationCompteForm.value.nom)) {
      this.champsNom.style.borderLeft = 'none';
      document.getElementById('nomError').style.display = 'none';
      if (creationCompteForm.value.prenom && isNaN(creationCompteForm.value.prenom)) {
        this.champsPrenom.style.borderLeft = 'none';
        document.getElementById('prenomError').style.display = 'none';
        // Tester si une catégorie d'utilisateur a été selectionné
        if (creationCompteForm.value.categorieUtilisateur) {
          this.champsCatUser.style.borderLeft = 'none';
          document.getElementById('categorieError').style.display = 'none';
          if (creationCompteForm.value.email) {
            this.champsEmail.style.borderLeft = 'none';
            document.getElementById('emailError').style.display = 'none';
            if (this.existanceMail == false) {
              this.champsEmail.style.borderLeft = 'none';
              document.getElementById('emailError').style.display = 'none';
              // Tester si les mots de passe correspondes
              if (creationCompteForm.value.password) {
                this.champsMdp.style.borderLeft = 'none';
                this.champsConfirmed.style.borderLeft = 'none';
                document.getElementById('passwordError').style.display = 'none';
                document.getElementById('confirmedError').style.display = 'none';
                if (creationCompteForm.value.password === creationCompteForm.value.passwordConfirmed) {
                  this.champsConfirmed.style.borderLeft = 'none';
                  document.getElementById('confirmedError').style.display = 'none';
                  // Tester si les conditions d'utilisation sont acceptées
                  if (creationCompteForm.value.checkConditionsUtilisation) {
                    document.getElementById('checkError').style.display = 'none';
                    this.champsNom.style.borderLeft = 'solid 9px green';
                    this.champsPrenom.style.borderLeft = 'solid 9px green';
                    this.champsCatUser.style.borderLeft = 'solid 9px green';
                    this.champsEmail.style.borderLeft = 'solid 9px green';
                    this.champsMdp.style.borderLeft = 'solid 9px green';
                    this.champsConfirmed.style.borderLeft = 'solid 9px green';
                    this.nom = creationCompteForm.value.nom;
                    this.prenom = creationCompteForm.value.prenom;
                    this.mail = creationCompteForm.value.email;
                    this.mdp = creationCompteForm.value.password;
                    let idTypeUtilisateur;
                    if (creationCompteForm.value.categorieUtilisateur === 'Administrateur') {
                      idTypeUtilisateur = 1;
                    } else if (creationCompteForm.value.categorieUtilisateur === 'Bureau d\'études') {
                      idTypeUtilisateur = 3;
                    } else {
                      idTypeUtilisateur = 2;
                    }
                    this.typeUtilisateur = '/api/type_utilisateurs/' + idTypeUtilisateur;
                    this.user = new Utilisateur(this.nom, this.prenom, this.mail, this.mdp, this.typeUtilisateur);
                    if (await this.utilisateurService.addUtilisateur(this.user)) {
                      this.router.navigateByUrl('/connexion');
                    } else {
                      console.log('Importation échoué !');
                    }
                  } else {
                    document.getElementById('checkError').textContent = 'Veuillez accepter les conditions générales d\'utilisation !';
                    document.getElementById('checkError').style.display = 'block';
                  }
                } else {
                  this.champsConfirmed.style.borderLeft = 'solid 9px red';
                  document.getElementById('confirmedError').textContent = 'Veuillez renseigner le même mot de passe !';
                  document.getElementById('confirmedError').style.display = 'block';
                }
              } else {
                this.champsMdp.style.borderLeft = 'solid 9px red';
                this.champsConfirmed.style.borderLeft = 'solid 9px red';
                document.getElementById('passwordError').textContent = 'Veuillez renseigner un mot de passe !';
                document.getElementById('passwordError').style.display = 'block';
                document.getElementById('confirmedError').textContent = 'Veuillez renseigner un mot de passe !';
                document.getElementById('confirmedError').style.display = 'block';
              }
            } else {
              this.champsEmail.style.borderLeft = 'solid 9px red';
              document.getElementById('emailError').textContent = 'Cette adresse mail est déjà utilisée par un autre compte !';
              document.getElementById('emailError').style.display = 'block';
            }
          } else {
            this.champsEmail.style.borderLeft = 'solid 9px red';
            document.getElementById('emailError').textContent = 'Veuillez renseigner une adresse !';
            document.getElementById('emailError').style.display = 'block';
          }
        } else {
          this.champsCatUser.style.borderLeft = 'solid 9px red';
          document.getElementById('categorieError').textContent = 'Vous n\'avez pas sélectionné une catégorie d\'utilisateurs !';
          document.getElementById('categorieError').style.display = 'block';
        }
      } else {
        this.champsPrenom.style.borderLeft = 'solid 9px red';
        document.getElementById('prenomError').textContent = 'Veuillez renseigner un prenom correct ! (sans chiffre)';
        document.getElementById('prenomError').style.display = 'block';
      }
    } else {
      this.champsNom.style.borderLeft = 'solid 9px red';
      document.getElementById('nomError').textContent = 'Veuillez renseigner un nom correct ! (sans chiffre)';
      document.getElementById('nomError').style.display = 'block';
    }
  }
}
