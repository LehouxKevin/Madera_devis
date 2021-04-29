import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TypeRemplissage} from 'src/app/class/type-remplissage';
import {TypeRemplissageService} from 'src/app/services/type-remplissage.service';

@Component({
  selector: 'app-liste-types-remplissage',
  templateUrl: './liste-types-remplissage.component.html',
  styleUrls: ['./liste-types-remplissage.component.css']
})
export class ListeTypesRemplissageComponent implements OnInit, OnDestroy {

  tr: TypeRemplissage;

  public typesRemplissage: any[] = [];
  public typeRemplissage;

  constructor(private router: Router, private typeRemplissageService: TypeRemplissageService) {
  }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_typeRemplissage').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_typeRemplissage').style.color = '#1d2932';
    document.getElementById('bouton_typeRemplissage').setAttribute('onclick', 'return false');
    this.typeRemplissageService.getTypeRemplissages().pipe(
      map(typeRemplissage => typeRemplissage['hydra:member'])
    ).subscribe(
      typeRemplissage => this.typesRemplissage = typeRemplissage
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayTypeRemplissage() {
    console.log('Créer type remplissage !');
  }
}
