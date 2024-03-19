import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-details.component'), 
    children: [
      {
        path:'',
        title:'Profile',
        outlet:'left',
        loadComponent:()=> import('../profile/profile.component').then((m) => m.ProfileComponent)
      },
      {
        path: '',
        title:'History',
        outlet:'right',
        loadComponent:()=>import ('../../../user/components/historical/historical.component').then((m)=>m.Historical)
      },
      {
        path:'edit',
        title:'UserEdit',
        loadComponent:()=>import('../profile-edit/profile-edit.component').then((m) => m.ProfileEditComponent)
      }
    ],
  },
];
