import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeIsolation} from 'src/app/class/type-isolation';
import {TypeIsolationService} from 'src/app/services/type-isolation.service';

@Component({
  selector: 'app-liste-types-isolation',
  templateUrl: './liste-types-isolation.component.html',
  styleUrls: ['./liste-types-isolation.component.css']
})
export class ListeTypesIsolationComponent implements OnInit, OnDestroy {

  ti: TypeIsolation;

  public typesIsolation: any[] = [];
  public typeIsolation;

  constructor(private router: Router, private typeIsolationService: TypeIsolationService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeIsolation').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeIsolation').style.color = '#1d2932';
    document.getElementById('bouton_typeIsolation').setAttribute('onclick', 'return false');
    this.typeIsolationService.getTypeIsolations().pipe(
      map(typeIsolation => typeIsolation['hydra:member'])
    ).subscribe(
      typeIsolation => this.typesIsolation = typeIsolation
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeIsolation() {
    console.log('Créer un type d\'isolation !');
  }
}
