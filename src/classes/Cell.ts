/**
 * Cell class represents a single grid cell
 */
export class Cell {
  constructor(public energy: number = 0) {}

  isActive(): boolean {
    return this.energy > 0.05;
  }
}
