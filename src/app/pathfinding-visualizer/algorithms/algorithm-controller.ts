import { PathfindingGridComponent } from '../pathfinding-grid/pathfinding-grid.component';
import { RunnableAlgorithm } from './runnable-algorithm';

export class AlgorithmController {
  private gridComponent: PathfindingGridComponent;
  private algorithmClass: RunnableAlgorithm;

  constructor(
    gridComponent: PathfindingGridComponent,
    algorithmClass: RunnableAlgorithm
  ) {
    this.gridComponent = gridComponent;
    this.algorithmClass = algorithmClass;
  }
}
