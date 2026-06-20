# Dragon Knight Character Migration Plan

Approved source of truth: `C:\Users\admin\Desktop\character_design_and_animation.png`

Scope: character visuals and character animation only. Gameplay, movement, combat, physics, collision size, save data, and level progression remain preserved.

## Migration Map

| Old File | New File | Target Location |
| --- | --- | --- |
| Generated player frames from `src/services/AssetLoader.ts` (`drawLocked*` and `drawFallenKnight`) | Extracted approved male frames | `public/assets/characters/final/male-*.png` |
| Generated player frames from `src/services/AssetLoader.ts` (`drawLocked*` and `drawFallenKnight`) | Extracted approved female frames | `public/assets/characters/final/female-*.png` |
| Runtime placeholder `candidate-a-player` generated from code | Approved male idle frame | `public/assets/characters/final/male-idle-0.png` |
| Generated animation frames for `player-male-*` | Approved male idle, run, jump, double jump, fall, attack, hit, death frames | Phaser texture keys `player-male-{state}-{frame}` |
| Generated animation frames for `player-female-*` | Approved female idle, run, jump, double jump, fall, attack, hit, death frames | Phaser texture keys `player-female-{state}-{frame}` |
| Main Menu generated character preview | Approved selected character idle animation | `src/game/scenes/MainMenuScene.ts` |
| Character Select generated character preview | Approved male/female idle animations | `src/game/scenes/CharacterSelectScene.ts` |
| Gameplay generated player textures | Approved animation frames loaded from PNG assets | `src/entities/player/Player.ts` via existing animation keys |
| Asset preview generated player rows | Approved animation frames loaded from PNG assets | `asset-preview.html` |

## Deactivation Strategy

- Keep the legacy generated character drawing methods in `AssetLoader.ts` as backup only.
- Stop calling generated character frame creation in active texture setup.
- Preload approved PNG frames before creating Phaser animations.
- Reuse existing animation keys so scene flow and player state transitions remain unchanged.
- Update only visual scale/alignment needed for the new frame dimensions.

## Target Animation States

| State | Approved Frame Source |
| --- | --- |
| Idle | Approved idle pose |
| Run | Approved run poses |
| Jump | Approved jump pose |
| Double Jump | Approved jump pose reused as approved airborne source |
| Fall | Approved jump/airborne pose reused as approved airborne source |
| Attack | Approved sword slash pose |
| Hit | Approved hit spark pose |
| Death | Approved fallen pose |
