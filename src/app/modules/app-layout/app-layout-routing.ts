import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/app-layout/app-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'adminprofile',
        pathMatch: 'full',
      },
      {
        path: 'utenti',
        loadChildren: () => import('../utenti/utenti-routing').then((m) => m.routes),
      },
      {
        path: 'book',
        loadChildren: () => import('../book/book-routing').then((m) => m.routes),
      },
      {
        path:'adminprofile',
        loadChildren:() => import('../admin-profile/admin-profile.routing').then((m) => m.routes),
      },
      {
        path:"editProfile",
        loadComponent:() => import("../../shared/edit-profile/edit-profile.component").then((m) => m.EditProfile)
       },
       {
        path:'libraryedit',
        loadComponent: () =>
          import("../admin-profile/library-edit/library-edit.component").then((m) => m.LibraryEditComponent)
      },
      
      // {
      //   path:'book',
      //   loadChildren:()=> import ('../book/book-routing').then((m) => m.routes)
      // },

      { path: '**', redirectTo: 'utenti', pathMatch: 'full' },
    ],
  },
];
