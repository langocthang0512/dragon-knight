export type CharacterDefinition = {
  id: string;
  name: string;
  moveSpeed: number;
  jumpSpeed: number;
};

export const characters: CharacterDefinition[] = [
  {
    id: 'ember',
    name: 'Ember Knight',
    moveSpeed: 125,
    jumpSpeed: 320,
  },
];
