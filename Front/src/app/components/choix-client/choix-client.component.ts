import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/class/client';
import { environment } from 'src/environments/environment';
import { ClientService } from 'src/app/services/client.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-choix-client',
  templateUrl: './choix-client.component.html',
  styleUrls: ['./choix-client.component.css']
})
export class ChoixClientComponent implements OnInit, AfterViewInit {

  public clients:Client[] = [];
  public infosClient;

  // Définition des variables des champs de la fiche client
  public prenomClient = "";
  public nomClient = "";
  public adresseClient ="";
  public telephoneClient = "";
  public mailClient = "";

  // Etat de la visibilité du composant d'ajout de client
  isAddClientPageVisible:string = "false";
  @Output() addClientChangingState = new EventEmitter<string>();

  constructor(private clientService: ClientService) { }

  ngOnInit(): void { 
    this.clientService.getClients().pipe(
      map(client => client['hydra:member'])
    ).subscribe(
      client => this.clients = client 
    );
  }

  ngAfterViewInit():void {
    console.log(this.clients);
  }

  async handleChoixClient(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var identiteClientSelectionnee = target.attributes.var;
    var value = idAttr.nodeValue;
    var idBdd = value.substring(8);
    console.log(idBdd);
    console.log(identiteClientSelectionnee);

    this.infosClient  = await this.clientService.getOneClientById(idBdd);
    console.log(this.infosClient);
    this.prenomClient = this.infosClient.prenom;
    this.nomClient = this.infosClient.nom;
    this.adresseClient = this.infosClient.adresse;
    this.telephoneClient = this.infosClient.telephone;
    this.mailClient = this.infosClient.mail;

  }

  /**
   * Handler du clique sur le bouton d'ajout d'un client. Elle passe l'état d'affichage du composant d'ajout de client à true et le transmet
   * au parent pour qu'il affiche le bon composant et masque les autres
   */
  handleClickAddClient():void {
    this.isAddClientPageVisible = "true";
    this.addClientChangingState.emit(this.isAddClientPageVisible);
  }
  
}

