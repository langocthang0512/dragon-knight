# Test Cases

## Build

- Run `npm run build`.
- Expected: TypeScript and Vite complete successfully. A Phaser chunk-size warning is acceptable for the current vertical slice.

## Main Menu

- Open the game.
- Expected: Main Menu shows Start, Shop, Select Character, Settings, and Exit.
- Press `Enter`.
- Expected: Level 1 starts.

## Character Select

- From Main Menu press `C`.
- Press `1`.
- Expected: Male knight is saved and Main Menu returns.
- Reopen Character Select, press `2`.
- Expected: Female knight is saved and Main Menu returns.

## Shop

- From Main Menu press `S`.
- With fewer than 10 coins, press `B`.
- Expected: Shop reports not enough coins.
- After earning at least 10 coins, press `B`.
- Expected: Coins decrease by 10 and max hearts increase by 1.
- Repeat until 5 hearts.
- Expected: Shop reports hearts already maxed.

## Settings

- From Main Menu press `O`.
- Press `D`.
- Expected: Debug overlay toggles.
- Press `R`.
- Expected: Reduce motion toggles in save data.
- Press `Delete`.
- Expected: Save data resets.

## HUD And Pause

- Start Level 1.
- Expected: HUD shows hearts, coins, and pause prompt.
- Collect a coin.
- Expected: Coin count increases.
- Press `Esc`.
- Expected: Pause screen appears.
- Press `Esc`.
- Expected: Gameplay resumes.

## Damage And Game Over

- Touch an enemy, spike, or falling egg.
- Expected: Hearts decrease by 1.
- Reach 0 hearts.
- Expected: Game Over screen appears.
- Press `R`.
- Expected: Level 1 restarts.

## Victory

- Complete Level 1 by reaching the finish gate.
- Expected: Victory screen shows coins, time, and target run duration.
- Press `Enter`.
- Expected: Main Menu returns.
