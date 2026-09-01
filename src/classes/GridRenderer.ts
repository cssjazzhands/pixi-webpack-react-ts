import * as PIXI from 'pixi.js';
import { IRenderer } from './IRenderer';

/**
 * GridRenderer class handles Pixi.js rendering for the grid
 */
export class GridRenderer implements IRenderer {
  private graphics: PIXI.Graphics[] = [];
  private container: PIXI.Container | null = null;
  private pixiApp: PIXI.Application | null = null;

  constructor(
    pixiApp: PIXI.Application | null,
    private gridSize: number,
    private cellSize: number,
    private padding: number
  ) {
    this.pixiApp = pixiApp;
    if (pixiApp) {
      this.initialize(pixiApp);
    }
  }

  /**
   * Initialize the renderer with a PIXI.Application
   * Call this after the App has created the PIXI instance
   */
  initialize(pixiApp: PIXI.Application): void {
    this.pixiApp = pixiApp;
    this.container = new PIXI.Container();
    this.pixiApp.stage.addChild(this.container);
    this.initializeGraphics();
  }

  private initializeGraphics(): void {
    if (!this.container) return;

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const graphic = new PIXI.Graphics();
        const x = this.padding + col * this.cellSize;
        const y = this.padding + row * this.cellSize;

        graphic.position.set(x, y);

        this.container.addChild(graphic);
        this.graphics.push(graphic);
      }
    }
  }

  getGraphic(index: number): PIXI.Graphics {
    return this.graphics[index];
  }

  getGraphics(): PIXI.Graphics[] {
    return this.graphics;
  }

  getStageSize(): number {
    return this.gridSize * this.cellSize + this.padding * 2;
  }

  render(): void {
    const CELL_PADDING = 4;
    const CELL_BORDER_RADIUS = 12;
    const CELL_BORDER_WIDTH = 2;
    const CELL_COLOR = 0xffffff;
    const BORDER_COLOR = 0xcccccc;

    this.graphics.forEach((graphic) => {
      graphic.clear();

      // Draw base cell
      graphic.roundRect(
        CELL_PADDING,
        CELL_PADDING,
        this.cellSize - CELL_PADDING * 2,
        this.cellSize - CELL_PADDING * 2,
        CELL_BORDER_RADIUS
      );
      graphic.fill({ color: CELL_COLOR, alpha: 1 });

      // Draw border
      graphic.roundRect(
        CELL_PADDING,
        CELL_PADDING,
        this.cellSize - CELL_PADDING * 2,
        this.cellSize - CELL_PADDING * 2,
        CELL_BORDER_RADIUS
      );
      graphic.stroke({ width: CELL_BORDER_WIDTH, color: BORDER_COLOR, alpha: 1 });
    });
  }
}
