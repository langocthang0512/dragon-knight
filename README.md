# Dragon Knight

Dragon Knight is a long-running production repository for a 2D pixel action platformer vertical slice built with React, TypeScript, Phaser 3, and Vite.

## Scope

The current product target is a playable vertical slice only:

- Main Menu
- Character Select
- Shop
- HUD
- Gameplay
- Level 1

Levels 2 and 3 are explicitly out of scope until requested later.

## Architecture

- `src/game` mounts Phaser and registers game scenes.
- `src/core` contains shared game systems such as input, scene transitions, scaling, and debug overlays.
- `src/services` contains persistence and asset-loading helpers.
- `src/entities` contains gameplay actors.
- `src/ui` contains Phaser UI/HUD helpers.
- `src/levels` contains level definitions.
- `src/config` and `src/data` contain durable configuration and game data.
- `src/assets`, `src/audio`, and `src/effects` are reserved for production content.

## Current Gameplay Foundation

- Male and female player variants use the same armor/body with variant-specific hair.
- Player supports run, jump, double jump, sword attack, coyote time, and jump buffering.
- Health starts at 3 HP and is capped at 5 HP.
- Bonfire checkpoint respawn is wired for trap recovery and death recovery.
- Idle, run, jump, fall, attack, hit, and death states are represented with generated placeholder animations.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Repository Rules

- Always inspect existing files before changing code.
- Preserve the current architecture and continue from the latest implementation.
- Never rebuild from scratch or delete working systems.
- Keep the build runnable.
- Commit after every completed milestone.
- Keep `HANDOFF.md` current for continuity.
