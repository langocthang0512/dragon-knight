# HANDOFF

## Project

Dragon Knight is a 2D pixel action platformer vertical slice inspired by the feel of Apple Knight, without copying assets, code, levels, characters, or maps.

## Current Scope

Build only the vertical slice:

- Main Menu
- Character Select
- Shop
- HUD
- Gameplay
- Level 1

Do not build Levels 2 or 3 yet.

## Tech Stack

- React
- TypeScript
- Phaser 3
- Vite

## Current State

- Repository was empty except for `.git` at initialization.
- Added a runnable React/Vite/TypeScript/Phaser baseline.
- Phaser is mounted through `src/game/PhaserGame.tsx`.
- Game configuration lives in `src/game/config.ts`.
- Scenes currently include `BootScene` and a placeholder `MainMenuScene`.
- Production build passes with `npm run build`.
- Dependency audit passes with `npm audit --audit-level=low`.
- The build currently emits a large-chunk warning because Phaser is bundled into the initial client chunk; address code-splitting later if startup size becomes a milestone requirement.

## Next Recommended Milestone

Implement the real menu flow foundation:

- Main Menu navigation
- Character Select screen shell
- Shop screen shell
- Shared scene transition conventions
- Initial pixel-art placeholder asset strategy

## Standing Rules

- Always inspect the repository before making changes.
- Preserve architecture.
- Continue implementation from the latest state.
- Never rebuild from scratch.
- Never delete working systems.
- Commit after every completed milestone.
- Keep the build runnable.
- Update this file when context or implementation state changes materially.
