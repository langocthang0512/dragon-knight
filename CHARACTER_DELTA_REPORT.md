# Dragon Knight Character Delta Report

Source delta: newest Demo V2 moving cycle from `C:\Users\admin\AppData\Local\Temp\dragon-knight-animation-demo-v2`.

## Added

- Male moving/run frames expanded from 3 active frames to 11 frames.
- Female moving/run frames expanded from 3 active frames to 11 frames.
- Moving cycle now includes clearer idle/load/contact/weight/push-off/recovery/settle poses from Demo V2.

## Modified

- `run` animation frame count changes from `3` to `11`.
- Active run frame image files are replaced only for:
  - `public/assets/characters/final/male-run-0.png` through `male-run-10.png`
  - `public/assets/characters/final/female-run-0.png` through `female-run-10.png`
- Run playback timing is adjusted for the longer cycle.

## Unchanged

- Idle frames.
- Jump frames.
- Double jump frames.
- Fall frames.
- Attack frames.
- Hit frames.
- Death frames.
- Character select idle previews.
- Main menu idle preview.
- UI, enemies, world, VFX, save, movement, combat, physics, collisions, checkpoints, and progression.

## Delta Category Notes

- Visual: only run/moving character PNGs changed.
- Animation: only `run` gains additional frames and timing update.
- Timing: run animation frame rate updated for smoother 11-frame playback.
- Sprite: only `*-run-*.png` assets touched.
- Atlas: no atlas exists in the current architecture; individual PNG frames remain in use.
- State: no new player state is introduced; existing `run` state uses the Demo V2 moving cycle.
