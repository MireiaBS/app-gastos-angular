import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection, isDevMode } from '@angular/core';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor de rutas
    provideRouter(routes),

    // Proveedor de cambio de zona (para detección de cambios optimizada)
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Inicialización de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Proveedores de servicios de Firebase
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
};
