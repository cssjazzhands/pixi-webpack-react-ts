import { Cell } from './Cell';
import { GridRenderer } from './GridRenderer';

export const GRID_SIZE = 10;
export const CELL_SIZE = 48;
export const PADDING = 16;
export const STAGE_SIZE = GRID_SIZE * CELL_SIZE + PADDING * 2;

export function createGridRenderer() {
  return new GridRenderer(null, GRID_SIZE, CELL_SIZE, PADDING);
}

/**
 * GridSystem class manages the grid of cells
 */
export class GridSystem {
  private cells: Cell[] = [];

  constructor(gridSize: number = GRID_SIZE) {
    this.cells = Array.from({ length: gridSize * gridSize }, () => new Cell(0));
  }

  getCell(index: number): Cell {
    return this.cells[index];
  }

  getCells(): Cell[] {
    return this.cells;
  }

  getSize(): number {
    return this.cells.length;
  }
}
