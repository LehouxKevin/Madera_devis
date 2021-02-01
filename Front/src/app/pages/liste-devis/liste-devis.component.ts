import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-liste-devis',
  templateUrl: './liste-devis.component.html',
  styleUrls: ['./liste-devis.component.css']
})
export class ListeDevisComponent implements OnInit, OnDestroy {

  public listDevis:any[] = [];
  public devis;

  constructor(private router: Router, private devisService: DevisService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 5px";
    this.devisService.getDevis().pipe(
      map(devis => devis['hydra:member'])
    ).subscribe(
      devis => this.listDevis = devis
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 0px";
  }
}
