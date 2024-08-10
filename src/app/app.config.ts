import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'paola-shiadani-pianista-bf1ce',
        appId: '1:1076763974600:web:67d192d35c778616027efd',
        storageBucket: 'paola-shiadani-pianista-bf1ce.appspot.com',
        apiKey: 'AIzaSyB806HIsxTpdMPh5-VrPtA2JAJIJUOlW6A',
        authDomain: 'paola-shiadani-pianista-bf1ce.firebaseapp.com',
        messagingSenderId: '1076763974600',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'paola-shiadani-pianista-bf1ce',
        appId: '1:1076763974600:web:67d192d35c778616027efd',
        storageBucket: 'paola-shiadani-pianista-bf1ce.appspot.com',
        apiKey: 'AIzaSyB806HIsxTpdMPh5-VrPtA2JAJIJUOlW6A',
        authDomain: 'paola-shiadani-pianista-bf1ce.firebaseapp.com',
        messagingSenderId: '1076763974600',
      },
    },
  ],
};
