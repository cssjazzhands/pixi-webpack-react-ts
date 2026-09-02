import type { ReactElement } from 'react';
import type { ScreenEvent, ScreenId } from './ScreenStateMachine';

export type ScreenRenderContext = {
  onAction: (event: ScreenEvent) => void;
};

export interface ScreenDefinition {
  id: ScreenId;
  render: (context: ScreenRenderContext) => ReactElement;
}

export abstract class BaseScreen implements ScreenDefinition {
  abstract id: ScreenId;
  abstract render(context: ScreenRenderContext): ReactElement;
}
