# UI Migration Plan

## Source Of Truth

Approved UI redesign source:

`review_assets/ui_candidate_a_v1/`

The approved review board was generated from:

`C:\Users\admin\Desktop\candidate_A_UI.png`

## Mapping

| Old UI | Approved Replacement | Target Screen |
| --- | --- | --- |
| Generated `candidate-a-ui-panel-stone` | `public/assets/ui/final/stone-menu-panel.png` | Main Menu, Shop, Character Select, Settings, Pause, Game Over, Victory |
| Generated `candidate-a-ui-button-stone` | `public/assets/ui/final/stone-button.png` | Main Menu, Shop, Character Select, Settings, Pause, Game Over, Victory, HUD plates |
| Generated `candidate-a-ui-button-wood` | `public/assets/ui/final/wood-button.png` | Primary menu actions and selected buttons |
| Generated `candidate-a-ui-icon-button` | `public/assets/ui/final/icon-button.png` | UI preview and icon-button texture binding |

## Preserved Systems

- Menu navigation remains keyboard-driven.
- Save/load behavior remains unchanged.
- Scene flow remains unchanged.
- HUD health and coin logic remains unchanged.
- Shop purchase logic remains unchanged.
- Character select logic remains unchanged.

## Approved-Only Constraint

The approved UI redesign did not include heart icons or a character selection frame. Those generated fallback textures remain available only for uncovered UI elements and were not redesigned or replaced with unapproved art.

## Legacy UI Deactivation

Approved UI PNGs are preloaded into the existing texture keys before procedural fallback generation runs. The old generated UI functions remain as backup only if an approved UI PNG is unavailable.
