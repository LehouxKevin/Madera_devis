import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';
import { Etage } from 'src/app/class/Etage';
import { TypeRemplissage } from 'src/app/class/type-remplissage';
import { CoupeDePrincipes } from 'src/app/class/coupe-de-principes';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { GammeService } from 'src/app/services/gamme.service';
import { EtageService } from 'src/app/services/etage.service';
import { TypeRemplissageService } from 'src/app/services/type-remplissage.service';
import { CoupeDePrincipeService } from 'src/app/services/coupe-de-principe.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { filter, map, finalize } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modification-modele',
  templateUrl: './modification-modele.component.html',
  styleUrls: ['./modification-modele.component.css']
})
export class ModificationModeleComponent implements OnInit {


  public Modele;
  public gamme;
  public idGamme = '0';
  public idModele = '0';

  public coupeDePrincipe;
  public typeRemplissage;

  public gammes: Gamme[] = [];
  public etages: Etage[] = [];
  public coupeDePrincipes: CoupeDePrincipes[] = [];
  public typeRemplissages: TypeRemplissage[] = [];

  public NomModeleValue = 'Nom modele';
  public NomGammeValue = '------';
  public nbetageValue = 0;
  public coupeDePrincipesValue = 'choose ...';
  public typeRemplissagesValue = 'choose ...';

  public idNomModeleValue = '0';
  public idNomGammeValue = '0';
  public idnbetageValue = 0;
  public idcoupeDePrincipesValue = '0';
  public idtypeRemplissagesValue = '0';

  public NomModeleErreur = false;
  public NomGammeErreur = false;
  public nbetageErreur = false;
  public coupeDePrincipesErreur = false;
  public typeRemplissagesErreur = false;

  constructor(
    private modeleService: ModeleService,
    private gammeService: GammeService,
    private etageService: EtageService,
    private typeRemplissageService: TypeRemplissageService,
    private coupeDePrincipeService: CoupeDePrincipeService,
    private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.idModele = this.route.snapshot.paramMap.get('idModele');
    console.log('test  this.idModele' + this.idModele);
    this.InitialiserGamme();

    this.gammeService.getGammes().pipe(
      finalize(() => ((document.getElementById('gammes')) as HTMLSelectElement).selectedIndex = 0
      ),
      map(gamme => gamme['hydra:member'])
    ).subscribe(
      gamme => this.gammes = gamme
    );

    this.coupeDePrincipeService.getCoupeDePrincipes().pipe(
      map(CoupeDePrincipe => CoupeDePrincipe['hydra:member'])
    ).subscribe(
      CoupeDePrincipe => this.coupeDePrincipes = CoupeDePrincipe
    );

    this.typeRemplissageService.getTypeRemplissages().pipe(
      map(TypeRemplissages => TypeRemplissage['hydra:member'])
    ).subscribe(
      TypeRemplissages => this.typeRemplissages = TypeRemplissages
    );

    this.nbetageValue = this.etages.length;

  }



