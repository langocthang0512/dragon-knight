import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { centerX, centerY } from '../../core/ResponsiveScaling';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Pause);
  }

  create() {
    const sceneManager = new SceneManager(this);

    this.add.rectangle(centerX(), centerY(), 220, 108, 0x020617, 0.86);
    this.add
      .text(centerX(), centerY() - 20, 'PAUSED', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 18, 'ESC resume | R retry | M menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ESC', () => {
      this.scene.resume(SceneKeys.Game);
      sceneManager.stop(SceneKeys.Pause);
    });

    this.input.keyboard?.once('keydown-R', () => {
      sceneManager.stop(SceneKeys.Pause);
      sceneManager.start(SceneKeys.Game);
    });

    this.input.keyboard?.once('keydown-M', () => {
      sceneManager.stop(SceneKeys.Game);
      sceneManager.start(SceneKeys.MainMenu);
    });
  }
}
