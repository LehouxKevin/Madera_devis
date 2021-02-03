import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client.service';
import { DevisService } from 'src/app/services/devis.service';
import { EtatAvancementService } from 'src/app/services/etat-avancement.service';

@Component({
  selector: 'app-liste-devis',
  templateUrl: './liste-devis.component.html',
  styleUrls: ['./liste-devis.component.css']
})
export class ListeDevisComponent implements OnInit, OnDestroy {

  public listDevis:any[] = [];
  isLoading:boolean = false;
  public idDevis;
  public ancienIdDevis;

  constructor(private router: Router, private devisService: DevisService, private etatAvancementService: EtatAvancementService, private clientService: ClientService) { }

  ngOnInit(): void {
    var index = 0;
    this.idDevis = 0;
    this.ancienIdDevis = 0;
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 5px";
    // À REFAIRE en sync !!
    //var devis = this.devisService.syncGetDevis()
    //console.log(devis);
    this.devisService.getDevis().pipe(
      map(devis => devis['hydra:member'])
    ).subscribe(
      devis =>{
        devis.forEach(async (d, index) => {
          var etatAvancement = await this.etatAvancementService.getEtatAvancementByLink(d.etatAvancement);
          devis[index].etatAvancement = etatAvancement["libelle"];

          var client = await this.clientService.getOneClientByLink(d.client);
          devis[index].client = "n°"+client["id"];

          if (d.statut) {
            document.getElementById("statut_devis"+d.id).style.background = "green";
            document.getElementById("statut_devis"+d.id).style.color = "white";
            document.getElementById("statut_devis"+d.id).textContent = "";
          }
          else {
            document.getElementById("statut_devis"+d.id).style.background = "red";
            document.getElementById("statut_devis"+d.id).style.color = "white";
            document.getElementById("statut_devis"+d.id).textContent = "";
          }
        });
      this.listDevis = devis;
    });
  }

  ngOnDestroy() {
    document.getElementById("icone_listeDevis").style.borderLeft = "solid #BCE0FD 0px";
  }

  async consulterClient(clientURL, id) {
    if (this.idDevis != 0) {
      if (this.ancienIdDevis != this.idDevis) {
        this.ancienIdDevis = this.idDevis;
        document.getElementById("id_devis"+this.ancienIdDevis).style.border = "0";
      }
    }
    var idClient = clientURL.slice(2);
    this.idDevis = id;
    var client = await this.clientService.getOneClientById(idClient);
    document.getElementById("deleteWindow").style.display = "none";
    document.getElementById("id_devis"+id).style.border = "solid #2699FB 2px";
    document.getElementById("clientFiche_nomPrenom").textContent = client["nom"]+" "+client["prenom"];
    document.getElementById("clientFiche_email").textContent = client["mail"];
    document.getElementById("clientFiche_telephone").textContent = client["telephone"];
    document.getElementById("clientFiche_adresse").textContent = client["adresse"];
    document.getElementById("clientWindow").style.display = "block";
  }

  quitterFicheClient() {
    document.getElementById("id_devis"+this.idDevis).style.border = "0";
    document.getElementById("clientWindow").style.display = "none";
    this.idDevis = 0;
  }

  consulterDevis(id) {
    console.log("Consulter "+id);
  }

  modifierDevis(id) {
    console.log("Modifier "+id);
  }

  supprimerDevis(id) {
    if (this.idDevis != 0) {
      if (this.ancienIdDevis != this.idDevis) {
        this.ancienIdDevis = this.idDevis;
        document.getElementById("id_devis"+this.ancienIdDevis).style.border = "0";
      }
    }
    this.idDevis = id;
    document.getElementById("clientWindow").style.display = "none";
    document.getElementById("id_devis"+id).style.border = "solid #2699FB 2px";
    document.getElementById("devisDelete").textContent = id;
    document.getElementById("deleteWindow").style.display = "block";
  }

  confirmerSuppressionFounisseur():void {
    this.devisService.asyncDeleteFournisseur(this.idDevis);
    console.log("Suppression de "+this.idDevis);
    document.getElementById("deleteWindow").style.display = "none";
    this.ngOnInit();
  }

  annulerSuppressionFounisseur():void {
    document.getElementById("id_devis"+this.idDevis).style.border = "0";
    this.idDevis = 0;
    document.getElementById("deleteWindow").style.display = "none";
  }
}