  // tslint:disable-next-line:typedef
  async onSubmit(ajoutModele: NgForm) {

    console.log( 'etages' + this.etages.length);

    for ( let  i = 0 ; i < this.etages.length ; i++ )
    {
      console.log( 'etage' + i );
      const BaliseEtage = (document.getElementById('etage' + i)) as HTMLSelectElement;
      this.etages[i].numero = BaliseEtage.value ;
      console.log( BaliseEtage.value  );

      if ( this.etages[i].id == null )
      {
        this.etageService.addEtage(this.etages[i]);
        console.log('ajout etage');
      }
      else
      {
        this.etageService.UpdateEtage(this.etages[i]);
        console.log('modif etage');

      }
    }

    console.log(this.etages);



    console.log('cooouuuucooooouuuu ' + this.etages);

    if (ajoutModele.value.NomModeleValueform !== '') {
      this.NomModeleValue = ajoutModele.value.NomModeleValueform;
    }
    if (ajoutModele.value.NomGammeValueform !== '') {
      this.NomGammeValue = ajoutModele.value.NomGammeValueform;
    }
    this.nbetageValue = this.etages.length;
    if (ajoutModele.value.NomcoupeDePrincipeValueform !== '') {
      this.coupeDePrincipesValue = ajoutModele.value.NomcoupeDePrincipeValueform;
    }
    if (ajoutModele.value.NomtyperemplissagesValueform !== '') {
      this.typeRemplissagesValue = ajoutModele.value.NomtyperemplissagesValueform;
    }

    console.log('ajoutModele');
    console.log(ajoutModele.value);

    console.log(this.NomModeleValue + this.NomGammeValue + this.nbetageValue + this.typeRemplissagesValue + this.coupeDePrincipesValue);


    ajoutModele.value.NomModeleValueform.length <= 0 || ajoutModele.value.NomModeleValueform == null
      ? this.NomModeleErreur = true
      : this.NomModeleErreur = false;

    ajoutModele.value.NomGammeValueform.length <= 0 || ajoutModele.value.NomGammeValueform == null
      ? this.NomGammeErreur = true
      : this.NomGammeErreur = false;

    this.nbetageValue == null
      ? this.nbetageErreur = true
      : this.nbetageErreur = false;

    ajoutModele.value.NomcoupeDePrincipeValueform.length <= 0 || ajoutModele.value.NomcoupeDePrincipeValueform == null
      ? this.coupeDePrincipesErreur = true
      : this.coupeDePrincipesErreur = false;

    ajoutModele.value.NomtyperemplissagesValueform.length <= 0 || ajoutModele.value.NomtyperemplissagesValueform == null
      ? this.typeRemplissagesErreur = true
      : this.typeRemplissagesErreur = false;

    console.log('testwesh');

    console.log('testwesh1');

    this.Modele = new Modele(this.NomModeleValue,
         new Date(),
          false
        , this.nbetageValue
        , '/api/gammes/' + this.NomGammeValue
        , '/api/type_remplissages/' + this.typeRemplissagesValue
        , '/api/coupe_de_principes/' + this.coupeDePrincipesValue
      );
    this.Modele.id = 1;
    // this.idModele;
      // console.log(this.gamme.qualite_huisseries_id);
    if (await this.modeleService.syncUpdateModele(this.Modele)) {
        this.ngOnInit();
        console.log('/Liste-Modele/' + this.idGamme);
        console.log('ok pas derreur modif');
       // this.router.navigateByUrl('/Liste-Modele/' + this.idGamme);
      }
      else { // afficher erreur
        console.log('non erreur modif');
      }


  }

  // tslint:disable-next-line:typedef
  async InitialiserGamme() {

    this.Modele = await this.modeleService.getOneModeleById(this.idModele);
    this.NomModeleValue = this.Modele.libelle;

    this.idGamme = this.Modele.gamme.substring('/api/gammes/'.length);
    this.gamme = await this.gammeService.getOneGammeById(this.idGamme);
    this.NomGammeValue = this.gamme.libelle;

    this.typeRemplissage = await this.typeRemplissageService.getOneTypeRemplissageByICleEtrangere(this.Modele.typeRemplissage.substring(4));
    this.typeRemplissagesValue = this.typeRemplissage.libelle;

    this.coupeDePrincipe = await this.coupeDePrincipeService.getOneCoupeDePrincipeByICleEtrangere(this.Modele.coupeDePrincipe.substring(4));
    this.coupeDePrincipesValue = this.coupeDePrincipe.libelle;


    this.etageService.getEtages().pipe(
      finalize(() => this.etages = this.etages.filter(etage => etage.modele === '/api/modeles/' + this.idModele)//
      ), map(etage => etage['hydra:member'])// ,filter(Module => Module.gamme === '/api/gammes/'+this.idGamme)//
    ).subscribe(
      etage => this.etages = etage
    );


    // this.gamme = await this.gammeService.getOneGammeById(this.idGamme);
    // this.NomGammeValue = this.gamme.libelle;

    const DropdownList = (document.getElementById('gammes')) as HTMLSelectElement;


    this.idNomModeleValue = this.Modele.id;
    this.idNomGammeValue = this.gamme.id;
    this.idcoupeDePrincipesValue = this.coupeDePrincipe.id;
    this.idtypeRemplissagesValue = this.typeRemplissage.id;

    DropdownList.selectedIndex = 0;
  }

  AjoutEtage(): void {

    this.etages.push( new Etage('/api/modeles/'+this.idModele) );

    this.nbetageValue = this.etages.length;
    console.log('test');
  }
  RetirerEtage(idligneaenlever): void {

    this.etages.splice(idligneaenlever, 1);
    this.nbetageValue = this.etages.length;
    console.log('test');

  }
}
