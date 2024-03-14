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
        loadComponent: () => import('../../shared/end-order/end-order.component').then((m) => m.EndOrder)
      },
            {
        path:'book',
        loadChildren:()=>
        import('../../modules/book/book-routing').then((m) => m.routes),
      },
    
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
