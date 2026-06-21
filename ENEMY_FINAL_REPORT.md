# Enemy Final Report

## Files Changed

- `public/assets/enemies/final/small-dragon.png`
- `public/assets/enemies/final/flying-dragon.png`
- `public/assets/enemies/final/heavy-dragon.png`
- `public/assets/enemies/final/enemy-review.png`
- `src/services/AssetLoader.ts`
- `src/entities/enemies/Enemy.ts`
- `src/game/scenes/PreloadScene.ts`
- `asset-preview.html`
- `ENEMY_MIGRATION_PLAN.md`
- `ENEMY_FINAL_REPORT.md`

## Enemy Updated

| Enemy Type | Active Texture Key | Active Asset |
| --- | --- | --- |
| Small Dragon | `candidate-a-dragon-small` | `public/assets/enemies/final/small-dragon.png` |
| Flying Dragon | `candidate-a-dragon-flying` | `public/assets/enemies/final/flying-dragon.png` |
| Heavy Dragon | `candidate-a-dragon-heavy` | `public/assets/enemies/final/heavy-dragon.png` |

## Animation Updated

The enemy visual state keys now exist for every enemy type:

- `idle`
- `move`
- `attack`
- `hit`
- `death`

The approved redesign provides one final pose per enemy type. Each state therefore binds to the approved replacement sprite instead of generating unapproved extra poses. Runtime patrol uses `move`, damage uses `hit`, and removal uses `death`.

## Legacy Assets Disabled

The old generated dragon textures are no longer active during normal preload. They remain in `AssetLoader.createDragonTexture()` as fallback-only backup if an approved file fails to load or is intentionally removed.

## Validation Notes

- Enemy AI, patrol distance, patrol speed, damage, hitboxes, spawn data, and physics were preserved.
- No level data was changed.
- No old enemy source assets were deleted.
