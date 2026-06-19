import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create() {
    const sceneManager = new SceneManager(this);

    this.cameras.main.setBackgroundColor(gameSettings.backgroundColor);

    this.add
      .text(GAME_WIDTH / 2, 58, gameSettings.title, {
        fontFamily: 'monospace',
        fontSize: '28px',
        color: '#f8fafc',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 112, 'Foundation build', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 148, 'ENTER start Level 1 placeholder', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fde68a',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 42, 'Scenes: Boot / Preload / Menu / Game / Pause / Result', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
        align: 'center',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => sceneManager.start(SceneKeys.Game));
  }
}
