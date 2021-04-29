import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';

@Component({
  selector: 'app-liste-qualites-huisseries',
  templateUrl: './liste-qualites-huisseries.component.html',
  styleUrls: ['./liste-qualites-huisseries.component.css']
})
export class ListeQualitesHuisseriesComponent implements OnInit, OnDestroy {

  qu: QualiteHuisseries;

  public qualitesHuisseries: any[] = [];
  public qualiteHuisserie;

  constructor(private router: Router, private qualiteHuisserieService: QualiteHuisseriesService) { }

  ngOnInit(): void {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 5px';
    document.getElementById('bouton_qualiteHuisserie').style.border = 'solid 2px #1d2932';
    document.getElementById('bouton_qualiteHuisserie').style.color = '#1d2932';
    document.getElementById('bouton_qualiteHuisserie').setAttribute('onclick', 'return false');
    this.qualiteHuisserieService.getQualiteHuisseries().pipe(
      map(qualiteHuisserie => qualiteHuisserie['hydra:member'])
    ).subscribe(
      qualiteHuisserie => this.qualitesHuisseries = qualiteHuisserie
    );
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    document.getElementById('icone_listeParametres').style.borderLeft = 'solid #BCE0FD 0px';
  }

  // tslint:disable-next-line:typedef
  displayQualiteHuisserie()
  {
    console.log('Créer une qualité huisserie !');
  }
}
