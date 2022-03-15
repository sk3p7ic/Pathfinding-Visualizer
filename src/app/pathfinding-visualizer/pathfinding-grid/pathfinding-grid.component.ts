import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { VisualizerKeyMode } from '../pathfinding-visualizer.component';
import { GridNode } from './grid-node';
import { GridNodeType } from './grid-node-type';

@Component({
  selector: 'app-pathfinding-grid',
  templateUrl: './pathfinding-grid.component.html',
  styleUrls: ['./pathfinding-grid.component.sass'],
})
export class PathfindingGridComponent implements OnInit, OnChanges {
  @Input('doReset') resetListener = 0;
  @Input() wallReset = 0;
  @Input() keyMode!: VisualizerKeyMode;

  width: any;
  height: any;
  gridWidth: number;
  gridHeight: number;

  nodes: GridNode[][];

  mousePressed: boolean;

  constructor() {
    this.nodes = [];
    this.gridWidth = 0;
    this.gridHeight = 0;
    this.mousePressed = false;
  }

  ngOnInit(): void {
    this.width = window.innerWidth - 100;
    this.height = window.innerHeight - 100;
    this.resetGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'resetListener') this.resetGrid();
      if (propName === 'wallReset')
        this.removeExistingNodesOfType(GridNodeType.BARRIER);
    }
  }

  resetGrid() {
    this.nodes = [];
    this.gridWidth = Math.floor(this.width / 26); // 25 + 2px border
    this.gridHeight = Math.floor(this.height / 26); // 25 + 2px border
    for (let i = 0; i < this.gridHeight; i++) {
      var gridRow = [];
      for (let j = 0; j < this.gridWidth; j++) {
        gridRow.push(new GridNode(i, j, this.gridHeight, this.gridWidth));
      }
      this.nodes.push(gridRow);
    }
    // Calculate default position of Start and End nodes
    if (this.nodes.length > 0) {
      const widthOffset = Math.floor(this.gridWidth * 0.2);
      const heightOffset = Math.floor(this.gridHeight * 0.5);
      // Set the start and end
      this.nodes[heightOffset][widthOffset].nodeType = GridNodeType.START;
      this.nodes[heightOffset][this.gridWidth - widthOffset].nodeType =
        GridNodeType.END;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: any) {
    this.mousePressed = true;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: any) {
    this.mousePressed = false;
  }

  calculateGridPosition() {}

  handleMouseEnter(row: number, col: number) {
    if (this.mousePressed) {
      switch (this.keyMode) {
        case VisualizerKeyMode.DEMOLISH:
          if (
            !(
              this.nodes[row][col].nodeType === GridNodeType.START ||
              this.nodes[row][col].nodeType === GridNodeType.END
            )
          )
            this.nodes[row][col].nodeType = GridNodeType.UNDEFINED;
          break;
        case VisualizerKeyMode.PLACE_END:
          this.removeExistingNodesOfType(GridNodeType.END);
          this.nodes[row][col].nodeType = GridNodeType.END;
          break;
        case VisualizerKeyMode.PLACE_START:
          this.removeExistingNodesOfType(GridNodeType.START);
          this.nodes[row][col].nodeType = GridNodeType.START;
          break;
        case VisualizerKeyMode.WALL:
          if (
            !(
              this.nodes[row][col].nodeType === GridNodeType.START ||
              this.nodes[row][col].nodeType === GridNodeType.END
            )
          )
            this.nodes[row][col].nodeType = GridNodeType.BARRIER;
          break;
      }
    }
  }

  handleMouseClick(row: number, col: number) {
    switch (this.keyMode) {
      case VisualizerKeyMode.DEMOLISH:
        if (
          !(
            this.nodes[row][col].nodeType === GridNodeType.START ||
            this.nodes[row][col].nodeType === GridNodeType.END
          )
        )
          this.nodes[row][col].nodeType = GridNodeType.UNDEFINED;
        break;
      case VisualizerKeyMode.PLACE_END:
        this.removeExistingNodesOfType(GridNodeType.END);
        this.nodes[row][col].nodeType = GridNodeType.END;
        break;
      case VisualizerKeyMode.PLACE_START:
        this.removeExistingNodesOfType(GridNodeType.START);
        this.nodes[row][col].nodeType = GridNodeType.START;
        break;
      case VisualizerKeyMode.WALL:
        if (
          !(
            this.nodes[row][col].nodeType === GridNodeType.START ||
            this.nodes[row][col].nodeType === GridNodeType.END
          )
        )
          this.nodes[row][col].nodeType = GridNodeType.BARRIER;
        break;
    }
  }

  removeExistingNodesOfType(value: GridNodeType) {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.nodeType === value) node.nodeType = GridNodeType.UNDEFINED;
      }
    }
  }
}
