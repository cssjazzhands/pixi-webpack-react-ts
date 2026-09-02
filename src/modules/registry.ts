import * as PIXI from 'pixi.js';
import { IRenderer } from '../visualisation/IRenderer';
import { createGridRenderer } from '../visualisation/GridSystem';

export type RendererLike = IRenderer & {
  initialize?: (app: PIXI.Application) => void;
  getStageSize?: () => number;
};

export type RegisteredModule = {
  id: string;
  create: () => RendererLike;
};

const registeredModules: Record<string, RegisteredModule> = {};
const rendererCache: Record<string, RendererLike> = {};

export function registerRendererModule(module: RegisteredModule): void {
  registeredModules[module.id] = module;
  rendererCache[module.id] = module.create();
}

registerRendererModule({
  id: 'grid',
  create: createGridRenderer,
});

export function getRegisteredRenderer(moduleId = 'grid'): RendererLike {
  if (!rendererCache[moduleId]) {
    const module = registeredModules[moduleId];
    if (!module) {
      throw new Error(`No registered renderer module found for: ${moduleId}`);
    }
    rendererCache[moduleId] = module.create();
  }

  return rendererCache[moduleId];
}
