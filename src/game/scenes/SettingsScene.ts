import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { SaveService } from '../../services/SaveService';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Settings);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    this.cameras.main.setBackgroundColor(gameSettings.backgroundColor);
    this.add
      .text(GAME_WIDTH / 2, 42, 'SETTINGS', {
        fontFamily: 'monospace',
        fontSize: '22px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 100, `D debug overlay: ${save.settings.showDebug ? 'on' : 'off'}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, 132, `R reduce motion: ${save.settings.reduceMotion ? 'on' : 'off'}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, 174, 'DELETE reset save', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fca5a5',
      })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 24, 'ESC menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-D', () => {
      SaveService.save({ ...save, settings: { ...save.settings, showDebug: !save.settings.showDebug } });
      this.scene.restart();
    });
    this.input.keyboard?.once('keydown-R', () => {
      SaveService.save({ ...save, settings: { ...save.settings, reduceMotion: !save.settings.reduceMotion } });
      this.scene.restart();
    });
    this.input.keyboard?.once('keydown-DELETE', () => {
      SaveService.reset();
      this.scene.restart();
    });
    this.input.keyboard?.once('keydown-ESC', () => sceneManager.start(SceneKeys.MainMenu));
  }
}
