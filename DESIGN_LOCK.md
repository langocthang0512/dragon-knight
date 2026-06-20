# Dragon Knight Character Design Lock

Source of truth: `C:\Users\admin\Desktop\candidate_A_character.png`

Scope: character assets only. Older references, older candidates, environment, enemy, UI, and VFX direction are out of scope for this pass.

## Shape

- Compact chibi knight proportions with a large expressive head, short body, broad shoulders, and sturdy boots.
- Male and female share the same armor, body, scarf, cape, weapon, gloves, belt, boots, and animation language.
- Hair is the only silhouette difference between variants.
- Male hair uses messy dark spikes and broken clumps around the brow and crown.
- Female hair uses red side volume plus a rear ponytail with a small gold tie.
- Attack silhouette leans forward with the sword extended and a bright gold crescent slash.

## Colors

- Armor: near-black navy base, blue-gray mid highlights, tiny pale steel edge glints.
- Cloth: deep crimson cape and scarf with brighter red folds at the lower edges.
- Trim: warm gold edging on pauldrons, belt, bracers, tabard, and sword guard.
- Leather: dark brown boots, gloves, belt, and straps with copper highlights.
- Skin: warm peach face and hands, held inside a strong dark outline.
- Eyes: small saturated green pixels.
- Hair: male dark brown to black; female saturated crimson with orange-red highlights.
- Sword: dark outline, pale blue steel, white top highlight, gold guard, red gem accent.

## Pixel Rules

- Keep generated player textures at the existing runtime size so collision and scene layout remain stable.
- Use crisp rectangular pixel clusters with no soft gradients.
- Use dense but controlled details: armor seams, shoulder trim, belt buckle, tabard trim, scarf folds, boot highlights, hair clumps, and sword edge pixels.
- Avoid flat fills and empty surfaces.
- Maintain readable silhouettes at gameplay zoom.

## Outline

- Use thick dark outer outlines on the head, hair, cape, body, boots, and weapon.
- Use selective inner dark lines for armor separation, scarf fold breaks, belt/strap separation, and hair grouping.
- Keep outlines clean and avoid noisy single pixels unless they mark deliberate spark or slash accents.

## Shading And Material

- Every major surface needs base, shadow, highlight, and accent.
- Armor should read as dark metal through blue-gray edge highlights and small pale glints.
- Cloth should read as soft fabric through red fold bands and darker underside shadows.
- Gold trim should be small and high contrast, not broad yellow areas.
- Leather should use brown base with copper highlights and black soles.

## Proportions

- Head sits high and oversized, face roughly one third of the character height.
- Torso is short and armored, with the belt and red tabard centered.
- Boots are chunky and grounded.
- Cape extends back-left and stays lower than the head in idle frames.
- Attack pose compresses the body while preserving armor volume.

## Locked Integration Rules

- Preserve `player-${variant}-${state}` animation keys.
- Preserve idle, run, jump, double jump, fall, attack, hit, and death states.
- Preserve gameplay, collision body size, attack timing, scene flow, save data, and controls.
- Replace visuals only.
