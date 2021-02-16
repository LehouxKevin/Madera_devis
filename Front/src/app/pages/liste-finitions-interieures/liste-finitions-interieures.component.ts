import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FinitionInterieur } from 'src/app/class/finition-interieur';
import { FinitionInterieurService } from 'src/app/services/finition-interieur.service';

@Component({
  selector: 'app-liste-finitions-interieures',
  templateUrl: './liste-finitions-interieures.component.html',
  styleUrls: ['./liste-finitions-interieures.component.css']
})
export class ListeFinitionsInterieuresComponent implements OnInit {

  fi:FinitionInterieur;

  public finitionsInterieures:any[] = [];
  public finitionInterieure;

  constructor(private router:Router, private finitionInterieureService: FinitionInterieurService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_finitionInterieure").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_finitionInterieure").style.color = "#1d2932";
    document.getElementById("lien_finitionInterieure").setAttribute("onclick","return false");
    this.finitionInterieureService.GetFinitionsInterieur().pipe(
      map(finitionInterieure => finitionInterieure['hydra:member'])
    ).subscribe(
      finitionInterieure => this.finitionsInterieures = finitionInterieure
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayFinitionInterieure() {
    console.log("Créer finition intérirueure !");
  }
}
