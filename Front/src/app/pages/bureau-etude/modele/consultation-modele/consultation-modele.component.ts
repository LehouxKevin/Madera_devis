import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter, Output  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';
import { Etage } from 'src/app/class/Etage';
import {TypeRemplissage  } from 'src/app/class/type-remplissage';
import {  CoupeDePrincipes } from 'src/app/class/coupe-de-principes';

import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { EtageService } from 'src/app/services/etage.service';
import { GammeService } from 'src/app/services/gamme.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TypeRemplissageService } from 'src/app/services/type-remplissage.service';
import { CoupeDePrincipeService } from 'src/app/services/coupe-de-principe.service';
import { filter, map, finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-consultation-modele',
  templateUrl: './consultation-modele.component.html',
  styleUrls: ['./consultation-modele.component.css']
})
export class ConsultationModeleComponent implements OnInit {


  public Modele;
  public gamme ;
  public etages: Etage[] = [];
  public coupeDePrincipes;
  public typeRemplissages;

  public NomModele = '------';
  public NomGamme = '------';
  public nbetage = '------';
  public coupeDePrincipesvalue = '------';
  public typeRemplissagesvalue = '------';

  DisplaylisteGamme = false;

  public idGamme = '0';
  public idModele = '0';

   private sub: any;

  constructor(
    private modeleService: ModeleService,
    private gammeService: GammeService,
    private etageService: EtageService,
    private typeRemplissageService: TypeRemplissageService,
    private coupeDePrincipeService: CoupeDePrincipeService,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.idModele = this.route.snapshot.paramMap.get('idModele');
    this.InitialiserGamme() ;
 }

  // tslint:disable-next-line:typedef
  async InitialiserGamme() {

    this.Modele  =  await this.modeleService.getOneModeleById(this.idModele);
    console.log( this.Modele);
    this.NomModele = this.Modele.libelle;

    this.idGamme = this.Modele.gamme.substring('/api/gammes/'.length);

    this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
    this.NomGamme = this.gamme.libelle;

    this.typeRemplissages =
      await this.typeRemplissageService.getOneTypeRemplissageByICleEtrangere(this.Modele.typeRemplissage.substring(4));
    this.typeRemplissagesvalue = this.typeRemplissages.libelle;

    this.coupeDePrincipes  =
      await this.coupeDePrincipeService.getOneCoupeDePrincipeByICleEtrangere(this.Modele.coupeDePrincipe.substring(4));
    this.coupeDePrincipesvalue = this.coupeDePrincipes.libelle;

    this.etageService.getEtages().pipe(
        finalize(() => this.etages = this.etages.filter(etage => etage.modele === '/api/modeles/' + this.idModele)
        ) , map(etage => etage['hydra:member'])
      ).subscribe(etage => this.etages = etage);

  }
}
