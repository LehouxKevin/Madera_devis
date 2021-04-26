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
  public idGamme: String = "0";
  public idModele: String = "0";

  public coupeDePrincipe;
  public typeRemplissage;

  public gammes: Gamme[] = [];
  public etages: Etage[] = [];;
  public coupeDePrincipes: CoupeDePrincipes[] = [];
  public typeRemplissages: TypeRemplissage[] = [];

  public coupeDePrincipe;
  public typeRemplissage;

  public NomModeleValue = "Nom modele";
  public NomGammeValue = "------";
  public nbetageValue = 0;
  public coupeDePrincipesValue = "choose ...";
  public typeRemplissagesValue = "choose ...";


  public idNomModeleValue = "0";
  public idNomGammeValue = "0";
  public idnbetageValue = 0;
  public idcoupeDePrincipesValue = "0";
  public idtypeRemplissagesValue = "0";






  public NomModeleErreur: boolean = false;
  public NomGammeErreur: boolean = false;
  public nbetageErreur: boolean = false;
  public coupeDePrincipesErreur: boolean = false;
  public typeRemplissagesErreur: boolean = false;
  public idGamme: String = "0";

  constructor(
    private modeleService: ModeleService, private gammeService: GammeService, private etageService: EtageService, private typeRemplissageService: TypeRemplissageService,
    private coupeDePrincipeService: CoupeDePrincipeService,
    private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.idModele = this.route.snapshot.paramMap.get('idModele');
    console.log("test  this.idModele" + this.idModele);
    this.InitialiserGamme();
    this.gammeService.getGammes().pipe(
      finalize(() => ((document.getElementById("gammes")) as HTMLSelectElement).selectedIndex = 0
      ),
      map(gamme => gamme['hydra:member'])
    ).subscribe(
      gamme => this.gammes = gamme
    );

    this.coupeDePrincipeService.getCoupeDePrincipes().pipe(
      map(CoupeDePrincipes => CoupeDePrincipes['hydra:member'])
    ).subscribe(
      CoupeDePrincipes => this.coupeDePrincipes = CoupeDePrincipes
    );

    this.typeRemplissageService.getTypeRemplissages().pipe(
      map(TypeRemplissage => TypeRemplissage['hydra:member'])
    ).subscribe(
      TypeRemplissage => this.typeRemplissages = TypeRemplissage
    );


  }



  async onSubmit(ajoutModele: NgForm) {

    console.log("cooouuuucooooouuuu " + this.etages)

    if (ajoutModele.value.NomModeleValueform != "") {
      this.NomModeleValue = ajoutModele.value.NomModeleValueform;
    }
    if (ajoutModele.value.NomGammeValueform != "") {
      this.NomGammeValue = ajoutModele.value.NomGammeValueform;
    }
    this.nbetageValue = this.etages.length;
    if (ajoutModele.value.NomcoupeDePrincipeValueform != "") {
      this.coupeDePrincipesValue = ajoutModele.value.NomcoupeDePrincipeValueform;
    }
    if (ajoutModele.value.NomtyperemplissagesValueform != "") {
      this.typeRemplissagesValue = ajoutModele.value.NomtyperemplissagesValueform;
    }

    console.log("ajoutModele")
    console.log(ajoutModele.value)

    console.log(this.NomModeleValue + this.NomGammeValue + this.nbetageValue+this.typeRemplissagesValue+this.coupeDePrincipesValue);


    ajoutModele.value.NomModeleValueform.length <= 0 || ajoutModele.value.NomModeleValueform == null ? this.NomModeleErreur = true : this.NomModeleErreur = false;
    ajoutModele.value.NomGammeValueform.length <= 0 || ajoutModele.value.NomGammeValueform == null ? this.NomGammeErreur = true : this.NomGammeErreur = false;
    this.nbetageValue == null ? this.nbetageErreur = true : this.nbetageErreur = false;
    ajoutModele.value.NomcoupeDePrincipeValueform.length <= 0 || ajoutModele.value.NomcoupeDePrincipeValueform == null ? this.coupeDePrincipesErreur = true : this.coupeDePrincipesErreur = false;
    ajoutModele.value.NomtyperemplissagesValueform.length <= 0 || ajoutModele.value.NomtyperemplissagesValueform == null ? this.typeRemplissagesErreur = true : this.typeRemplissagesErreur = false;
    console.log("testwesh");

    console.log("testwesh1");

      this.Modele = new Modele(this.NomModeleValue,
         new Date(),
          false
        , this.nbetageValue
        , "/api/gammes/" + this.NomGammeValue
        , "/api/type_remplissages/" + this.typeRemplissagesValue
        , "/api/coupe_de_principes/" + this.coupeDePrincipesValue
      );
      this.Modele.id= 1;//this.idModele;
      //console.log(this.gamme.qualite_huisseries_id);
      if (await this.modeleService.syncUpdateModele(this.Modele)) {
        this.ngOnInit();
        console.log('/Liste-Modele/' + this.idGamme)
                console.log("ok pas d'erreur modif");

       // this.router.navigateByUrl('/Liste-Modele/' + this.idGamme);
      }
      else { // afficher erreur
        console.log("non erreur modif");
      }
    

  }


  async InitialiserGamme() {

    this.Modele = await this.modeleService.getOneModeleById(this.idModele);
    this.NomModeleValue = this.Modele.libelle;

    this.idGamme = this.Modele.gamme.substring("/api/gammes/".length);
    this.gamme = await this.gammeService.getOneGammeById(this.idGamme);
    this.NomGammeValue = this.gamme.libelle;

    this.typeRemplissage = await this.typeRemplissageService.getOneTypeRemplissageByICleEtrangere(this.Modele.typeRemplissage.substring(4));
    this.typeRemplissagesValue = this.typeRemplissage.libelle;

    this.coupeDePrincipe = await this.coupeDePrincipeService.getOneCoupeDePrincipeByICleEtrangere(this.Modele.coupeDePrincipe.substring(4));
    this.coupeDePrincipesValue = this.coupeDePrincipe.libelle;


    this.etageService.getEtages().pipe(
      finalize(() => this.etages = this.etages.filter(Etage => Etage.modele === "/api/modeles/" + this.idModele)//
      ), map(Etage => Etage['hydra:member'])//,filter(Module => Module.gamme === "/api/gammes/"+this.idGamme)//
    ).subscribe(
      Etage => this.etages = Etage
    );

    //this.gamme = await this.gammeService.getOneGammeById(this.idGamme);
    //this.NomGammeValue = this.gamme.libelle;

    var DropdownList = (document.getElementById("gammes")) as HTMLSelectElement;


    this.idNomModeleValue = this.Modele.id;
    this.idNomGammeValue = this.gamme.id;
    this.idcoupeDePrincipesValue = this.coupeDePrincipe.id;
    this.idtypeRemplissagesValue = this.typeRemplissage.id;

    DropdownList.selectedIndex = 0;
  }

  AjoutEtage(): void {

    this.etages.push(new Etage)
    this.nbetageValue = this.etages.length;
    console.log("test");
  }
  RetirerEtage(idligneaenlever): void {

    this.etages.splice(idligneaenlever, 1);
    this.nbetageValue = this.etages.length;
    console.log("test");

  }
}
