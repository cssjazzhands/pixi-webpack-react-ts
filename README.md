# Pixi Webpack React TypeScript

A modular React + Pixi.js application with a state-machine-driven screen system and clean separation of concerns.

## Project Overview

This project demonstrates a clean architecture for building interactive canvas applications with React and Pixi.js. The app uses a state machine to manage screen transitions and a registry pattern to decouple components from concrete implementations.

**Key Features:**
- ✅ Screen-based UI with state machine orchestration
- ✅ Self-contained screen lifecycle (each screen owns its rendering and effects)
- ✅ Pluggable renderer system (Grid, extensible for other renderers)
- ✅ Flow-driven state machine with explicit node definitions
- ✅ TypeScript throughout for type safety
- ✅ Webpack dev server with hot module reloading

## Architecture

### Core Concepts

#### 1. **Screen State Machine** (`src/screens/ScreenStateMachine.ts`)
Manages application state transitions and screen lifecycle. The machine:
- Holds current screen state
- Triggers enter/exit handlers on transitions
- Validates transitions based on flow definition
- Notifies listeners of state changes

#### 2. **Screen Flow Definition** (`src/screens/screenFlow.ts`)
Declarative definition of the state machine graph. Defines:
- **Nodes**: Each state (screen) with enter/exit logic
- **Transitions**: Events that trigger state changes (e.g., `start: 'grid'`)
- **Initial state**: Where the app starts (`'start'`)
- **Final state**: Optional terminal state

Example:
```typescript
export const screenFlow: ScreenFlowDefinition = {
  initial: 'start',
  states: {
    start: {
      id: 'start',
      on: { start: 'grid' },
    },
    grid: {
      id: 'grid',
      on: {},
    },
  },
};
```

#### 3. **Screen Registry** (`src/screens/registry.ts`)
Lazily instantiates and caches screens by ID. Allows:
- Decoupling app shell from concrete screen imports
- Easy addition of new screens without modifying app
- Type-safe screen lookup

#### 4. **Renderer Registry** (`src/modules/registry.ts`)
Lazily instantiates and caches renderers by ID. Currently includes:
- **Grid Renderer**: Pixi.js-based grid visualization
- Extensible for additional renderers (canvas, custom rendering)

#### 5. **Self-Contained Screens**
Each screen:
- Owns its rendering logic (JSX + React components)
- Manages its own lifecycle and side effects
- Communicates with the state machine via events
- Examples: `StartScreen` (button UI), `GridScreen` (Pixi canvas)

### File Structure

```
src/
├── App.tsx                          # App shell (screen orchestration)
├── index.tsx                        # React entry point
├── styles.css                       # Global styles
├── global.d.ts                      # TypeScript globals
│
├── classes/
│   ├── Cell.ts                      # Grid cell data model
│   ├── GridSystem.ts                # Grid configuration & factory
│   ├── GridRenderer.ts              # Pixi.js grid rendering
│   └── IRenderer.ts                 # Renderer interface
│
├── modules/
│   └── registry.ts                  # Renderer module registry
│
└── screens/
    ├── ScreenStateMachine.ts        # State machine implementation
    ├── screenFlow.ts                # State machine graph definition
    ├── BaseScreen.ts                # Screen interface
    ├── registry.ts                  # Screen module registry
    ├── StartScreen.tsx              # Start screen (button)
    └── GridScreen.tsx               # Grid screen (Pixi canvas)
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm 7+

### Installation
```bash
npm install
```

### Development
```bash
npm run build          # Production build
npx webpack serve --mode development  # Dev server at http://localhost:3000
```

### How the App Works

1. **Boot**: App initializes state machine with `screenFlow` definition
2. **Render**: App renders the active screen (initially `start`)
3. **Interact**: User clicks "Start" button
4. **Transition**: State machine validates the `start` event and transitions to `grid`
5. **Mount**: Grid screen mounts and initializes Pixi canvas
6. **Display**: Grid renders via Pixi.js

## Flow Diagram

```
[Start Screen]
      ↓
  Click "Start"
      ↓
  [screenFlow] validates event
      ↓
  [ScreenStateMachine] transitions
      ↓
  [Grid Screen] renders + initializes Pixi
      ↓
  Canvas visible with grid
```

## Adding a New Screen

1. Create screen class in `src/screens/MyScreen.tsx`:
```typescript
import type { ReactElement } from 'react';
import type { ScreenRenderContext } from './BaseScreen';

export class MyScreen {
  id = 'myscreen' as const;

  render({ onAction }: ScreenRenderContext): ReactElement {
    return <div>My Screen Content</div>;
  }
}
```

2. Register in `src/screens/registry.ts`:
```typescript
registerScreenModule({ id: 'myscreen', create: () => new MyScreen() });
```

3. Update `src/screens/ScreenStateMachine.ts` type and `src/screens/screenFlow.ts`:
```typescript
export type ScreenId = 'start' | 'grid' | 'myscreen';
```

4. Add flow node in `screenFlow.ts`:
```typescript
myscreen: {
  id: 'myscreen',
  on: { /* transitions */ },
}
```

## Design Decisions

### Why Separate Flow Definition?
- **Single source of truth** for state graph
- **Readable** declarative structure
- **Testable** state machine behavior
- **Extensible** for complex flows (guards, async states)

### Why Self-Contained Screens?
- **Encapsulation**: Each screen handles its own concerns
- **Reusability**: Screens are independent modules
- **Scalability**: Easy to add complex screens without polluting app shell
- **Testability**: Screen logic isolated from orchestration

### Why Registry Pattern?
- **Loose coupling**: App doesn't know about concrete implementations
- **Lazy loading**: Modules created only when needed
- **Type safety**: TypeScript enforces registered IDs
- **Extensibility**: Add renderers/screens without modifying core

## Technologies

- **React 19.2.8**: UI framework
- **TypeScript 5.8.3**: Type safety
- **Pixi.js 8.20.1**: Canvas rendering
- **Webpack 5**: Module bundler
- **Node.js**: Runtime

## Roadmap

- [ ] Async state transitions (loading states)
- [ ] Screen animation hooks
- [ ] Keyboard/input handlers per screen
- [ ] Grid interaction mechanics
- [ ] Additional screens (loading, splash, end states)
- [ ] State machine visualization/debugging tools
