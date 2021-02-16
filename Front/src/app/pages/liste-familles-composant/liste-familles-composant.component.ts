import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FamilleComposant } from 'src/app/class/famille-composant';
import { FamilleComposantService } from 'src/app/services/famille-composant.service';

@Component({
  selector: 'app-liste-familles-composant',
  templateUrl: './liste-familles-composant.component.html',
  styleUrls: ['./liste-familles-composant.component.css']
})
export class ListeFamillesComposantComponent implements OnInit, OnDestroy {

  fc:FamilleComposant;

  public famillesComposant:any[] = [];
  public familleComposant;

  constructor(private router:Router, private familleComposantService:FamilleComposantService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_familleComposant").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_familleComposant").style.color = "#1d2932";
    document.getElementById("bouton_familleComposant").setAttribute("onclick","return false");
    this.familleComposantService.getFamillesComposant().pipe(
      map(familleComposant => familleComposant['hydra:member'])
    ).subscribe(
      familleComposant => this.famillesComposant = familleComposant
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayFamilleComposant()
  {
    console.log("Créer une famille de composant !");
  }
}
