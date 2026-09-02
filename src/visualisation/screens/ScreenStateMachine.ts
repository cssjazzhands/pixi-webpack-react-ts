import type { ScreenFlowDefinition } from './screenFlow';
import { screenFlow } from './screenFlow';

export type ScreenId = 'start' | 'grid';
export type ScreenEvent = 'start';

export class ScreenStateMachine {
  private currentScreen: ScreenId;
  private listeners = new Set<(screen: ScreenId) => void>();
  private flow: ScreenFlowDefinition;

  constructor(flow: ScreenFlowDefinition = screenFlow) {
    this.flow = flow;
    this.currentScreen = flow.initial;
  }

  getState(): ScreenId {
    return this.currentScreen;
  }

  subscribe(listener: (screen: ScreenId) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  transition(event: ScreenEvent): void {
    const currentNode = this.flow.states[this.currentScreen];
    if (!currentNode) {
      return;
    }

    const nextScreenId = currentNode.on[event];
    if (!nextScreenId || nextScreenId === this.currentScreen) {
      return;
    }

    const nextNode = this.flow.states[nextScreenId];
    if (!nextNode) {
      return;
    }

    // Call exit handler for current state
    currentNode.exit?.();

    this.currentScreen = nextScreenId;

    // Call enter handler for next state
    nextNode.enter?.();

    this.listeners.forEach((listener) => listener(this.currentScreen));
  }

  goTo(screenId: ScreenId): void {
    if (screenId === this.currentScreen) {
      return;
    }

    const currentNode = this.flow.states[this.currentScreen];
    const nextNode = this.flow.states[screenId];

    if (!currentNode || !nextNode) {
      return;
    }

    currentNode.exit?.();
    this.currentScreen = screenId;
    nextNode.enter?.();

    this.listeners.forEach((listener) => listener(this.currentScreen));
  }
}
