export interface RunnableAlgorithm {
  runAlgorithm(): void;

  render(): void;

  getDescription(): string;
}
