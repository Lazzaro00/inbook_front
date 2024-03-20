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
         path:"editProfile",
         loadComponent:() => import("../../shared/edit-profile/edit-profile.component").then((m) => m.EditProfile)
        },
            {
        path:'book',
        loadChildren:()=>
        import('../../modules/book/book-routing').then((m) => m.routes),

      },
      {
        path:'details',
        loadChildren:()=>
        import('../login/components/user-details/user-details.routing').then((m)=>m.routes)
       },
        // {
        // path:'orderDetail',
        // loadComponent:() => import('../user/components/order-detail/order-detail.component').then((m) => m.OrderDetail),
        // },
    
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
