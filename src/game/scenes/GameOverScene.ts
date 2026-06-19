import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    const sceneManager = new SceneManager(this);

    this.cameras.main.setBackgroundColor('#111827');
    this.add
      .text(GAME_WIDTH / 2, 78, 'GAME OVER', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#fca5a5',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, 128, 'R retry | M menu', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'The checkpoint remains your training line.', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-R', () => sceneManager.start(SceneKeys.Game));
    this.input.keyboard?.once('keydown-M', () => sceneManager.start(SceneKeys.MainMenu));
  }
}
