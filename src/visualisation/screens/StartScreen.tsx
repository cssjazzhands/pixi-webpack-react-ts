import type { ReactElement } from 'react';
import type { ScreenRenderContext } from './BaseScreen';

export class StartScreen {
  id = 'start' as const;

  render({ onAction }: ScreenRenderContext): ReactElement {
    return (
      <button
        type="button"
        onClick={() => onAction('start')}
        style={{
          border: 'none',
          borderRadius: 999,
          background: '#020817',
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 600,
          padding: '12px 28px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(2, 8, 23, 0.15)',
        }}
      >
        Start
      </button>
    );
  }
}
