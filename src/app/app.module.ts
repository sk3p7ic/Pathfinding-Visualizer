import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PathfindingVisualizerModule } from './pathfinding-visualizer/pathfinding-visualizer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PathfindingVisualizerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
