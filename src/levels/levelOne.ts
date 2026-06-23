export type LevelDefinition = {
  id: string;
  name: string;
  worldWidth: number;
  targetDurationMinutes: [number, number];
  playerSpawn: { x: number; y: number };
  checkpoint: { x: number; y: number };
  goal: { x: number; y: number };
  platforms: Array<{ x: number; y: number; width: number; height: number }>;
  coins: Array<{ x: number; y: number }>;
  enemies: Array<{
    x: number;
    y: number;
    type: 'small' | 'flying';
    patrolDistance?: number;
    patrolSpeed?: number;
  }>;
  traps: Array<{ x: number; y: number; width: number; height: number }>;
  fallingEggs: Array<{ x: number; y: number; delayMs: number; intervalMs: number; fallSpeed?: number }>;
  tutorialMarkers: Array<{ x: number; y: number; text: string }>;
};

function coinLine(startX: number, startY: number, count: number, stepX = 20) {
  return Array.from({ length: count }, (_, index) => ({
    x: startX + index * stepX,
    y: startY - (index % 2) * 8,
  }));
}

export const levelOne: LevelDefinition = {
  id: 'level-1',
  name: 'Level 1',
  worldWidth: 4200,
  targetDurationMinutes: [3, 5],
  playerSpawn: { x: 48, y: 220 },
  checkpoint: { x: 1710, y: 222 },
  goal: { x: 4120, y: 206 },
  platforms: [
    { x: 0, y: 246, width: 620, height: 24 },
    { x: 680, y: 246, width: 430, height: 24 },
    { x: 1180, y: 246, width: 1420, height: 24 },
    { x: 2620, y: 246, width: 640, height: 24 },
    { x: 3340, y: 246, width: 860, height: 24 },
    { x: 240, y: 210, width: 82, height: 12 },
    { x: 376, y: 184, width: 78, height: 12 },
    { x: 520, y: 206, width: 86, height: 12 },
    { x: 760, y: 204, width: 96, height: 12 },
    { x: 918, y: 174, width: 84, height: 12 },
    { x: 1230, y: 210, width: 90, height: 12 },
    { x: 1392, y: 190, width: 96, height: 12 },
    { x: 1560, y: 208, width: 96, height: 12 },
    { x: 1900, y: 196, width: 90, height: 12 },
    { x: 2140, y: 210, width: 92, height: 12 },
    { x: 2320, y: 180, width: 96, height: 12 },
    { x: 2750, y: 202, width: 104, height: 12 },
    { x: 2940, y: 174, width: 96, height: 12 },
    { x: 3150, y: 206, width: 108, height: 12 },
    { x: 3520, y: 198, width: 100, height: 12 },
    { x: 3720, y: 170, width: 94, height: 12 },
    { x: 3920, y: 204, width: 112, height: 12 },
  ],
  coins: [
    ...coinLine(210, 178, 5),
    ...coinLine(735, 174, 6),
    ...coinLine(1180, 214, 7),
    ...coinLine(1370, 158, 5),
    ...coinLine(1660, 190, 4),
    ...coinLine(2110, 180, 6),
    ...coinLine(2700, 214, 6),
    ...coinLine(2920, 144, 6),
    ...coinLine(3500, 168, 5),
    ...coinLine(3900, 176, 5),
  ],
  enemies: [
    { x: 930, y: 150, type: 'flying', patrolDistance: 90, patrolSpeed: 42 },
    { x: 1300, y: 222, type: 'small', patrolDistance: 96, patrolSpeed: 32 },
    { x: 2210, y: 186, type: 'small', patrolDistance: 78, patrolSpeed: 36 },
    { x: 2510, y: 154, type: 'flying', patrolDistance: 110, patrolSpeed: 48 },
    { x: 3180, y: 182, type: 'small', patrolDistance: 92, patrolSpeed: 38 },
    { x: 3700, y: 144, type: 'flying', patrolDistance: 120, patrolSpeed: 54 },
  ],
  traps: [
    { x: 610, y: 234, width: 52, height: 12 },
    { x: 2050, y: 234, width: 58, height: 12 },
    { x: 2850, y: 234, width: 62, height: 12 },
    { x: 3500, y: 234, width: 58, height: 12 },
  ],
  fallingEggs: [
    { x: 2448, y: 20, delayMs: 520, intervalMs: 1320, fallSpeed: 330 },
    { x: 2878, y: 20, delayMs: 660, intervalMs: 1500, fallSpeed: 345 },
    { x: 3076, y: 20, delayMs: 430, intervalMs: 1250, fallSpeed: 335 },
    { x: 3648, y: 20, delayMs: 780, intervalMs: 1580, fallSpeed: 350 },
  ],
  tutorialMarkers: [
    { x: 84, y: 162, text: 'Move' },
    { x: 250, y: 152, text: 'Double Jump' },
    { x: 1180, y: 178, text: 'Attack' },
  ],
};
