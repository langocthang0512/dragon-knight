import { PlayerVariant } from '../entities/player/playerTypes';

export type CharacterDefinition = {
  id: PlayerVariant;
  name: string;
  moveSpeed: number;
  jumpSpeed: number;
  hair: string;
};

export const characters: CharacterDefinition[] = [
  {
    id: 'male',
    name: 'Ember Knight',
    moveSpeed: 125,
    jumpSpeed: 320,
    hair: 'short black hair',
  },
  {
    id: 'female',
    name: 'Ember Knight',
    moveSpeed: 125,
    jumpSpeed: 320,
    hair: 'long red hair',
  },
];
