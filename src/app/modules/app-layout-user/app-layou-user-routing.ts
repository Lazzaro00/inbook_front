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
      {
        path: 'endOrder',
        loadChildren: () => import('../../shared/end-order/end-order.component').then((m) => m.EndOrder)
      },
    
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
