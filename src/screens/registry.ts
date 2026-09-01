import type { ScreenDefinition } from './BaseScreen';
import type { ScreenId } from './ScreenStateMachine';
import { GridScreen } from './GridScreen';
import { StartScreen } from './StartScreen';

export type ScreenModule = {
  id: ScreenId;
  create: () => ScreenDefinition;
};

const registeredScreens: Record<string, ScreenModule> = {};
const screenCache: Record<string, ScreenDefinition> = {};

export function registerScreenModule(module: ScreenModule): void {
  registeredScreens[module.id] = module;
  screenCache[module.id] = module.create();
}

registerScreenModule({ id: 'start', create: () => new StartScreen() });
registerScreenModule({ id: 'grid', create: () => new GridScreen() });

export function getRegisteredScreen(screenId: ScreenId): ScreenDefinition {
  if (!screenCache[screenId]) {
    const module = registeredScreens[screenId];
    if (!module) {
      throw new Error(`No registered screen module found for: ${screenId}`);
    }
    screenCache[screenId] = module.create();
  }

  return screenCache[screenId];
}
