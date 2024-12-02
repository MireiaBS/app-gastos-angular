import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gasto } from '../classes/gasto';
import { CommonModule } from '@angular/common';
import { Categoria } from '../classes/categoria';
import { DataService } from '../core/dataService';
import { Router, ActivatedRoute } from '@angular/router';
import { FechaService } from '../core/fechaService';

@Component({
  selector: 'inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  @ViewChild('fechaInput') fechaInput!: ElementRef;

  gastos: Gasto[] = [];
  categorias: Categoria[] = [];
  fecha: Date = new Date();
  fechaString: string = '';
  fechaFormateada: string = '';

  constructor(
    private fechaService: FechaService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.fechaFormateada = this.formatearFecha(this.fecha);
  }

  ngAfterViewInit() {
    this.setFechaActualInput();
    this.obtenerGastosPorFecha(this.fechaInput.nativeElement.value);
  }

  // EVENTOS

  inputFechaSeleccionada_onChange() {
    this.obtenerGastosPorFecha(this.fechaInput.nativeElement.value);
  }

  btnMostrarVistaHoy_onClick() {
    const fechaActual = new Date();
    const fechaString = this.formatearFechaInput(fechaActual);
    this.fechaInput.nativeElement.value = fechaString;
    this.fechaFormateada = this.formatearFecha(fechaActual);
    this.obtenerGastosPorFecha(fechaString);
  }

  btnMostrarVistaSemana_onClick() {
    const fechaSeleccionada = this.fechaInput.nativeElement.value;
    const fecha = new Date(fechaSeleccionada);
    const { fechaInicio, fechaFin } = this.calcularRangoSemana(fecha);
    this.obtenerGastosPorRango(this.formatearFechaInput(fechaInicio), this.formatearFechaInput(fechaFin));

  }

  btnMostrarVistaMes_onClick() {
    const fechaSeleccionada = this.fechaInput.nativeElement.value;
    const fecha = new Date(fechaSeleccionada);
    const { fechaInicio, fechaFin } = this.calcularRangoMes(fecha);
    this.obtenerGastosPorRango(this.formatearFechaInput(fechaInicio), this.formatearFechaInput(fechaFin));

  }

  btnDiaAnterior_onClick() {
    this.cambiarFecha(-1);
    const fechaSeleccionada: string = this.fechaInput.nativeElement.value;
    const [anio, mes, dia] = fechaSeleccionada.split('-');
    const fecha: Date = new Date(
      parseInt(anio),
      parseInt(mes) - 1,
      parseInt(dia)
    );

    fecha.setDate(fecha.getDate() - 1);
  }

  btnDiaPosterior_onClick() {
    this.cambiarFecha(1);
    const fechaSeleccionada: string = this.fechaInput.nativeElement.value;
    const [anio, mes, dia] = fechaSeleccionada.split('-');
    const fecha: Date = new Date(
      parseInt(anio),
      parseInt(mes) - 1,
      parseInt(dia)
    );

    fecha.setDate(fecha.getDate() + 1);
  }

  itemGasto_onClick(gasto: Gasto) {
    this.router.navigate(['gasto'], { queryParams: { id: gasto.id } });
  }

  // FUNCIONES

  obtenerDatos() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.dataService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  obtenerCategoriaById(categoriaId: string) {
    return this.categorias.find((categoria) => categoria.id == categoriaId);
  }

  sumarImportes() {
    return this.gastos.reduce((sum, gasto) => sum + gasto.importe, 0);
  }

  //FECHAS

  obtenerGastosPorFecha(fechaSeleccionada: string) {
    this.fechaService
      .getGastosByFecha(fechaSeleccionada)
      .subscribe((gastos) => {
        this.gastos = gastos;
        this.fechaFormateada = this.formatearFecha(new Date(fechaSeleccionada));
       // console.log('fecha setFecha2: ', this.fechaFormateada);
      });
  }

  obtenerGastosPorRango(inicio : string, fin : string) {
    this.fechaService
      .getGastosByRange(inicio, fin)
      .subscribe((gastos) => {
        this.gastos = gastos;
        const fechaFormateadaInicio = this.formatearFecha(inicio);
        const fechaFormateadaFin = this.formatearFecha(fin);
        this.fechaFormateada = `${fechaFormateadaInicio} al ${fechaFormateadaFin}`;
       // console.log('Rango seleccionado', this.fechaFormateada)
      }
    )

  }

  setFechaActualInput() {
    if (this.fechaInput && this.fechaInput.nativeElement) {
      const fechaActual = new Date();
      this.fechaInput.nativeElement.value = this.formatearFechaInput(fechaActual);
      this.fechaString = this.fechaInput.nativeElement.value;
    }
  }

  cambiarFecha(dias: number) {
    const fechaSeleccionada: string = this.fechaInput.nativeElement.value;
    const [anio, mes, dia] = fechaSeleccionada.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    fecha.setDate(fecha.getDate() + dias);

    const nuevaFecha = this.formatearFechaInput(fecha);
    this.fechaInput.nativeElement.value = nuevaFecha;
    this.fechaFormateada = this.formatearFecha(fecha);
    this.obtenerGastosPorFecha(nuevaFecha);
  }

  formatearFecha(fecha: Date | string): string {
    const dateOf = typeof fecha === 'string' ? new Date(fecha) : fecha;

    const dia = dateOf.getDate();
    const mes = dateOf.toLocaleDateString('es-ES', { month: 'long' });
    const anio = dateOf.getFullYear();

    const mesCapitalizado = this.capitalizarMes(mes);
    const fechaFormateada: string = `${dia} de ${mesCapitalizado} del ${anio}`;

    return fechaFormateada;
  }

  formatearFechaInput(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  capitalizarMes(mes: string) {
    const mesCapitalizado =
      mes.charAt(0).toUpperCase() + mes.slice(1).toLowerCase();
    return mesCapitalizado;
  }

  // VISTAS

  calcularRangoSemana(fecha: Date) : {fechaInicio: Date, fechaFin: Date} {
    const fechaInicio = new Date(fecha);
    fechaInicio.setDate(fecha.getDate()- fecha.getDay() + 1);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaInicio.getDate() + 6);

    return {fechaInicio, fechaFin};

  }

  calcularRangoMes(fecha: Date): {fechaInicio: Date, fechaFin: Date} {
    const fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const fechaFin = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return {fechaInicio, fechaFin};
  }
}
