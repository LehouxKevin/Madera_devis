import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeCouvertureService } from 'src/app/services/type-couverture.service';

@Component({
  selector: 'app-liste-types-couverture',
  templateUrl: './liste-types-couverture.component.html',
  styleUrls: ['./liste-types-couverture.component.css']
})
export class ListeTypesCouvertureComponent implements OnInit, OnDestroy {

  tc:TypeCouverture;

  public typesCouverture:any[] = [];
  public typeCouverture;

  constructor(private router: Router, private typeCouvertureService: TypeCouvertureService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_typeCouverture").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_typeCouverture").style.color = "#1d2932";
    document.getElementById("bouton_typeCouverture").setAttribute("onclick","return false");
    this.typeCouvertureService.getTypeCouvertures().pipe(
      map(typeCouverture => typeCouverture['hydra:member'])
    ).subscribe(
      typeCouverture => this.typesCouverture = typeCouverture
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayTypeCouverture()
  {
    console.log("Créer un type de couverture !")
  }
}
