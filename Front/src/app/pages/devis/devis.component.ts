import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit, AfterViewInit {

  @ViewChild('grandCercleClient') cercleClient:ElementRef;
  @ViewChild('grandCercleDevis') cercleDevis:ElementRef;
  @ViewChild('grandCercleModalite') cercleModalite:ElementRef;
  
  isClientPageVisible:boolean = true;
  isDevisPageVisible:boolean = false;
  isModalitePageVisible:boolean = false;
  
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

  handleNextStepButton():void {
    if(this.currentPage == "client")
    {
      this.isDevisPageVisible = true;
      this.isClientPageVisible = false;
    }
  }
  

}
