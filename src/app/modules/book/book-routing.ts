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
        {
          path:"insert-product",
          title: 'Insert',
          loadComponent: () =>
          import("./insert/insertproduct.component").then((m) => m.InsertProduct)
        },
        {
          path:"storico-admin",
          title: 'storico',
          loadComponent: () =>
          import("./storico-component/storico-component.component").then((m) => m.storicocomponent)
        },
    ],
  },
];
