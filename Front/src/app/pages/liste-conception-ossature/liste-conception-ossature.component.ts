import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';

@Component({
  selector: 'app-liste-conception-ossature',
  templateUrl: './liste-conception-ossature.component.html',
  styleUrls: ['./liste-conception-ossature.component.css']
})
export class ListeConceptionOssatureComponent implements OnInit, OnDestroy {

  co:ConceptionOssature;

  public conceptionsOssatures:any[] = [];
  public conceptionOssature;

  constructor(private router:Router, private conceptionOssatureService: ConceptionOssatureService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_conceptionOssature").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_conceptionOssature").style.color = "#1d2932";
    document.getElementById("bouton_conceptionOssature").setAttribute("onclick","return false");
    this.conceptionOssatureService.getConceptionOssatures().pipe(
      map(conceptionOssature => conceptionOssature['hydra:member'])
    ).subscribe(
      conceptionOssature => this.conceptionsOssatures = conceptionOssature
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayConceptionOssature() {
    console.log("Créer conception ossature !");
  }
}
