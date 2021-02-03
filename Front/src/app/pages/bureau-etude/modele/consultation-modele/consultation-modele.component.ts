import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter, Output  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';
import { Etage } from 'src/app/class/Etage';

import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { GammeService } from 'src/app/services/gamme.service';
import { EtageService } from 'src/app/services/etage.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { filter,map,finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-consultation-modele',
  templateUrl: './consultation-modele.component.html',
  styleUrls: ['./consultation-modele.component.css']
})
export class ConsultationModeleComponent implements OnInit {


public Modele;
public gamme ;
public etages:Etage[] = []; ;

public NomModele="------";
public NomGamme="------";
public nbetage="------";

DisplaylisteGamme = false;

 public idGamme: String ="0";
  public idModele: String ="0";

 private sub: any;


   constructor(
   private modeleService: ModeleService,private gammeService: GammeService,private etageService: EtageService,
       private route: ActivatedRoute,  private http: HttpClient) { }

  ngOnInit(): void {
    this.idModele = this.route.snapshot.paramMap.get('idModele');


this.InitialiserGamme() ;
 }

 async InitialiserGamme() {




this.Modele  =  await this.modeleService.getOneModeleById(this.idModele);
console.log( this.Modele)
this.NomModele=this.Modele.libelle;
this.idGamme=this.Modele.gamme.substring("/api/gammes/".length);
console.log( this.idGamme)

this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
this.NomGamme=this.gamme.libelle;


 this.etageService.getEtages().pipe(
                                        finalize(() => this.etages =this.etages.filter(Etage => Etage.modele === "/api/modeles/"+this.idModele)//
    ) ,map(Etage => Etage['hydra:member'])//,filter(Module => Module.gamme === "/api/gammes/"+this.idGamme)//
                                      ).subscribe(

                                        Etage => this.etages = Etage

                                      );
 console.log(this.NomGamme)
  console.log("this.Modele")
  console.log(this.etages)


  }



}
