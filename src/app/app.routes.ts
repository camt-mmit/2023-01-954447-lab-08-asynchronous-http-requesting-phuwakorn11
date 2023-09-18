import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'star-war',
    loadChildren: () =>
     import('./star-war/star-war.routes').then((mod) => mod.routes)
  },
];
