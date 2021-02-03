import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Module } from 'src/app/class/Module';
import { environment } from 'src/environments/environment';
import { ModuleService } from 'src/app/services/module.service';
import { map,finalize } from 'rxjs/operators';
import {  Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-module',
  templateUrl: './liste-module.component.html',
  styleUrls: ['./liste-module.component.css']
})
export class ListeModuleComponent implements OnInit {

   public modules:Module[] = [];
    public libellemodule = "";
    @Input() AfficherListe: boolean= true;

Displayliste:boolean = true;
DisplaySuppression:boolean = false;

public idGamme;

public idmoduleSupprimer;
public nomModuleSupprimer="null";
  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute,  private http: HttpClient) { }

  ngOnInit(): void {
    this.idGamme = this.route.snapshot.paramMap.get('idGamme');
this.modules=null;
   this.moduleService.getModules().pipe(
   finalize(() => this.modules =this.modules.filter(module => module.gamme === "/api/gammes/"+this.idGamme)),//,
        map(module => module['hydra:member'])
      ).subscribe(
        module => this.modules = module
      );

 if(this.AfficherListe==false)
  {
     this.Displayliste =  false;
  }


  }



handleDisplayBouton():void {
if(this.Displayliste == true)
  {
   this.Displayliste =  false;

  }
  else{
  if(this.Displayliste == false)
  {
  this.Displayliste =  true;

  }}
  }

  supprimerModule(id:number):void {

    this.idmoduleSupprimer = id;

    this.modules.forEach( (module, index) => {
      if (module.id == this.idmoduleSupprimer) {
        this.nomModuleSupprimer = module.libelle;
      }
    });

    document.getElementById("idModule"+id).style.border = "solid #2699FB 6px";
this.DisplaySuppression=true;    //modif champs nom delete
    //afficher fenetre
  }

  confirmerSuppressionModule():void {
    //Supprimer le fournisseur en question (KEVIN LEHOUX)
    this.moduleService.asyncDeleteModule(this.idmoduleSupprimer);

    console.log("Suppression de "+this.idmoduleSupprimer);

    document.getElementById("idModule"+this.idmoduleSupprimer).style.border = "0";
        this.idmoduleSupprimer = 0;

    this.DisplaySuppression=false;
    this.ngOnInit();
   /*this.router.navigateByUrl('/liste-Module');*/
document.location.reload();

  }

  annulerSuppressionModule():void {
    document.getElementById("idModule"+this.idmoduleSupprimer).style.border = "0";
        this.idmoduleSupprimer = 0;
  this.DisplaySuppression=false;  }


}
