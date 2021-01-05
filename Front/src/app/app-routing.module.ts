import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevisComponent } from './pages/devis/devis.component';
import { HomeComponent } from './pages/home/home.component';
import { ModulesComponent } from './pages/modules/modules.component';



const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path : 'devis', component:DevisComponent},
  { path : 'modules', component:ModulesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
