import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { Module } from 'src/app/class/Module';
import { Modele } from 'src/app/class/Modele';

import { environment } from 'src/environments/environment';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';
import { TypeCouvertureService } from 'src/app/services/type-couverture.service';
import { TypeIsolationService } from 'src/app/services/type-isolation.service';
import { ModuleService } from 'src/app/services/module.service';
import { ModeleService } from 'src/app/services/modele.service';

import { map } from 'rxjs/operators';
import {  Input } from '@angular/core';


@Component({
  selector: 'app-creation-gamme',
  templateUrl: './creation-gamme.component.html',
  styleUrls: ['./creation-gamme.component.css']
})
export class CreationGammeComponent implements OnInit {
 public conceptionOssatures:ConceptionOssature[] = [];
 public FinitionExterieurs:FinitionExterieur[] = [];
  public QualiteHuisseries:QualiteHuisseries[] = [];
  public TypeCouvertures:TypeCouverture[] = [];
  public TypeIsolations:TypeIsolation[] = [];
  public Module:Module[] = [];
  public Modele:Modele[] = [];


Displaylistemodele:boolean = true;
DisplaylisteGamme = false;

  constructor(private conceptionOssatureService: ConceptionOssatureService,private finitionExterieurService: FinitionExterieurService,
  private qualiteHuisseriesService: QualiteHuisseriesService,private typeCouvertureService: TypeCouvertureService,
  private moduleService: ModuleService ,private modeleService: ModeleService,
   private typeIsolationService: TypeIsolationService,   private http: HttpClient) { }

  ngOnInit(): void {
     this.conceptionOssatureService.getConceptionOssatures().pipe(
          map(ConceptionOssature => ConceptionOssature['hydra:member'])
        ).subscribe(
          ConceptionOssature => this.conceptionOssatures = ConceptionOssature
        );

        this.qualiteHuisseriesService.getQualiteHuisseries().pipe(
                 map(QualiteHuisseries => QualiteHuisseries['hydra:member'])
                                ).subscribe(
                                  QualiteHuisseries => this.QualiteHuisseries = QualiteHuisseries
                                );


        this.finitionExterieurService.getFinitionExterieurs().pipe(
                                   map(FinitionExterieur => FinitionExterieur['hydra:member'])
                                 ).subscribe(
                                   FinitionExterieur => this.FinitionExterieurs = FinitionExterieur
                                 );

 this.typeCouvertureService.getTypeCouvertures().pipe(
                                   map(TypeCouverture => TypeCouverture['hydra:member'])
                                 ).subscribe(
                                   TypeCouverture => this.TypeCouvertures = TypeCouverture
                                 );

 this.typeIsolationService.getTypeIsolations().pipe(
                                   map(TypeIsolation => TypeIsolation['hydra:member'])
                                 ).subscribe(
                                   TypeIsolation => this.TypeIsolations = TypeIsolation
                                 );
  this.modeleService.getModeles().pipe(
                                    map(Modele => Modele['hydra:member'])
                                  ).subscribe(
                                    Modele => this.Modeles = Modele
                                  );
  this.moduleService.getModules().pipe(
                                    map(Module => Module['hydra:member'])
                                  ).subscribe(
                                    Module => this.Modules = Module
                                  );
  }


handleListeGamme():void {

if(this.Displaylistemodele == true)
  {
   this.Displaylistemodele =  false;

  }
  else{
  if(this.Displaylistemodele == false)
  {
  this.Displaylistemodele =  true;

  }}
    }
  }

