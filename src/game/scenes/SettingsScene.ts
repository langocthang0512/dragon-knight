import Phaser from 'phaser';
import { GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { SaveService } from '../../services/SaveService';
import { addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Settings);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    addMenuBackdrop(this);
    addScreenTitle(this, 'SETTINGS', 36);

    addPixelButton(this, GAME_WIDTH / 2, 92, `Debug: ${save.settings.showDebug ? 'On' : 'Off'}`, {
      onSelect: () => this.toggleDebug(save),
      width: 210,
    });
    addPixelButton(this, GAME_WIDTH / 2, 128, `Reduce Motion: ${save.settings.reduceMotion ? 'On' : 'Off'}`, {
      onSelect: () => this.toggleReduceMotion(save),
      width: 210,
      fontSize: '9px',
    });
    addPixelButton(this, GAME_WIDTH / 2, 164, 'Reset Save', { onSelect: () => this.resetSave(), tone: 'wood', width: 190 });
    addPixelButton(this, GAME_WIDTH / 2, 218, 'Back', { onSelect: () => sceneManager.start(SceneKeys.MainMenu), width: 150 });

    this.input.keyboard?.once('keydown-D', () => this.toggleDebug(save));
    this.input.keyboard?.once('keydown-R', () => this.toggleReduceMotion(save));
    this.input.keyboard?.once('keydown-DELETE', () => this.resetSave());
    this.input.keyboard?.once('keydown-ESC', () => sceneManager.start(SceneKeys.MainMenu));
  }

  private toggleDebug(save: ReturnType<typeof SaveService.load>) {
    SaveService.save({ ...save, settings: { ...save.settings, showDebug: !save.settings.showDebug } });
    this.scene.restart();
  }

  private toggleReduceMotion(save: ReturnType<typeof SaveService.load>) {
    SaveService.save({ ...save, settings: { ...save.settings, reduceMotion: !save.settings.reduceMotion } });
    this.scene.restart();
  }

  private resetSave() {
    SaveService.reset();
    this.scene.restart();
  }
}
