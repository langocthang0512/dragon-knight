# UI Local Ready

## Build

Command:

```bash
npm run build
```

Result: passed.

Notes: Vite reported the existing large bundle warning for the Phaser bundle. No TypeScript errors or asset build errors occurred.

## Preview

Command:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

Result: passed.

Preview URL:

`http://127.0.0.1:4173/`

## Served Asset Checks

| URL | Result |
| --- | --- |
| `http://127.0.0.1:4173/` | `200 text/html` |
| `http://127.0.0.1:4173/assets/ui/final/stone-menu-panel.png` | `200 image/png` |
| `http://127.0.0.1:4173/assets/ui/final/stone-button.png` | `200 image/png` |
| `http://127.0.0.1:4173/assets/ui/final/wood-button.png` | `200 image/png` |
| `http://127.0.0.1:4173/assets/ui/final/icon-button.png` | `200 image/png` |
| `http://127.0.0.1:4173/assets/ui/final/ui-review-board.png` | `200 image/png` |

## Screen Coverage

- Main Menu: approved panel and buttons loaded through `PixelUi`.
- Start: approved primary button visual loaded through `PixelUi`.
- Shop: approved panel and buttons loaded through `PixelUi`.
- Character Select: approved panel and buttons loaded through `PixelUi`.
- Pause: approved panel and button loaded through `PixelUi`.
- HUD: approved button texture used by HUD plates.
- Game Over: approved panel and buttons loaded through `PixelUi`.
- Victory: approved panel and button loaded through `PixelUi`.
- Settings: approved panel and buttons loaded through `PixelUi`.

## Limitation

The approved UI redesign did not include heart or selection-frame artwork. Those fallback textures remain unchanged to avoid unapproved visual invention.
