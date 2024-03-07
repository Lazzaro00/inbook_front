import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/user/user.component'), // Per utilizzare correttamente il lazy loading per il caricamento delle componenti ( Quindi utilizzando il loadComponent )
                                                                      // Bisogna ricordarsi di impostare la componente come default ( Vedere la componente loginComponent, nella dichiarazione della classe )
    children: [
      {
        path:"",
        title: 'Get All Book',
        loadComponent: () =>
          import("./components/get-all-book/get-all-book.component").then((m) => m.GetAllBook)
      },
    ],
  },
];
