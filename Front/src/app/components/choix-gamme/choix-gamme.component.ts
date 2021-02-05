import { AfterViewInit, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { FinitionInterieur } from 'src/app/class/finition-interieur';
import { Gamme } from 'src/app/class/Gamme';
import { Modele } from 'src/app/class/Modele';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';
import { FinitionInterieurService } from 'src/app/services/finition-interieur.service';
import { GammeService } from 'src/app/services/gamme.service';
import { ModeleService } from 'src/app/services/modele.service';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';
import { TypeCouvertureService } from 'src/app/services/type-couverture.service';
import { TypeIsolationService } from 'src/app/services/type-isolation.service';

@Component({
  selector: 'app-choix-gamme',
  templateUrl: './choix-gamme.component.html',
  styleUrls: ['./choix-gamme.component.css']
})
export class ChoixGammeComponent implements OnInit, AfterViewInit {

  // Objets
  public gammes:Gamme[] = [];
  public typesIsolation:TypeIsolation[] = [];
  public finitionsExterieur:FinitionExterieur[] = [];
  public finitionsInterieur:FinitionInterieur[] = [];
  public typesCouverture:TypeCouverture[] = [];
  public qualiteHuisseries:QualiteHuisseries[] = [];
  public conceptionsOssatures:ConceptionOssature[] = [];


  public listeModele:Modele[]=[];

  // Textes des boutons des selecteurs
  texteGamme = "Selectionnez une gamme";
  texteTypeIsolation = "";
  texteFinitionExterieur = "";
  texteFinitionInterieur = "";
  texteTypeCouverture = "";
  texteQualiteHuisserie = "";
  texteConceptionOssature = "";

  // Id des elements selectionnés
  idGammeSelectionnee = 0;
  idTypeIsoSelectionnee = 0;
  idFinitionExterieurSelectionnee = 0;
  idFinitionInterieurSelectionnee = 0;
  idTypeCouvertureSelectionnee = 0;
  idQualiteHuisserieSelectionnee = 0;
  idConceptionOssatureSelectionnee = 0;

  // url précis des champs selectionnées
  urlTypeIsolationSelectionnee:string = "";
  urlFinitionExterieurSelectionnee:string = "";
  urlFinitionInterieurSelectionnee:string = "";
  urlTypeCouvertureSelectionnee:string = "";
  urlQualiteHuisserieSelectionnee:string = ""
  urlConceptionOssatureSelectionnee:string = "";

  // url pour l'api des différents champs
  urlTypeIsolation:string = "/type_isolations/";
  urlFinitionExterieur:string = "/finition_exterieurs/";
  urlFinitionInterieur:string = "/finition_interieurs/";
  urlTypeCouverture:string = "/type_couvertures/";
  urlQualiteHuisserie:string = "/qualite_huisseries/";
  urlConceptionOssature:string = "/conception_ossatures/";


  isLoading = false;

  constructor(private gammeService: GammeService,
     private typeIsolationService: TypeIsolationService,
      private finitionExterieurService:FinitionExterieurService,
      private finitionInterieurService:FinitionInterieurService,
      private typeCouvertureService:TypeCouvertureService,
      private qualiteHuisserieService:QualiteHuisseriesService,
      private conceptionOssatureService:ConceptionOssatureService,
      private modeleService:ModeleService) { }

  ngOnInit(): void {
    this.isLoading = true;
  }

  async ngAfterViewInit() {
    await this.getGammes();
    
    this.isLoading = false;
  }

  async getGammes()
  {
    this.gammes = await this.gammeService.syncGetGammes();
    console.log(this.gammes);

  }

  async handleChoixGamme(event)
  {
    this.isLoading = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteGamme = event.srcElement.text;
    this.idGammeSelectionnee = value.substring(7);
    console.log(event.srcElement.text + " | "+this.idGammeSelectionnee);

    var gamme = await this.gammeService.getOneGammeById(this.idGammeSelectionnee);
    this.urlTypeIsolationSelectionnee = gamme["typeIsolation"];
    this.urlFinitionExterieurSelectionnee = gamme["finitionExt"];
    this.urlFinitionInterieurSelectionnee = gamme["finitionInterieur"];
    this.urlTypeCouvertureSelectionnee = gamme["typeCouverture"];
    this.urlQualiteHuisserieSelectionnee = gamme["qualiteHuisseries"];
    this.urlConceptionOssature = gamme["conceptionOssature"];
    console.log(gamme);
  
    this.loadDataFieldsGamme();
   
    
  }

  /** Méthode qui requête les informatons par défaut d'une gamme et rempli les selecteurs ave les autres valeurs disponibles
   * Requêtes asynchrones mais synchronisées par une promise pour savoir quand elles se terminent
   */
  loadDataFieldsGamme()
  {
    var typeIsolationByCleEtrangereRequest = this.typeIsolationService.asyncGetOneTypeIsolationByCleEtrangere(this.urlTypeIsolationSelectionnee.substring(4));
    var finitionExterieurByCleEtrangereRequest = this.finitionExterieurService.asyncGetOneFinitionExterieurByCleEtrangere(this.urlFinitionExterieurSelectionnee.substring(4));
    var finitionInterieurByCleEtrangereRequest = this.finitionInterieurService.asyncGetOneFinitionInterieurByCleEtrangere(this.urlFinitionInterieurSelectionnee.substring(4));
    var typeCouvertureByCleEtrangereRequest = this.typeCouvertureService.asyncGetOneTypeCouvertureByCleEtrangere(this.urlTypeCouvertureSelectionnee.substring(4));
    var qualiteHuisserieByCleEtrangereRequest = this.qualiteHuisserieService.asyncGetOneQualiteHuisserieByCleEtrangere(this.urlQualiteHuisserieSelectionnee.substring(4));
    var conceptionOssatureByCleEtrangereRequest = this.conceptionOssatureService.asyncGetOneConceptionOssatureByCleEtrangere(this.urlConceptionOssature.substring(4));

    var typesIsolationRequest = this.typeIsolationService.asyncGetTypesIsolation();
    var finitionsExterieursRequest = this.finitionExterieurService.asyncGetFinitionsExterieur();
    var finitionsInterieursRequest = this.finitionInterieurService.asyncGetFinitionsInterieur();
    var typesCouvertureRequest = this.typeCouvertureService.asyncGetTypesCouverture();
    var qualiteHuisseriesRequest = this.qualiteHuisserieService.asyncGetQualiteHuisseries();
    var conceptionsOssaturesRequest = this.conceptionOssatureService.asyncGetConceptionOssatures();

    var listeModeleRequest = this.modeleService.asyncGetModeles();
    // Promises simultanées sur des requêtes asynchrones mais bloque l'interface tant qu'elle ne sont pas terminées
    forkJoin([typeIsolationByCleEtrangereRequest,
      finitionExterieurByCleEtrangereRequest,
      finitionInterieurByCleEtrangereRequest,
      typeCouvertureByCleEtrangereRequest,
      qualiteHuisserieByCleEtrangereRequest,
      conceptionOssatureByCleEtrangereRequest,
      typesIsolationRequest, 
      finitionsExterieursRequest,
      finitionsInterieursRequest, 
      typesCouvertureRequest , 
      qualiteHuisseriesRequest,
      conceptionsOssaturesRequest,
      listeModeleRequest])
    .subscribe(response => { 
      console.log(response);
      this.texteTypeIsolation = response[0]["libelle"];
      this.texteFinitionExterieur = response[1]["libelle"];
      this.texteFinitionInterieur = response[2]["libelle"];
      this.texteTypeCouverture = response[3]["libelle"];
      this.texteQualiteHuisserie = response[4]["libelle"];
      this.texteConceptionOssature = response[5]["libelle"];

      this.idTypeIsoSelectionnee = response[0]["id"];
      this.idFinitionExterieurSelectionnee = response[1]["id"];
      this.idFinitionInterieurSelectionnee = response[2]["id"];
      this.idTypeCouvertureSelectionnee = response[3]["id"];
      this.idQualiteHuisserieSelectionnee = response[4]["id"];
      this.idConceptionOssatureSelectionnee = response[5]["id"];

      this.typesIsolation = response[6]['hydra:member'];
      this.finitionsExterieur = response[7]['hydra:member'];
      this.finitionsInterieur = response[8]['hydra:member'];
      this.typesCouverture = response[9]['hydra:member'];
      this.qualiteHuisseries = response[10]['hydra:member'];
      this.conceptionsOssatures = response[11]['hydra:member'];

      this.listeModele = response[12]['hydra:member'];
      console.log(this.typesIsolation);
      console.log(this.finitionsExterieur);
      console.log(this.finitionsInterieur);
      console.log(this.typesCouverture);
      console.log(this.qualiteHuisseries);
      console.log(this.conceptionsOssatures);
      console.log(this.listeModele);

      this.isLoading = false;
    })
  }

  handleChoixTypeIsolation(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteTypeIsolation = event.srcElement.text;
    this.idTypeIsoSelectionnee = value.substring(9);
    console.log(event.srcElement.text + " | " + this.idTypeIsoSelectionnee);
  }

  handleChoixFinitionExterieur(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteFinitionExterieur = event.srcElement.text;
    this.idFinitionExterieurSelectionnee = value.substring(9);
    console.log(event.srcElement.text + " | " + this.idFinitionExterieurSelectionnee);
  }

  handleChoixfinitionInterieur(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteFinitionInterieur = event.srcElement.text;
    this.idFinitionInterieurSelectionnee = value.substring(9);
    console.log(event.srcElement.text + " | " + this.idFinitionInterieurSelectionnee);
  }

  handleChoixTypeCouverture(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteTypeCouverture = event.srcElement.text;
    this.idTypeCouvertureSelectionnee = value.substring(10);
    console.log(event.srcElement.text + " | " + this.idTypeCouvertureSelectionnee);
  }

  handleChoixQualiteHuisserie(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteQualiteHuisserie = event.srcElement.text;
    this.idQualiteHuisserieSelectionnee = value.substring(10);
    console.log(event.srcElement.text + " | " + this.idQualiteHuisserieSelectionnee);
  }

  handleChoixconceptionOssature(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteConceptionOssature = event.srcElement.text;
    this.idConceptionOssatureSelectionnee = value.substring(13);
    console.log(event.srcElement.text + " | " + this.idConceptionOssatureSelectionnee);
  }
}
