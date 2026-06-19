import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { PlayerVariant } from '../../entities/player/playerTypes';
import { playerAnimationKey } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

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

    const selectedLabel = this.add
      .text(GAME_WIDTH / 2, 136, `Knight: ${this.formatVariant(save.selectedKnight)}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1',
        align: 'center',
      })
      .setOrigin(0.5);
    const preview = this.add.sprite(GAME_WIDTH / 2, 174, `${playerAnimationKey(save.selectedKnight, 'idle')}-0`).setScale(2);
    preview.play(playerAnimationKey(save.selectedKnight, 'idle'));

    this.add
      .text(GAME_WIDTH / 2, 214, 'M/F knight | ENTER start Level 1', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fde68a',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 24, 'A2 playable player foundation', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
        align: 'center',
      })
      .setOrigin(0.5);

    this.input.keyboard?.on('keydown-M', () => {
      this.selectVariant('male', selectedLabel, preview);
    });
    this.input.keyboard?.on('keydown-F', () => {
      this.selectVariant('female', selectedLabel, preview);
    });
    this.input.keyboard?.once('keydown-ENTER', () => sceneManager.start(SceneKeys.Game));
  }

  private selectVariant(
    variant: PlayerVariant,
    selectedLabel: Phaser.GameObjects.Text,
    preview: Phaser.GameObjects.Sprite,
  ) {
    const save = SaveService.load();
    SaveService.save({ ...save, selectedKnight: variant });

    selectedLabel.setText(`Knight: ${this.formatVariant(variant)}`);
    preview.play(playerAnimationKey(variant, 'idle'), true);
  }

  private formatVariant(variant: PlayerVariant) {
    return variant === 'female' ? 'Female' : 'Male';
  }
}
