import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {isEmpty, map} from 'rxjs/operators';
import {UtilisateurService} from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit, OnDestroy {

  public utilisateurs: any[] = [];
  public utilisateur;

  constructor(private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().pipe(
      map(utilisateur => utilisateur['hydra:member'])
    ).subscribe(
      utilisateur => this.utilisateurs = utilisateur
    );
    // Ajout de la bordure gauche bleue claire sur l'icône de profil de la sidebar
    document.getElementById('icone_profil').style.borderLeft = 'solid #BCE0FD 5px';
  }

  // S'exécute quand l'on change de page
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    // Suppression de la bordure gauche bleue claire sur l'icône de profil de la sidebar
    document.getElementById('icone_profil').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  onSubmit(connexionForm: NgForm) {
    if (connexionForm.value.email) {
      document.getElementById('email').style.borderLeft = 'none';
      document.getElementById('emailError').style.display = 'none';
      if (connexionForm.value.password) {
        document.getElementById('password').style.borderLeft = 'none';
        document.getElementById('passwordError').style.display = 'none';
        this.utilisateurs.forEach((utilisateur, index) => {
          if (utilisateur.mail === connexionForm.value.email) {
            if (utilisateur.mdp === connexionForm.value.password) {
              // Création du tokken
              const setTokken = {statut: 'connecte', objet: utilisateur.id};
              localStorage.setItem('tokken', JSON.stringify(setTokken));
              document.getElementById('conditionError').style.display = 'none';
              document.location.href = '/accueil';
            } else {
              document.getElementById('conditionError').textContent = 'Connexion impossible, le mot de passe ou l\'e-mail est incorrect !';
              document.getElementById('conditionError').style.display = 'block';
              document.getElementById('email').style.borderLeft = 'solid red 9px';
              document.getElementById('password').style.borderLeft = 'solid red 9px';
            }
          }
        });
      } else {
        document.getElementById('passwordError').textContent = 'Veuillez renseigner un mot de passe !';
        document.getElementById('passwordError').style.display = 'block';
        document.getElementById('password').style.borderLeft = 'solid red 9px';
      }
    } else {
      document.getElementById('emailError').textContent = 'Veuillez renseigner une adresse mail !';
      document.getElementById('emailError').style.display = 'block';
      document.getElementById('email').style.borderLeft = 'solid red 9px';
    }
  }
}
