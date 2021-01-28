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
  }

  ngOnDestroy() {
    document.getElementById("icone_listeFournisseurs").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayFournisseur():void {
    if (this.display) {
      document.getElementById("displayList").style.display = "none";
      document.getElementById("displayCreate").style.display = "block";
      document.getElementById("boutonFournisseur").setAttribute("src", 'assets\\icones\\displayList.svg');
      document.getElementById("grand-titre").textContent = "Création d'un fournisseur"
      document.getElementById("content").style.paddingLeft = "15rem";
      document.getElementById("content").style.paddingRight = "15rem";
      document.getElementById("listeFournisseurs").style.paddingTop = "12rem";
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
      this.display = true;
    }
  }

  async onSubmit(creationFournisseurForm: NgForm) {
   if (creationFournisseurForm.value.nom && isNaN(creationFournisseurForm.value.nom)) {
    this.champsNom.style.borderLeft = "none";
    document.getElementById('nomError').style.display = "none";
    if (creationFournisseurForm.value.telephone && !isNaN(creationFournisseurForm.value.telephone) && creationFournisseurForm.value.telephone.length == 10) {
      this.champsTel.style.borderLeft = "none";
      document.getElementById('telephoneError').style.display = "none";
      if (creationFournisseurForm.value.email && creationFournisseurForm.value.email.indexOf("@") != -1) {
        this.champsMail.style.borderLeft = "none";
        document.getElementById('emailError').style.display = "none";

        this.nom = creationFournisseurForm.value.nom;
        this.telephone = creationFournisseurForm.value.telephone;
        this.mail = creationFournisseurForm.value.email;
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
}