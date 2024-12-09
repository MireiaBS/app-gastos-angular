import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gasto } from '../classes/gasto';
import { CommonModule } from '@angular/common';
import { Categoria } from '../classes/categoria';
import { DataService } from '../core/dataService';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FechaService } from '../core/fechaService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {

  gastos: Gasto[] = [];
  categorias: Categoria[] = [];
  fechaFormateada: string = '';
  fechaSeleccionada: string = '';

  constructor(
    private fechaService: FechaService,
    private dataService: DataService,
    private router: Router,
  ) {

    this.fechaSeleccionada = this.fechaService.formatearFechaInput(new Date());
    this.fechaFormateada = this.fechaService.formatearFecha(this.fechaSeleccionada);
    this.obtenerDatos();
  }


  // EVENTOS

  inputFechaSeleccionada_onChange() {
    this.obtenerGastosPorFecha(this.fechaSeleccionada);
  }

  btnMostrarVistaHoy_onClick() {
    this.fechaSeleccionada = this.fechaService.formatearFechaInput(new Date());
    this.fechaFormateada = this.fechaService.formatearFecha(this.fechaSeleccionada);
    this.obtenerGastosPorFecha(this.fechaSeleccionada);
  }

  btnMostrarVistaSemana_onClick() {
    const fecha = new Date(this.fechaSeleccionada);
    const { fechaInicio, fechaFin } = this.fechaService.calcularRangoSemana(fecha);
    this.obtenerGastosPorRango(
      this.fechaService.formatearFechaInput(fechaInicio),
      this.fechaService.formatearFechaInput(fechaFin));
  }

  btnMostrarVistaMes_onClick() {

    const fecha = new Date(this.fechaSeleccionada);
    const { fechaInicio, fechaFin } = this.fechaService.calcularRangoMes(fecha);
    this.obtenerGastosPorRango(
      this.fechaService.formatearFechaInput(fechaInicio),
      this.fechaService.formatearFechaInput(fechaFin));

  }

  btnDiaAnterior_onClick() {
    this.cambiarFecha(-1);
  }

  btnDiaPosterior_onClick() {
    this.cambiarFecha(1);
  }

  itemGasto_onClick(gasto: Gasto) {
    this.router.navigate(['gasto'], { queryParams: { id: gasto.id } });
  }

  // FUNCIONES

  obtenerCategoriaById(categoriaId: string) {
    return this.categorias.find((categoria) => categoria.id == categoriaId);
  }

  sumarImportes() {
    return this.gastos.reduce((sum, gasto) => sum + gasto.importe, 0);
  }

  //FECHAS

  cambiarFecha(dias: number) {

    const [anio, mes, dia] = this.fechaSeleccionada.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    fecha.setDate(fecha.getDate() + dias);

    this.fechaSeleccionada = this.fechaService.formatearFechaInput(fecha);
    this.fechaFormateada = this.fechaService.formatearFecha(fecha);

    this.obtenerGastosPorFecha(this.fechaSeleccionada);
  }

  obtenerGastosPorFecha(fechaSeleccionada: string) {
    this.dataService
      .getGastosByFecha(fechaSeleccionada)
      .subscribe((gastos) => {
        this.gastos = gastos;
        this.fechaFormateada = this.fechaService.formatearFecha(new Date(fechaSeleccionada));
       // console.log('fecha setFecha2: ', this.fechaFormateada);
      });
  }

  obtenerGastosPorRango(inicio : string, fin : string) {
    this.dataService
      .getGastosByRange(inicio, fin)
      .subscribe((gastos) => {
        this.gastos = gastos;
        const fechaFormateadaInicio = this.fechaService.formatearFecha(inicio);
        const fechaFormateadaFin = this.fechaService.formatearFecha(fin);
        this.fechaFormateada = `${fechaFormateadaInicio} al ${fechaFormateadaFin}`;
       // console.log('Rango seleccionado', this.fechaFormateada)
      }
    )
  }

  obtenerCategorias() {
    this.dataService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  obtenerDatos() {
    this.obtenerCategorias();
    this.obtenerGastosPorFecha(this.fechaSeleccionada);
  }

}
