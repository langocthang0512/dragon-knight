# UI Fix Report

## Scope

Phase B fixed UI behavior and layout bugs visible in the uploaded screenshots. Approved visual direction was preserved; no UI redesign cycle was performed.

## Button Cells

- Text buttons now use blank button-cell assets derived from the approved Candidate A button art:
  - `public/assets/ui/final/stone-button-blank.png`
  - `public/assets/ui/final/wood-button-blank.png`
- Icon-only cells remain available for settings/home/play actions:
  - `public/assets/ui/final/icon-settings.png`
  - `public/assets/ui/final/icon-home.png`
  - `public/assets/ui/final/icon-play.png`
- `addPixelButton` now supports pointer selection and click actions.
- Visible hotkey prefixes were removed from UI labels.

## HUD

HUD now contains only:

- Health
- Gold
- Settings

Removed:

- `ESC` text
- Debug text from the gameplay HUD area
- Extra top clutter

## Screens Updated

- Main Menu: clickable button cells; no hotkey labels or footer clutter.
- Shop: clickable Buy Heart and Back cells; no hotkey labels.
- Character Select: clickable character cells and Back cell.
- Settings: clickable setting cells and Back cell.
- Pause: separate Resume, Retry, and Main Menu cells.
- Result/Victory: separate Menu and Replay cells.
- Gameplay tutorial markers: only Move, Double Jump, and Attack remain; no embedded control strings.

## Pause Fixes

- Resume resumes the paused Game scene and closes Pause.
- Retry stops the paused Game scene before starting a new Game scene.
- Main Menu stops the paused Game scene before returning to Main Menu.

## Files Modified

- `src/services/AssetLoader.ts`
- `src/ui/PixelUi.ts`
- `src/ui/Hud.ts`
- `src/game/scenes/GameScene.ts`
- `src/game/scenes/MainMenuScene.ts`
- `src/game/scenes/PauseScene.ts`
- `src/game/scenes/ShopScene.ts`
- `src/game/scenes/CharacterSelectScene.ts`
- `src/game/scenes/SettingsScene.ts`
- `src/game/scenes/ResultScene.ts`
- `src/levels/levelOne.ts`
- `public/assets/ui/final/stone-button-blank.png`
- `public/assets/ui/final/wood-button-blank.png`
- `public/assets/ui/final/icon-settings.png`
- `public/assets/ui/final/icon-home.png`
- `public/assets/ui/final/icon-play.png`
- `UI_TRIAGE.md`
- `UI_FIX_REPORT.md`

## Validation

- `npm run build` passed.
- Scan confirmed visible hotkey-label configuration was removed from active scene/button code.
- HUD no longer creates the `ESC` text object.
