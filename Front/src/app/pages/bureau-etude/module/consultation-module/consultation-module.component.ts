import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, finalize  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Module } from 'src/app/class/Module';

import { ModuleService } from 'src/app/services/module.service';
import {TypeModuleService} from '../../../../services/type-module.service';
import {Composant} from '../../../../class/composant';
import {ComposantService} from '../../../../services/composant.service';

@Component({
  selector: 'app-consultation-module',
  templateUrl: './consultation-module.component.html',
  styleUrls: ['./consultation-module.component.css']
})
export class ConsultationModuleComponent implements OnInit {
  public Module;
  public typeModule;

  public idModule = '0';
  public NomModule = '------';
  public PrixModule = 0 ;
  public TypeModuleNom = '------';
  public DescriptionModule = '------';
  public CaracteristiquesModule = '------';
   public composants: Composant[] = [];
  // public caracteristiques: Caracteristique[] = [];



  constructor(    private moduleService: ModuleService,
                  private typeModuleService: TypeModuleService,
                  private composantService: ComposantService,
                  private route: ActivatedRoute,
                  private http: HttpClient) { }

  ngOnInit(): void {
    this.idModule = this.route.snapshot.paramMap.get('idModule');

    this.InitialiserModule() ;

  }

  // tslint:disable-next-line:typedef
  async InitialiserModule() {
    console.log( this.idModule);
    this.Module  =  await this.moduleService.getOneModuleById(this.idModule);
    console.log( this.Module);
    this.NomModule = this.Module.libelle;
    this.PrixModule = this.Module.prix;
    this.DescriptionModule = this.Module.details;
    this.CaracteristiquesModule = this.Module.caracteristiques;
    const composants = this.Module.composants;
    console.log(this.composants);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < composants.length ; i ++ )
    {
      // @ts-ignore
      this.composants.push( await this.composantService.getOneComposantById(composants[i].substring('/api/composants/'.length)));
    }




    console.log(this.Module.typeModule.substring('/api/type_modules/'.length));
    this.typeModule =
      await this.typeModuleService.getOneTypeModuleById(this.Module.typeModule.substring('/api/type_modules/'.length));
    this.TypeModuleNom = this.typeModule.libelle;

  }
}
