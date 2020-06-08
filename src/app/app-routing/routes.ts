import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { CanvasComponent } from "../canvas/canvas.component";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,

  },
  { path: 'levels/:id', component: CanvasComponent },
  //{ path: "canvas", component: CanvasComponent },

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
