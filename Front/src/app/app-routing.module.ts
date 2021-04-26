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
import { ListeFournisseursComponent } from './pages/liste-fournisseurs/liste-fournisseurs.component';
import { CreationGammeComponent } from './pages/bureau-etude/gamme/creation-gamme/creation-gamme.component';
import { ListeGammePageComponent } from './pages/bureau-etude/gamme/liste-gamme-page/liste-gamme-page.component';
import { ModificationGammeComponent } from './pages/bureau-etude/gamme/modification-gamme/modification-gamme.component';
import { ListeModeleComponent } from './components/bureau-etude/modele/liste-modele/liste-modele.component';
import { ListeModuleComponent } from './components/bureau-etude/module/liste-module/liste-module.component';
import { ListeDevisComponent } from './pages/liste-devis/liste-devis.component';
import { ConsultationModeleComponent } from './pages/bureau-etude/modele/consultation-modele/consultation-modele.component';
import { CreationModeleComponent } from './pages/bureau-etude/modele/creation-modele/creation-modele.component';
import { ListeFinitionsExterieuresComponent } from './pages/liste-finitions-exterieures/liste-finitions-exterieures.component';
import { ListeFinitionsInterieuresComponent } from './pages/liste-finitions-interieures/liste-finitions-interieures.component';
import { ListeConceptionOssatureComponent } from './pages/liste-conception-ossature/liste-conception-ossature.component';
import { ListeCoupesDePrincipeComponent } from './pages/liste-coupes-de-principe/liste-coupes-de-principe.component';
import { ListeTypesRemplissageComponent } from './pages/liste-types-remplissage/liste-types-remplissage.component';
import { ListeQualitesHuisseriesComponent } from './pages/liste-qualites-huisseries/liste-qualites-huisseries.component';
import { ListeTypesCouvertureComponent } from './pages/liste-types-couverture/liste-types-couverture.component';
import { ListeTypesIsolationComponent } from './pages/liste-types-isolation/liste-types-isolation.component';
import { ListeFamillesComposantComponent } from './pages/liste-familles-composant/liste-familles-composant.component';
import { ListeTypesModuleComponent } from './pages/liste-types-module/liste-types-module.component';
import { ModificationModeleComponent } from './pages/bureau-etude/modele/modification-modele/modification-modele.component';


const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path : 'devis', component:DevisComponent},
  { path : "connexion", component:ConnexionComponent },
  { path : "accueil", component:BoutonDomingoComponent },
  { path : "creationCompte", component:CreationCompteComponent},
  { path : "conditionsUtilisation", component:ConditionsUtilisationComponent},
  { path : "consultation-gamme/:idGamme", component:ConsultationGammeComponent},
  { path : "consultation-modele/:idModele", component:ConsultationModeleComponent},
  { path : "modification-gamme/:idGamme", component:ModificationGammeComponent},
  { path : "Liste-Modele/:idGamme", component:ListeModeleComponent},
  { path : "Liste-Module/:idGamme", component:ListeModuleComponent},
     { path : "Creation-Modele/:idGamme", component:CreationModeleComponent},
          { path : "modification-Modele/:idModele", component:ModificationModeleComponent},

   { path : "Creation-Gamme", component:CreationGammeComponent},
   { path : "liste-Gamme", component:ListeGammePageComponent},
  { path : "profil", component:ProfilComponent},
  { path : "liste-devis", component:ListeDevisComponent},
  { path : "statistiques-commerciales", component:StatistiquesCommercialesComponent},
  { path : "synchronisation-globale", component:SynchronisationGlobaleComponent},
  { path : "liste-fournisseurs", component:ListeFournisseursComponent},
  { path : "liste-finitions_exterieures", component:ListeFinitionsExterieuresComponent},
  { path : "liste-finitions_interieures", component:ListeFinitionsInterieuresComponent},
  { path : "liste-conceptions_ossatures", component:ListeConceptionOssatureComponent},
  { path : "liste-coupes_de_principe", component:ListeCoupesDePrincipeComponent},
  { path : "liste-types_remplissage", component:ListeTypesRemplissageComponent},
  { path : "liste-qualites_huisseries", component:ListeQualitesHuisseriesComponent},
  { path : "liste-types_couverture", component:ListeTypesCouvertureComponent},
  { path : "liste-types_isolation", component:ListeTypesIsolationComponent},
  { path : "liste-familles_composant", component:ListeFamillesComposantComponent},
  { path : "liste-types_module", component:ListeTypesModuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
