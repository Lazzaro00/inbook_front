import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-details.component'), 
    children: [
      {
        path: '',
        title:'History',
        loadComponent:()=>import ('../../../user/components/historical/historical.component').then((m)=>m.Historical),
      },
      {
        path:'edit',
        title:'UserEdit',
        loadComponent:()=>import('../profile-edit/profile-edit.component').then((m) => m.ProfileEditComponent)
      },
      {
        path:'orderDetail',
        title:'OrderDetail',
        loadComponent:()=>import('../../../user/components/order-detail/order-detail.component').then((m) => m.OrderDetail)
      },


      
      
    ],
  },
];
