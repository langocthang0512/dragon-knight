# Dragon Knight Environment Migration Plan

Approved source of truth: `C:\Users\admin\AppData\Local\Temp\codex-clipboard-0f168e72-2ce8-46b3-a384-875e12c73875.png`

Scope: environment visuals only. Gameplay, level layout, collisions, enemy placement, checkpoint logic, physics, camera, save data, and progression remain preserved.

## Migration Map

| Old Asset | Approved Replacement | Target Scene |
| --- | --- | --- |
| Generated moss stone platform texture `candidate-a-moss-stone-tile` | Approved mossy teal stone ground/block tile | Main Menu preview, Level 1 platforms/ledges |
| Generated coin texture `candidate-a-coin` | Approved gold dragon coin | Level 1 collectable coins |
| Generated HUD coin texture `candidate-a-coin-hud` | Approved gold dragon coin | HUD, Shop |
| Generated checkpoint texture `candidate-a-bonfire-checkpoint` | Approved checkpoint bonfire | Level 1 checkpoint |
| Generated spike trap texture `candidate-a-spike-trap` | Approved mossy spike trap | Level 1 traps |
| Generated dragon egg texture `candidate-a-dragon-egg` | Approved dragon egg | Level 1 falling eggs |
| Generated finish gate texture `candidate-a-finish-gate` | Approved ancient gate/door | Level 1 finish |

## Target Locations

- `public/assets/environment/final/ground-tile.png`
- `public/assets/environment/final/coin.png`
- `public/assets/environment/final/bonfire.png`
- `public/assets/environment/final/spike-trap.png`
- `public/assets/environment/final/dragon-egg.png`
- `public/assets/environment/final/finish-gate.png`
- `public/assets/environment/final/environment-review.png`

## Deactivation Strategy

- Add environment preloading to `AssetLoader`.
- Load approved PNGs into the existing `PlaceholderAssets` texture keys.
- Keep legacy generated environment methods in `AssetLoader` as backup only.
- Because the approved PNG textures already exist after preload, legacy generators return early and are no longer active.

## Scene Impact

- `PreloadScene` gains approved environment asset preload.
- `GameScene`, `MainMenuScene`, `Hud`, `ShopScene`, and `asset-preview.html` keep the same texture references.
- Level geometry and physics bodies are unchanged.
