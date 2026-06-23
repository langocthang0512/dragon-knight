import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { PlaceholderAssets, playerAnimationKey } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';
import { addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    addMenuBackdrop(this);
    addScreenTitle(this, gameSettings.title, 35);

    this.add
      .sprite(112, 148, `${playerAnimationKey(save.selectedKnight, 'idle')}-0`)
      .setScale(0.95)
      .setDepth(15)
      .play(playerAnimationKey(save.selectedKnight, 'idle'));
    this.add.image(112, 192, PlaceholderAssets.tile).setScale(2.2, 1).setDepth(8);

    const options = [
      { key: 'ENTER', label: 'Start', action: () => sceneManager.start(SceneKeys.Game) },
      { key: 'S', label: 'Shop', action: () => sceneManager.start(SceneKeys.Shop) },
      { key: 'C', label: 'Select Character', action: () => sceneManager.start(SceneKeys.CharacterSelect) },
      { key: 'O', label: 'Settings', action: () => sceneManager.start(SceneKeys.Settings) },
      { key: 'X', label: 'Exit', action: () => this.showExitMessage() },
    ];

    options.forEach((option, index) => {
      addPixelButton(this, 316, 92 + index * 32, option.label, {
        onSelect: option.action,
        selected: index === 0,
        tone: index === 0 ? 'wood' : 'stone',
        width: 164,
      });
    });

    this.input.keyboard?.once('keydown-ENTER', options[0].action);
    this.input.keyboard?.once('keydown-S', options[1].action);
    this.input.keyboard?.once('keydown-C', options[2].action);
    this.input.keyboard?.once('keydown-O', options[3].action);
    this.input.keyboard?.once('keydown-X', options[4].action);
  }

  private showExitMessage() {
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 42, 'Exit requested. Close the browser tab to leave.', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
  }
}
