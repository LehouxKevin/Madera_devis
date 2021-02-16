import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CoupeDePrincipes } from 'src/app/class/coupe-de-principes';
import { CoupeDePrincipeService } from 'src/app/services/coupe-de-principe.service';

@Component({
  selector: 'app-liste-coupes-de-principe',
  templateUrl: './liste-coupes-de-principe.component.html',
  styleUrls: ['./liste-coupes-de-principe.component.css']
})
export class ListeCoupesDePrincipeComponent implements OnInit, OnDestroy {

  cdp:CoupeDePrincipes;

  public coupesDePrincipe:any[] = [];
  public coupeDePrincipe;

  constructor(private router:Router, private coupeDePrincipeService: CoupeDePrincipeService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_coupeDePrincipe").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_coupeDePrincipe").style.color = "#1d2932";
    document.getElementById("bouton_coupeDePrincipe").setAttribute("onclick","return false");
    this.coupeDePrincipeService.getCoupeDePrincipes().pipe(
      map(coupeDePrincipe => coupeDePrincipe['hydra:member'])
    ).subscribe(
      coupeDePrincipe => this.coupesDePrincipe = coupeDePrincipe
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayCoupeDePrincipe() {
    console.log("Créer coupe de principe !");
  }
}
