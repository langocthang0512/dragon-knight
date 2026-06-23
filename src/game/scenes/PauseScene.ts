import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { centerX, centerY } from '../../core/ResponsiveScaling';
import { addPanel, addPixelButton } from '../../ui/PixelUi';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Pause);
  }

  create() {
    const resume = () => {
      this.scene.resume(SceneKeys.Game);
      this.scene.stop(SceneKeys.Pause);
    };
    const retry = () => {
      this.scene.stop(SceneKeys.Game);
      this.scene.stop(SceneKeys.Pause);
      this.scene.start(SceneKeys.Game);
    };
    const mainMenu = () => {
      this.scene.stop(SceneKeys.Game);
      this.scene.stop(SceneKeys.Pause);
      this.scene.start(SceneKeys.MainMenu);
    };

    this.add.rectangle(centerX(), centerY(), 480, 270, 0x050509, 0.55);
    addPanel(this, centerX(), centerY(), 260, 170);
    this.add
      .text(centerX(), centerY() - 52, 'PAUSED', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    addPixelButton(this, centerX(), centerY() - 12, 'Resume', { onSelect: resume, tone: 'wood', width: 170 });
    addPixelButton(this, centerX(), centerY() + 25, 'Retry', { onSelect: retry, width: 170 });
    addPixelButton(this, centerX(), centerY() + 62, 'Main Menu', { onSelect: mainMenu, width: 170 });

    this.input.keyboard?.once('keydown-ESC', resume);
    this.input.keyboard?.once('keydown-R', retry);
    this.input.keyboard?.once('keydown-M', mainMenu);
  }
}
