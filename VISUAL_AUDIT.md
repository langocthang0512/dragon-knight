# Visual Audit

## Current State

Dragon Knight is technically playable and structurally stable through the A4 release milestone. The project uses React, TypeScript, Phaser 3, and Vite with a preserved scene flow: Boot, Preload, Main Menu, Character Select, Shop, Settings, Game, Pause, Game Over, and Victory. Gameplay systems for movement, double jump, sword attack, health, coins, checkpoints, traps, enemies, falling eggs, saving, and deployment configuration are present and should be preserved.

The current visual implementation is mostly generated at runtime in `src/services/AssetLoader.ts`. There are no production sprite sheets or authored image assets in the game runtime. Player, enemies, coins, tiles, trap, bonfire, dragon egg, and finish gate are all constructed with Phaser `Graphics` rectangles and basic fill colors, then converted into textures.

Current player visuals use a 32x28 generated frame size. Male and female share the same armor/body, with hair differences handled by small rectangle clusters. Animation states exist for idle, run, jump, fall, attack, hit, and death, but most are symbolic rather than expressive. Idle has 2 frames, run has 4 frames, attack has 3 frames, and jump/fall/hit/death each have 1 frame.

Current enemies are small single-frame generated dragon silhouettes. Small dragons and flying dragons use the same simple construction language with different dimensions, colors, and wing blocks. There is no heavy dragon yet in the current playable build.

Current environment visuals are functional collision shapes: gray rectangular tile platforms, simple spike texture, small bonfire, small egg, simple coin, and a symbolic finish gate. The background is empty/dark, which matches the A5 requirement to keep background empty, but the foreground art does not yet carry the world quality.

Current UI is plain Phaser text using monospace fonts. Main Menu, Shop, Character Select, Settings, Pause, Game Over, Victory, and HUD are readable but visually sparse. UI lacks handcrafted panels, button frames, iconography, decorative borders, consistent pixel UI components, and reference-quality spacing/hierarchy.

Camera currently follows the player in a 480x270 pixel-art canvas with Phaser FIT scaling. Camera behavior is functional and readable, but not polished for visual composition, anticipation, screen feedback, or dramatic combat moments.

## Problems

- The game still looks like a prototype despite having playable systems.
- All major assets are placeholder-style generated graphics, not production-looking pixel art.
- The player silhouette is too small and blocky to match the reference knight quality.
- Armor, scarf, sword, hair, hands, boots, and face are represented by simple rectangles instead of readable pixel forms.
- Male/female difference is technically correct but visually underdeveloped; hair does not feel styled or animated.
- Animations communicate state changes, but they lack weight, smear, anticipation, recovery, cloth motion, and attack impact.
- Sword attack lacks the large readable slash arc, glow, and timing emphasis shown in the references.
- Enemy dragons lack scale, anatomy, horns, wings, eye direction, belly plates, claws, tails, shading, and personality.
- Flying dragon and small dragon are too similar in construction and do not create distinct threat readability.
- Heavy dragon is required by A5 but does not currently exist.
- Tiles and platforms are plain gray collision blocks, not mossy stone platforms with layered top soil, cracks, foliage, bevels, or side detailing.
- Ledges do not have a consistent authored tile language; they are just rectangles at different sizes.
- Coins are tiny symbolic yellow marks and do not match the reference gold icon material or dragon-crest identity.
- Bonfire checkpoint is too small and lacks the stone ring, flame volume, color layering, ember particles, and strong checkpoint silhouette.
- Spike traps are readable mechanically but lack the material finish, red/gold hazard color, and embedded stone base shown in the reference.
- Dragon eggs are very small and flat; they lack the glossy cracked-shell lighting and high-value collectible/hazard presence from the egg references.
- Finish gate is symbolic and not integrated with the stone/ruin material language.
- There are almost no VFX: no dust, no jump burst, no coin pickup spark, no checkpoint activation burst, no damage particles, no death effect, no sword slash trail beyond the attack sprite.
- HUD uses text labels instead of hearts and coin icons.
- Menu screens do not resemble handcrafted pixel UI. They use raw text lists rather than button slabs, framed panels, stone/wood borders, icon buttons, and tactile states.
- UI hierarchy is functional but not polished: spacing, button sizing, selected states, panel backgrounds, and icon alignment are not yet production quality.
- Tutorial text floats directly in the world and may compete with level visuals once art is rebuilt.
- Debug overlay is useful for development but visually breaks immersion when enabled.
- The visual scale is inconsistent: player, coins, dragons, eggs, trap, and bonfire are all tiny relative to the reference presentation.
- The current color palette is serviceable but not art-directed. It mixes dark navy background, gray blocks, bright yellows, greens, purples, and reds without a unified material/light rule.

