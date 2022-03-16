import { GridNode } from '../pathfinding-grid/grid-node';
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
    this.algorithmClass.setController(this); // Set the controller to this class for rendering
  }

  runAlgorithm(): void {
    this.algorithmClass.runAlgorithm();
  }

  render(nodes: GridNode[][], delay: number) {
    setTimeout(() => {
      this.gridComponent.nodes = nodes;
    }, delay);
  }
}
