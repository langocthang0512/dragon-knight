export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  MainMenu: 'MainMenuScene',
  CharacterSelect: 'CharacterSelectScene',
  Shop: 'ShopScene',
  Settings: 'SettingsScene',
  Game: 'GameScene',
  Pause: 'PauseScene',
  Result: 'ResultScene',
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
