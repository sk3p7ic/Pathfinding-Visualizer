import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GridNode } from './grid-node';
import { GridNodeType } from './grid-node-type';

@Component({
  selector: 'app-pathfinding-grid',
  templateUrl: './pathfinding-grid.component.html',
  styleUrls: ['./pathfinding-grid.component.sass'],
})
export class PathfindingGridComponent implements OnInit, OnChanges {
  @Input('doReset') resetListener = 0;

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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: any) {
    console.log('The mouse is pressed down.');
    this.mousePressed = true;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: any) {
    console.log('The mouse is released.');
    this.mousePressed = false;
  }

  calculateGridPosition() {}

  handleMouseEnter(row: number, col: number) {
    if (this.mousePressed) this.nodes[row][col].nodeType = GridNodeType.BARRIER;
  }

  handleMouseClick(row: number, col: number) {
    this.nodes[row][col].nodeType = GridNodeType.BARRIER;
  }
}
