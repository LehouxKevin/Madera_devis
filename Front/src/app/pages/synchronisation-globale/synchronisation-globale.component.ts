import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-synchronisation-globale',
  templateUrl: './synchronisation-globale.component.html',
  styleUrls: ['./synchronisation-globale.component.css']
})
export class SynchronisationGlobaleComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    document.getElementById('icone_synchronisation').style.borderLeft = 'solid #BCE0FD 5px';
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_synchronisation').style.borderLeft = 'solid #BCE0FD 0px';
  }

}
