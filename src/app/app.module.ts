import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LevelsComponent } from "./levels/levels.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
<<<<<<< HEAD
import { CanvasComponent } from './canvas/canvas.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [AppComponent, LevelsComponent, HomeComponent, CanvasComponent],
=======
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AppComponent, LevelsComponent, HomeComponent],
>>>>>>> dcbec0eba2be33c7616d0be23e2a1927d7499281
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
<<<<<<< HEAD
    MatGridListModule,
    MatIconModule,
=======
    MatButtonModule,
>>>>>>> dcbec0eba2be33c7616d0be23e2a1927d7499281
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
