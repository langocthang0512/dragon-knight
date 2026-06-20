import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { centerX, centerY } from '../../core/ResponsiveScaling';
import { addPanel, addPixelButton } from '../../ui/PixelUi';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Pause);
  }

  create() {
    const sceneManager = new SceneManager(this);

    this.add.rectangle(centerX(), centerY(), 480, 270, 0x050509, 0.55);
    addPanel(this, centerX(), centerY(), 260, 140);
    this.add
      .text(centerX(), centerY() - 20, 'PAUSED', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    addPixelButton(this, centerX(), centerY() + 24, 'Resume   R Retry   M Menu', { hotkey: 'ESC', width: 224 });

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
