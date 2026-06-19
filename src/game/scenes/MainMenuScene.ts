import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { playerAnimationKey } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();
    const bestTime = save.levelOneBestTimeMs ? this.formatTime(save.levelOneBestTimeMs) : 'none';

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
      .text(GAME_WIDTH / 2, 96, `Coins ${save.coins} | Hearts ${save.maxHealth}/${gameSettings.maxHealth} | Best ${bestTime}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .sprite(112, 154, `${playerAnimationKey(save.selectedKnight, 'idle')}-0`)
      .setScale(2)
      .play(playerAnimationKey(save.selectedKnight, 'idle'));

    const options = [
      { key: 'ENTER', label: 'Start', action: () => sceneManager.start(SceneKeys.Game) },
      { key: 'S', label: 'Shop', action: () => sceneManager.start(SceneKeys.Shop) },
      { key: 'C', label: 'Select Character', action: () => sceneManager.start(SceneKeys.CharacterSelect) },
      { key: 'O', label: 'Settings', action: () => sceneManager.start(SceneKeys.Settings) },
      { key: 'X', label: 'Exit', action: () => this.showExitMessage() },
    ];

    options.forEach((option, index) => {
      this.add
        .text(178, 128 + index * 22, `${option.key.padEnd(5, ' ')} ${option.label}`, {
          fontFamily: 'monospace',
          fontSize: '13px',
          color: index === 0 ? '#fde68a' : '#f8fafc',
        })
        .setOrigin(0, 0.5);
    });

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 18, 'A4 playable release menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
        align: 'center',
      })
      .setOrigin(0.5);

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
        color: '#fca5a5',
      })
      .setOrigin(0.5);
  }

  private formatTime(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
}
