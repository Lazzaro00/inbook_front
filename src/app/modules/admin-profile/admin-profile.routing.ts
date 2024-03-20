import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-profile/admin-profile.component').then((m) => m.AdminProfileComponent), 
    children: [
      // {
      //   path:'',
      //   loadComponent: () => import('./admin-profile/admin-profile.component').then((m) => m.AdminProfileComponent),
      // },
      // {
      //   path:'profileedit',
      //   //loadComponent: () =>
      //     //import("./components/get-all-book/get-all-book.component").then((m) => m.GetAllBook)
      // },
      {
        path:'',
        loadComponent: () =>
          import("./profile-card/profile-card.component").then((m) => m.ProfileCardComponent)
      },
      {
        path:'library-card',
        loadComponent: () =>
          import("./library-card/library-card.component").then((m) => m.LibraryCardComponent)
      },
      {
        path:'libraryedit',
        loadComponent: () =>
          import("./library-edit/library-edit.component").then((m) => m.LibraryEditComponent)
      }
    ],
  },
];
