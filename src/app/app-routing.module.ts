import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './shared/components/principal/principal.component'
import { EditarComponent } from './shared/components/editar/editar.component'

const routes: Routes = [
{path: '', redirectTo: 'principal', pathMatch: 'full' },
{path: 'principal', component: PrincipalComponent}, 
{path: 'editar', component: EditarComponent}, 
{path: '', redirectTo: '/principal', pathMatch: 'full' },
{path: '**', redirectTo: '/principal'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
