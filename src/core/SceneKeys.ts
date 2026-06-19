export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  MainMenu: 'MainMenuScene',
  CharacterSelect: 'CharacterSelectScene',
  Shop: 'ShopScene',
  Settings: 'SettingsScene',
  Game: 'GameScene',
  Pause: 'PauseScene',
  GameOver: 'GameOverScene',
  Result: 'ResultScene',
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
