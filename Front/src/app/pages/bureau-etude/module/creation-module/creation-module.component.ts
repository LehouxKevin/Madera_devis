import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { filter, map, finalize  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { Module } from 'src/app/class/Module';
interface Car {
  value: string;
  viewValue: string;
}
import { ModuleService } from 'src/app/services/module.service';
import {TypeModuleService} from '../../../../services/type-module.service';
import {Composant} from '../../../../class/composant';
import {ComposantService} from '../../../../services/composant.service';
import {NgForm} from '@angular/forms';
import {TypeModule} from '../../../../class/type-module';
import {Etage} from '../../../../class/etage';

@Component({
  selector: 'app-creation-module',
  templateUrl: './creation-module.component.html',
  styleUrls: ['./creation-module.component.css']
})
export class CreationModuleComponent implements OnInit {


  constructor(private moduleService: ModuleService,
              private typeModuleService: TypeModuleService,
              private composantService: ComposantService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {  }




  cars: Car[] = [
    {value: 'ford', viewValue: 'Ford'},
    {value: 'chevrolet', viewValue: 'Chevrolet'},
    {value: 'dodge', viewValue: 'Dodge'}
  ];
  selectedCar = this.cars[0].value;

  // tslint:disable-next-line:typedef
  selectCar(event: Event) {
    this.selectedCar = (event.target as HTMLSelectElement).value;
  }






  public module;
  public idModule = '0';
  public idGamme = '0';
  public composantslength ;

  /*champs du formulaire*/
  public NomModule = '';
  public PrixModule = 0;
  public idTypeModule = '0';
  public DescriptionModule = '';
  public CaracteristiquesModule = '';
  public composants = [];

  /*donnée */
  public TypeModules: TypeModule[] = [];
  public composantsBDD: Composant[] = [];

  /*erreur*/
  public NomModuleErreur = false;
  public PrixModuleErreur = false;
  public idTypeModuleErreur = false;
  public DescriptionModuleErreur = false;
  public CaracteristiquesModuleErreur = false;
  public shouldDoIt = true ;

  ngOnInit(): void {
    this.idGamme = this.route.snapshot.paramMap.get('idGamme');

    this.typeModuleService.getTypesModule().pipe(
      map(typeModule => typeModule['hydra:member'])
    ).subscribe(
      typeModule => this.TypeModules = typeModule
    );
    this.composantService.getComposants().pipe(
      map(composantBDD => composantBDD['hydra:member'])
    ).subscribe(
      composantBDD => this.composantsBDD = composantBDD
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
      const IdModuleCree = await this.moduleService.addModule(this.module);
      if ( IdModuleCree )
      {

        /*S'occuper de la partie composant ici :'( */
        console.log(this.module);
        this.router.navigateByUrl('/Liste-Module/' + this.idGamme);

      }

    }
  }

  ListeDeroulanteChangerIndex(ChoixListe , IndexSelectionne): void {
    // Indique l'option selectionné.
    // permet de definir l'index qui est en BDD sur la table voulu
    this.shouldDoIt = true; // initialize it to true for the first run

    // tslint:disable-next-line:triple-equals
    if ( ChoixListe == 'idTypeModule' ) {
      this.idTypeModule = IndexSelectionne;
    }

  }
  ListeDeroulanteChangerIndexComposant(ChoixListe ,  IdComposantModule , IdComposantBDD): void {
    // Indique l'option selectionné.
    // permet de definir l'index qui est en BDD sur la table voulu pour le composant
  console.log(this.composants);
  console.log(IdComposantModule);
  console.log(IdComposantBDD);
  console.log(this.composants);
    // this.remmettreLesOptionSelected();

    // this.composants[IdComposantModule] = this.composantService.getOneComposantById(IdComposantBDD);
  this.composants[IdComposantBDD].id = IdComposantBDD;
    }
  // tslint:disable-next-line:typedef
  remmettreLesOptionSelected(){
    console.log(this.shouldDoIt);
    if (this.shouldDoIt) {
      console.log(this.composants.length);

      for (let i = 0 ; i < this.composants.length - 1; i++)
    {
      console.log('Listecomposant' + i);
      const DropdownList = (document.getElementById('Listecomposant' + i )) as HTMLSelectElement;
      console.log(DropdownList);
      DropdownList.selectedIndex = 2;

    }      this.shouldDoIt = false;
    }
  }
  async AjoutComposant(): Promise<void> {
    await this.composants.push(new Composant(null, null , null , null , null , null ));

    console.log(this.composants);
    // tslint:disable-next-line:prefer-for-of
    this.shouldDoIt = true; // initialize it to true for the first run
    // this.remmettreLesOptionSelected();


    console.log('test');
    console.log(this.composants);
    this.composantslength = this.composants.length;
  }

}
