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



const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path : 'devis', component:DevisComponent},
  { path : "connexion", component:ConnexionComponent },
  { path : "accueil", component:BoutonDomingoComponent },
  { path : "creationCompte", component:CreationCompteComponent},
  { path : "conditionsUtilisation", component:ConditionsUtilisationComponent},
  { path : "consultation-gamme", component:ConsultationGammeComponent},
  { path : "profil", component:ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
