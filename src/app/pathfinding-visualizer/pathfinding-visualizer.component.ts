import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathfinding-visualizer',
  templateUrl: './pathfinding-visualizer.component.html',
  styleUrls: ['./pathfinding-visualizer.component.sass'],
})
export class PathfindingVisualizerComponent implements OnInit {
  doReset: number;

  constructor() {
    this.doReset = 0;
  }

  ngOnInit(): void {}

  handleResetClick() {
    this.doReset++;
  }
}
