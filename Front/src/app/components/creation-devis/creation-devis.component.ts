import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FinitionExterieur } from 'src/app/class/finition-exterieur';
import { Gamme } from 'src/app/class/Gamme';
import { QualiteHuisseries } from 'src/app/class/qualite-huisseries';
import { TypeCouverture } from 'src/app/class/type-couverture';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { FinitionExterieurService } from 'src/app/services/finition-exterieur.service';
import { GammeService } from 'src/app/services/gamme.service';
import { QualiteHuisseriesService } from 'src/app/services/qualite-huisseries.service';
import { TypeCouvertureService } from 'src/app/services/type-couverture.service';
import { TypeIsolationService } from 'src/app/services/type-isolation.service';

@Component({
  selector: 'app-creation-devis',
  templateUrl: './creation-devis.component.html',
  styleUrls: ['./creation-devis.component.css']
})
export class CreationDevisComponent implements OnInit, AfterViewInit {

  // Objets
  public gammes:Gamme[] = [];
  public typesIsolation:TypeIsolation[] = [];
  public finitionsExterieur:FinitionExterieur[] = [];
  public typesCouverture:TypeCouverture[] = [];
  public qualiteHuisseries:QualiteHuisseries[] = [];

  // Textes des boutons des selecteurs
  texteGamme = "Selectionnez une gamme";
  texteTypeIsolation = "";
  texteFinitionExterieur = "";
  texteTypeCouverture = "";
  texteQualiteHuisserie = "";

  // Id des elements selectionnés
  idGammeSelectionnee = 0;
  idTypeIsoSelectionnee = 0;
  idFinitionExterieurSelectionnee = 0;
  idTypeCouvertureSelectionnee = 0;
  idQualiteHuisserieSelectionnee = 0;

  // url pour l'api des différents chamms
  urlTypeIsolation:string = "/type_isolations/";
  urlFinitionExterieur:string = "/finition_exterieurs/";
  urlTypeCouverture:string = "/type_couvertures/";
  urlQualiteHuisserie:string = "/qualite_huisseries/"


  isLoading = false;

  constructor(private gammeService: GammeService,
     private typeIsolationService: TypeIsolationService,
      private finitionExterieurService:FinitionExterieurService,
      private typeCouvertureService:TypeCouvertureService,
      private qualiteHuisserieService:QualiteHuisseriesService) { }

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
    //this.typesIsolation = await this.typeIsolation.
    var promises = [];
    
    //promises.push(this.typesIsolation.)
    //$q.all(promises).then(function(results){
        //results.forEach(function(data,status,headers,config){
        //console.log(data,status,headers,config);
      //})
//}),

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
  
    
    await this.loadTypesIsolations();
    await this.loadFinitionsExterieur();
    await this.loadTypesCouverture();
    await this.loadQualiteHuisseries();
    this.isLoading = false;
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

  async loadTypesIsolations()
  {
    // this.texteTypeIsolation
    var typeIsolation;
    typeIsolation = await this.typeIsolationService.getOneTypeIsolationByICleEtrangere(this.urlTypeIsolation+this.idGammeSelectionnee);
    this.texteTypeIsolation = typeIsolation.libelle;
    this.typesIsolation = await this.typeIsolationService.syncGetTypesIsolation();
    console.log(this.typesIsolation);
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

  async loadFinitionsExterieur()
  {
    var finitionExterieur;
    finitionExterieur = await this.finitionExterieurService.getOneFinitionExterieurByICleEtrangere(this.urlFinitionExterieur+this.idGammeSelectionnee);
    this.texteFinitionExterieur = finitionExterieur.libelle;
    this.finitionsExterieur = await this.finitionExterieurService.syncGetFinitionsExterieur();
    console.log(this.finitionsExterieur);
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

  async loadTypesCouverture()
  {
    var typeCouverture;
    typeCouverture = await this.typeCouvertureService.getOneTypeCouvertureByICleEtrangere(this.urlTypeCouverture+this.idGammeSelectionnee);
    this.texteTypeCouverture = typeCouverture.libelle;
    this.typesCouverture = await this.typeCouvertureService.syncGetTypesCouverture();
    console.log(this.typesCouverture);
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

  async loadQualiteHuisseries()
  {
    var qualiteHuisserie;
    qualiteHuisserie = await this.qualiteHuisserieService.getOneQualiteHuisserieByICleEtrangere(this.urlQualiteHuisserie+this.idGammeSelectionnee);
    this.texteQualiteHuisserie = qualiteHuisserie.libelle;
    this.qualiteHuisseries = await this.qualiteHuisserieService.syncGetQualiteHuisseries();
    console.log(this.qualiteHuisseries);
  }

}
