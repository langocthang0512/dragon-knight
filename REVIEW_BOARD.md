# DRAGON KNIGHT REVIEW BOARD

Prompt A7 status: review only. No project assets, code, gameplay, collisions, save data, or scene flow should be replaced from this board.

## Reference Sorting

| Category | Files |
| --- | --- |
| Character | `character1.png`, `DKimage.png`, `sword.png` |
| Animation | `animation1.png`, `DKimage.png` |
| Environment | `ground1.png`, `checkpoint.png`, `egg1.jpg`, `egg2.jpg`, `egg3.png`, `gate.png`, `gold_icon.png`, `gold_icon2.png`, `trap1.png`, `DKimage.png` |
| Enemy | `dragon1.png`, `dragon2.png`, `dragon3.png`, `DKimage.png` |
| UI | `UIimage.png`, `UIimage2.png` |
| VFX | `animation1.png`, `DKimage.png`, `gold_icon2.png`, `checkpoint.png`, `egg3.png` |

## Global Extraction

| Trait | Reference Direction |
| --- | --- |
| Color Palette | Deep teal presentation field, near-black outlines, red scarves/capes, dark blue-black armor, antique gold trim, warm fire, moss greens, turquoise stone, cream highlights. |
| Pixel Density | High. Large objects have many small clusters: cracks, moss, trim, scales, bevels, rim lights, sparkles, and broken edge pixels. |
| Shape Language | Heroic chibi knight; chunky armor and boots; broad dragon heads; strong horns/spikes; temple-stone blocks; beveled UI panels. |
| Outline | Thick black outer contour with selective internal dark seams. Not thin-line minimalist. |
| Shading | Multi-step ramps: base, deep shadow, mid shadow, highlight, accent glint. Strong underside occlusion. |
| Detail Density | Dense but organized. Surfaces are broken by readable clusters, not random noise. |
| Visual Hierarchy | Player, dragons, coin, trap, checkpoint, and buttons must be instantly readable before micro-detail. |
| Readability | High contrast silhouettes, clear interaction objects, bright pickups/VFX, no muddy edges at gameplay scale. |

## Character

### Player Knight: Male / Female

**Reference Summary**

Compact heroic chibi body. Same armored body for both variants. Male has messy black spiked hair; female has red ponytail. Dark armor, red scarf/cape, gold trim, leather belt, boots, shoulder plates, small face with green eyes.

**Current Problems**

Current V2 is too blocky and simplified. Armor panels, boots, scarf folds, face detail, and hair silhouette do not reach reference density. Female hair reads as a simple mass rather than a layered ponytail.

**Candidate A**

32x44 gameplay sprite. Keep compact playable size. Prioritize exact silhouette: oversized head, scarf collar, shoulder pads, short cape, tabard, boots. Use 5-color armor ramp, 4-color red ramp, 3-color gold accents.

**Candidate B**

40x52 premium sprite. Slightly larger visual body around the same collision box. More reference detail: layered armor plates, separate gloves, knee/boot highlights, scarf folds, ponytail clusters, stronger facial pixels.

**Differences**

Candidate A is safer for current scale and animation workload. Candidate B better matches the reference quality and proportions but needs collision-safe offsets and more animation work.

**Recommendation**

Use Candidate B for approval preview, then downscale or collision-wrap if gameplay readability suffers.

### Sword

**Reference Summary**

Diagonal blue-white blade with thick black outline, black/gold guard, brown handle, red gem.

**Current Problems**

Current sword/attack reads as horizontal bars and slash strips, not a distinct reference sword.

**Candidate A**

Simple 32x32 diagonal sword with exact readable blade, gold guard, red pommel gem.

**Candidate B**

Larger 48x48 sword plus separate attack smear. Blade remains visible under the arc, matching `animation1.png`.

**Differences**

Candidate A works for inventory/held pose. Candidate B supports attack animation.

**Recommendation**

Use Candidate B for player attack set; derive Candidate A as static icon.

## Animation

### Player Animation Set

**Reference Summary**

Idle, run, jump, attack, hit, knockdown, death are strong pose changes with preserved volume. Cape and hair add secondary motion. Attack has a bright crescent slash.

**Current Problems**

Current frames are mostly slight offsets. Run lacks strong leg spacing. Hit/death poses are not close enough to the reference sheet.

**Candidate A**

