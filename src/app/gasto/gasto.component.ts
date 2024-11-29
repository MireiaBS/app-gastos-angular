import { map } from 'rxjs';
import { Categoria } from '../classes/categoria';
import { Gasto } from './../classes/gasto';
import { DataService } from '../core/dataService';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Value } from '@angular/fire/compat/remote-config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gasto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gasto.component.html',
  styleUrl: './gasto.component.css',
})
export class GastoComponent {
  gasto: Gasto = new Gasto();
  categorias: Categoria[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Query params
    this.route.queryParams.subscribe((params) => {
      if (params['id'] != undefined) this.gasto.id = params['id'];
    });
    this.obtenerDatos();
  }

  // EVENTOS

  volverInicio_onClick() {}

  btnEliminar_onClick() {
    this.dataService.deleteGasto(this.gasto);
    this.router.navigate(['inicio']);
  }

  frmAgregarGasto_onSubmit() {
    if (this.gasto.id) {
      this.dataService
        .updateGasto(this.gasto)
        .then(() => this.router.navigate(['inicio']))
        .catch((error) =>
          console.error('Error al actualizar el gasto:', error)
        );
    } else {
      this.dataService
        .addGasto(this.gasto)
        .then(() => this.router.navigate(['inicio']))
        .catch((error) => {
          console.error('Error al actualizar el gasto:', error);
        });
    }
  }

  // FUNCIONES

  obtenerDatos() {
    this.obtenerGasto();
    this.obtenerCategorias();
  }
  obtenerGasto() {
    if (this.gasto.id) {
      this.dataService.getGastoById(this.gasto.id!).subscribe((gasto) => {
        this.gasto = gasto;
      });
    } else {
      // Si no hay ID, se trata de una categoría nueva.
      console.log('No se encontró ID. Creando un nuevo gasto.');
    }
  }

  obtenerCategorias() {
    this.dataService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }
}
