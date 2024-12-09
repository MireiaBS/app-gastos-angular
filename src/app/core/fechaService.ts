import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, collection, addDoc, doc, deleteDoc, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import { Categoria } from './../classes/categoria';
import { Gasto } from '../classes/gasto';
import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class FechaService {
  constructor(private firestore: Firestore) {

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

  capitalizarMes(mes: string) {
    const mesCapitalizado =
      mes.charAt(0).toUpperCase() + mes.slice(1).toLowerCase();
    return mesCapitalizado;
  }

  formatearFechaInput(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

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
