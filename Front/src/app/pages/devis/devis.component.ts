import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  @ViewChild('grandCercleClient') cercleClient:ElementRef;
  @ViewChild('grandCercleDevis') cercleDevis:ElementRef;
  @ViewChild('grandCercleModalite') cercleModalite:ElementRef;
  
  isClientVisible = true;
  isDevisVisible = true;
  isModaliteVisible = true;

  constructor() { }

  ngOnInit(): void {
    //this.el.hide;
    //this.isClientVisible = true; 
    //this.cercleDevis.nativeElement.style.display='none';
    this.cercleClient.nativeElement.style.visibility='hidden';
    this.cercleDevis.nativeElement.style.visibility='hidden';
    //this.cercleModalite.nativeElement.style.visibility='hidden';
  }

}
