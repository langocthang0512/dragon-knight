# Pixel Quality Standard

All V2 visuals follow these production rules:

- Clear silhouette first: black outer contour and readable internal separations.
- No flat fills: each asset uses base, shadow, highlight, and accent clusters.
- Controlled contrast: bright highlights appear only on metal, gold, fire, egg glow, coin shine, and selected UI states.
- Consistent scale: player, dragons, eggs, coins, and UI are built for the existing Phaser camera zoom and collision bodies.
- Clean edges: rectangular pixel clusters are aligned to integer coordinates; no fractional rendering.
- Selective outlining: thick outer outline, smaller interior shadow seams.
- Material separation: armor, cloth, leather, gold, stone, moss, fire, shell, and scales use distinct palettes.
- Readability at gameplay zoom: hitboxes stay compact and sprites remain visually larger around them.

Rejected patterns:

- Generic colored rectangles.
- Empty large surfaces.
- Low-detail single-color objects.
- UI that looks like plain browser or Phaser debug text.
- Any code or asset copy from the references.
