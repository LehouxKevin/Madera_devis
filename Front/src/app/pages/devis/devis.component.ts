import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit, AfterViewInit {

  isClientPageVisible:boolean = true;
  isDevisPageVisible:boolean = false;
  isModalitePageVisible:boolean = false;

  isAddClientPageVisible = "addClientCacher";

  
  currentPage = "client";

  constructor() { }

  ngOnInit(): void {

    
  }

  ngAfterViewInit():void {
    //this.cercleClient.nativeElement.style.visibility='hidden';
    //this.cercleDevis.nativeElement.style.visibility='hidden';
    
  }

  
  /**
   * Reçoit l'évènement de changement d'état du composant d'ajout de client. Masque tout les composants et actualise la valeur de l'état de la page d'ajout de client.
   * La vue affiche ensuite automatiquement le composant ajout client étant donné que ce composant est bind avec la valeur "isAddClientPageVisible"
   * @param $event 
   */
  receiveAddClientVisibilityStateChanging($event) {
    this.isAddClientPageVisible = $event;
    console.log(this.isAddClientPageVisible);
    if(this.isAddClientPageVisible == "addClientVisible")
    {
      this.isDevisPageVisible = false;
      this.isClientPageVisible = false;
      this.isModalitePageVisible = false;
    }
    else {
      if(this.isAddClientPageVisible == "addClientCacher")
      {
        this.isDevisPageVisible = false;
        this.isClientPageVisible = true;
        this.isModalitePageVisible = false;
      }
    }
  }

  handleNextStepButton():void {
    if(this.currentPage == "client")
    {
      this.isDevisPageVisible = true;
      this.isClientPageVisible = false;
      this.isModalitePageVisible = false;
      this.currentPage="devis";
    }
    else {
      if(this.currentPage == "devis")
      {
        this.isDevisPageVisible = false;
        this.isClientPageVisible = false;
        this.isModalitePageVisible = true;
        this.currentPage="modalite";
      }
    }
  }
  

}
