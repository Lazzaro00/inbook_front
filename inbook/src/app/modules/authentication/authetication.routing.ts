import { Routes } from "@angular/router";
import AuthComponent from "./auth/auth.component";

export const routes: Routes = [
  {
    path: "",
    loadComponent:() => import("./auth/auth.component"),
    children: [
      {
        path:"signup",
        loadChildren: () =>
          import("./registration/registration.component")
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];