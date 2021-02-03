import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Fournisseur } from 'src/app/class/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-liste-fournisseurs',
  templateUrl: './liste-fournisseurs.component.html',
  styleUrls: ['./liste-fournisseurs.component.css']
})
export class ListeFournisseursComponent implements OnInit, OnDestroy {

  four:Fournisseur;

  public fournisseurs:any[] = [];
  public fournisseur;

  public display:boolean = true;

  public champsNom;
  public champsTel;
  public champsMail;

  nom:string = "";
  telephone:string = "";
  mail:string = "";

  public idFournisseur;
  public ancienIdFournisseur;
  public nomFournisseur;

  constructor(private router: Router, private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeFournisseurs").style.borderLeft = "solid #BCE0FD 5px";
    this.fournisseurService.getFournisseurs().pipe(
      map(fournisseur => fournisseur['hydra:member'])
    ).subscribe(
      fournisseur => this.fournisseurs = fournisseur
    );
    this.champsNom = document.getElementById("nom");
    this.champsTel = document.getElementById("telephone");
    this.champsMail = document.getElementById("email");
    this.idFournisseur = 0;
    this.nomFournisseur = "";
    this.ancienIdFournisseur = 0;
  }

  ngOnDestroy() {
    document.getElementById("icone_listeFournisseurs").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayFournisseur():void {
    if (this.display) {
      document.getElementById("displayList").style.display = "none";
      document.getElementById("displayCreate").style.display = "block";
      document.getElementById("boutonFournisseur").setAttribute("src", 'assets\\icones\\displayList.svg');
      document.getElementById("grand-titre").textContent = "Création d'un fournisseur";
      document.getElementById("content").style.paddingLeft = "15rem";
      document.getElementById("content").style.paddingRight = "15rem";
      document.getElementById("listeFournisseurs").style.paddingTop = "12rem";
      document.getElementById("titrefournisseur").style.display = "none";
      document.getElementById("displayUpdate").style.display = "none";
      if (this.idFournisseur != 0) {
        document.getElementById("deleteWindow").style.display = "none";
        document.getElementById("id_fournisseur"+this.idFournisseur).style.border = "0";
        this.idFournisseur = 0;
      }
      this.display = false;
    }
    else {
      document.getElementById("displayCreate").style.display = "none";
      document.getElementById("displayList").style.display = "block";
      document.getElementById("boutonFournisseur").setAttribute("src", "assets\\icones\\displayCreate.svg");
      document.getElementById("grand-titre").textContent = "Liste des fournisseurs";
      document.getElementById("content").style.paddingLeft = "3rem";
      document.getElementById("content").style.paddingRight = "3rem";
      document.getElementById("listeFournisseurs").style.paddingTop = "2rem";
      document.getElementById("titrefournisseur").style.display = "none";
      document.getElementById("displayUpdate").style.display = "none";
      this.display = true;
    }
  }

  async onSubmit(FournisseurForm: NgForm, typeForm:boolean) {
    this.champsNom = document.getElementById("nom");
    this.champsTel = document.getElementById("telephone");
    this.champsMail = document.getElementById("email");
    if (typeForm) {
        if (FournisseurForm.value.nom && isNaN(FournisseurForm.value.nom)) {
          this.champsNom.style.borderLeft = "none";
          document.getElementById('nomError').style.display = "none";
          if (FournisseurForm.value.telephone && !isNaN(FournisseurForm.value.telephone) && FournisseurForm.value.telephone.length == 10) {
            this.champsTel.style.borderLeft = "none";
            document.getElementById('telephoneError').style.display = "none";
            if (FournisseurForm.value.email && FournisseurForm.value.email.indexOf("@") != -1 && FournisseurForm.value.email.indexOf(".") != -1) {
              this.champsMail.style.borderLeft = "none";
              document.getElementById('emailError').style.display = "none";

              this.nom = FournisseurForm.value.nom;
              this.telephone = FournisseurForm.value.telephone;
              this.mail = FournisseurForm.value.email;
              this.four = new Fournisseur(this.nom, this.telephone, this.mail);
              if(await this.fournisseurService.addFournisseur(this.four))
              {
                this.displayFournisseur();
                this.ngOnInit();
              }
              else {
                console.log("Importation échoué !");
              }
            }
            else {
              this.champsMail.style.borderLeft = "solid red 9px";
              document.getElementById('emailError').textContent = "Veuillez renseigner un e-mail valide ! (exemple : madera@contact.fr)";
              document.getElementById('emailError').style.display = "block";
            }
          }
          else {
            this.champsTel.style.borderLeft = "solid red 9px";
            document.getElementById('telephoneError').textContent = "Veuillez renseigner un numéro de téléphone valide ! (exemple : 0102030405)";
            document.getElementById('telephoneError').style.display = "block";
          }
        }
        else {
          this.champsNom.style.borderLeft = "solid red 9px";
          document.getElementById('nomError').textContent = "Veuillez renseigner un nom valide ! (sans chiffre)";
          document.getElementById('nomError').style.display = "block";
        }
      }
      else {
        this.nom = document.getElementById("nomUpdate").getAttribute("placeholder");
        this.telephone = document.getElementById("telephoneUpdate").getAttribute("placeholder");
        this.mail = document.getElementById("emailUpdate").getAttribute("placeholder");

        this.champsNom = document.getElementById("nomUpdate");
        this.champsTel = document.getElementById("telephoneUpdate");
        this.champsMail = document.getElementById("emailUpdate");

        this.champsNom.style.borderLeft = "0";
        document.getElementById('nomUpdateError').style.display = "none";
        this.champsTel.style.borderLeft = "0";
        document.getElementById('telephoneUpdateError').style.display = "none";
        this.champsMail.style.borderLeft = "0";
        document.getElementById('emailUpdateError').style.display = "none";

        if (FournisseurForm.value.nom) {
          if (isNaN(FournisseurForm.value.nom)) {
            this.nom = FournisseurForm.value.nom;
          }
          else {
            this.champsNom.style.borderLeft = "solid red 9px";
            document.getElementById('nomUpdateError').textContent = "Veuillez renseigner un nom valide ! (sans chiffre)";
            document.getElementById('nomUpdateError').style.display = "block";
          }
        } 

        if(FournisseurForm.value.telephone) {
          if (!isNaN(FournisseurForm.value.telephone) && FournisseurForm.value.telephone.length == 10) {
            this.telephone = FournisseurForm.value.telephone;
          }
          else {
            this.champsTel.style.borderLeft = "solid red 9px";
            document.getElementById('telephoneUpdateError').textContent = "Veuillez renseigner un numéro de téléphone valide ! (exemple : 0102030405)";
            document.getElementById('telephoneUpdateError').style.display = "block";
          }
        }

        if(FournisseurForm.value.email) {
          if (FournisseurForm.value.email.indexOf("@") != -1 && FournisseurForm.value.email.indexOf(".") != -1) {
            this.mail = FournisseurForm.value.email;
          }
          else {
            this.champsMail.style.borderLeft = "solid red 9px";
            document.getElementById('emailUpdateError').textContent = "Veuillez renseigner un e-mail valide ! (exemple : madera@contact.fr)";
            document.getElementById('emailUpdateError').style.display = "block";
          }
        }

      // Modifier le fournisseur en question (KEVIN LEHOUX)

      /*// L'ID du fournisseur modifié :
        this.fournisseur.id
      */

      /*// Les champs modifiés du formulaire :
        this.nom
        this.telephone
        this.mail
      */
        this.fournisseur.nom !== this.nom ? this.fournisseur.nom = this.nom : 0;
        this.fournisseur.telephone !== this.telephone ? this.fournisseur.telephone = this.telephone : 0;
        this.fournisseur.email !== this.mail ? this.fournisseur.email = this.mail : 0;        
        this.fournisseurService.syncUpdateFournisseur(this.fournisseur);
      /*// À mettre quand le fournisseur à été modifié :
        document.getElementById("titrefournisseur").style.display = "none";
        this.champsNom.style.borderLeft = "solid green 9px";
        this.champsTel.style.borderLeft = "solid green 9px";
        this.champsMail.style.borderLeft = "solid green 9px";
        this.displayFournisseur();
        this.ngOnInit();
      */
    }
  }

  consulterFounisseur(id:number):void {
    console.log("Consulter utilisateur : "+id);
  }

  modifierFournisseur(id:number):void {
    this.fournisseurs.forEach( (fournisseur, index) => {
      if (fournisseur.id == id) {
        this.fournisseur = fournisseur;
      }
    });
    document.getElementById("displayList").style.display = "none";
    document.getElementById("boutonFournisseur").setAttribute("src", 'assets\\icones\\displayList.svg');
    document.getElementById("grand-titre").textContent = "Modification du fournisseur :";
    document.getElementById("titrefournisseur").textContent = this.fournisseur.nom;
    document.getElementById("titrefournisseur").style.display = "block";
    document.getElementById("content").style.paddingLeft = "15rem";
    document.getElementById("content").style.paddingRight = "15rem";
    document.getElementById("listeFournisseurs").style.paddingTop = "12rem";
    document.getElementById("nomUpdate").setAttribute("placeholder", this.fournisseur.nom);
    document.getElementById("telephoneUpdate").setAttribute("placeholder", this.fournisseur.telephone);
    document.getElementById("emailUpdate").setAttribute("placeholder", this.fournisseur.email);

    if (this.idFournisseur != 0) {
      document.getElementById("deleteWindow").style.display = "none";
      document.getElementById("id_fournisseur"+this.idFournisseur).style.border = "0";
      this.idFournisseur = 0;
    }
    this.display = false;
    document.getElementById("displayList").style.display = "none";
    document.getElementById("displayUpdate").style.display = "block";
  }

  supprimerFounisseur(id:number):void {
    if (this.idFournisseur != 0) {
      if (this.ancienIdFournisseur != this.idFournisseur) {
        this.ancienIdFournisseur = this.idFournisseur;
        document.getElementById("id_fournisseur"+this.ancienIdFournisseur).style.border = "0";
      }
    }
    this.idFournisseur = id;
    this.fournisseurs.forEach( (fournisseur, index) => {
      if (fournisseur.id == this.idFournisseur) {
        this.nomFournisseur = fournisseur.nom;
      }
    });
    document.getElementById("id_fournisseur"+id).style.border = "solid #2699FB 6px";
    document.getElementById("fournisseurDelete").textContent = this.nomFournisseur;
    document.getElementById("deleteWindow").style.display = "block";
  }

  confirmerSuppressionFounisseur():void {
    //Supprimer le fournisseur en question (KEVIN LEHOUX)
    this.fournisseurService.asyncDeleteFournisseur(this.idFournisseur);
    console.log("Suppression de "+this.idFournisseur);
    document.getElementById("deleteWindow").style.display = "none";
    this.ngOnInit();
  }

  annulerSuppressionFounisseur():void {
    document.getElementById("id_fournisseur"+this.idFournisseur).style.border = "0";
    this.idFournisseur = 0;
    document.getElementById("deleteWindow").style.display = "none";
  }
}