Minimal sheet: idle 4, run 6, jump 1, fall 1, attack 4, hit 2, death 3. Stronger silhouettes but limited in-between frames.

**Candidate B**

Reference-style sheet: idle 4, run 8, jump 2, double jump 3, fall 2, attack 6, hit 3, death 4. Each frame preserves cape, scarf, and armor volume.

**Differences**

Candidate A is faster. Candidate B is closer to `animation1.png` and `DKimage.png`.

**Recommendation**

Use Candidate B for approval because animation quality is one of the biggest visible gaps.

## Environment

### Ground / Platform

**Reference Summary**

Mossy temple platform with irregular top stones, hanging vines, foliage, turquoise engraved blocks, dark underside, cracks, red flowers, and strong depth.

**Current Problems**

Current tile is modular but too repetitive, flat, and low-detail. It lacks foliage silhouette and temple-block richness.

**Candidate A**

48x32 modular tile set: left, middle, right, top-only ledge, underside block. Add moss cap and engraved stone faces.

**Candidate B**

96x48 hero modular set: larger stone chunks, top foliage overlays, hanging moss strips, cracked top slabs, decorative face blocks, edge variants.

**Differences**

Candidate A fits existing tile sizes. Candidate B matches `ground1.png` more closely and reduces copy-paste appearance.

**Recommendation**

Use Candidate B for visual approval, then slice into gameplay-safe modules.

### Coin

**Reference Summary**

Two directions: glossy dragon-head coin (`gold_icon.png`) and pixel coin with red gem/sparkles (`gold_icon2.png`).

**Current Problems**

Current coin is too small and symbolic. It lacks glossy rim, embossed shape, sparkle, and premium pickup feel.

**Candidate A**

20x20 pixel coin using `gold_icon2.png`: oval coin, red gem center, sparkle VFX.

**Candidate B**

28x28 coin using `gold_icon.png`: round dragon-head emboss, glossy rim, bright white glints.

**Differences**

Candidate A matches DK pixel universe. Candidate B matches the standalone coin reference but may feel less pixel-native.

**Recommendation**

Use Candidate A for gameplay pickup; use Candidate B for shop/HUD currency icon.

### Checkpoint Bonfire

**Reference Summary**

Stone-ring campfire with chunky rocks, logs, black outline, tall layered flame, orange/yellow/cream core, small ember pixels.

**Current Problems**

Current bonfire is too simplified and small. Rock ring and flame silhouette need more volume.

**Candidate A**

40x40 gameplay bonfire. Compact rock ring, 4-step flame, 3 ember frames.

**Candidate B**

56x56 detailed checkpoint. Wider stone ring, logs, tall flame, ember particles, active/inactive variants.

**Differences**

Candidate A is easier to read on small platforms. Candidate B is closer to reference and better for checkpoint importance.

**Recommendation**

Use Candidate B.

### Dragon Egg

**Reference Summary**

Eggs are glossy, high contrast, faceted, and often cracked or levitating with debris/sparkles. `egg3.png` best matches DK environment.

**Current Problems**

Current egg is too small and flat. It lacks faceted shell plates and dramatic glow.

**Candidate A**

24x32 falling egg using orange cracked `egg2.jpg` palette. Simple outline and glow cracks.

**Candidate B**

40x52 falling egg using `egg3.png`: cream shell, red cracks, moss bits, debris/spark VFX.

**Differences**

Candidate A is gameplay-clear. Candidate B matches DK quality and can scale down for hazards.

**Recommendation**

Use Candidate B for approval; create smaller falling variant after approval.

### Spike Trap

**Reference Summary**

Tall cream spikes with red cores on mossy engraved stone base.

**Current Problems**

Current trap is a small strip and lacks the threatening vertical silhouette from `trap1.png`.

**Candidate A**

48x24 gameplay spike strip with 4 tall spikes and stone base.

**Candidate B**

80x48 modular trap block with 5 tall spikes, moss overlays, engraved base, red inner shards.

**Differences**

Candidate A fits current hazard dimensions. Candidate B matches reference better but requires visual/collision separation.

**Recommendation**

Use Candidate B visually with a smaller collision zone.

### Gate / Finish

**Reference Summary**

Mossy temple gate with wood double doors, turquoise stone columns, gold crest, side flames, foliage.

**Current Problems**

Current gate is too simple and lacks the temple entrance feel.

