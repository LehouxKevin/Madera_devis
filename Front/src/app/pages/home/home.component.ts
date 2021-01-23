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
      document.getElementById('Ellipse_connexion').style.fill = "green";
    }
    else {
      document.getElementById('Ellipse_connexion').style.fill = "red";
    }
  }

  deconnexion(): void
  {
    var setTokken = {statut:"deconnecte", email:""};
    localStorage.setItem('tokken', JSON.stringify(setTokken));
  }
}
