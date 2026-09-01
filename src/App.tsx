import { useEffect, useMemo, useRef, useState } from 'react';
import { ScreenStateMachine, type ScreenEvent, type ScreenId } from './screens/ScreenStateMachine';
import { getRegisteredScreen } from './screens/registry';

export default function App() {
  const machineRef = useRef(new ScreenStateMachine());
  const [screenId, setScreenId] = useState<ScreenId>(machineRef.current.getState());

  useEffect(() => {
    const unsubscribe = machineRef.current.subscribe(setScreenId);
    return unsubscribe;
  }, []);

  const triggerScreen = (event: ScreenEvent) => {
    machineRef.current.transition(event);
  };

  const currentScreen = useMemo(() => getRegisteredScreen(screenId), [screenId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f8fafc',
        padding: '24px',
        position: 'relative',
      }}
    >
      {currentScreen.render({
        onAction: triggerScreen,
      })}
    </div>
  );
}
