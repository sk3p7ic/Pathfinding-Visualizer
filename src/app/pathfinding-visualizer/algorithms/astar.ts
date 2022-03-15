import { GridNode } from '../pathfinding-grid/grid-node';
import { RunnableAlgorithm } from './runnable-algorithm';

export class AStar implements RunnableAlgorithm {
  private nodes: GridNode[][];

  constructor(nodes: GridNode[][]) {
    this.nodes = nodes;
  }

  runAlgorithm(): void {
    // Code
  }

  render(): void {
    // Code
  }

  getDescription(): string {
    return 'This is a basic description.';
  }
}
