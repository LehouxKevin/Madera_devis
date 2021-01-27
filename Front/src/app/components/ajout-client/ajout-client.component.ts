import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/class/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit {

  client:Client;

  nom:string = "";
  prenom:string = "";
  adresse:string = "";
  telephone:string = "";
  mail:string = "";

  // true par défaut pour ne pas que les messages d'erreurs s'affichent à l'arriver sur la page. Dès le submit les vérifications sont faites donc les 
  // champs qui ne sont pas remplis correctement passent bien à false et l'affichage s'actualise.
  isNomValide:boolean=true;
  isPrenomValide:boolean=true;
  isAdresseValide:boolean=true;
  isTelephoneValide:boolean=true;
  isMailValide:boolean=true;

  isLoading:boolean = false;

  @Output() addClientChangingState = new EventEmitter<string>();
  

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  async onSubmit(ajoutClient: NgForm) {
    
    console.warn(ajoutClient.value);
    this.nom = ajoutClient.value.nom;
    this.prenom = ajoutClient.value.prenom;
    this.adresse = ajoutClient.value.adresse;
    this.telephone = ajoutClient.value.telephone;
    this.mail = ajoutClient.value.mail;

    this.nom.length <= 0 || this.nom == null ? this.isNomValide = false : this.isNomValide = true;
    this.prenom.length <= 0 || this.prenom == null ? this.isPrenomValide = false : this.isPrenomValide = true;
    this.adresse.length <= 0 || this.adresse == null ? this.isAdresseValide = false : this.isAdresseValide = true;
    this.telephone.length <= 0 || this.telephone == null ? this.isTelephoneValide = false : this.isTelephoneValide = true;
    this.mail.length <= 0 || this.mail == null ? this.isMailValide = false : this.isMailValide = true; // and if mail contain @

    if(this.isNomValide && this.isPrenomValide && this.isAdresseValide && this.isTelephoneValide && this.isMailValide)
    {
      this.isLoading = true;
      console.log("Tout les champs sont correctement remplis");
      this.client = new Client(this.nom,this.prenom,this.adresse,this.telephone,this.mail);
      console.log(this.client);
      if(await this.clientService.addClient(this.client))
      {
        this.isLoading = false;
        this.addClientChangingState.emit("addClientCacher");
      }
      else { // afficher erreur
        this.isLoading = false;
        console.log("non");
      }
    }
    
  }

}
