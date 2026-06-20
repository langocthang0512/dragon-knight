# DRAGON KNIGHT Reference Lock

Prompt A6 treats the supplied images as the visual source of truth:

- `C:\Users\admin\Desktop\DKimage.png`
- `C:\Users\admin\Desktop\sword.png`
- `C:\Users\admin\Desktop\dragon1.png`
- `C:\Users\admin\Desktop\dragon2.png`
- `C:\Users\admin\Desktop\egg1.jpg`
- `C:\Users\admin\Desktop\egg2.jpg`
- `C:\Users\admin\Desktop\checkpoint.png`
- `C:\Users\admin\Desktop\gold_icon.png`
- `C:\Users\admin\Desktop\UIimage.png`
- `C:\Users\admin\Desktop\UIimage2.png`

## Observed Values

| Area | Observed reference values |
| --- | --- |
| Color palette | Dark teal presentation field, black/near-black outlines, red scarf/cape, dark blue-black armor, warm gold trim, orange-yellow fire, moss green stone, saturated red dragons. |
| Hue shifts | Shadows shift toward deep blue, red shadows shift burgundy, highlights shift warm yellow/cream, moss shifts yellow-green at lit edges. |
| Contrast | High outline contrast with bright localized highlights on metal, coin, fire, egg cracks, horns, and UI bevels. |
| Pixel density | Small assets are not flat; silhouettes contain clustered edge detail, highlight chips, seams, cracks, and material breakup. |
| Outline thickness | Gameplay actors use heavy 1-3 pixel dark outline with selective internal dark breaks. UI uses heavier black border and bevel strips. |
| Shadow treatment | Hard pixel shadows, dark underside bands, minimal soft gradients, strong occlusion under armor, bodies, stones, buttons, and spikes. |
| Highlight treatment | Small deliberate highlight clusters, not large smooth fills. Metal uses white/blue strips; gold uses yellow/cream glints; fire uses white-hot cores. |
| Material rendering | Armor separates from cloth/leather/gold by hue and contrast. Stone uses moss, cracks, and glyph-like block seams. Eggs use glossy shell patches and glowing cracks. |
| Shape language | Knight is compact chibi heroic with oversized head, red scarf, chunky boots, angular hair, and readable sword. Dragons use big head, horn spikes, belly plates, wing/tail silhouette. |
| Proportion system | Player visual is larger than collision body. Enemies have broad silhouettes but small combat bodies. UI buttons are thick, beveled, and centered vertically. |
| Animation language | Snappy few-frame pixel animation, preserved volume, run bob, cape/hair secondary motion, attack smear/slash, hit flash, death collapse. |

## Target Values

- Match the reference universe with dark fantasy pixel assets, warm accents, strong black outlines, and high readability at gameplay zoom.
- Preserve exact gameplay sizing through collision boxes while allowing richer sprites around those boxes.
- Replace flat placeholder surfaces with controlled clusters: seams, cracks, trims, scale patches, moss, edge chips, and highlight pins.
- UI must read as handcrafted pixel UI: stone/moss panel, gray-blue beveled buttons, warm wood primary buttons, icon-like HUD hearts and coin.

## Differences Closed In V2

- Player sprites increased from compact placeholder blocks to larger armor/scarf/sword compositions with male/female hair-only variation.
- Dragons now carry horn, wing, belly-plate, scale-cluster, claw, and tail/fire accents.
- Ground, trap, egg, bonfire, coin, and gate now use more reference-specific material separation and detail clusters.
- Menus/HUD moved from plain text to pixel panels, bevel buttons, hearts, and coin medallion.

## Approval Checklist

- [x] Preserve gameplay, architecture, scenes, save, controls, collisions, checkpoints, and progression.
- [x] Keep Level 1 background empty.
- [x] Use all Prompt A5/A6 reference categories.
- [x] Male and female share body; only hair changes.
- [x] Include idle, run, jump, double jump, attack, hit, death, and fall animation states.
- [x] Include small, flying, and heavy dragon assets.
- [x] Include coin, bonfire, spike, egg, ground/platform, gate, slash, dust, jump, pickup, damage, checkpoint, and death VFX assets.
- [x] Replace default-looking menu/HUD styling.
