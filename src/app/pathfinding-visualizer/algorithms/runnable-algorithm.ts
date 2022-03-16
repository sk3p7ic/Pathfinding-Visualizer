import { AlgorithmController } from './algorithm-controller';

export interface RunnableAlgorithm {
  runAlgorithm(): void;

  render(delay: number): void;

  getDescription(): string;

  setController(controller: AlgorithmController): void;

  hasController(): boolean;
}
