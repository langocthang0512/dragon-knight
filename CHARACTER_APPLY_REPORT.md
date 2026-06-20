# Dragon Knight Character Apply Report

## Old Character

- Previous active character visuals were the generated `drawCandidate*` player frames in `src/services/AssetLoader.ts`.
- Active texture keys before the redesign used the same runtime names:
  - `player-male-idle`, `player-male-run`, `player-male-jump`, `player-male-doubleJump`, `player-male-fall`, `player-male-attack`, `player-male-hit`, `player-male-death`
  - `player-female-idle`, `player-female-run`, `player-female-jump`, `player-female-doubleJump`, `player-female-fall`, `player-female-attack`, `player-female-hit`, `player-female-death`

## New Character

- Redesigned Candidate A character visuals are now the active generated player textures.
- The active renderer is the locked character stack in `src/services/AssetLoader.ts`:
  - `drawLockedCape`
  - `drawLockedBody`
  - `drawLockedHead`
  - `drawLockedSheathedSword`
  - `drawLockedSword`
  - `drawFallenKnight`
- Male and female use the same body, armor, scarf, cape, boots, gloves, weapon, and animation bindings.
- Hair remains the only character variant difference.

## Loaded File

- Runtime loader: `src/game/scenes/PreloadScene.ts`
- Texture generator: `src/services/AssetLoader.ts`
- Texture creation entry point: `new AssetLoader(this).createGeneratedTextures()`
- Placeholder preview texture: `candidate-a-player`
- Active animation key helper: `playerAnimationKey(variant, state)`

## Scene Usage

- Main Menu:
  - File: `src/game/scenes/MainMenuScene.ts`
  - Uses `${playerAnimationKey(save.selectedKnight, 'idle')}-0`
  - Plays `playerAnimationKey(save.selectedKnight, 'idle')`
  - Status: redesigned character loaded through active animation keys.

- Character Select:
  - File: `src/game/scenes/CharacterSelectScene.ts`
  - Uses `${playerAnimationKey(character.id, 'idle')}-0`
  - Plays `playerAnimationKey(character.id, 'idle')`
  - Status: redesigned male and female character previews loaded through active animation keys.

- Gameplay:
  - File: `src/entities/player/Player.ts`
  - Constructor uses `${playerAnimationKey(options.variant, 'idle')}-0`
  - State playback uses `playerAnimationKey(this.variant, state)`
  - Status: redesigned character loaded for idle, run, jump, double jump, fall, attack, hit, and death.

- Pause:
  - File: `src/game/scenes/PauseScene.ts`
  - Character preview: none.
  - Status: no old character reference present.

- Game Over:
  - File: `src/game/scenes/GameOverScene.ts`
  - Character preview: none.
  - Status: no old character reference present.

- HUD:
  - File: `src/ui/Hud.ts`
  - Character preview: none.
  - Status: no old character reference present.

## Integration Result

- No external character sprite folders, atlas files, or imports are used by the current architecture.
- No animation key migration was required because the redesigned character replaced the active generator behind existing keys.
- Player collision body size and offset remain unchanged.
- Gameplay, save data, controls, scene flow, HUD, shop, and level progression remain unchanged.

## Verification

- Source inspection completed for loader, character data, Main Menu, Character Select, Gameplay, Pause, Game Over, and HUD.
- Local dev server started successfully at `http://127.0.0.1:5176/`.
- In-app browser automation could not attach in this environment due a Windows sandbox launch failure, so visual click-through verification was not completed through the browser.
- Production build command: `npm.cmd run build`
- Production build result: passed.
- Build note: Vite reported the existing large chunk warning after successfully generating `dist`.