**Candidate A**

56x64 compact finish gate with wood doors and gold crest.

**Candidate B**

120x96 temple gate with pillars, moss, door planks, crest, and green fire torches.

**Differences**

Candidate A fits current finish marker. Candidate B is a proper level-end landmark.

**Recommendation**

Use Candidate B for approval and anchor the finish zone to it.

## Enemy

### Small Dragon

**Reference Summary**

`dragon1.png` is red, chunky, readable, thick black outline, big head, horns, wing, belly plates, claws, tail.

**Current Problems**

Current dragon is still too rectangular and lacks face/wing/claw detail.

**Candidate A**

48x32 grounded red dragon, simplified `dragon1.png` shape, one idle/walk frame pair.

**Candidate B**

72x48 grounded red dragon, stronger head, horn, belly plates, wing membrane, scale clusters, tail flick.

**Differences**

Candidate A fits small enemy scale. Candidate B more closely matches reference quality.

**Recommendation**

Use Candidate B, then shrink collision body.

### Flying Dragon

**Reference Summary**

`dragon2.png` has a long flying silhouette, wings raised, yellow horns, smooth red body, tail flame.

**Current Problems**

Current flying dragon lacks the long airborne silhouette and wing elegance.

**Candidate A**

56x36 pixelized flying dragon with raised wings and flame tail.

**Candidate B**

88x56 flying dragon with long body curve, wing membrane detail, horn profile, tail fire, hover frames.

**Differences**

Candidate A is compact. Candidate B reads closer to reference.

**Recommendation**

Use Candidate B.

### Heavy Dragon

**Reference Summary**

`dragon3.png` shows premium green, purple, and red heavy dragons with thick bodies, spines, horns, plated bellies, and dense scales.

**Current Problems**

Current heavy dragon exists but does not match the level of scale detail or silhouette authority.

**Candidate A**

76x52 heavy dragon, green variant, idle only, broad head and belly plates.

**Candidate B**

112x72 heavy dragon boss-style asset, green/purple/red palette variants, tail, horns, spines, breathing idle.

**Differences**

Candidate A is enemy-ready. Candidate B is closer to the DK reference sheet but may be oversized for Level 1.

**Recommendation**

Use Candidate B as approval target, but do not add to Level 1 unless explicitly requested.

## UI

### Main Menu / Buttons / Panels

**Reference Summary**

`UIimage.png`: mossy green panel with stone border and gray-blue beveled buttons. `UIimage2.png`: centered stacked wood buttons over a simple platform scene.

**Current Problems**

Current UI uses the idea of panels/buttons but not enough reference-specific border stones, dotted moss texture, bevel depth, or pixel font shape.

**Candidate A**

Stone UI set from `UIimage.png`: full moss panel, top/bottom/side stones, gray-blue buttons, square icon buttons.

**Candidate B**

Hybrid UI: moss-stone background frame plus wood primary buttons from `UIimage2.png`; use stone icon buttons for settings/shop.

**Differences**

Candidate A is more cohesive with the menu reference. Candidate B combines both references and may fit fantasy platformer menus better.

**Recommendation**

Use Candidate A for settings/pause panels and Candidate B for main menu/shop/character select.

## VFX

### Slash / Hit / Coin / Checkpoint / Egg Impact

**Reference Summary**

Slash is a bright gold crescent with small spark pixels. Hit uses red starburst. Coin pickup uses gold sparkles. Checkpoint uses fire embers. Egg impact uses debris, dust, and falling streaks.

**Current Problems**

Current VFX are simple rectangular flashes and do not match the reference polish.

**Candidate A**

Small gameplay VFX pack: 3-frame slash, 2-frame hit spark, 4 sparkle particles, 3 ember particles, 3 dust chunks.

**Candidate B**

Premium VFX pack: 5-frame slash arc, 4-frame hit burst, coin sparkle ring, bonfire activation plume, egg impact debris column.

**Differences**

Candidate A is fast and readable. Candidate B aligns with the high-detail reference effects.

**Recommendation**

Use Candidate B for approval preview, then tune particle counts for 60 FPS.

## Overall Recommendation

Approve no replacement yet. Build one visual approval sheet using the Candidate B direction for all major assets, plus Candidate A fallback notes for gameplay scale. Candidate B is the only path likely to satisfy the strict reference-match quality target.
