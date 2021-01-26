import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  ngOnInit(): void 
  {
    this.router.navigate(['accueil']);
    var tokken = JSON.parse(localStorage.getItem('tokken'));
    if (tokken['statut'] == "connecte") {
      document.getElementById('lien_iconeProfil').style.display = "none";
      document.getElementById('Ellipse_connexion2').style.fill = "green";
      document.getElementById('lien_iconeProfil').setAttribute('routerlink', '/devis');
    }
    else {
      document.getElementById('lien_iconeProfil').style.display = "block";
      document.getElementById('lien_iconeProfil2').style.display = "none";
    }
  }
}
