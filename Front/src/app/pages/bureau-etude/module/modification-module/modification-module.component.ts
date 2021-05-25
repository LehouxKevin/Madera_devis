import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Module} from 'src/app/class/Module';

interface ComposantsListe {
  value: string;
  viewValue: string;
}


import {ModuleService} from 'src/app/services/module.service';
import {TypeModuleService} from '../../../../services/type-module.service';
import {Composant} from '../../../../class/composant';
import {ComposantService} from '../../../../services/composant.service';
import {NgForm} from '@angular/forms';
import {TypeModule} from '../../../../class/type-module';
import {Etage} from '../../../../class/etage';

@Component({
  selector: 'app-modification-module',
  templateUrl: './modification-module.component.html',
  styleUrls: ['./modification-module.component.css']
})
export class ModificationModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService,
              private typeModuleService: TypeModuleService,
              private composantService: ComposantService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }


  ComposantsListe: ComposantsListe[] = [];
  selectedComposantsListe = null; // this.ComposantsListe[0].value;


  public module;
  public idModule = '0';
  public idGamme = '0';
  public composantslength;

  /*champs du formulaire*/
  public NomModule = '';
  public PrixModule = 0;
  public idTypeModule = '0';
  public DescriptionModule = '';
  public CaracteristiquesModule = '';
  public composants = [];
  public composantsListeIndex = [];
  public typeModuledefault;
  public TypeModuleNom = '';
  /*donnée */
  public TypeModules: TypeModule[] = [];
  public composantsBDD: Composant[] = [];

  /*erreur*/
  public NomModuleErreur = false;
  public PrixModuleErreur = false;
  public idTypeModuleErreur = false;
  public DescriptionModuleErreur = false;
  public CaracteristiquesModuleErreur = false;
  public ComposantModuleErreur = false;
  public ComposantModuleErreurMotif = '';

  public shouldDoIt = true;

  ngOnInit(): void {
    this.idModule = this.route.snapshot.paramMap.get('idModule');

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

    this.InitialiserModule();

  }

  // tslint:disable-next-line:typedef
  async InitialiserModule() {
    console.log(this.idModule);
    this.module = await this.moduleService.getOneModuleById(this.idModule);
    console.log(this.module);
    this.idGamme = this.module.gamme.substring('/api/gammes/'.length);
    this.composantsListeIndex = this.module.composants;
    this.NomModule = this.module.libelle;
    this.PrixModule = this.module.prix;
    this.DescriptionModule = this.module.details;
    this.CaracteristiquesModule = this.module.caracteristiques;

    const composants = this.module.composants;
    console.log(this.composants);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < composants.length; i++) {
      // @ts-ignore
      this.composants.push(await this.composantService.getOneComposantById(composants[i].substring('/api/composants/'.length)));
    }


    console.log(this.module.typeModule.substring('/api/type_modules/'.length));
    this.typeModuledefault =
      await this.typeModuleService.getOneTypeModuleById(this.module.typeModule.substring('/api/type_modules/'.length));
    this.TypeModuleNom = this.typeModuledefault.libelle;
    this.idTypeModule = this.typeModuledefault.id;
  }

  // tslint:disable-next-line:typedef
  async onSubmit(ajoutModule: NgForm) {
    console.log(this.idTypeModule);
    console.log(ajoutModule.value);

    ajoutModule.value.NomModuleValueform.length <= 0 || ajoutModule.value.NomModuleValueform == null
      // tslint:disable-next-line:no-unused-expression
      ? null
      : this.NomModule = ajoutModule.value.NomModuleValueform;

    ajoutModule.value.PrixModuleValueform.length <= 0 || ajoutModule.value.PrixModuleValueform == null
      // tslint:disable-next-line:no-unused-expression
      ? null
      : this.PrixModule = ajoutModule.value.PrixModuleValueform;

    ajoutModule.value.TypeModuleValueform.length <= 0 || ajoutModule.value.TypeModuleValueform == null
      // tslint:disable-next-line:no-unused-expression
      ? null
      : this.idTypeModuleErreur = false;

    ajoutModule.value.DescriptionModuleValueform.length <= 0 || ajoutModule.value.DescriptionModuleValueform == null
      // tslint:disable-next-line:no-unused-expression
      ? null
      : this.DescriptionModule = ajoutModule.value.DescriptionModuleValueform;

    ajoutModule.value.CaracteristiqueModuleValueform.length <= 0 || ajoutModule.value.CaracteristiqueModuleValueform == null
      // tslint:disable-next-line:no-unused-expression
      ? null
      : this.CaracteristiquesModule = ajoutModule.value.CaracteristiqueModuleValueform;

    this.ComposantModuleErreur = false;
    console.log(this.composantsListeIndex);

    if (this.composantsListeIndex != null) {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.composantsListeIndex.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (this.composantsListeIndex[i] == '') {
          this.ComposantModuleErreur = true;
          this.ComposantModuleErreurMotif = 'Erreur vous avez mis pas selectionné d option';
        }
        // tslint:disable-next-line:triple-equals max-line-length
        if (this.composantsListeIndex.indexOf(this.composantsListeIndex[i]) > -1 && this.composantsListeIndex.indexOf(this.composantsListeIndex[i]) != i) {
          console.log('chaine presente');
          console.log(this.composantsListeIndex.indexOf(this.composantsListeIndex[i]));
          console.log(i);

          console.log(this.composantsListeIndex[i]);

          this.ComposantModuleErreur = true;
          this.ComposantModuleErreurMotif = 'Erreur vous avez mis 2 fois le meme composant';
        }
      }
    }
    /*NomModuleErreur,PrixModuleErreur,idTypeModuleErreur,DescriptionModuleErreur,CaracteristiquesModuleErreur*/
    if (!this.ComposantModuleErreur
    ) {

      this.module = new Module(
        this.NomModule,
        new Date(),
        false,
        this.DescriptionModule,
        this.PrixModule,
        '/api/gammes/' + this.idGamme,
        '/api/type_modules/' + this.idTypeModule,
        this.CaracteristiquesModule);

      // tslint:disable-next-line:prefer-for-of
      console.log(this.composantsListeIndex);
      this.module.composants = this.composantsListeIndex;
      this.module.id = this.idModule;

      console.log(this.module);
      const IdModuleModifier = await this.moduleService.syncUpdateModule(this.module);
      this.router.navigateByUrl('/Liste-Module/' + this.idGamme);

      /*if ( IdModuleCree )
      {

        console.log(this.module);
        this.router.navigateByUrl('/Liste-Module/' + this.idGamme);

      }*/
    }
  }

  ListeDeroulanteChangerIndex(ChoixListe, IndexSelectionne): void {
    // Indique l'option selectionné.
    // permet de definir l'index qui est en BDD sur la table voulu
    this.shouldDoIt = true; // initialize it to true for the first run

    // tslint:disable-next-line:triple-equals
    if (ChoixListe == 'idTypeModule') {
      this.idTypeModule = IndexSelectionne;
    }

  }

  async ListeDeroulanteChangerIndexComposant(ChoixListe, IdComposantModule, IdComposantBDD): Promise<void> {
    console.log(IdComposantBDD.target.value);
    // this.composants[IdComposantModule] = await this.composantService.getOneComposantById(IdComposantBDD.target.value);
    this.composantsListeIndex[IdComposantModule] = '/api/composants/' + IdComposantBDD.target.value;
    console.log(this.composants);
    console.log('IdComposantModule' + IdComposantModule);

    // this.composants[IdComposantBDD].id = IdComposantBDD;
  }

  async AjoutComposant(): Promise<void> {
    await this.composants.push(new Composant(null, null, null, null, null, null , null));
    this.composantsListeIndex.push('');
    console.log(this.composants);
    this.shouldDoIt = true; // initialize it to true for the first run
    this.ComposantsListe = [];

// tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.composantsBDD.length; i++) {
      this.ComposantsListe.push(
        {value: this.composantsBDD[i].id + '', viewValue: this.composantsBDD[i].libelle});
    }
    // this.selectedComposantsListe = this.ComposantsListe[0].value;

    console.log('test');
    console.log(this.composants);
    this.composantslength = this.composants.length;
  }

  RetirerComposant(idligneaenlever): void {
    console.log('test');
    this.composantsListeIndex.splice(idligneaenlever, 1);
    this.composants.splice(idligneaenlever, 1);
  }

  // tslint:disable-next-line:typedef


}
