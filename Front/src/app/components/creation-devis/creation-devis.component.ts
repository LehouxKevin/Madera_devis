import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Gamme } from 'src/app/class/Gamme';
import { TypeIsolation } from 'src/app/class/type-isolation';
import { GammeService } from 'src/app/services/gamme.service';

@Component({
  selector: 'app-creation-devis',
  templateUrl: './creation-devis.component.html',
  styleUrls: ['./creation-devis.component.css']
})
export class CreationDevisComponent implements OnInit, AfterViewInit {

  public gammes:Gamme[] = [];
  public typesIsolation:TypeIsolation[] = [];

  texteGamme = "";
  texteTypeIsolation ="";

  idGammeSelectionnee = 0;
  idTypeIsoSelectionnee = 0;

  isLoading = false;

  constructor(private gammeService: GammeService) { }

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

  handleChoixGamme(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteGamme = event.srcElement.text;
    this.idGammeSelectionnee = value.substring(7);
    console.log(event.srcElement.text + " | "+this.idGammeSelectionnee);
  
  }

  handleChoixTypeIsolation(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.texteTypeIsolation = event.srcElement.text;
    this.idTypeIsoSelectionnee = value.substring(9);
    console.log(event.srcElement.text + " | "+this.idGammeSelectionnee);
  }

}
