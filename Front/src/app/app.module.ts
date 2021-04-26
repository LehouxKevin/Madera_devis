import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DevisComponent } from './pages/devis/devis.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { BoutonDomingoComponent } from './components/bouton-domingo/bouton-domingo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreationCompteComponent } from './pages/creation-compte/creation-compte.component';
import { ConditionsUtilisationComponent } from './pages/conditions-utilisation/conditions-utilisation.component';
import { ChoixClientComponent } from './components/choix-client/choix-client.component';
import { ListeGammeComponent } from './components/bureau-etude/gamme/liste-gamme/liste-gamme.component';


import {FormsModule } from '@angular/forms';
import { CreationDevisComponent } from './components/creation-devis/creation-devis.component';
import { AjoutClientComponent } from './components/ajout-client/ajout-client.component';
import { OnlyNumberDirective } from './directive/only-number.directive';
import { ProfilComponent } from './pages/profil/profil.component';
import { CreationComposantComponent } from './pages/bureau-etude/composant/creation-composant/creation-composant.component';
import { ConsultationComposantComponent } from './pages/bureau-etude/composant/consultation-composant/consultation-composant.component';
import { ConsultationEtageComponent } from './pages/bureau-etude/etage/consultation-etage/consultation-etage.component';
import { ConsultationModeleComponent } from './pages/bureau-etude/modele/consultation-modele/consultation-modele.component';
import { ConsultationModuleComponent } from './pages/bureau-etude/module/consultation-module/consultation-module.component';
import { CreationConceptionOssatureComponent } from './pages/bureau-etude/parametre/conception-ossature/creation-conception-ossature/creation-conception-ossature.component';
import { ConsultationFamilleComposantComponent } from './pages/bureau-etude/parametre/famille-composant/consultation-famille-composant/consultation-famille-composant.component';
import { ConsultationFinitionExterieurComponent } from './pages/bureau-etude/parametre/finition-exterieur/consultation-finition-exterieur/consultation-finition-exterieur.component';
import { ConsultationQualiteHuisserieComponent } from './pages/bureau-etude/parametre/qualite-huisserie/consultation-qualite-huisserie/consultation-qualite-huisserie.component';
import { ConsultationTypeCouvertureComponent } from './pages/bureau-etude/parametre/type-couverture/consultation-type-couverture/consultation-type-couverture.component';
import { ConsultationTypeIsolationComponent } from './pages/bureau-etude/parametre/type-isolation/consultation-type-isolation/consultation-type-isolation.component';
import { ConsultationTypeModuleComponent } from './pages/bureau-etude/parametre/type-module/consultation-type-module/consultation-type-module.component';
import { ConsultationGammeComponent } from './pages/bureau-etude/gamme/consultation_gamme/consultation-gamme.component';
import { StatistiquesCommercialesComponent } from './pages/statistiques-commerciales/statistiques-commerciales.component';
import { SynchronisationGlobaleComponent } from './pages/synchronisation-globale/synchronisation-globale.component';
import { ListeFournisseursComponent } from './pages/liste-fournisseurs/liste-fournisseurs.component';
import { CreationGammeComponent } from './pages/bureau-etude/gamme/creation-gamme/creation-gamme.component';
import { ListeGammePageComponent } from './pages/bureau-etude/gamme/liste-gamme-page/liste-gamme-page.component';
import { ListeModeleComponent } from './components/bureau-etude/modele/liste-modele/liste-modele.component';
import { ListeModuleComponent } from './components/bureau-etude/module/liste-module/liste-module.component';
import { ModificationGammeComponent } from './pages/bureau-etude/gamme/modification-gamme/modification-gamme.component';
import { ListeDevisComponent } from './pages/liste-devis/liste-devis.component';
import { CreationModeleComponent } from './pages/bureau-etude/modele/creation-modele/creation-modele.component';
import { ChoixGammeComponent } from './components/choix-gamme/choix-gamme.component';
import { ChoixModeleComponent } from './components/choix-modele/choix-modele.component';
import { ModificationModeleComponent } from './pages/bureau-etude/modele/modification-modele/modification-modele.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DevisComponent,
    ConnexionComponent,
    BoutonDomingoComponent,
    SidebarComponent,
    CreationCompteComponent,
    ConditionsUtilisationComponent,
    ChoixClientComponent,
    SidebarComponent,
    CreationComposantComponent,
    ConsultationComposantComponent,
    ConsultationEtageComponent,
    ConsultationModeleComponent,
    ConsultationModuleComponent,
    CreationConceptionOssatureComponent,
    ConsultationFamilleComposantComponent,
    ConsultationFinitionExterieurComponent,
    ConsultationQualiteHuisserieComponent,
    ConsultationTypeCouvertureComponent,
    ConsultationTypeIsolationComponent,
    ConsultationTypeModuleComponent,
    ListeGammeComponent,
        ListeDevisComponent,
    ConsultationGammeComponent,
    CreationDevisComponent,
    AjoutClientComponent,
    OnlyNumberDirective,
    ProfilComponent,
    StatistiquesCommercialesComponent,
    SynchronisationGlobaleComponent,
    ListeFournisseursComponent,
    CreationGammeComponent,
    ListeGammePageComponent,
    ListeModeleComponent,
    ListeModuleComponent,
    ModificationGammeComponent,
    CreationModeleComponent,
    ChoixGammeComponent,
    ChoixModeleComponent,
    ModificationModeleComponent


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
