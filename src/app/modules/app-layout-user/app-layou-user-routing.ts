import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./header-user/header.component').then((m) => m.HeaderComponentUser),
    children: [
      {
        path: '',
        redirectTo: 'getallbook',
        pathMatch: 'full',
      },
      {
        path: 'getallbook',
        loadChildren: () => import('./../user/user-routing').then((m) => m.routes),
      },
    
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
