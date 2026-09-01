import type { ScreenId, ScreenEvent } from './ScreenStateMachine';

export type StateNode = {
  id: ScreenId;
  enter?: () => void;
  exit?: () => void;
  on: Partial<Record<ScreenEvent, ScreenId>>;
};

export type ScreenFlowDefinition = {
  initial: ScreenId;
  final?: ScreenId;
  states: Record<ScreenId, StateNode>;
};

export const screenFlow: ScreenFlowDefinition = {
  initial: 'start',
  states: {
    start: {
      id: 'start',
      enter: () => {
        // Start screen enter logic can go here
      },
      exit: () => {
        // Start screen exit logic can go here
      },
      on: {
        start: 'grid',
      },
    },
    grid: {
      id: 'grid',
      enter: () => {
        // Grid screen enter logic can go here
      },
      exit: () => {
        // Grid screen exit logic can go here
      },
      on: {},
    },
  },
};
