# Bug Triage

## Scope

Screenshots reviewed:

- `C:\Users\admin\Desktop\bug\character_bug_1.png`
- `C:\Users\admin\Desktop\bug\character_bug_2.png`

This triage only covers bugs visible in the screenshots and related Phase A gameplay rules. Approved visual assets were not redesigned.

## Bug 1: Double Jump Infinite

### Observed

The Phase A prompt reported infinite double jumping. The screenshots show the character airborne, so the jump-count rule remains relevant.

### Root Cause

This was already fixed in commit `7b6b608 phase-a-gameplay-fix` by preventing jump count reset until a true landing transition.

### Fix Plan

No redo. Keep the existing `jumpsUsed` and `wasGrounded` landing-transition logic.

## Bug 2: Jump Flicker

### Observed

Screenshots show the character in airborne/running-looking poses where the visual state can appear unstable during movement and jump transitions.

### Root Cause

Jump eligibility used the newer grounded helper, but animation selection still used raw `body.blocked.down`. Phaser can briefly report stale ground contact while the player is moving upward, causing animation state flicker between grounded and airborne poses.

### Fix Plan

Use the same `isGrounded()` helper for animation selection that is used by jump logic.

## Bug 3: Missing Character Pixels

### Observed

The screenshots show black/empty regions around the character frame.

### Root Cause

Inspection found active character PNGs have consistent `160x96` bounds and valid alpha. The uploaded screenshots also contain transparent areas that render as black in the viewer. No approved character-art corruption was found.

### Fix Plan

Do not redesign or regenerate character art. Stabilize airborne animation state to avoid frame flicker that can make the large transparent frame read as missing pixels.

## Bug 4: Double Jump Visual Glitch

### Observed

The airborne screenshots point to an unstable jump/double-jump visual transition.

### Root Cause

`jump`, `doubleJump`, and `fall` currently use identical approved frames, so the remaining visual glitch is state flicker rather than mismatched frame dimensions or broken alpha.

### Fix Plan

Keep approved frames unchanged and fix the state transition condition.

## Already Completed From Previous Phase A Prompt

- Enemy hit is `-1 HP`.
- Trap hit is `-1 HP`.
- Pit fall is `-1 HP`.
- Respawn uses current checkpoint.
- Attempts are unlimited.
- Game Over is removed from active gameplay.
- Tutorial markers are limited to Move, Double Jump, and Attack.
