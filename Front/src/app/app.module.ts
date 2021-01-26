import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DevisComponent } from './pages/devis/devis.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { BoutonDomingoComponent } from './components/bouton-domingo/bouton-domingo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreationCompteComponent } from './pages/creation-compte/creation-compte.component';
import { ConditionsUtilisationComponent } from './pages/conditions-utilisation/conditions-utilisation.component';
import { ChoixClientComponent } from './components/choix-client/choix-client.component';
import { ListeGammeComponent } from './components/modules/gammes/liste/liste-gamme/liste-gamme.component';


import {FormsModule } from '@angular/forms';
import { ConsultationGammeComponent } from './pages/modules/gammes/consultation_gamme/consultation-gamme/consultation-gamme.component';
import { CreationDevisComponent } from './components/creation-devis/creation-devis.component';
import { AjoutClientComponent } from './components/ajout-client/ajout-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DevisComponent,
    ModulesComponent,
    ConnexionComponent,
    BoutonDomingoComponent,
    SidebarComponent,
    CreationCompteComponent,
    ConditionsUtilisationComponent,
    ChoixClientComponent,
    SidebarComponent,
    ListeGammeComponent,
    ConsultationGammeComponent,
    CreationDevisComponent,
    AjoutClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
