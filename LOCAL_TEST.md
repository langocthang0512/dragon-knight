# DRAGON KNIGHT Local Test

## Commands

| Step | Command | Result |
| --- | --- | --- |
| Build | `npm.cmd run build` | Passed |
| Preview | `npm.cmd run preview -- --host 127.0.0.1 --port 4173` | Passed |
| App HTTP check | `curl.exe -I http://127.0.0.1:4173/` | `200 OK` |
| Built bundle check | `rg "candidate-a" dist` | Passed |
| Active binding check | `rg "PlaceholderAssets\\.(...)" src` | Passed |

## Scene Verification

| Area | Verification | Result |
| --- | --- | --- |
| Main Menu | Production app served, bundle contains `MainMenuScene`, `candidate-a-player`, `candidate-a-moss-stone-tile`, `candidate-a-ui-panel-stone`, and `candidate-a-ui-button-*`. | Passed |
| Character | Bundle contains `CharacterSelectScene`, `player-male-*`, `player-female-*`, and `candidate-a-selection-frame`. | Passed |
| Level 1 | Bundle contains `GameScene`, Level 1 platform/coin/trap/checkpoint/egg/enemy/finish bindings through Candidate A texture keys. | Passed |
| Enemy | Bundle contains active `candidate-a-dragon-small`, `candidate-a-dragon-flying`, and generated `candidate-a-dragon-heavy`. | Passed |
| UI | Bundle contains active `candidate-a-ui-panel-stone`, `candidate-a-ui-button-stone`, `candidate-a-ui-button-wood`, hearts, and HUD coin. | Passed |
| Shop | Bundle contains `ShopScene`, `candidate-a-heart-full`, `candidate-a-coin-hud`, and Candidate A UI button bindings. | Passed |

## Notes

- Production preview is available at `http://127.0.0.1:4173/` while the preview server is running.
- Phaser scenes are contained inside the single production app route.
- Chrome DevTools Protocol could not be opened in this sandbox session, so verification used build output, production HTTP checks, and active bundle/binding inspection.
- Vite reported the existing chunk-size warning only.
