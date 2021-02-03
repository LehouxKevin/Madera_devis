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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { filter,map,finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';


@Component({
  selector: 'app-consultation-gamme',
  templateUrl: './consultation-gamme.component.html',
  styleUrls: ['./consultation-gamme.component.css']
})
export class ConsultationGammeComponent implements OnInit {
 public conceptionOssature;
 public FinitionExterieur;
  public QualiteHuisserie;
  public TypeCouverture;
  public TypeIsolation;
  public Modules:Module[] = [];
  public Modeles:Modele[] = [];
public gamme ;

public NomGamme="------";
public NomTypeIsolation ="------";
public NomTypeCouverture="------";
public NomFinitionExterieur="------";
public NomQualiteHuisseries="------";
public NomConceptionOssature="------";

Displaylistemodele:boolean = true;
DisplaylisteGamme = false;




 public idGamme: String ="0";

   constructor(private conceptionOssatureService: ConceptionOssatureService,private finitionExterieurService: FinitionExterieurService,
    private qualiteHuisseriesService: QualiteHuisseriesService,private typeCouvertureService: TypeCouvertureService,
   private moduleService: ModuleService ,private modeleService: ModeleService,private gammeService: GammeService,
     private typeIsolationService: TypeIsolationService,  private route: ActivatedRoute,  private http: HttpClient) { }

  ngOnInit(): void {



  this.idGamme = this.route.snapshot.paramMap.get('idGamme');
console.log(this.idGamme)


   this.modeleService.getModeles().pipe(

finalize(() => this.Modeles =this.Modeles.filter(Modele => Modele.gamme === "/api/gammes/"+this.idGamme)//
) ,
                                    map(Modele => Modele['hydra:member'])

                                  ).subscribe(
                                    Modele =>   this.Modeles = Modele
                                  );
                                  console.log("/api/gammes/"+this.idGamme)

   this.moduleService.getModules().pipe(
                                    finalize(() => this.Modules =this.Modules.filter(Module => Module.gamme === "/api/gammes/"+this.idGamme)//
) ,map(Module => Module['hydra:member'])//,filter(Module => Module.gamme === "/api/gammes/"+this.idGamme)//
                                  ).subscribe(

                                    Module => this.Modules = Module

                                  );
    console.log("/api/gammes/"+this.idGamme)

  this.Modules.forEach(element => console.log(element.gamme === "/api/gammes/"+this.idGamme));
this.InitialiserGamme();
  }


 async InitialiserGamme() {


this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
console.log( this.gamme)
this.NomGamme=this.gamme.libelle;

this.conceptionOssature  =  await this.conceptionOssatureService.getOneConceptionOssatureByICleEtrangere(this.gamme.conceptionOssature.substring(4));
this.NomConceptionOssature=this.conceptionOssature.libelle;

this.TypeIsolation  =  await this.typeIsolationService.getOneTypeIsolationByICleEtrangere(this.gamme.typeIsolation.substring(4));
this.NomTypeIsolation=this.TypeIsolation.libelle;

this.TypeCouverture  =  await this.typeCouvertureService.getOneTypeCouvertureByICleEtrangere(this.gamme.typeCouverture.substring(4));
this.NomTypeCouverture=this.TypeCouverture.libelle;

this.FinitionExterieur  =  await this.finitionExterieurService.getOneFinitionExterieurByICleEtrangere(this.gamme.finitionExt.substring(4));
this.NomFinitionExterieur=this.FinitionExterieur.libelle;

this.QualiteHuisserie  =  await this.qualiteHuisseriesService.getOneQualiteHuisserieByICleEtrangere(this.gamme.qualiteHuisseries.substring(4));
this.NomQualiteHuisseries=this.QualiteHuisserie.libelle;

 console.log(this.Modules)
  console.log("this.Modele")
  console.log("test")


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

