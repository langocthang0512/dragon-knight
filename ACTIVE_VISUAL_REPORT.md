# DRAGON KNIGHT Active Visual Report

## Active Visuals

| Current Active Asset | Current Scene | Replacement Status | Screenshot Targets |
| --- | --- | --- | --- |
| `candidate-a-player` / `player-male-*` / `player-female-*` | Main Menu, Character Select, Game | Active Candidate A | Main Menu, Character Select, Level 1 |
| `candidate-a-moss-stone-tile` | Main Menu preview tile, Game platforms | Active Candidate A | Main Menu, Level 1 |
| `candidate-a-coin` | Game coin pickups | Active Candidate A | Level 1 |
| `candidate-a-coin-hud` | HUD, Shop | Active Candidate A | HUD, Shop |
| `candidate-a-bonfire-checkpoint` | Game checkpoint | Active Candidate A | Level 1 checkpoint |
| `candidate-a-spike-trap` | Game traps | Active Candidate A | Level 1 trap section |
| `candidate-a-dragon-egg` | Game falling eggs | Active Candidate A | Level 1 falling egg section |
| `candidate-a-finish-gate` | Game finish | Active Candidate A | Level 1 finish |
| `candidate-a-dragon-small` | Game enemies | Active Candidate A | Level 1 combat |
| `candidate-a-dragon-flying` | Game enemies | Active Candidate A | Level 1 flying enemy |
| `candidate-a-dragon-heavy` | Generated asset preview / future active use | Active Candidate A texture generated, not placed in Level 1 | Asset preview |
| `candidate-a-ui-panel-stone` | Main Menu, Shop, Character Select, Settings, Pause, Game Over, Victory | Active Candidate A | Main Menu, Shop, Pause, Victory |
| `candidate-a-ui-button-stone` | UI screens, tutorial markers, HUD plates | Active Candidate A | Main Menu, Settings, Level 1 HUD |
| `candidate-a-ui-button-wood` | UI screens using primary button tone | Active Candidate A generated under existing hook | Main Menu, Shop, Victory |
| `candidate-a-heart-full` / `candidate-a-heart-empty` | HUD, Shop | Active Candidate A | Level 1 HUD, Shop |
| `candidate-a-selection-frame` | Character Select | Active Candidate A | Character Select |
| `candidate-a-vfx-slash` | Generated active VFX hook | Active Candidate A texture generated | Asset preview |
| `candidate-a-vfx-dust` | Respawn VFX | Active Candidate A | Level 1 respawn |
| `candidate-a-vfx-jump-burst` | Generated active VFX hook | Active Candidate A texture generated | Asset preview |
| `candidate-a-vfx-coin-pickup` | Coin pickup VFX | Active Candidate A | Level 1 coins |
| `candidate-a-vfx-damage` | Damage VFX | Active Candidate A | Level 1 enemy/trap hit |
| `candidate-a-vfx-checkpoint-burst` | Checkpoint activation VFX | Active Candidate A | Level 1 checkpoint |
| `candidate-a-vfx-death-burst` | Death VFX | Active Candidate A | Level 1 death/game over path |

## Loader Verification

- Active generated textures are created in `AssetLoader.createGeneratedTextures()`.
- Game scenes import active visuals through `PlaceholderAssets`.
- Player animation references continue through `playerAnimationKey()`.
- No atlas files are active in the project.
- No old V2 texture key strings remain in active source files.

## Screenshot Targets

- Main Menu: `http://127.0.0.1:<port>/`
- Character Select: press `C` from Main Menu.
- Shop: press `S` from Main Menu.
- Level 1: press `ENTER` from Main Menu.
- Enemy/UI/HUD: visible during Level 1.
- Asset Preview: `http://127.0.0.1:<port>/asset-preview.html`