## Differences From References

- References show high-density pixel art with detailed silhouettes, strong outlines, layered shading, material highlights, and warm accent lighting. Current assets use flat rectangle fills with minimal detail.
- The reference knight has a clear fantasy identity: dark armor, gold trim, red scarf/cape, expressive hair, readable face, boots, belt, and sword. Current player only approximates these with small blocks.
- Reference animations imply strong pose language: run lean, jump compression, attack arc, hit reaction, fall/death readability. Current animation states are mostly texture swaps with limited pose change.
- Reference dragons have large heads, horns, expressive eyes, segmented bodies, wings, claws, tails, scales, and belly plates. Current dragons are small block icons.
- Reference eggs are glossy, shaded, cracked or patterned, and materially rich. Current egg is a tiny cream/red block with a line outline.
- Reference checkpoint fire has a full flame shape, stone base, layered orange/yellow/red colors, and strong outline. Current bonfire is a very small icon with minimal flame.
- Reference platforms combine stone, moss, grass, cracks, vegetation, bevels, and side faces. Current platforms are plain rectangular blocks with no top/side distinction.
- UI references show tactile pixel buttons with borders, bevels, panels, decorative framing, and a cohesive menu surface. Current UI is just text on dark background.
- Reference UI buttons have physicality: light top edge, dark lower edge, shadow, consistent dimensions, and centered pixel typography. Current menu options have no button geometry.
- The reference art has a coherent universe: warm gold/red hero accents, teal/green stone ruins, moss, fire glow, black/dark outlines, and high contrast. Current visuals do not yet establish one consistent universe.

## Camera And Readability

- The 480x270 camera is appropriate for a pixel platformer and should be preserved unless a later step deliberately adjusts framing.
- Player follow is functional, but composition currently feels empty because background and foreground art are sparse.
- Empty background is required by A5, so readability must come from high-quality foreground silhouette, value contrast, and platform material separation.
- Hazards and collectibles are mechanically readable now because they are simple, but they will need stronger visual priority after the art rebuild.
- Current HUD is readable but not diegetic or polished. Hearts and coins should become icon-based and stable at small sizes.
- The player is small relative to screen size and reference detail. Rebuild should consider sprite dimensions and scale carefully while preserving collision boxes.
- Any visual rebuild must preserve collision geometry and gameplay placement while allowing display sprites to have offsets/larger art silhouettes.

## Rebuild Plan

The rebuild should be visual-only and preserve architecture, systems, controls, collisions, checkpoints, progression, save data, and deployment configuration.

1. Keep the current Phaser scene flow and service boundaries.
2. Replace generated placeholder textures with a coherent asset generation or asset-loading layer that produces production-style pixel art.
3. Define a single art direction before creating assets: palette, outline weight, pixel density, light direction, material rules, and animation timing.
4. Rebuild player sprites first because all other visual scale decisions depend on the playable character.
5. Maintain male/female parity: identical armor/body, different hair silhouette and hair motion only.
6. Rebuild animation states with pose-specific silhouettes, not just small texture changes.
7. Rebuild enemies as distinct small, flying, and heavy dragon families with shared dragon anatomy and material rules.
8. Rebuild world tiles as mossy stone platform pieces with top, side, corner, ledge, and underside readability.
9. Rebuild coins, eggs, sword slash, checkpoint, spike trap, finish gate, and VFX in the same material/lighting language.
10. Rebuild UI around pixel panels/buttons/icons rather than raw text.
11. Keep background empty, but use foreground art, UI framing, and camera composition to create atmosphere.
12. Add visual polish only after core assets are coherent: dust, jump bursts, coin pickup sparks, checkpoint activation, damage flash, death effect, camera shake, and transition timing.
13. Validate with screenshots before/after, build, and a playable run.

## Step 1 Boundary

This audit intentionally does not modify gameplay code or visual implementation. The only artifact created in this step is `VISUAL_AUDIT.md`.

Next pending A5 step after approval: Step 2 - Reference Extraction, generating `ART_DIRECTION.md` from all provided reference images.
