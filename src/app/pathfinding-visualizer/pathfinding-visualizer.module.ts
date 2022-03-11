import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathfindingVisualizerComponent } from './pathfinding-visualizer.component';



@NgModule({
  declarations: [
    PathfindingVisualizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PathfindingVisualizerComponent
  ]
})
export class PathfindingVisualizerModule { }
