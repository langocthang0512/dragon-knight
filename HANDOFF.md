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
- Added a runnable React/Vite/TypeScript/Phaser baseline in A0.
- A1 foundation architecture is now in place.
- Phaser is mounted through `src/game/PhaserGame.tsx`.
- Game configuration lives in `src/game/config.ts`.
- Scenes currently include `BootScene`, `PreloadScene`, `MainMenuScene`, `GameScene`, `PauseScene`, and `ResultScene`.
- `BootScene` starts `PreloadScene`; `PreloadScene` creates generated placeholder textures; `MainMenuScene` starts the Level 1 placeholder with Enter.
- Foundation systems exist for input, scene management, save data, generated asset loading, responsive scaling, and debug overlays.
- Placeholder gameplay includes a controllable player, one enemy spawn, simple platforms, HUD text, and a pause overlay.
- A2 player foundation is in place with generated original placeholder sprites for male and female variants; the armor/body is shared and hair changes by variant.
- Player gameplay includes run, jump, double jump, sword attack, coyote time, jump buffering, default 3 HP, maximum 5 HP support, enemy/trap damage for 1 HP, bonfire checkpoint, trap checkpoint respawn, and death checkpoint respawn.
- Player animation states are wired for idle, run, jump, fall, attack, hit, and death using generated Phaser animation frames.
- A3 Level 1 playable build is in place with empty background, ground, ledges, platforms, coins, bonfire checkpoint, spike traps, falling dragon eggs, small dragons, flying dragons, tutorial flow, and finish gate.
- Level 1 completion saves collected coins and `levelOneBestTimeMs`, then routes to `ResultScene`.
- Complete-run QA passed through headless Chrome/CDP: finished Level 1 with 28 coins and saved `levelOneBestTimeMs: 67178`.
- A4 release UI is in place with Main Menu, Shop, Character Select, Settings, Game Over, Victory, hearts HUD, deployment notes, and QA checklist.
- A4 QA passed with `npm run build`, local dev-server smoke test, and static preview check.
- GitHub/Vercel deployment is prepared but not executed from this environment because no Git remote is configured and neither `gh` nor `vercel` is installed on PATH.
- Dev server verification passes with `npm run dev` on a temporary local port.
- Production build passes with `npm run build`.
- Dependency audit passed at A0 with `npm audit --audit-level=low`.
- The build currently emits a large-chunk warning because Phaser is bundled into the initial client chunk; address code-splitting later if startup size becomes a milestone requirement.

## Next Recommended Milestone

Implement the real vertical-slice menu and progression flow:

- Character Select scene/screen
- Shop scene/screen
- Main Menu options
- HUD state model
- Level 1 gameplay loop and win condition
- Replace generated placeholder visuals with production-safe original pixel art when an asset pipeline milestone is requested.
- Tune Level 1 pacing and difficulty with manual playtest feedback; current A3 pass prioritizes complete playable flow over final balance.

## Standing Rules

- Always inspect the repository before making changes.
- Preserve architecture.
- Continue implementation from the latest state.
- Never rebuild from scratch.
- Never delete working systems.
- Commit after every completed milestone.
- Keep the build runnable.
- Update this file when context or implementation state changes materially.
