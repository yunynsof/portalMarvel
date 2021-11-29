import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './components/principal/principal.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { EditarComponent } from './components/editar/editar.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
	MatCardModule,
	HttpClientModule,
	InfiniteScrollModule,
	FormsModule
  ]
})
export class SharedModule { }
