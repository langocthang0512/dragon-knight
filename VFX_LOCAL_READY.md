# VFX Local Ready

## Build

Command:

```bash
npm run build
```

Result: passed.

Notes: Vite reported the existing large bundle warning for the Phaser bundle. No TypeScript errors or asset build errors occurred.

## Preview

Command:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

Result: passed.

Preview URL used:

`http://127.0.0.1:4174/`

Vite selected port `4174` because `4173` was already in use.

## Served Asset Checks

| URL | Result |
| --- | --- |
| `http://127.0.0.1:4174/` | `200 text/html` |
| `http://127.0.0.1:4174/assets/vfx/final/slash.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/dust.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/jump-burst.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/coin-pickup.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/damage.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/checkpoint-burst.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/death-burst.png` | `200 image/png` |
| `http://127.0.0.1:4174/assets/vfx/final/vfx-review-board.png` | `200 image/png` |

## Screen Coverage

- Gameplay coin pickup: approved coin pickup VFX loaded through `PlaceholderAssets.coinPickup`.
- Gameplay checkpoint activation: approved checkpoint flame VFX loaded through `PlaceholderAssets.checkpointBurst`.
- Gameplay damage/death: approved damage spark VFX loaded through `PlaceholderAssets.damage` and `PlaceholderAssets.deathBurst`.
- Respawn/spawn dust: approved dust burst VFX loaded through `PlaceholderAssets.dust`.
- Asset preview: all VFX texture keys preload approved Candidate A files.

## Limitation

Slash and jump burst texture keys are replaced and visible in asset preview, but current gameplay does not yet trigger separate slash or jump-burst one-shot effects. Combat and movement logic were preserved as requested.
