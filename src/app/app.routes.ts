import { Routes } from '@angular/router';
import { WebPublicComponent } from './web-public/web-public.component';
import { GenerateInterfaceComponent } from './generate-interface/generate-interface.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: WebPublicComponent, // Componente principal
  // },
  {
    path: ':id',
    component: GenerateInterfaceComponent, // Componente principal
  },
  {
    path: 'lqtJrGOMFjPUmgZjik7C',
    component: GenerateInterfaceComponent, // Componente principal
  },
  {
    path: '**',
    redirectTo: '', // Redirección para rutas desconocidas
    pathMatch: 'full',
  },
];
