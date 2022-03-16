import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PathfindingVisualizerComponent } from './pathfinding-visualizer.component';
import { PathfindingGridComponent } from './pathfinding-grid/pathfinding-grid.component';

@NgModule({
  declarations: [PathfindingVisualizerComponent, PathfindingGridComponent],
  imports: [CommonModule, FormsModule],
  exports: [PathfindingVisualizerComponent],
})
export class PathfindingVisualizerModule {}
