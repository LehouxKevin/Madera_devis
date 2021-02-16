import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';

@Component({
  selector: 'app-liste-finitions-exterieures',
  templateUrl: './liste-finitions-exterieures.component.html',
  styleUrls: ['./liste-finitions-exterieures.component.css']
})
export class ListeFinitionsExterieuresComponent implements OnInit, OnDestroy {

  fe:FinitionExterieur;

  public finitionsExterieures:any[] = [];
  public finitionExterieure;

  public display:boolean = true;

  constructor(private router:Router, private finitionExterieureService: FinitionExterieurService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_finitionExterieure").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_finitionExterieure").style.color = "#1d2932";
    document.getElementById("lien_finitionExterieure").setAttribute("onclick","return false");
    this.finitionExterieureService.getFinitionExterieurs().pipe(
      map(finitionExterieure => finitionExterieure['hydra:member'])
    ).subscribe(
      finitionExterieure => this.finitionsExterieures = finitionExterieure
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayFinitionExterieure() {
    console.log("Créer finition extérieure !");
  }
}
