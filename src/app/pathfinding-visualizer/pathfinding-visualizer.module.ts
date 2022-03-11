import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathfindingVisualizerComponent } from './pathfinding-visualizer.component';
import { PathfindingGridComponent } from './pathfinding-grid/pathfinding-grid.component';



@NgModule({
  declarations: [
    PathfindingVisualizerComponent,
    PathfindingGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PathfindingVisualizerComponent
  ]
})
export class PathfindingVisualizerModule { }
