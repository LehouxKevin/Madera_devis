import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-liste-gamme-page',
  templateUrl: './liste-gamme-page.component.html',
  styleUrls: ['./liste-gamme-page.component.css']
})
export class ListeGammePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('icone_listeGamme').style.borderLeft = 'solid #BCE0FD 5px';
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    document.getElementById('icone_listeGamme').style.borderLeft = 'solid #BCE0FD 0px';
  }

}
