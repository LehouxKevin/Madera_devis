import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import { ChoixClientComponent } from 'src/app/components/choix-client/choix-client.component';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit, AfterViewInit {

  //@ViewChild(ChoixClientComponent) choixDevisComponent;
  
  isClientPageVisible:boolean = true;
  isDevisPageVisible:boolean = false;
  isModalitePageVisible:boolean = false;

  isAddClientPageVisible = "false";

  //isAddClientPageVisibleParent = this.choixDevisComponent.isAddClientPageVisible;
  
  currentPage = "client";

  constructor() { }

  ngOnInit(): void {
    //this.el.hide;
    //this.isClientVisible = true; 
    //this.cercleDevis.nativeElement.style.display='none';
    //this.cercleModalite.nativeElement.style.visibility='hidden';
    
  }

  ngAfterViewInit():void {
    //this.cercleClient.nativeElement.style.visibility='hidden';
    //this.cercleDevis.nativeElement.style.visibility='hidden';
    
  }

  

  receiveAddClientVisibilityStateChanging($event) {
    this.isAddClientPageVisible = $event;
    console.log(this.isAddClientPageVisible);
    if(this.isAddClientPageVisible == "true")
    {
      this.isDevisPageVisible = false;
      this.isClientPageVisible = false;
    }
  }

  handleNextStepButton():void {
    if(this.currentPage == "client")
    {
      this.isDevisPageVisible = true;
      this.isClientPageVisible = false;
      //console.log(this.choixDevisComponent.isAddClientPageVisible);
      console.log(this.isAddClientPageVisible);
    }
  }
  

}
