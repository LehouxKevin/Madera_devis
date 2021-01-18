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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DevisComponent,
    ModulesComponent,
    ConnexionComponent,
    BoutonDomingoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
