# Dragon Knight Local Test Ready

## Build

- Command: `npm.cmd run build`
- Result: passed.
- Output: `dist`
- Build note: Vite reported the existing large chunk warning after successful output generation.

## Preview

- Command: `npm.cmd run preview -- --host 127.0.0.1 --port 4173`
- URL: `http://127.0.0.1:4173/`
- HTTP check: `200`

## Character Verification

- Main Menu screenshot: `public/assets/characters/final/verify-main-menu.png`
- Character Select screenshot: `public/assets/characters/final/verify-character-select.png`
- Gameplay screenshot: `public/assets/characters/final/verify-gameplay.png`
- Pause screenshot: `public/assets/characters/final/verify-pause.png`
- Implemented frame sheet: `public/assets/characters/final/implemented-character-review.png`
- Old / approved / implemented comparison: `public/assets/characters/final/character-side-by-side.png`

## Notes

- Character-bearing screens now use approved PNG frames extracted from `C:\Users\admin\Desktop\character_design_and_animation.png`.
- Pause and Game Over do not contain character preview sprites in the current scene implementation.
- Gameplay, movement, combat, physics, save, and progression systems remain unchanged.
