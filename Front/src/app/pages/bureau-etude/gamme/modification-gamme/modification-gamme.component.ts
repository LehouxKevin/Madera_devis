import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter, Output  } from '@angular/core';
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
import { FinitionInterieur } from 'src/app/class/finition-interieur';


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
import { filter, map , finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';
import { Router } from '@angular/router';
import { FinitionInterieurService } from 'src/app/services/finition-interieur.service';


@Component({
  selector: 'app-modification-gamme',
  templateUrl: './modification-gamme.component.html',
  styleUrls: ['./modification-gamme.component.css']
})
export class ModificationGammeComponent implements OnInit {
  public conceptionOssatures: ConceptionOssature[] = [];
  public FinitionExterieurs: FinitionExterieur[] = [];
  public QualiteHuisseries: QualiteHuisseries[] = [];
  public TypeCouvertures: TypeCouverture[] = [];
  public TypeIsolations: TypeIsolation[] = [];
  public finitionInterieurs: FinitionInterieur[] = [];

  public Modules: Module[] = [];
  public Modeles: Modele[] = [];
  public ModulesFormulaires: Module[] = [];
  public ModelesFormulaires: Modele[] = [];
  public gammes: Gamme[] = [];

  public NomGammeChamps: string;
  public FinitionExterieurChamps: string;
  public TypeIsolationChamps: string;
  public TypeCouvertureChamps: string;
  public QualiteHuisseriesChamps: string;
  public ConceptionOssatureChamps: string;
  public finitionInterieurChamps: string;

  @Output() addGammeChangingState = new EventEmitter<string>();
  Displaylistemodele = true;
  DisplaylisteGamme = false;
  public idGamme  = '0';

  public NomGamme = '------';
  public NomTypeIsolation = '------';
  public NomConceptionOssature = '------';
  public NomTypeCouverture = '------';
  public NomFinitionExterieur = '------';
  public NomQualiteHuisseries = '------';
  public NomfinitionInterieur = '------';

  public idTypeIsolation = '0';
  public idTypeCouverture = '0';
  public idFinitionExterieur = '0';
  public idQualiteHuisseries = '0';
  public idConceptionOssature = '0';
  public idfinitionInterieur = '0';

  public gamme ;
  public conceptionOssature;
  public FinitionExterieur;
  public QualiteHuisserie;
  public TypeCouverture;
  public TypeIsolation;
  public finitionInterieur;

  constructor(private conceptionOssatureService: ConceptionOssatureService,
              private finitionExterieurService: FinitionExterieurService,
              private qualiteHuisseriesService: QualiteHuisseriesService,
              private typeCouvertureService: TypeCouvertureService,
              private moduleService: ModuleService,
              private modeleService: ModeleService,
              private gammeService: GammeService,
              private typeIsolationService: TypeIsolationService,
              public finitionInterieurService: FinitionInterieurService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) { }



  public NomGammeModifier = false;
  public FinitionExterieuModifier = false;
  public TypeIsolationModifier   = false;
  public TypeCouvertureModifier  = false;
  public QualiteHuisseriesModifier   = false;
  public ConceptionOssatureModifier  = false;
  public finitionInterieurModifier   = false;


  ngOnInit(): void {

    this.idGamme = this.route.snapshot.paramMap.get('idGamme');
    console.log(this.idGamme);
    this.conceptionOssatureService.getConceptionOssatures().pipe(
          map(conceptionOssature => conceptionOssature['hydra:member'])
      ).subscribe(
      conceptionOssature => this.conceptionOssatures = conceptionOssature
      );


    this.qualiteHuisseriesService.getQualiteHuisseries().pipe(
          map(qualiteHuisseries => qualiteHuisseries['hydra:member'])
      ).subscribe(
      qualiteHuisseries => this.QualiteHuisseries = qualiteHuisseries
      );

    this.finitionExterieurService.getFinitionExterieurs().pipe(
          map(finitionExterieur => finitionExterieur['hydra:member'])
      ).subscribe(
      finitionExterieur => this.FinitionExterieurs = finitionExterieur
      );

    this.typeCouvertureService.getTypeCouvertures().pipe(
          map(typeCouverture => typeCouverture['hydra:member'])
      ).subscribe(
      typeCouverture => this.TypeCouvertures = typeCouverture
      );

    this.typeIsolationService.getTypeIsolations().pipe(
          map(typeIsolation => typeIsolation['hydra:member'])
      ).subscribe(
      typeIsolation => this.TypeIsolations = typeIsolation
      );
    this.finitionInterieurService.GetFinitionsInterieur().pipe(
          map(finitionInterieur => finitionInterieur['hydra:member'])
      ).subscribe(
      finitionInterieur => this.finitionInterieurs = finitionInterieur
      );

    this.modeleService.getModeles().pipe(
          map(modele => modele['hydra:member'])
      ).subscribe(
      modele => this.Modeles = modele
      );
    this.moduleService.getModules().pipe(
          map(module => module['hydra:member'])
      ).subscribe(
      module => this.Modules = module
      );

    this.InitialiserGamme();
    this.ModulesFormulaires.push( new Module(null, null,null,null,null,null,null,null) );
    this.ModelesFormulaires.push(new  Modele(null,
                                        null,
                                            null,
                                            null,
                                            null,
                                    null,
                                    null));

    this.gammeService.getGammes().pipe(
          map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );


    this.InitialiserGamme();
  }
  // tslint:disable-next-line:typedef
  async onSubmit(ModifGamme: NgForm) {
    console.log('test');
    this.NomGammeChamps = ModifGamme.value.NomGammeChamps;
    this.FinitionExterieurChamps = '/api/finition_exterieurs/' + ModifGamme.value.FinitionExterieurChamps;
    this.TypeIsolationChamps = '/api/type_isolations/' + ModifGamme.value.TypeIsolationChamps;
    this.TypeCouvertureChamps  = '/api/type_couvertures/' + ModifGamme.value.TypeCouvertureChamps;
    this.QualiteHuisseriesChamps  = '/api/qualite_huisseries/' + ModifGamme.value.QualiteHuisseriesChamps;
    this.ConceptionOssatureChamps  = '/api/conception_ossatures/' + ModifGamme.value.ConceptionOssatureChamps;
    this.finitionInterieurChamps  = '/api/finition_interieurs/' + ModifGamme.value.finitionInterieurChamps;

    console.log('this.idConceptionOssature');

    console.log(this.idConceptionOssature);

    ModifGamme.value.NomGammeChamps.length <= 0 || ModifGamme.value.NomGammeChamps == null  ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.NomGamme = ModifGamme.value.NomGammeChamps;

    console.log('ModifGamme.value.TypeIsolationChamps');
    console.log(ModifGamme.value.QualiteHuisseriesChamps);


    ModifGamme.value.FinitionExterieurChamps.length <= 0 || ModifGamme.value.FinitionExterieurChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idFinitionExterieur = ModifGamme.value.FinitionExterieurChamps ;

    ModifGamme.value.TypeIsolationChamps.length <= 0 || ModifGamme.value.TypeIsolationChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idTypeIsolation = ModifGamme.value.TypeIsolationChamps ;

    ModifGamme.value.TypeCouvertureChamps.length <= 0 || ModifGamme.value.TypeCouvertureChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idTypeCouverture = ModifGamme.value.TypeCouvertureChamps ;

    ModifGamme.value.QualiteHuisseriesChamps.length <= 0 || ModifGamme.value.QualiteHuisseriesChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idQualiteHuisseries = ModifGamme.value.QualiteHuisseriesChamps ;

    ModifGamme.value.ConceptionOssatureChamps.length <= 0 || ModifGamme.value.ConceptionOssatureChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idConceptionOssature = ModifGamme.value.ConceptionOssatureChamps ;

    ModifGamme.value.finitionInterieurChamps.length <= 0 || ModifGamme.value.finitionInterieurChamps == null ?
      // tslint:disable-next-line:no-unused-expression
      0 : this.idfinitionInterieur = ModifGamme.value.finitionInterieurChamps ;


    this.gamme = new Gamme(this.NomGamme, new Date() , false
      , '/api/finition_exterieurs/' + this.idFinitionExterieur
      , '/api/type_isolations/' + this.idTypeIsolation
      , '/api/type_couvertures/' + this.idTypeCouverture
      , '/api/qualite_huisseries/' + this.idQualiteHuisseries
      , '/api/conception_ossatures/' + this.idConceptionOssature
      , '/api/finition_interieurs/' + this.idfinitionInterieur);
    this.gamme.id = Number(this.idGamme);

    if ( await this.gammeService.syncUpdateGamme(this.gamme) )
      {this.ngOnInit();
       this.router.navigateByUrl('/liste-Gamme');

         // this.router.navigateByUrl('/liste-Gamme');
      }
      else { // afficher erreur
        console.log('non');
      }

  }

  // tslint:disable-next-line:typedef
  async InitialiserGamme() {


    this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
    console.log( this.gamme);
    this.NomGamme = this.gamme.libelle;

    this.conceptionOssature  =
      await this.conceptionOssatureService.getOneConceptionOssatureByICleEtrangere(this.gamme.conceptionOssature.substring(4));
    this.NomConceptionOssature = this.conceptionOssature.libelle;
    this.idConceptionOssature = this.conceptionOssature.id;

    this.TypeIsolation  =
      await this.typeIsolationService.getOneTypeIsolationByICleEtrangere(this.gamme.typeIsolation.substring(4));
    this.NomTypeIsolation = this.TypeIsolation.libelle;
    this.idTypeIsolation = this.TypeIsolation.id;
    console.log( this.idTypeIsolation);

    this.TypeCouverture  =
      await this.typeCouvertureService.getOneTypeCouvertureByICleEtrangere(this.gamme.typeCouverture.substring(4));
    this.NomTypeCouverture = this.TypeCouverture.libelle;
    this.idTypeCouverture = this.TypeCouverture.id;

    this.FinitionExterieur  =
      await this.finitionExterieurService.getOneFinitionExterieurByICleEtrangere(this.gamme.finitionExt.substring(4));
    this.NomFinitionExterieur = this.FinitionExterieur.libelle;
    this.idFinitionExterieur = this.FinitionExterieur.id;

    this.QualiteHuisserie  =
      await this.qualiteHuisseriesService.getOneQualiteHuisserieByICleEtrangere(this.gamme.qualiteHuisseries.substring(4));
    this.NomQualiteHuisseries = this.QualiteHuisserie.libelle;
    this.idQualiteHuisseries = this.QualiteHuisserie.id;

    this.finitionInterieur  =
      await this.finitionInterieurService.asyncGetOneFinitionInterieurByCleEtrangere(this.gamme.finitionInterieur.substring(4));
    this.NomfinitionInterieur = this.finitionInterieur.libelle;
    this.idfinitionInterieur = this.finitionInterieur.id;

    console.log(this.NomfinitionInterieur);
    let DropdownList = (document.getElementById('TypeIsolation')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    DropdownList = (document.getElementById('FinitionExterieur')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    DropdownList = (document.getElementById('QualiteHuisseries')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    DropdownList = (document.getElementById('ConceptionOssature')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    DropdownList = (document.getElementById('TypeCouverture')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;
    DropdownList = (document.getElementById('finitionInterieur')) as HTMLSelectElement;
    DropdownList.selectedIndex = 0;

    /*
    var selectElem =( document.getElementById("TypeIsolation")) as HTMLSelectElement;
    selectElem.getAttribute('selected').toBeTruthy()*/ /*
    selectElem= ( document.getElementById("FinitionExterieur")) as HTMLSelectElement;
    electElem.selectedIndex= 0;

    selectElem= (document.getElementById("QualiteHuisseries")) as HTMLSelectElement;
     electElem.selectedIndex= 0;

    selectElem= (document.getElementById("ConceptionOssature")) as HTMLSelectElement;
    electElem.selectedIndex= 0;

    selectElem=  (document.getElementById("TypeCouverture")) as HTMLSelectElement;
    electElem.selectedIndex= 0;
    */
    console.log(this.Modules);
    console.log('this.Modele');
    console.log('test');
  }
  AjoutModule(): void {
    this.ModulesFormulaires.push( new  Module(null, null,null,null,null,null,null,null));
    console.log('test');
    }
  AjoutModele(): void {
  this.ModelesFormulaires.push(new  Modele(null,
    null,
    null,
    null,
    null,
    null,
    null));
  console.log('test');
    }
  handleListeGamme(): void {
    // tslint:disable-next-line:triple-equals
    if ( this.Displaylistemodele == true)
      {
      this.Displaylistemodele =  false;
      }
    else{
      // tslint:disable-next-line:triple-equals
      if ( this.Displaylistemodele == false)
        {
        this.Displaylistemodele =  true;
        }
      }
  }
}
