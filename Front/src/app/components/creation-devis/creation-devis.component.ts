import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Gamme } from 'src/app/class/Gamme';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { GammeService } from 'src/app/services/gamme.service';
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

  // Textes des boutons des selecteurs
  texteGamme = "Selectionnez une gamme";
  texteTypeIsolation = "";

  // Id des elements selectionnés
  idGammeSelectionnee = 0;
  idTypeIsoSelectionnee = 0;

  // url pour l'api des différents chamms
  urlTypeIsolation:string = "/type_isolations/";


  isLoading = false;

  constructor(private gammeService: GammeService, private typeIsolationService: TypeIsolationService) { }

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

  handleChoixGamme(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteGamme = event.srcElement.text;
    this.idGammeSelectionnee = value.substring(7);
    console.log(event.srcElement.text + " | "+this.idGammeSelectionnee);
  
    this.loadTypesIsolations();
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

}
