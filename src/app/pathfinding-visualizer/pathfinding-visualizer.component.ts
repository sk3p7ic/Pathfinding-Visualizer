import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathfinding-visualizer',
  templateUrl: './pathfinding-visualizer.component.html',
  styleUrls: ['./pathfinding-visualizer.component.sass'],
})
export class PathfindingVisualizerComponent implements OnInit {
  doReset: number;
  doWallsReset: number;
  keyMode: VisualizerKeyMode;
  availableKeyModes = VisualizerKeyMode;

  constructor() {
    this.doReset = 0;
    this.doWallsReset = 0;
    this.keyMode = VisualizerKeyMode.WALL;
  }

  ngOnInit(): void {}

  handleResetClick() {
    this.doReset++;
  }

  handleWallClick() {
    this.doWallsReset++;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeypress(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    switch (key) {
      case 'd':
        this.keyMode = VisualizerKeyMode.DEMOLISH;
        break;
      case 'e':
        this.keyMode = VisualizerKeyMode.PLACE_END;
        break;
      case 's':
        this.keyMode = VisualizerKeyMode.PLACE_START;
        break;
      default:
        // Default to placing walls
        this.keyMode = VisualizerKeyMode.WALL;
        break;
    }
  }
}

export enum VisualizerKeyMode {
  WALL = '(w) Wall',
  DEMOLISH = '(d) Demolish',
  PLACE_START = '(s) Place Start',
  PLACE_END = '(e) Place End',
}
