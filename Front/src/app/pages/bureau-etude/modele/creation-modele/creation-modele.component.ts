import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter, Output  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { NgForm } from '@angular/forms';
import { Gamme } from 'src/app/class/Gamme';
import { Etage } from 'src/app/class/Etage';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { GammeService } from 'src/app/services/gamme.service';
import { EtageService } from 'src/app/services/etage.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { filter,map,finalize  } from 'rxjs/operators';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-creation-modele',
  templateUrl: './creation-modele.component.html',
  styleUrls: ['./creation-modele.component.css']
})
export class CreationModeleComponent implements OnInit {

public Modele;
public gamme;

    public gammes:Gamme[] = [];
    public etages:Etage[] = []; ;

public NomModeleValue="------";
public NomGammeValue="------";
public nbetageValue=0;
  public NomModeleErreur: boolean = false;
 public NomGammeErreur :boolean = false;
  public nbetageErreur  :boolean = false;
  public idGamme: String ="0";

constructor(
 private modeleService: ModeleService,private gammeService: GammeService,private etageService: EtageService,
       private router: Router,  private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
      this.idGamme = this.route.snapshot.paramMap.get('idGamme');

 this.gammeService.getGammes().pipe(

 finalize(() =>  ((document.getElementById("gammes")) as HTMLSelectElement).selectedIndex= 0

                //
 ) ,
        map(gamme => gamme['hydra:member'])
      ).subscribe(
        gamme => this.gammes = gamme
      );



this.InitialiserGamme();
  }








 async onSubmit(ajoutModele: NgForm) {

console.log("cooouuuucooooouuuu ")
this.NomModeleValue=ajoutModele.value.NomModeleValueform;
  this.NomGammeValue=ajoutModele.value.NomGammeValueform;
   this.nbetageValue= this.etages.length;


console.log(this.NomModeleValue+this.NomGammeValue+this.nbetageValue);


ajoutModele.value.NomModeleValueform.length <= 0 || ajoutModele.value.NomModeleValueform == null ? this.NomModeleErreur = true : this.NomModeleErreur = false;
ajoutModele.value.NomGammeValueform.length <= 0 || ajoutModele.value.NomGammeValueform == null ? this.NomGammeErreur = true : this.NomGammeErreur = false;
this.nbetageValue <= 0 || this.nbetageValue == null ? this.nbetageErreur = true : this.nbetageErreur = false;

if( !this.NomModeleErreur
&&   !this.NomGammeErreur
&&   !this.nbetageErreur)
{        console.log("testwesh");

this.Modele=new Modele(this.NomModeleValue,new Date() ,false
,this.nbetageValue,"/api/gammes/"+this.NomGammeValue,"/api/type_remplissages/1","/api/coupe_de_principes/1"
);
//console.log(this.gamme.qualite_huisseries_id);
     if(await this.modeleService.addModele(this.Modele))
      {
         this.ngOnInit();
         this.router.navigateByUrl('/Liste-Modele//'+this.idGamme);
      }
      else { // afficher erreur
        console.log("non");
      }
}

  }


  async InitialiserGamme() {


  this.gamme  =  await this.gammeService.getOneGammeById(this.idGamme);
  this.NomGammeValue=this.gamme.libelle;

var DropdownList = (document.getElementById("gammes")) as HTMLSelectElement;

DropdownList.selectedIndex= 0;
    }

    AjoutEtage():void {

    this.etages.push( new  Etage)
    this.nbetageValue= this.etages.length;
    console.log("test");

        }
           RetirerEtage(idligneaenlever):void {

            this.etages.splice(idligneaenlever, 1);
            this.nbetageValue= this.etages.length;
            console.log("test");

                }
}
