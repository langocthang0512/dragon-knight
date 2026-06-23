import Phaser from 'phaser';
import { gameSettings, GAME_WIDTH } from '../../config/gameSettings';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { PlaceholderAssets } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';
import { addMenuBackdrop, addPanel, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

const HEART_COST = 10;

export class ShopScene extends Phaser.Scene {
  private status?: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Shop);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    addMenuBackdrop(this);
    addScreenTitle(this, 'SHOP', 36);
    addPanel(this, GAME_WIDTH / 2, 136, 260, 132);
    this.add.image(156, 104, PlaceholderAssets.heartFull).setScale(2).setDepth(20);
    this.add.image(156, 136, PlaceholderAssets.coinHud).setScale(1.4).setDepth(20);

    this.add
      .text(GAME_WIDTH / 2, 92, `Coins: ${save.coins}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 128, `Hearts: ${save.maxHealth}/${gameSettings.maxHealth}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    addPixelButton(this, GAME_WIDTH / 2, 168, `Buy Heart (${HEART_COST})`, { onSelect: () => this.buyHeart(), tone: 'wood', width: 190 });

    this.status = this.add
      .text(GAME_WIDTH / 2, 204, 'Max hearts is 5', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    addPixelButton(this, GAME_WIDTH / 2, 232, 'Back', { onSelect: () => sceneManager.start(SceneKeys.MainMenu), width: 150 });

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
