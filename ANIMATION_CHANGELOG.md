# Dragon Knight Animation Changelog

## Character Delta Update

Source: Demo V2 moving cycle from `C:\Users\admin\AppData\Local\Temp\dragon-knight-animation-demo-v2`.

## Added

- Added 8 additional active run frames per character:
  - Male run: `male-run-3.png` through `male-run-10.png`
  - Female run: `female-run-3.png` through `female-run-10.png`

## Updated

- Replaced existing run frames with cleaned, normalized Demo V2 moving frames:
  - `male-run-0.png`
  - `male-run-1.png`
  - `male-run-2.png`
  - `female-run-0.png`
  - `female-run-1.png`
  - `female-run-2.png`
- Updated `run` frame count from `3` to `11`.
- Updated `run` playback rate to `10 FPS` to match the Demo V2 review timing and reduce the floating-forward feel.

## Unchanged

- Idle animation.
- Jump animation.
- Double jump animation.
- Fall animation.
- Attack animation.
- Hit animation.
- Death animation.
- Player state names and state transition logic.
- Movement, combat, physics, collision size, save data, and progression.

## Backup

- Previous active run frames were copied to:
  - `public/assets/characters/final/backup-before-demo-v2-run/`
