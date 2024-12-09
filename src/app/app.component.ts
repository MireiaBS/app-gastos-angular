import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GastoComponent } from "./gasto/gasto.component";
import { InicioComponent } from "./inicio/inicio.component";
import { CategoriasComponent } from "./categorias/categorias.component";
import { CategoriaComponent } from './categoria/categoria.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aplicacion para gastos con Angular';
}
