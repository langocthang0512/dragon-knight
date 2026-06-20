# DRAGON KNIGHT Candidate A Lock

Source of truth from this point forward:

- `C:\Users\admin\Desktop\candidate_A.png`

Ignore all older references, older candidate boards, and older visual-direction notes for future visual implementation.

## Asset Rules

| Asset Category | Visual Rules | Pixel Rules | Color Rules | Detail Rules |
| --- | --- | --- | --- | --- |
| Character | Male and female knights share the same compact armored body. Only hair changes: male has messy dark spikes, female has red ponytail. Red scarf/cape, dark armor, gold trim, boots, gloves, belt, and small green-eyed face are required. Attack pose uses a forward sword slash. | Crisp pixel silhouettes, thick dark outline, no soft edges. Character scale should match row 1 and row 5 proportions from `candidate_A.png`. Preserve readable head, shoulder, cape, and boot shapes. | Dark navy/black armor, red scarf/cape, warm gold trim, brown leather, peach skin, green eyes. Female hair uses saturated red/orange highlights; male hair uses dark brown/black highlights. | Armor needs visible shoulder pads, bracers, belt buckle, tabard, scarf folds, boot highlights, and hair clusters. Do not flatten into simple blocks. |
| Environment | Ground block, coin, bonfire, spike trap, egg, and gate must follow row 2. Environment is mossy temple fantasy with readable gameplay objects. | Strong outer outline, compact gameplay-scale objects, clear top/bottom separation on ground and traps. Pixel clusters must be organized, not noisy. | Moss greens, dark teal/turquoise stone, warm gold coin, orange/yellow fire, cream/red egg, antique wood gate. | Ground needs moss, cracks, and carved stone pattern. Coin needs central gem and glow. Bonfire needs stone ring and ember pixels. Spikes need cream tips and red bases. Gate needs foliage, wood planks, and gold hardware. |
| Enemy | Small red dragon, flying red dragon, and heavy green dragon follow row 3. Each enemy must have a distinct silhouette and gameplay-read size. | Thick outline, readable head/horns/wings/tail at gameplay zoom. Flying dragon requires wing and tail-fire readability. Heavy dragon must feel larger and heavier than the others. | Red dragons use red/burgundy/orange with cream horn highlights. Heavy dragon uses emerald/teal body, cream belly plates, gold horn/spine accents. | Include horns, claws, belly plates, scales, wing membrane, tail shape, and eye highlight. Heavy dragon needs dense scale clusters and stronger spine/horn language. |
| UI | UI follows row 4: mossy stone frame plus gray-blue beveled buttons and icon buttons. Buttons use clear icon language: play, gear, home, close. | Pixel-perfect bevels, thick dark borders, rectangular button construction, stable spacing. UI should not look like default browser or plain Phaser text. | Green moss frame, teal/dark stone border, cool gray-blue buttons, dark icon glyphs, pale bevel highlights. | Frame needs moss overgrowth, stone cracks, and border blocks. Buttons need top highlight, lower shadow, and centered icon/pixel glyph. |
| Animation | Animation follows row 5: idle, run, jump, attack, hit, death. Character volume must stay consistent across frames. | Snappy low-frame pixel animation. No rubber deformation. Maintain outline thickness and readable silhouette in every frame. | Same character palette as locked character rules. Slash uses bright cream/yellow/orange glow. Hit uses red/white burst. | Run needs clear leg spacing and cape movement. Jump needs raised body/legs. Attack needs sword extension and crescent slash. Death needs collapsed body with readable scarf/armor. |
| VFX | VFX follows row 6: golden slash crescent, red hit burst, coin sparkle, bonfire/fire activation, rock/dust impact. | Clean particle clusters with strong silhouette. Effects should be bright but not blurry. Use small pixel fragments and controlled arcs. | Slash and coin use gold/cream/yellow. Hit uses red/orange/white. Fire uses red/orange/yellow/cream. Dust uses tan/stone gray. | Slash needs layered crescent bands and spark tips. Hit burst needs star spokes. Coin sparkle needs aura points. Fire needs ember pixels. Dust impact needs rock chunks and vertical debris. |

## Global Lock Rules

- Candidate A is approved and replaces all prior visual direction.
- Do not generate new candidates unless explicitly requested.
- Do not redesign categories outside this lock.
- Do not copy external assets directly; recreate original project assets that match the locked board.
- Preserve gameplay, collision sizes, animation hooks, scene flow, controls, and save behavior during future implementation.
- Future implementation should replace active visuals only after this lock.
