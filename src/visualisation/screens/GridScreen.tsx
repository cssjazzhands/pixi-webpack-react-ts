import { useEffect, useRef, ReactElement } from 'react';
import * as PIXI from 'pixi.js';
import type { ScreenRenderContext } from './BaseScreen';
import { getRegisteredRenderer } from '../modules/registry';

function GridScreenComponent(): ReactElement {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const renderer = getRegisteredRenderer();
  const stageSize = renderer.getStageSize?.() ?? 596;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cancelled = false;

    const initApp = async () => {
      const app = new PIXI.Application();
      await app.init({
        width: stageSize,
        height: stageSize,
        backgroundColor: 0x020817,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });

      if (cancelled) {
        app.destroy(true, { children: true });
        return;
      }

      appRef.current = app;
      container.innerHTML = '';
      container.appendChild(app.canvas);

      if (renderer.initialize) {
        renderer.initialize(app);
      }

      renderer.render();
    };

    initApp();

    return () => {
      cancelled = true;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
      }
    };
  }, [stageSize, renderer]);

  return (
    <div
      ref={mountRef}
      style={{
        opacity: 1,
        transition: 'opacity 700ms ease',
        pointerEvents: 'auto',
      }}
    />
  );
}

export class GridScreen {
  id = 'grid' as const;

  render(_context: ScreenRenderContext): ReactElement {
    return <GridScreenComponent />;
  }
}
