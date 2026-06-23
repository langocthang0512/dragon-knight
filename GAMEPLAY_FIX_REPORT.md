# Gameplay Fix Report

## Scope

Phase A updated gameplay rules only. Approved character, environment, enemy, UI, and VFX visual assets were not redesigned or replaced.

## Player Movement

- Fixed double-jump reset logic.
- Jump count now resets only when the player transitions from air to grounded.
- The ground check ignores stale ground contact while the player is moving upward, preventing repeated airborne jumps.
- Animation state selection now uses the same grounded helper as jump logic, preventing jump/run flicker during takeoff and double-jump transitions.
- Current allowed sequence is:
  - Jump
  - One double jump
  - Land before double jump is restored
- Coyote time and jump buffering remain active.

## Player Health And Respawn

- Player starts each run with `3` HP.
- Maximum health capacity remains capped at `5`.
- Damage remains `-1 HP` from:
  - Enemy contact
  - Trap contact
  - Falling dragon egg contact
  - Falling into the pit
- Any damage with HP above `0` respawns the player at the current checkpoint.
- Damage that reaches `0` HP restores HP to the default `3` and respawns at the current checkpoint.
- Attempts are unlimited.
- Game Over has been removed from active gameplay and all Game Over references were removed from `src`.

## Dragon Egg Trap

- Egg fall speeds increased from the old fixed `170` velocity to per-egg speeds from `330` to `350`.
- Egg timing is now randomized between each egg's configured `delayMs` and `intervalMs`.
- Egg timers are no longer fixed loops; each egg schedules its next drop only after it resets.
- Egg spawn X positions were moved away from raised ledges.
- Egg collision now uses trap damage rules and follows checkpoint respawn behavior.

## Tutorial

Only these tutorial markers remain:

- `Move: A/D or arrows`
- `Double Jump`
- `Attack: J`

Removed:

- Coins
- Bonfire checkpoint
- Spikes
- Dragon eggs
- Finish

## Files Modified

- `src/entities/player/Player.ts`
- `src/game/scenes/GameScene.ts`
- `src/levels/levelOne.ts`
- `src/game/config.ts`
- `src/core/SceneKeys.ts`
- `src/game/scenes/GameOverScene.ts`
- `BUG_TRIAGE.md`

## Validation

- `npm run build` passed.
- Scan confirmed there are no remaining `GameOver`, `SceneKeys.GameOver`, or `GameOverScene` references in `src`.
- Scan confirmed removed tutorial marker text no longer appears in level/game sources.
- Screenshot delta inspected from `C:\Users\admin\Desktop\bug\character_bug_1.png` and `C:\Users\admin\Desktop\bug\character_bug_2.png`.
