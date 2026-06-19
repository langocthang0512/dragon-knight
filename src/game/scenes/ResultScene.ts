import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { centerX, centerY } from '../../core/ResponsiveScaling';

export class ResultScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Result);
  }

  create() {
    const sceneManager = new SceneManager(this);

    this.cameras.main.setBackgroundColor('#111827');
    this.add
      .text(centerX(), centerY() - 24, 'LEVEL RESULT', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 16, 'Placeholder results screen', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 48, 'ENTER return to menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => sceneManager.start(SceneKeys.MainMenu));
  }
}
