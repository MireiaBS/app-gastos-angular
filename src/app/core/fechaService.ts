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


 /*  getFechaActual() {
    const fechaActual: Date = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.toLocaleDateString('es-ES', { month: 'long' });
    const anio = fechaActual.getFullYear();

    const mesCapitalizado = this.capitalizarMes(mes);
    const fechaFormateada : string = `${dia} de ${mesCapitalizado} del ${anio}`

    return fechaFormateada;
  }

  capitalizarMes(mes : string) {
    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1).toLowerCase();
    return mesCapitalizado;
  }*/

  getGastosByFecha(f1: string): Observable<Gasto[]> {
    const gastosRef = collection(this.firestore, `gastos`);
    const arrayGastos = query(gastosRef, where ('fecha', '==', f1))
    //console.log('getGastosByFecha(): ', arrayGastos)
    return collectionData(arrayGastos, { idField: 'id' }) as Observable<Gasto[]>;
  }

}
