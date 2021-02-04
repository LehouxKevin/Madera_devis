import { AfterViewInit, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ConceptionOssature } from 'src/app/class/conception-ossature';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { Gamme } from 'src/app/class/Gamme';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { ConceptionOssatureService } from 'src/app/services/conception-ossature.service';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';
import { GammeService } from 'src/app/services/gamme.service';
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
  public typesCouverture:TypeCouverture[] = [];
  public qualiteHuisseries:QualiteHuisseries[] = [];
  public conceptionsOssatures:ConceptionOssature[] = [];

  // Textes des boutons des selecteurs
  texteGamme = "Selectionnez une gamme";
  texteTypeIsolation = "";
  texteFinitionExterieur = "";
  texteTypeCouverture = "";
  texteQualiteHuisserie = "";
  texteConceptionOssature = "";

  // Id des elements selectionnés
  idGammeSelectionnee = 0;
  idTypeIsoSelectionnee = 0;
  idFinitionExterieurSelectionnee = 0;
  idTypeCouvertureSelectionnee = 0;
  idQualiteHuisserieSelectionnee = 0;
  idConceptionOssatureSelectionnee = 0;

  // url pour l'api des différents chamms
  urlTypeIsolation:string = "/type_isolations/";
  urlFinitionExterieur:string = "/finition_exterieurs/";
  urlTypeCouverture:string = "/type_couvertures/";
  urlQualiteHuisserie:string = "/qualite_huisseries/"
  urlConceptionOssature:string = "/conception_ossatures/"


  isLoading = false;

  constructor(private gammeService: GammeService,
     private typeIsolationService: TypeIsolationService,
      private finitionExterieurService:FinitionExterieurService,
      private typeCouvertureService:TypeCouvertureService,
      private qualiteHuisserieService:QualiteHuisseriesService,
      private conceptionOssatureService:ConceptionOssatureService) { }

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
  
    this.loadDataFieldsGamme();
   
    
  }

  /** Méthode qui requête les informatons par défaut d'une gamme et rempli les selecteurs ave les autres valeurs disponibles
   * Requêtes asynchrones mais synchronisées par une promise pour savoir quand elles se terminent
   */
  loadDataFieldsGamme()
  {
    var typeIsolationByCleEtrangereRequest = this.typeIsolationService.asyncGetOneTypeIsolationByCleEtrangere(this.urlTypeIsolation+this.idTypeIsoSelectionnee);
    var finitionExterieurByCleEtrangereRequest = this.finitionExterieurService.asyncGetOneFinitionExterieurByCleEtrangere(this.urlFinitionExterieur+this.idFinitionExterieurSelectionnee);
    var typeCouvertureByCleEtrangereRequest = this.typeCouvertureService.asyncGetOneTypeCouvertureByCleEtrangere(this.urlTypeCouverture+this.idTypeCouvertureSelectionnee);
    var qualiteHuisserieByCleEtrangereRequest = this.qualiteHuisserieService.asyncGetOneQualiteHuisserieByCleEtrangere(this.urlQualiteHuisserie+this.idQualiteHuisserieSelectionnee);
    var conceptionOssatureByCleEtrangereRequest = this.conceptionOssatureService.asyncGetOneConceptionOssatureByCleEtrangere(this.urlConceptionOssature+this.idConceptionOssatureSelectionnee);

    var typesIsolationRequest = this.typeIsolationService.asyncGetTypesIsolation();
    var finitionsExterieursRequest = this.finitionExterieurService.asyncGetFinitionsExterieur();
    var typesCouvertureRequest = this.typeCouvertureService.asyncGetTypesCouverture();
    var qualiteHuisseriesRequest = this.qualiteHuisserieService.asyncGetQualiteHuisseries();
    var conceptionsOssaturesRequest = this.conceptionOssatureService.asyncGetConceptionOssatures();
    // Promises simultanées sur des requêtes asynchrones mais bloque l'interface tant qu'elle ne sont pas terminées
    forkJoin([typeIsolationByCleEtrangereRequest,
      finitionExterieurByCleEtrangereRequest,
      typeCouvertureByCleEtrangereRequest,
      qualiteHuisserieByCleEtrangereRequest,
      conceptionOssatureByCleEtrangereRequest,
      typesIsolationRequest, 
      finitionsExterieursRequest , 
      typesCouvertureRequest , 
      qualiteHuisseriesRequest,conceptionsOssaturesRequest])
    .subscribe(response => { 
      console.log(response);
      this.texteTypeIsolation = response[0]["libelle"];
      this.texteFinitionExterieur = response[1]["libelle"];
      this.texteTypeCouverture = response[2]["libelle"];
      this.texteQualiteHuisserie = response[3]["libelle"];
      this.texteConceptionOssature = response[4]["libelle"];
      this.typesIsolation = response[5]['hydra:member'];
      this.finitionsExterieur = response[6]['hydra:member'];
      this.typesCouverture = response[7]['hydra:member'];
      this.qualiteHuisseries = response[8]['hydra:member'];
      this.conceptionsOssatures = response[9]['hydra:member'];
      console.log(this.typesIsolation);
      console.log(this.finitionsExterieur);
      console.log(this.typesCouverture);
      console.log(this.qualiteHuisseries);
      console.log(this.conceptionsOssatures);

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
