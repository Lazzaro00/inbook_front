import { Routes } from "@angular/router";
import AuthComponent from "./auth/auth.component";


export const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path:"signup",
        loadComponent: () =>
          import("./registration/registration.component").then((m) => m.RegistrationComponent)
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];