# VFX Migration Plan

## Source Of Truth

Approved VFX redesign source:

`review_assets/vfx_candidate_a_v1/`

The approved review board was generated from:

`C:\Users\admin\Desktop\candidate_A_VFX.png`

## Mapping

| Old Effect | Approved Replacement | Target Usage |
| --- | --- | --- |
| Generated `candidate-a-vfx-slash` | `public/assets/vfx/final/slash.png` | Slash texture key and asset preview |
| Generated `candidate-a-vfx-dust` | `public/assets/vfx/final/dust.png` | Respawn, landing/spawn-style dust texture key |
| Generated `candidate-a-vfx-jump-burst` | `public/assets/vfx/final/jump-burst.png` | Jump burst texture key and asset preview |
| Generated `candidate-a-vfx-coin-pickup` | `public/assets/vfx/final/coin-pickup.png` | Coin pickup one-shot effect |
| Generated `candidate-a-vfx-damage` | `public/assets/vfx/final/damage.png` | Damage one-shot effect |
| Generated `candidate-a-vfx-checkpoint-burst` | `public/assets/vfx/final/checkpoint-burst.png` | Checkpoint activation one-shot effect |
| Generated `candidate-a-vfx-death-burst` | `public/assets/vfx/final/death-burst.png` | Death one-shot effect |

## Approved-Only Constraint

The approved Candidate A VFX reference contained five distinct source effects:

- Slash crescent
- Damage spark
- Coin pickup
- Checkpoint flame
- Dust burst

Project keys that did not have a distinct approved source reuse the closest approved source:

- `jump-burst` uses the approved dust burst.
- `death-burst` uses the approved damage spark.

No new alternative art was generated.

## Preserved Systems

- Combat timing remains unchanged.
- Damage logic remains unchanged.
- Physics and collision remain unchanged.
- Controls remain unchanged.
- Camera follow and shake behavior remain unchanged.
- One-shot effect durations and destroy timing remain unchanged.

## Legacy VFX Deactivation

Approved VFX PNGs are preloaded into the existing texture keys before procedural fallback generation runs. The old generated VFX functions remain as backup only if an approved file is missing.
