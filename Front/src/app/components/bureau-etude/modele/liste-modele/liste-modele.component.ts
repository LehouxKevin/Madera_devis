import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from 'src/app/class/Modele';
import { environment } from 'src/environments/environment';
import { ModeleService } from 'src/app/services/modele.service';
import { map ,finalize} from 'rxjs/operators';
import {  Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-modele',
  templateUrl: './liste-modele.component.html',
  styleUrls: ['./liste-modele.component.css']
})
export class ListeModeleComponent implements OnInit {

   public modeles:Modele[] = [];
    public libellemodele = "";
    @Input() AfficherListe: boolean= true;

Displayliste:boolean = true;
DisplaySuppression:boolean = false;

public idGamme;

public idmodeleSupprimer;
public nomModeleSupprimer="null";
  constructor(private modeleService: ModeleService, private router: Router, private route: ActivatedRoute,  private http: HttpClient) { }

  ngOnInit(): void {
    this.idGamme = this.route.snapshot.paramMap.get('idGamme');

   this.modeleService.getModeles().pipe(
   finalize(() => this.modeles =this.modeles.filter(modele => modele.gamme === "/api/gammes/"+this.idGamme)),//,
        map(modele => modele['hydra:member'])
      ).subscribe(
        modele => this.modeles = modele
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

  supprimerModele(id:number):void {

    this.idmodeleSupprimer = id;

    this.modeles.forEach( (modele, index) => {
      if (modele.id == this.idmodeleSupprimer) {
        this.nomModeleSupprimer = modele.libelle;
      }
    });

    document.getElementById("idModele"+id).style.border = "solid #2699FB 6px";
this.DisplaySuppression=true;    //modif champs nom delete
    //afficher fenetre
  }

  confirmerSuppressionModele():void {
    //Supprimer le fournisseur en question (KEVIN LEHOUX)
    this.modeleService.asyncDeleteModele(this.idmodeleSupprimer);

    console.log("Suppression de "+this.idmodeleSupprimer);

    document.getElementById("idModele"+this.idmodeleSupprimer).style.border = "0";
        this.idmodeleSupprimer = 0;

    this.DisplaySuppression=false;
    this.ngOnInit();
   /*this.router.navigateByUrl('/liste-Modele');*/
document.location.reload();

  }

  annulerSuppressionModele():void {
    document.getElementById("idModele"+this.idmodeleSupprimer).style.border = "0";
        this.idmodeleSupprimer = 0;
  this.DisplaySuppression=false;  }


}
