# Enemy Migration Plan

## Source Of Truth

Approved enemy redesign source:

`C:\Users\admin\AppData\Local\Temp\codex-clipboard-b4cba801-2f23-4bb3-8fb5-a6a16f542ace.png`

Only the three approved Candidate A enemy designs from that image are used.

## Mapping

| Old Enemy | Approved Replacement | Target Scene |
| --- | --- | --- |
| Generated small red dragon texture `candidate-a-dragon-small` | `public/assets/enemies/final/small-dragon.png` | `GameScene`, `asset-preview.html` |
| Generated flying red dragon texture `candidate-a-dragon-flying` | `public/assets/enemies/final/flying-dragon.png` | `GameScene`, `asset-preview.html` |
| Generated heavy green dragon texture `candidate-a-dragon-heavy` | `public/assets/enemies/final/heavy-dragon.png` | `asset-preview.html`, future enemy spawns |
| Generic enemy fallback `candidate-a-enemy` | `public/assets/enemies/final/small-dragon.png` | fallback texture key |

## Preserved Systems

- Enemy patrol AI remains in `src/entities/enemies/Enemy.ts`.
- Enemy damage and death behavior remain in `src/entities/enemies/Enemy.ts`.
- Enemy spawn data remains in `src/levels/levelOne.ts`.
- Arcade body sizes and offsets remain unchanged.
- Level layout, camera, physics, combat, and player interactions remain unchanged.

## Deactivated Legacy Visuals

The generated dragon drawing function in `src/services/AssetLoader.ts` remains as backup only. Preloaded approved enemy PNGs now occupy the active texture keys before fallback generation runs.
