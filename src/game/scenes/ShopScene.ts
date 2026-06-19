import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { SaveService } from '../../services/SaveService';

const HEART_COST = 10;

export class ShopScene extends Phaser.Scene {
  private status?: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Shop);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    this.cameras.main.setBackgroundColor(gameSettings.backgroundColor);
    this.add
      .text(GAME_WIDTH / 2, 42, 'SHOP', {
        fontFamily: 'monospace',
        fontSize: '22px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 92, `Coins: ${save.coins}`, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#fde68a',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 128, `Hearts: ${save.maxHealth}/${gameSettings.maxHealth}`, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 166, `B buy heart (${HEART_COST} coins)`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.status = this.add
      .text(GAME_WIDTH / 2, 204, 'Max hearts is 5', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 24, 'ESC menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-B', () => this.buyHeart());
    this.input.keyboard?.once('keydown-ESC', () => sceneManager.start(SceneKeys.MainMenu));
  }

  private buyHeart() {
    const save = SaveService.load();

    if (save.maxHealth >= gameSettings.maxHealth) {
      this.status?.setText('Hearts already maxed');
      this.input.keyboard?.once('keydown-B', () => this.buyHeart());
      return;
    }

    if (save.coins < HEART_COST) {
      this.status?.setText('Not enough coins');
      this.input.keyboard?.once('keydown-B', () => this.buyHeart());
      return;
    }

    SaveService.save({
      ...save,
      coins: save.coins - HEART_COST,
      maxHealth: save.maxHealth + 1,
    });
    this.scene.restart();
  }
}
