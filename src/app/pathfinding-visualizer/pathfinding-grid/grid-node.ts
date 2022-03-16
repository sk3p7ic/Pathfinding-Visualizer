import { GridNodeType } from './grid-node-type';

export class GridNode {
  row: number;
  col: number;
  total_rows: number;
  total_cols: number;
  neighbors: GridNode[];
  nodeType: GridNodeType;

  constructor(
    row: number,
    col: number,
    total_rows: number,
    total_cols: number
  ) {
    this.row = row;
    this.col = col;
    this.total_rows = total_rows;
    this.total_cols = total_cols;
    this.neighbors = [];
    this.nodeType = GridNodeType.UNDEFINED;
  }

  getColor() {
    switch (this.nodeType) {
      case GridNodeType.START: {
        return '#c3e88d';
      }
      case GridNodeType.END: {
        return '#ffcb6b';
      }
      case GridNodeType.OPEN: {
        return '#89ddff';
      }
      case GridNodeType.CLOSED: {
        return '#82aaff';
      }
      case GridNodeType.BARRIER: {
        return '#616161';
      }
      case GridNodeType.UNDEFINED: {
        return '#eeffff';
      }
      case GridNodeType.PATH: {
        return '#f78c6c';
      }
    }
  }

  updateNeighbors(nodes: GridNode[][]) {
    this.neighbors = []; // Reset the current list of neighbors
    if (
      this.row < this.total_rows - 1 &&
      nodes[this.row + 1][this.col].nodeType != GridNodeType.BARRIER
    )
      this.neighbors.push(nodes[this.row + 1][this.col]);
    if (
      this.row > 0 &&
      nodes[this.row - 1][this.col].nodeType != GridNodeType.BARRIER
    )
      this.neighbors.push(nodes[this.row - 1][this.col]);
    if (
      this.col < this.total_cols - 1 &&
      nodes[this.row][this.col + 1].nodeType != GridNodeType.BARRIER
    )
      this.neighbors.push(nodes[this.row][this.col + 1]);
    if (
      this.col > 0 &&
      nodes[this.row][this.col - 1].nodeType != GridNodeType.BARRIER
    )
      this.neighbors.push(nodes[this.row][this.col - 1]);
  }

  getPosition(): number[] {
    return Array<number>(this.row, this.col);
  }
}
