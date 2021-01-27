import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistiques-commerciales',
  templateUrl: './statistiques-commerciales.component.html',
  styleUrls: ['./statistiques-commerciales.component.css']
})
export class StatistiquesCommercialesComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  document.getElementById("icone_statistiquesCommercial").style.borderLeft = "solid #BCE0FD 5px";
  }

  ngOnDestroy() {
    document.getElementById("icone_statistiquesCommercial").style.borderLeft = "solid #BCE0FD 0px";
  }

}
