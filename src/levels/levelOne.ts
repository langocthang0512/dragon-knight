export type LevelDefinition = {
  id: string;
  name: string;
  playerSpawn: { x: number; y: number };
  checkpoint: { x: number; y: number };
  goal: { x: number; y: number };
  platforms: Array<{ x: number; y: number; width: number; height: number }>;
  enemies: Array<{ x: number; y: number }>;
  traps: Array<{ x: number; y: number; width: number; height: number }>;
};

export const levelOne: LevelDefinition = {
  id: 'level-1',
  name: 'Level 1',
  playerSpawn: { x: 48, y: 190 },
  checkpoint: { x: 56, y: 222 },
  goal: { x: 430, y: 178 },
  platforms: [
    { x: 0, y: 246, width: 480, height: 24 },
    { x: 118, y: 204, width: 64, height: 12 },
    { x: 244, y: 172, width: 72, height: 12 },
    { x: 372, y: 210, width: 64, height: 12 },
  ],
  enemies: [{ x: 276, y: 150 }],
  traps: [{ x: 190, y: 234, width: 44, height: 12 }],
};
