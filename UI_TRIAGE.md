# UI Triage

## Scope

Screenshots reviewed:

- `C:\Users\admin\Desktop\bug\ui_bug_1.png`
- `C:\Users\admin\Desktop\bug\ui_bug_2.png`
- `C:\Users\admin\Desktop\bug\ui_bug_3.png`
- `C:\Users\admin\Desktop\bug\ui_bug_4.png`
- `C:\Users\admin\Desktop\bug\ui_bug_5.png`
- `C:\Users\admin\Desktop\bug\ui_bug_6.png`
- `C:\Users\admin\Desktop\bug\ui_bug_7.png`
- `C:\Users\admin\Desktop\bug\ui_bug_8.png`
- `C:\Users\admin\Desktop\bug\ui_bug_9.png`
- `C:\Users\admin\Desktop\bug\ui_bug_10.png`
- `C:\Users\admin\Desktop\bug\ui_bug_11.png`

## Bug 1: Text Overlaps Button Icons

### Observed

Tutorial labels, menu buttons, settings buttons, shop buttons, and pause controls show text rendered over baked play/gear icons.

### Root Cause

Approved UI button images included centered icons, but the UI system reused those same textures as text button backgrounds.

### Fix Plan

Create blank text-cell variants derived from the approved button artwork and route text buttons through those blank cells.

## Bug 2: Hotkey Text Creates Cropping And Clutter

### Observed

Labels such as `Move: A/D or arrows`, `ESC RESUME R RETRY M MENU`, and settings rows overflow or visually collide.

### Root Cause

UI labels embed keyboard shortcuts directly into small pixel buttons.

### Fix Plan

Remove hotkey prefixes from visible UI text and convert actions into clickable/selectable cells. Keyboard shortcuts may remain as optional fallback but are no longer required or displayed.

## Bug 3: HUD Top Clutter

### Observed

The gameplay HUD contains extra debug/tutorial text and `ESC` text, crowding the top of the screen.

### Root Cause

HUD and debug text were rendered in the same top area as health and gold.

### Fix Plan

Limit HUD to Health, Gold, and Settings. Remove visible `ESC` text and disable the in-game debug label.

## Bug 4: Pause Overlay Is One Overlapping Control

### Observed

Pause screen stacks `Resume`, `Retry`, and `Menu` in one wide overlapping button. Retry/Main Menu can leave the scene in a bad paused state.

### Root Cause

Pause used a single combined text button and did not explicitly stop the paused game scene for retry/menu.

### Fix Plan

Split Pause into three selectable cells: Resume, Retry, Main Menu. Retry and Main Menu explicitly stop the active Game scene before starting the next scene.

## Bug 5: Menu, Shop, Character Select, Settings Alignment

### Observed

Screens show oversized panels, overlapping button art, text over icons, and footer text crowding the layout.

### Root Cause

Screens shared one text-button helper that stretched icon-bearing assets and displayed hotkey-heavy captions.

### Fix Plan

Update shared UI helper and screen layouts to use clean text cells, clickable actions, smaller labels, and no footer hotkey strips.
