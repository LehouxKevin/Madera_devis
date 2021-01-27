import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gamme } from 'src/app/class/Gamme';
import { environment } from 'src/environments/environment';
import { GammeService } from 'src/app/services/gamme.service';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
@Component({
  selector: 'app-liste-gamme',
  templateUrl: './liste-gamme.component.html',
  styleUrls: ['./liste-gamme.component.css']
})
export class ListeGammeComponent implements OnInit,AfterViewInit {
    public gammes:Gamme[] = [];
    public libellegamme = "";


  isClientPageVisible:boolean = true;
BoutonDisplay:boolean = true;


  constructor(private gammeService: GammeService, private http: HttpClient) { }

  ngOnInit(): void {
   this.gammeService.getGammes().pipe(
        map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );



  }


  handleDisplay():void  {

  if(this.isDisplayDivValeur == true)
  {
  this.isDisplayDivValeur =false;
  }
  if(this.isDisplayDivValeur == false)
  {
  this.isDisplayDivValeur = true;
  }

    }
handleNextStepButton():void {




if(this.isClientPageVisible == true)
  {
   this.isClientPageVisible =  false;

  }
  else{
  if(this.isClientPageVisible == false)
  {
  this.isClientPageVisible =  true;

  }}
  }

}
