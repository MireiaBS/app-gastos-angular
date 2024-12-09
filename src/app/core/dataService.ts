import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, collection, addDoc, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import { Categoria } from './../classes/categoria';
import { Gasto } from '../classes/gasto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  // GASTOS

  getGastos(): Observable<Gasto[]> {
    const gastoRef = collection(this.firestore, 'gastos');
    return collectionData(gastoRef, { idField: 'id' }) as Observable<Gasto[]>;
  }

  getGastoById(id: string): Observable<Gasto> {
    const gastoRef = doc(this.firestore, `gastos/${id}`);
    return docData(gastoRef, { idField: 'id' }) as Observable<Gasto>;
  }

  updateGasto(gasto: Gasto) {
    if (!gasto.id) {
      throw new Error("No se proporcionó un ID para el gasto.");
    }
    // Excluye el campo `id`es algo que AngularFire agrega dinámicamente.
    const gastoRef = doc(this.firestore, `gastos/${gasto.id}`);
    delete gasto.id;
    return updateDoc(gastoRef, {...gasto});
  }

  addGasto(gasto: Gasto) {
    const gastoRef = collection(this.firestore, 'gastos');
    return addDoc(gastoRef, { ...gasto });
  }

  deleteGasto(gasto: Gasto) {
    console.log(`gastos/${gasto.id}`);
    const gastoRef = doc(this.firestore, `gastos/${gasto.id}`);
    return deleteDoc(gastoRef);
  }

  getGastosByFecha(fecha: string): Observable<Gasto[]> {
    const gastosRef = collection(this.firestore, `gastos`);
    const arrayGastos = query(gastosRef, where ('fecha', '==', fecha))
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

  // CATEGORIAS _____________________________

  getCategorias(): Observable<Categoria[]> {
    const categoriaRef = collection(this.firestore, 'categorias');
    return collectionData(categoriaRef, { idField: 'id' }) as Observable<
      Categoria[]
    >;
  }

  getCategoriaById(id: string): Observable<Categoria> {
    const categoriaRef = doc(this.firestore, `categorias/${id}`);
    return docData(categoriaRef, { idField: 'id' }) as Observable<Categoria>;
  }

  updateCategoria(categoria : Categoria) {
    if (!categoria.id) {
      throw new Error("No se proporcionó un ID para la categoría.");
    }
    // Excluye el campo `id`es algo que AngularFire agrega dinámicamente.
    const categoriaRef = doc(this.firestore, `categorias/${categoria.id}`);
    delete categoria.id;
    return updateDoc(categoriaRef, {...categoria});
  }

  addCategoria(categoria: Categoria) {
    const categoriaRef = collection(this.firestore, 'categorias');
    return addDoc(categoriaRef, { ...categoria });
  }

  deleteCategoria(categoria: Categoria) {
    console.log(`categorias/${categoria.id}`);
    const categoriaRef = doc(this.firestore, `categorias/${categoria.id}`);
    return deleteDoc(categoriaRef);
  }


}
