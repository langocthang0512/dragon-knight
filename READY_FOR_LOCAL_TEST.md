# Dragon Knight Ready For Local Test

## Build

- Command: `npm.cmd run build`
- Result: passed.
- Output: `dist`
- Build note: Vite reported the existing large chunk warning after successful output generation.

## Preview

- Command: `npm.cmd run preview -- --host 127.0.0.1 --port 4173`
- URL: `http://127.0.0.1:4173/`
- HTTP status: `200`

## Asset Checks

- `http://127.0.0.1:4173/assets/characters/final/male-run-10.png`: `200`
- `http://127.0.0.1:4173/assets/characters/final/female-run-10.png`: `200`

## Review Artifacts

- Run delta sheet: `public/assets/characters/final/run-delta-v2-review.png`
- Gameplay verification screenshot: `public/assets/characters/final/verify-run-delta-gameplay.png`

## Scope Confirmation

- Applied Demo V2 moving cycle delta only.
- Jumping animation kept unchanged.
- Gameplay, movement, combat, physics, collision size, save, progression, UI, enemies, and environment remain unchanged.
