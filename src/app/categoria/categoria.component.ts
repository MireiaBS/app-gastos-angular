import { DataService } from '../core/dataService';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Categoria } from '../classes/categoria';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'categoria',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent {
  categoria: Categoria = new Categoria();

  // revisar otra forma
  colores = [
    { name: 'Verde', value: 'var(--verdeCategoria)' },
    { name: 'Azul', value: 'var(--azulCategoria)' },
    { name: 'Rojo', value: 'var(--rojoCategoria)' },
    { name: 'Lila', value: 'var(--lilaCategoria)' },
    { name: 'Naranja', value: 'var(--naranjaCategoria)' },
  ];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Query params
    this.route.queryParams.subscribe((params) => {
      if (params['id'] != undefined) {
        this.categoria.id = params['id'];
      }
    });
    this.obtenerDatos();
  }

  // EVENTOS

  btnVolver_onClick() {}

  frmAgregarCategoria_onSubmit() {
    // aqui validarCategoria() -> devuelve string con errores, si string vacio, tonces ok. Si errores, muestra.
    if (this.categoria.id) {
      this.dataService
        .updateCategoria(this.categoria)
        .then(() => this.router.navigate(['categorias']))
        .catch((error) =>
          console.error('Error al actualizar la categoría:', error)
        );
    } else {
      this.dataService
        .addCategoria(this.categoria)
        .then(() => this.router.navigate(['categorias']))
        .catch((error) => {
          console.error('Error al actualizar la categoría:', error);
        });
    }
  }

  btnEliminar_onClick() {
    this.dataService.deleteCategoria(this.categoria);
    this.router.navigate(['categorias']);
  }

  // FUNCIONES

  obtenerDatos() {
    if (this.categoria.id != undefined) {
      this.obtenerCategoria(); // si tenemos el ID mostraremos, sino es porque estamos añadiendo una categoria nueva
    }
  }

  obtenerCategoria() {
    if (this.categoria.id) {
      this.dataService
        .getCategoriaById(this.categoria.id!)
        .subscribe((categoria) => {
          this.categoria = categoria;
        });
    } else {
      // Si no hay ID, se trata de una categoría nueva.
      console.log('No se encontró ID. Creando una nueva categoría.');
    }
  }
}
