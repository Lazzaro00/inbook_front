import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/authentication/authetication.routing").then((m) => m.routes),
      },

      /*{
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
      */
    ],
  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];
