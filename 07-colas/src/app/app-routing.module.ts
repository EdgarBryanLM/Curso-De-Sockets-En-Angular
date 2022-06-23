import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscritorioComponent } from './pages/escritorio/escritorio.component';
import { HomeComponent } from './pages/home/home.component';
import { NuevoticketComponent } from './pages/nuevoticket/nuevoticket.component';
import { PublicoComponent } from './pages/publico/publico.component';

const routes: Routes = [
{path:'escritorio/:id',component:EscritorioComponent},
{path:'home',component:HomeComponent},
{path:'nuevo-ticket',component:NuevoticketComponent},
{path:'publico',component:PublicoComponent},
{path:'**',redirectTo:'home'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
