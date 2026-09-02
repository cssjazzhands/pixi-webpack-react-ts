import * as PIXI from 'pixi.js';

/**
 * Interface that all renderers must implement
 */
export interface IRenderer {
  render(): void;
  getGraphic(index: number): PIXI.Graphics;
  getGraphics(): PIXI.Graphics[];
  getStageSize?: () => number;
}
