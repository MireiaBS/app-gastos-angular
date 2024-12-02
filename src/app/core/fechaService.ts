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
  getGastosByFecha(f1: string): Observable<Gasto[]> {
    const gastosRef = collection(this.firestore, `gastos`);
    const arrayGastos = query(gastosRef, where ('fecha', '==', f1))
    //console.log('getGastosByFecha(): ', arrayGastos)
    return collectionData(arrayGastos, { idField: 'id' }) as Observable<Gasto[]>;
  }

  getGastosByRange(fechaInicio: string, fechaFin: string): Observable<Gasto[]> {
    const gastosRef = collection(this.firestore, `gastos`);
    const arrayGastos = query(gastosRef,
      where('fecha', '>=', fechaInicio),
      where('fecha', '<=', fechaFin));
    return collectionData(arrayGastos, { idField: 'id' }) as Observable<Gasto[]>;
  }

}
