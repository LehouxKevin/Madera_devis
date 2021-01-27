import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-fournisseurs',
  templateUrl: './liste-fournisseurs.component.html',
  styleUrls: ['./liste-fournisseurs.component.css']
})
export class ListeFournisseursComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("icone_listeFournisseurs").style.borderLeft = "solid #BCE0FD 5px";
  }

  ngOnDestroy() {
    document.getElementById("icone_listeFournisseurs").style.borderLeft = "solid #BCE0FD 0px";
  }

}
