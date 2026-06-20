import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { SaveService } from '../../services/SaveService';
import { addFooterHint, addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Settings);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    addMenuBackdrop(this);
    addScreenTitle(this, 'SETTINGS', 36);

    addPixelButton(this, GAME_WIDTH / 2, 96, `Debug ${save.settings.showDebug ? 'on' : 'off'}`, { hotkey: 'D', width: 210 });
    addPixelButton(this, GAME_WIDTH / 2, 136, `Reduce Motion ${save.settings.reduceMotion ? 'on' : 'off'}`, { hotkey: 'R', width: 210 });
    addPixelButton(this, GAME_WIDTH / 2, 180, 'Reset Save', { hotkey: 'DEL', tone: 'wood', width: 190 });
    addFooterHint(this, 'ESC menu');

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
