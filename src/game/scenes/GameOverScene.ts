import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { addFooterHint, addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    const sceneManager = new SceneManager(this);

    addMenuBackdrop(this);
    addScreenTitle(this, 'GAME OVER', 70);
    addPixelButton(this, GAME_WIDTH / 2, 128, 'Retry', { hotkey: 'R', tone: 'wood' });
    addPixelButton(this, GAME_WIDTH / 2, 168, 'Menu', { hotkey: 'M' });
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'The checkpoint remains your training line.', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    addFooterHint(this, 'Respawn from the last bonfire');

    this.input.keyboard?.once('keydown-R', () => sceneManager.start(SceneKeys.Game));
    this.input.keyboard?.once('keydown-M', () => sceneManager.start(SceneKeys.MainMenu));
  }
}
