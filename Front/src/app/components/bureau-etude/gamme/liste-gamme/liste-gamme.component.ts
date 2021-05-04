import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gamme } from 'src/app/class/Gamme';
import { environment } from 'src/environments/environment';
import { GammeService } from 'src/app/services/gamme.service';
import { map } from 'rxjs/operators';
import {  Input } from '@angular/core';
import { Router } from '@angular/router';


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
DisplaySuppression:boolean = false;

public idgammeSupprimer;
public nomGammeSupprimer="null";
  constructor(private gammeService: GammeService, private router: Router,  private http: HttpClient) { }

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

  supprimerGamme(id:number):void {

    this.idgammeSupprimer = id;

    this.gammes.forEach( (gamme, index) => {
      if (gamme.id == this.idgammeSupprimer) {
        this.nomGammeSupprimer = gamme.libelle;
      }
    });

    document.getElementById("idGamme"+id).style.border = "solid #2699FB 6px";
this.DisplaySuppression=true;    //modif champs nom delete
    //afficher fenetre
  }

  confirmerSuppressionGamme():void {

    console.log( this.gammeService.asyncDeleteGamme(this.idgammeSupprimer));


    console.log("Suppression de "+this.idgammeSupprimer);

    document.getElementById("idGamme"+this.idgammeSupprimer).style.border = "0";
        this.idgammeSupprimer = 0;

    this.DisplaySuppression=false;
     this.ngOnInit();
   /*this.router.navigateByUrl('/liste-Gamme');*/
    document.location.reload();

  }

  annulerSuppressionGamme():void {
    document.getElementById("idGamme"+this.idgammeSupprimer).style.border = "0";
        this.idgammeSupprimer = 0;
  this.DisplaySuppression=false;  }


}
