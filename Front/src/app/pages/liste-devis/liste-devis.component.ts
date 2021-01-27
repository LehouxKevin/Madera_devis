import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-devis',
  templateUrl: './liste-devis.component.html',
  styleUrls: ['./liste-devis.component.css']
})
export class ListeDevisComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 5px";
  }

  ngOnDestroy() {
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 0px";
  }

}
