import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { filter, map, finalize  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Module } from 'src/app/class/Module';

import { ModuleService } from 'src/app/services/module.service';
import {TypeModuleService} from '../../../../services/type-module.service';
import {Composant} from '../../../../class/composant';
import {ComposantService} from '../../../../services/composant.service';
import {NgForm} from '@angular/forms';
import {TypeModule} from '../../../../class/type-module';

@Component({
  selector: 'app-creation-module',
  templateUrl: './creation-module.component.html',
  styleUrls: ['./creation-module.component.css']
})
export class CreationModuleComponent implements OnInit {

  public module;
  public idModule = '0';
  public idGamme = '0';

  /*champs du formulaire*/
  public NomModule = '';
  public PrixModule = 0;
  public idTypeModule = '0';
  public DescriptionModule = '';
  public CaracteristiquesModule = '';
  public composants: Composant[] = [];

  /*donnée */
  public TypeModules: TypeModule[] = [];

  /*erreur*/
  public NomModuleErreur = false;
  public PrixModuleErreur = false;
  public idTypeModuleErreur = false;
  public DescriptionModuleErreur = false;
  public CaracteristiquesModuleErreur = false;


  constructor(private moduleService: ModuleService,
              private typeModuleService: TypeModuleService,
              private composantService: ComposantService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {  }

  ngOnInit(): void {
    this.idGamme = this.route.snapshot.paramMap.get('idGamme');

    this.typeModuleService.getTypesModule().pipe(
      map(typeModule => typeModule['hydra:member'])
    ).subscribe(
      typeModule => this.TypeModules = typeModule
    );

  }

  // tslint:disable-next-line:typedef
  async onSubmit(ajoutModule: NgForm) {
  console.log(this.idTypeModule);
  console.log(ajoutModule.value);

  ajoutModule.value.NomModuleValueform.length <= 0 || ajoutModule.value.NomModuleValueform == null
      ? this.NomModuleErreur = true
      : this.NomModuleErreur = false;
  this.NomModule = ajoutModule.value.NomModuleValueform;

  ajoutModule.value.PrixModuleValueform.length <= 0 || ajoutModule.value.PrixModuleValueform == null
      ? this.PrixModuleErreur = true
      : this.PrixModuleErreur = false;
  this.PrixModule =  ajoutModule.value.PrixModuleValueform;

  ajoutModule.value.TypeModuleValueform.length <= 0 || ajoutModule.value.TypeModuleValueform == null
      ? this.idTypeModuleErreur = true
      : this.idTypeModuleErreur = false;

  ajoutModule.value.DescriptionModuleValueform.length <= 0 || ajoutModule.value.DescriptionModuleValueform == null
      ? this.DescriptionModuleErreur = true
      : this.DescriptionModuleErreur = false;
  this.DescriptionModule = ajoutModule.value.DescriptionModuleValueform;

  ajoutModule.value.CaracteristiqueModuleValueform.length <= 0 || ajoutModule.value.CaracteristiqueModuleValueform == null
      ? this.CaracteristiquesModuleErreur = true
      : this.CaracteristiquesModuleErreur = false;
  this.CaracteristiquesModule = ajoutModule.value.CaracteristiqueModuleValueform;

    /*NomModuleErreur,PrixModuleErreur,idTypeModuleErreur,DescriptionModuleErreur,CaracteristiquesModuleErreur*/
  if ( !this.NomModuleErreur
      && !this.PrixModuleErreur
      && !this.idTypeModuleErreur
      && !this.DescriptionModuleErreur
      && !this.CaracteristiquesModuleErreur)
    {
      this.module = new Module(
        this.NomModule,
        new Date(),
        false,
        this.DescriptionModule,
        this.PrixModule,
        '/api/gammes/' + this.idGamme,
        '/api/type_modules/' + this.idTypeModule,
        this.CaracteristiquesModule);

      console.log(this.module);
      const IdModeleCree = await this.moduleService.addModule(this.module);

    }
  }

  ListeDeroulanteChangerIndex(ChoixListe , IndexSelectionne): void {
    // Indique l'option selectionné.
    // permet de definir l'index qui est en BDD sur la table voulu

    // tslint:disable-next-line:triple-equals
    if ( ChoixListe == 'idTypeModule' ) {
      this.idTypeModule = IndexSelectionne;
    }

  }

}
