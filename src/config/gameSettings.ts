export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 270;

export const gameSettings = {
  title: 'DRAGON KNIGHT',
  version: '0.1.0',
  storageKey: 'dragon-knight-save',
  backgroundColor: '#101827',
  worldGravity: 900,
  defaultHealth: 3,
  maxHealth: 5,
  coyoteTimeMs: 110,
  jumpBufferMs: 130,
} as const;
