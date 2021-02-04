import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter, Output  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { Module } from 'src/app/class/Module';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';

import { environment } from 'src/environments/environment';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';
import { TypeCouvertureService } from 'src/app/services/type-couverture.service';
import { TypeIsolationService } from 'src/app/services/type-isolation.service';
import { ModuleService } from 'src/app/services/module.service';
import { ModeleService } from 'src/app/services/modele.service';
import { GammeService } from 'src/app/services/gamme.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { filter,map } from 'rxjs/operators';
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
  public Modules:Module[] = [];
  public Modeles:Modele[] = [];
  public ModulesFormulaires:Module[] = [];
  public ModelesFormulaires:Modele[] = [];
    public gammes:Gamme[] = [];

  public NomGammeChamps: string;
 public FinitionExterieurChamps :string;
  public TypeIsolationChamps  :string;
 public TypeCouvertureChamps  :string;
 public QualiteHuisseriesChamps  :string;
 public ConceptionOssatureChamps  :string;

  public NomGammeErreur: boolean = false;
 public FinitionExterieurErreur :boolean = false;
  public TypeIsolationErreur  :boolean = false;
 public TypeCouvertureErreur  :boolean = false;
 public QualiteHuisseriesErreur  :boolean = false;
 public ConceptionOssatureErreur  :boolean = false;

  public gamme:Gamme;


  @Output() addGammeChangingState = new EventEmitter<string>();


Displaylistemodele:boolean = true;
DisplaylisteGamme = false;

  constructor(private conceptionOssatureService: ConceptionOssatureService,private finitionExterieurService: FinitionExterieurService,
  private qualiteHuisseriesService: QualiteHuisseriesService,private typeCouvertureService: TypeCouvertureService,
  private moduleService: ModuleService ,private modeleService: ModeleService,private gammeService: GammeService,
   private typeIsolationService: TypeIsolationService, private router: Router,  private http: HttpClient) { }

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

                                  this.ModulesFormulaires.push( new Module);
                                   this.ModelesFormulaires.push(new  Modele(null,null,null,null,null,null,null));
   this.gammeService.getGammes().pipe(
        map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );

  }

 async onSubmit(ajoutGamme: NgForm) {



  this.NomGammeChamps=ajoutGamme.value.NomGammeChamps;
 this.FinitionExterieurChamps = "/api/finition_exterieurs/"+ajoutGamme.value.FinitionExterieurChamps;
  this.TypeIsolationChamps ="/api/type_isolations/"+ajoutGamme.value.TypeIsolationChamps;
 this.TypeCouvertureChamps  ="/api/type_couvertures/"+ajoutGamme.value.TypeCouvertureChamps;
 this.QualiteHuisseriesChamps  ="/api/qualite_huisseries/"+ajoutGamme.value.QualiteHuisseriesChamps;
 this.ConceptionOssatureChamps  ="/api/conception_ossatures/"+ajoutGamme.value.ConceptionOssatureChamps;

console.log(this.NomGammeChamps+this.FinitionExterieurChamps+this.TypeIsolationChamps
            +this.TypeCouvertureChamps+ this.QualiteHuisseriesChamps+
            this.ConceptionOssatureChamps);


ajoutGamme.value.NomGammeChamps.length <= 0 || ajoutGamme.value.NomGammeChamps == null ? this.NomGammeErreur = true : this.NomGammeErreur = false;
ajoutGamme.value.FinitionExterieurChamps.length <= 0 || ajoutGamme.value.FinitionExterieurChamps == null ? this.FinitionExterieurErreur = true : this.FinitionExterieurErreur = false;
ajoutGamme.value.TypeIsolationChamps.length <= 0 || ajoutGamme.value.TypeIsolationChamps == null ? this.TypeIsolationErreur = true : this.TypeIsolationErreur = false;
ajoutGamme.value.TypeCouvertureChamps.length <= 0 || ajoutGamme.value.TypeCouvertureChamps == null ? this.TypeCouvertureErreur = true : this.TypeCouvertureErreur = false;
ajoutGamme.value.QualiteHuisseriesChamps.length <= 0 || ajoutGamme.value.QualiteHuisseriesChamps == null ? this.QualiteHuisseriesErreur = true : this.QualiteHuisseriesErreur = false;
ajoutGamme.value.ConceptionOssatureChamps.length <= 0 || ajoutGamme.value.ConceptionOssatureChamps == null ? this.ConceptionOssatureErreur = true : this.ConceptionOssatureErreur = false;


if( !this.NomGammeErreur
&&   !this.FinitionExterieurErreur
&&   !this.TypeIsolationErreur
&&   !this.TypeCouvertureErreur
&&   !this.QualiteHuisseriesErreur
&&   !this.ConceptionOssatureErreur )
{        console.log("testwesh");

this.gamme=new Gamme(this.NomGammeChamps,new Date() ,false
,this.FinitionExterieurChamps
,this.TypeIsolationChamps
,this.TypeCouvertureChamps
, this.QualiteHuisseriesChamps
,this.ConceptionOssatureChamps);

//console.log(this.gamme.qualite_huisseries_id);
     if(await this.gammeService.addGamme(this.gamme))
      {
         this.ngOnInit();
         this.router.navigateByUrl('/liste-Gamme');
      }
      else { // afficher erreur
        console.log("non");
      }
}

  }


AjoutModule():void {

this.ModulesFormulaires.push( new  Module)
console.log("test");

    }
AjoutModele():void {

this.ModelesFormulaires.push(new  Modele(null,null,null,null,null,null,null))
console.log("test");
    }

suppressionModule(IdModule :number):void {
console.log("test supp");
console.log(this.ModulesFormulaires);

this.ModulesFormulaires =this.ModulesFormulaires.filter(Module => Module.id === IdModule)

console.log("test");

    }
suppressionModele(IdModele :number):void {
console.log("test supp");
console.log(this.ModelesFormulaires);

this.ModelesFormulaires =this.ModelesFormulaires.filter(ModelesFormulaire => ModelesFormulaire.id === IdModele)

document.getElementById("LigneModeleFormulaire"+IdModele).style.display = "none";

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

