import { Routes } from "@angular/router";

export const routes: Routes = [
  {
   /* path: "",
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "login", // Modifica qui: da 'gestionale' a 'login'
        pathMatch: "full",
      },
      {
        path: "gestionale",
        loadChildren: () =>
          import("").then(
            (m) => m.routes
          ),
      },
      {
        path: "user",
        loadChildren: () =>
          import("").then(
            (m) => m.routes
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("").then((m) => m.routes),
      },
    ],
  */},
  { path: "**", redirectTo: "login", pathMatch: "full" },
];
