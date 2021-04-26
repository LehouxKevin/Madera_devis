import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TypeModule } from 'src/app/class/type-module';
import { TypeModuleService } from 'src/app/services/type-module.service';

@Component({
  selector: 'app-liste-types-module',
  templateUrl: './liste-types-module.component.html',
  styleUrls: ['./liste-types-module.component.css']
})
export class ListeTypesModuleComponent implements OnInit, OnDestroy {

  tm:TypeModule;

  public typesModule:any[] = [];
  public typeModule;

  constructor(private router:Router, private typeModuleService:TypeModuleService) { }

  ngOnInit(): void {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 5px";
    document.getElementById("bouton_typeModule").style.border = "solid 2px #1d2932";
    document.getElementById("bouton_typeModule").style.color = "#1d2932";
    document.getElementById("bouton_typeModule").setAttribute("onclick","return false");
    this.typeModuleService.getTypesModule().pipe(
      map(typeModule => typeModule['hydra:member'])
    ).subscribe(
      typeModule => this.typesModule = typeModule
    );
  }

  ngOnDestroy() {
    document.getElementById("icone_listeParametres").style.borderLeft = "solid #BCE0FD 0px";
  }

  displayTypeModule()
  {
    console.log("Créer un type de module !");
  }
}
