import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoutonDomingoComponent } from './components/bouton-domingo/bouton-domingo.component';
import { ConditionsUtilisationComponent } from './pages/conditions-utilisation/conditions-utilisation.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { CreationCompteComponent } from './pages/creation-compte/creation-compte.component';
import { DevisComponent } from './pages/devis/devis.component';
import { HomeComponent } from './pages/home/home.component';
import { ConsultationGammeComponent } from './pages/bureau-etude/gamme/consultation_gamme/consultation-gamme.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { StatistiquesCommercialesComponent } from './pages/statistiques-commerciales/statistiques-commerciales.component';
import { SynchronisationGlobaleComponent } from './pages/synchronisation-globale/synchronisation-globale.component';
import { ListeDevisComponent } from './pages/liste-devis/liste-devis.component';
import { ListeFournisseursComponent } from './pages/liste-fournisseurs/liste-fournisseurs.component';
import { CreationGammeComponent } from './pages/bureau-etude/gamme/creation-gamme/creation-gamme.component';
import { ListeGammePageComponent } from './pages/bureau-etude/gamme/liste-gamme-page/liste-gamme-page.component';
import { ModificationGammeComponent } from './pages/bureau-etude/gamme/modification-gamme/modification-gamme.component';



const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path : 'devis', component:DevisComponent},
  { path : "connexion", component:ConnexionComponent },
  { path : "accueil", component:BoutonDomingoComponent },
  { path : "creationCompte", component:CreationCompteComponent},
  { path : "conditionsUtilisation", component:ConditionsUtilisationComponent},
  { path : "consultation-gamme/:idGamme", component:ConsultationGammeComponent},
    { path : "modification-gamme/:idGamme", component:ModificationGammeComponent},
   { path : "Creation-Gamme", component:CreationGammeComponent},
   { path : "liste-Gamme", component:ListeGammePageComponent},
  { path : "profil", component:ProfilComponent},
  { path : "statistiques-commerciales", component:StatistiquesCommercialesComponent},
  { path : "synchronisation-globale", component:SynchronisationGlobaleComponent},
  { path : "liste-devis", component:ListeDevisComponent},
  { path : "liste-fournisseurs", component:ListeFournisseursComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
