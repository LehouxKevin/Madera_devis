import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter, Output  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';
import { Etage } from 'src/app/class/Etage';
import {TypeRemplissage  } from 'src/app/class/type-remplissage';
import {  CoupeDePrincipes } from 'src/app/class/coupe-de-principes';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { GammeService } from 'src/app/services/gamme.service';
import { EtageService } from 'src/app/services/etage.service';
import { TypeRemplissageService } from 'src/app/services/type-remplissage.service';
import { CoupeDePrincipeService } from 'src/app/services/coupe-de-principe.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { filter , map, finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-creation-modele',
  templateUrl: './creation-modele.component.html',
  styleUrls: ['./creation-modele.component.css']
})
export class CreationModeleComponent implements OnInit {

public Modele;
public gamme;

    public gammes: Gamme[] = [];
    public etages: Etage[] = [];
    public coupeDePrincipes: CoupeDePrincipes[] = [];
    public typeRemplissages: TypeRemplissage[] = [];

public NomModeleValue = '------';
public NomGammeValue = '------';
public nbetageValue = 0 ;
public coupeDePrincipesValue = '------';
public typeRemplissagesValue = '------';

  public idNomGammeValue = '0';
  public idcoupeDePrincipesValue = '0';
  public idtypeRemplissagesValue = '0';

  public NomModeleErreur = false;
 public NomGammeErreur  = false;
  public nbetageErreur   = false;
    public coupeDePrincipesErreur  = false;
      public typeRemplissagesErreur = false;
  public idGamme = '0';

constructor(
 private modeleService: ModeleService,
 private gammeService: GammeService,
 private etageService: EtageService,
 private typeRemplissageService: TypeRemplissageService,
 private coupeDePrincipeService: CoupeDePrincipeService,
 private router: Router,
 private route: ActivatedRoute,
 private http: HttpClient) { }

  ngOnInit(): void {
      this.idGamme = this.route.snapshot.paramMap.get('idGamme');

      this.gammeService.getGammes().pipe(
        map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );

      this.coupeDePrincipeService.getCoupeDePrincipes().pipe(
                 map(coupeDePrincipe => coupeDePrincipe['hydra:member'])
                                ).subscribe(
        coupeDePrincipe => this.coupeDePrincipes = coupeDePrincipe
                                );

      this.typeRemplissageService.getTypeRemplissages().pipe(
                 map(typeRemplissage => typeRemplissage['hydra:member'])
                                ).subscribe(
                                  typeRemplissage => this.typeRemplissages = typeRemplissage
                                );

      this.InitialiserGamme();
  }








  // tslint:disable-next-line:typedef
 async onSubmit(ajoutModele: NgForm) {

  console.log('cooouuuucooooouuuu ');
  this.NomModeleValue = ajoutModele.value.NomModeleValueform;
  if (ajoutModele.value.NomGammeValueform !== '') {
     this.NomGammeValue = ajoutModele.value.NomGammeValueform;
   }
  this.nbetageValue = this.etages.length;
  this.coupeDePrincipesValue = ajoutModele.value.NomcoupeDePrincipeValueform;
  this.typeRemplissagesValue = ajoutModele.value.NomtyperemplissagesValueform;

  console.log(this.NomModeleValue + this.NomGammeValue + this.nbetageValue);


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

  if ( !this.NomModeleErreur
  &&   !this.nbetageErreur)
    {
    console.log('testwesh');

    this.Modele = new Modele(
                      this.NomModeleValue,
                      new Date() ,
              false,
                      this.nbetageValue,
              '/api/gammes/' + this.idNomGammeValue,
      '/api/type_remplissages/' + this.typeRemplissagesValue,
      '/api/coupe_de_principes/' + this.coupeDePrincipesValue);

    // console.log(this.gamme.qualite_huisseries_id);
    const IdModeleCree = await this.modeleService.addModele(this.Modele);
    console.log(this.Modele);

    if ( IdModeleCree > 0)
        {
           this.ngOnInit();
           console.log('/Liste-Modele/' + this.idGamme);

           for ( let  i = 0 ; i < this.etages.length ; i++ )
          {
            const BaliseEtage = (document.getElementById('etage' + i)) as HTMLSelectElement;
            this.etages[i].numero = BaliseEtage.value ;
            this.etages[i].modele = '/api/modeles/' + IdModeleCree;
            this.etageService.addEtage(this.etages[i]);
          }


           this.router.navigateByUrl('/Liste-Modele/' + this.idGamme);
        }
        else { // afficher erreur
          console.log('non');
        }
    }

  }


  // tslint:disable-next-line:typedef
  async InitialiserGamme() {


  this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
  this.NomGammeValue = this.gamme.libelle;
  this.idNomGammeValue = this.gamme.id;
  const DropdownList = (document.getElementById('gammes')) as HTMLSelectElement;

  DropdownList.selectedIndex = 0;
    }

    AjoutEtage(): void {

    this.etages.push( new  Etage(null));
    this.nbetageValue = this.etages.length;
    console.log('test');

        }
   RetirerEtage(idligneaenlever): void {
    console.log('test');
    this.etages.splice(idligneaenlever, 1);
    this.nbetageValue = this.etages.length;
    }
  ListeDeroulanteChangerIndex(ChoixListe , IndexSelectionne): void {
    // Indique l'option selectionné.
    // permet de definir l'index qui est en BDD sur la table voulu

    // tslint:disable-next-line:triple-equals
    if ( ChoixListe == 'idNomGammeValue' ) {
      this.idNomGammeValue = IndexSelectionne;
    }
    // tslint:disable-next-line:triple-equals
    if ( ChoixListe == 'idcoupeDePrincipesValue' ) {
      this.idcoupeDePrincipesValue = IndexSelectionne;
    }
    // tslint:disable-next-line:triple-equals
    if ( ChoixListe == 'idtypeRemplissagesValue' ) {
      this.idtypeRemplissagesValue = IndexSelectionne;
    }
  }
}
