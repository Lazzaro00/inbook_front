import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./book/book.component').then((m) => m.BookComponent), 
    children: [
        {
            path:"get-all-book",
            title: 'GetAll',
            loadComponent: () =>
              import("../user/components/get-all-book/get-all-book.component").then((m) => m.GetAllBook)
        },
        {
            path:"read",
            title: 'Read',
            loadComponent: () =>
            import("./read/read.component").then((m) => m.ReadComponent)
        },
    ],
  },
];
