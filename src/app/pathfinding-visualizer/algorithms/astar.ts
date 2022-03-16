import { GridNode } from '../pathfinding-grid/grid-node';
import { GridNodeType } from '../pathfinding-grid/grid-node-type';
import { AlgorithmController } from './algorithm-controller';
import { RunnableAlgorithm } from './runnable-algorithm';

export class AStar implements RunnableAlgorithm {
  private nodes: GridNode[][];
  private start: GridNode;
  private end: GridNode;
  private controller: AlgorithmController | null;

  constructor(nodes: GridNode[][], start: GridNode, end: GridNode) {
    this.nodes = nodes;
    this.start = start;
    this.end = end;
    this.controller = null;
    // Ensure that all nodes have their neighbors calculated
    for (const row of this.nodes) {
      for (const node of row) {
        node.updateNeighbors(this.nodes);
      }
    }
  }

  hFunction(pos1: number[], pos2: number[]) {
    const x1 = pos1[0];
    const y1 = pos1[1];
    const x2 = pos2[0];
    const y2 = pos2[1];
    // Return the Manhattan distance between the points
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  runAlgorithm(): void {
    // Ensure that there is a controller for the renderer
    if (!this.hasController()) return;
    // Start the algorithm
    var count = 0;
    var openSet = new PriorityQueue<QueueEntry>(
      (x: QueueEntry, y: QueueEntry) => x.priority - y.priority
    ); // Used to find the node with the smallest f-score
    // Set up an array to store the the contents of the openSet
    var openSetContents = new Array<GridNode>();
    // Used to determine if a given node is in the openSet
    const setContains = (node: GridNode) => {
      for (const item of openSetContents) {
        if (node === item) return true;
      }
      return false;
    };
    openSet.push(new QueueEntry(0, this.start));
    var cameFrom = new Map<GridNode, GridNode>(); // <Neighbor Node, Current Node>
    var gScores = new Map<GridNode, number>(); // <Node, G-Score>
    var fScores = new Map<GridNode, number>(); // <Node, F-Score>
    // Set all g- and f-scores for all nodes to infinity
    for (const row of this.nodes) {
      for (const node of row) {
        gScores.set(node, Infinity);
        fScores.set(node, Infinity);
      }
    }
    gScores.set(this.start, 0); // Set the g-score for the first node to zero
    fScores.set(
      this.start,
      this.hFunction(this.start.getPosition(), this.end.getPosition())
    );
    while (!openSet.empty()) {
      var currNode = openSet.pop().node;
      openSetContents.filter((node) => node !== currNode);
      if (currNode === this.end) {
        while (cameFrom.has(currNode)) {
          currNode = cameFrom?.get(currNode) ?? currNode;
          currNode.nodeType = GridNodeType.PATH;
          // Reset start and end node colors
          this.start.nodeType = GridNodeType.START;
          this.end.nodeType = GridNodeType.END;
          this.render(count);
        }
        return;
      }
      for (const neighbor of currNode.neighbors) {
        const temp_gScore = 1 + (gScores?.get(currNode) ?? 0);
        if (temp_gScore < (gScores?.get(neighbor) ?? 0)) {
          cameFrom.set(neighbor, currNode);
          gScores.set(neighbor, temp_gScore);
          fScores.set(
            neighbor,
            temp_gScore +
              this.hFunction(neighbor.getPosition(), this.end.getPosition())
          );
          if (!setContains(neighbor)) {
            count++;
            openSet.push(new QueueEntry(fScores?.get(neighbor) ?? 0, neighbor));
            openSetContents.push(neighbor);
            neighbor.nodeType = GridNodeType.OPEN;
          }
        }
      }
      this.render(0);
      console.log(openSet.size);
      if (currNode != this.start) currNode.nodeType = GridNodeType.CLOSED;
    }
  }

  render(delay: number): void {
    // Ensure that there is a controller for the renderer
    if (!this.hasController()) return;
    this.controller?.render(this.nodes, delay);
  }

  getDescription(): string {
    return 'This is a basic description.';
  }

  setController(controller: AlgorithmController): void {
    this.controller = controller;
  }

  hasController(): boolean {
    const hasController = this.controller != null;
    if (!hasController) {
      console.error('There is no controller set for ', this);
      return false;
    } else {
      return true;
    }
  }
}

class QueueEntry {
  constructor(public priority: number, public node: GridNode) {}
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Naive priority queue; not intended for large datasets */
class PriorityQueue<T> {
  private _items = new Array<T>();

  constructor(private _comparator: (x: T, y: T) => number) {}

  clear() {
    this._items = new Array<T>();
  }

  push(item: T) {
    const index = this._items.findIndex(
      (existing) => this._comparator(item, existing) <= 0
    );

    if (index === -1) {
      this._items.push(item);
    } else {
      this._items.splice(index, 0, item);
    }
  }

  pop(): T {
    return this._items.splice(0, 1)[0];
  }

  peek(): T {
    return this._items[0];
  }

  get size(): number {
    return this._items.length;
  }

  toArray(): Array<T> {
    return this._items.slice();
  }

  empty(): boolean {
    return this.size === 0;
  }
}
