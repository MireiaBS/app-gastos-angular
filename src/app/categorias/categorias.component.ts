import { Component } from '@angular/core';
import { DataService } from '../core/dataService';
import { CommonModule } from '@angular/common';
import { Categoria } from '../classes/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'categorias',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  categorias: Categoria[] = [];

  constructor( private dataService: DataService, private router: Router,) {
    this.obtenerCategorias();
  }

  // EVENTOS

  itemCategoria_onClick(categoria: Categoria) {
    //this.router.navigate(['categoria']);
    this.router.navigate(['categoria'], { queryParams: { id: categoria.id } });
  }


  // FUNCIONES

  obtenerCategorias() {
    this.dataService.getCategorias()
    .subscribe(categorias => {
      this.categorias = categorias})
      // nos 'subscribimos' para usar el Observable
  }


}
