import { Component, ElementRef, ViewChild, } from '@angular/core';
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
  fechaString : string = '';
  fechaFormateada : string = '';



  constructor(
    private fechaService: FechaService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {


  }

  ngOnInit() {
    this.obtenerDatos();
    this.fechaFormateada = this.formatearFecha(this.fecha)
  }

  ngAfterViewInit() {
    this.setFechaActualInput();
    this.obtenerGastosPorFecha(this.fechaInput.nativeElement.value)
  }

  // EVENTOS

  inputFechaSeleccionada_onChange() {
    const fechaSeleccionada : string = this.fechaInput.nativeElement.value;
    this.obtenerGastosPorFecha(fechaSeleccionada);
  }

  btnMostrarVistaDia_onClick() {}

  btnMostrarVistaSemana_onClick() {

  }

  btnDiaAnterior_onClick() {
    const fechaSeleccionada : string = this.fechaInput.nativeElement.value;
    const [anio, mes, dia] = fechaSeleccionada.split('-');
    const fecha : Date = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));

    fecha.setDate(fecha.getDate() - 1);
    this.actualizarFecha(fecha);
  }

  actualizarFecha(fecha: Date){
    const diaAnterior = String(fecha.getDate()).padStart(2,'0');
    const mesAnterior = String(fecha.getMonth() + 1).padStart(2, '0');
    const anioAnterior = fecha.getFullYear();
    const fechaString = `${anioAnterior}-${mesAnterior}-${diaAnterior}`;

    this.fechaInput.nativeElement.value = fechaString;
    this.fechaFormateada = this.formatearFecha(fecha);

    this.obtenerGastosPorFecha(fechaString);
  }

  btnDiaPosterior_onClick() {
    const fechaSeleccionada : string = this.fechaInput.nativeElement.value;
    const [anio, mes, dia] = fechaSeleccionada.split('-');
    const fecha : Date = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));

    fecha.setDate(fecha.getDate() + 1);
    this.actualizarFecha(fecha);
  }

  btnMostrarVistaMes_onClick() {

  }

  itemGasto_onClick(gasto: Gasto) {
    this.router.navigate(['gasto'], { queryParams: { id: gasto.id } });
  }

  // FUNCIONES

  obtenerDatos() {
    /*  const f1 = new Date();
    const f2 = new Date();
    this.obtenerGastosPorFecha(f1, f2); */
    this.obtenerCategorias();

    //this.obtenerGastos();


  }

  obtenerCategorias() {
    this.dataService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  obtenerCategoriaById(categoriaId: string) {
    return this.categorias.find((categoria) => categoria.id == categoriaId);
  }

  /* obtenerGastos() {
    this.dataService.getGastos().subscribe((gastos) => {
      console.log('gastos:', gastos);
      this.gastos = gastos;
    });

  } */

  sumarImportes(){
    return this.gastos.reduce((sum,gasto) => sum + gasto.importe, 0);

  }

  setFechaActualInput() {

      const fecha: Date = new Date();
      const dia = String(fecha.getDate()).padStart(2,'0');
      const mes = String(fecha.getMonth()+1).padStart(2,'0');
      const anio = fecha.getFullYear();
      const fechaFormateada =`${anio}-${mes}-${dia}`;
      this.fechaInput.nativeElement.value = fechaFormateada;

  }

  obtenerGastosPorFecha(fechaSeleccionada: string) {
    this.fechaService.getGastosByFecha(fechaSeleccionada)
    .subscribe((gastos)=> {
      this.gastos = gastos})
      ;
      const [anio, mes, dia] = fechaSeleccionada.split('-');
      const fecha = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
      this.fechaFormateada = this.formatearFecha(fecha)

  }

  formatearFecha(fecha: Date) {
   // console.log('formateo: ',fecha)
    const dia = fecha.getDate();
    const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
    const anio = fecha.getFullYear();

    const mesCapitalizado = this.capitalizarMes(mes);
    const fechaFormateada : string = `${dia} de ${mesCapitalizado} del ${anio}`

    //console.log('fecha formateada: ',fechaFormateada)
    return fechaFormateada;
  }

  capitalizarMes(mes : string) {
    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1).toLowerCase();
    return mesCapitalizado;
  }

  pasarStringToDate(fecha : string) {
    const fechaString = new Date ();

    return fechaString;
  }
}
