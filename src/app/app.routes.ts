import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { InicioComponent } from './inicio/inicio.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { GastoComponent } from './gasto/gasto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'categorias', component: CategoriasComponent},
  { path: 'categoria', component: CategoriaComponent },
  { path: 'gasto', component: GastoComponent}
];
