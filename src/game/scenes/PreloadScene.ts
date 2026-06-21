import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { AssetLoader } from '../../services/AssetLoader';
import { centerX, centerY } from '../../core/ResponsiveScaling';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload() {
    const assetLoader = new AssetLoader(this);
    assetLoader.preloadCharacterAssets();
    assetLoader.preloadEnvironmentAssets();
    assetLoader.preloadEnemyAssets();
  }

  create() {
    new AssetLoader(this).createGeneratedTextures();

    this.add
      .text(centerX(), centerY(), 'Loading foundation...', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.time.delayedCall(120, () => {
      new SceneManager(this).start(SceneKeys.MainMenu);
    });
  }
}
