import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor de rutas
    provideRouter(routes),

    // Proveedor de cambio de zona (para detección de cambios optimizada)
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Inicialización de Firebase
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyA7_Fnv7X3seinZoTSRhRtml-uU9HAINP8',
        authDomain: 'gastos-app-pro.firebaseapp.com',
        databaseURL: 'https://gastos-app-pro-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'gastos-app-pro',
        storageBucket: 'gastos-app-pro.firebasestorage.app',
        messagingSenderId: '546541408657',
        appId: '1:546541408657:web:464ad9f7fc318d202eca30',
        measurementId: 'G-PH8D3G82SV',
      })
    ),

    // Proveedores de servicios de Firebase
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
};
