export type PlayerVariant = 'male' | 'female';

export type PlayerAnimationState = 'idle' | 'run' | 'jump' | 'fall' | 'attack' | 'hit' | 'death';

export type PlayerDamageSource = 'enemy' | 'trap';

export type PlayerHealthChangedEvent = {
  health: number;
  maxHealth: number;
};

export const PlayerEvents = {
  HealthChanged: 'player-health-changed',
  CheckpointChanged: 'player-checkpoint-changed',
  Respawned: 'player-respawned',
} as const;
