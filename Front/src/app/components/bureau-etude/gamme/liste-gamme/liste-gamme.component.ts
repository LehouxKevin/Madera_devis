import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gamme } from 'src/app/class/Gamme';
import { environment } from 'src/environments/environment';
import { GammeService } from 'src/app/services/gamme.service';
import { map } from 'rxjs/operators';
import {  Input } from '@angular/core';


@Component({
  selector: 'app-liste-gamme',
  templateUrl: './liste-gamme.component.html',
  styleUrls: ['./liste-gamme.component.css'],
})

export class ListeGammeComponent implements OnInit {
    public gammes:Gamme[] = [];
    public libellegamme = "";
    @Input() AfficherListe: boolean= true;

Displayliste:boolean = true;


  constructor(private gammeService: GammeService, private http: HttpClient) { }

  ngOnInit(): void {
   this.gammeService.getGammes().pipe(
        map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );

 if(this.AfficherListe==false)
  {
     this.Displayliste =  false;
  }


  }



handleDisplayBouton():void {
if(this.Displayliste == true)
  {
   this.Displayliste =  false;

  }
  else{
  if(this.Displayliste == false)
  {
  this.Displayliste =  true;

  }}
  }



}
