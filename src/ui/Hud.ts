import Phaser from 'phaser';
import { PlaceholderAssets } from '../services/AssetLoader';

export class Hud {
  private coinsLabel?: Phaser.GameObjects.Text;
  private readonly hearts: Phaser.GameObjects.Image[] = [];

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly onSettings?: () => void,
  ) {}

  create() {
    const plate = this.scene.add.image(58, 18, PlaceholderAssets.uiButtonStone).setDisplaySize(104, 28);
    plate.setScrollFactor(0).setDepth(895);

    for (let index = 0; index < 5; index += 1) {
      const heart = this.scene.add.image(20 + index * 15, 18, PlaceholderAssets.heartEmpty);
      heart.setScrollFactor(0).setDepth(900).setScale(1.25);
      this.hearts.push(heart);
    }

    this.scene.add
      .image(240, 18, PlaceholderAssets.uiButtonStone)
      .setDisplaySize(86, 28)
      .setScrollFactor(0)
      .setDepth(895);
    this.scene.add.image(214, 18, PlaceholderAssets.coinHud).setScrollFactor(0).setDepth(900);

    this.coinsLabel = this.scene.add
      .text(232, 18, '0', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(900);

    const settings = this.scene.add.image(444, 22, PlaceholderAssets.uiIconSettings).setScale(0.42).setScrollFactor(0).setDepth(900);
    if (this.onSettings) {
      settings.setInteractive({ useHandCursor: true });
      settings.on('pointerover', () => settings.setTint(0xfff2b8));
      settings.on('pointerout', () => settings.clearTint());
      settings.on('pointerdown', this.onSettings);
    }
  }

  setCoins(coins: number) {
    this.coinsLabel?.setText(coins.toString());
  }

  setHealth(health: number, maxHealth: number) {
    this.hearts.forEach((heart, index) => {
      heart.setTexture(index < health ? PlaceholderAssets.heartFull : PlaceholderAssets.heartEmpty);
      heart.setVisible(index < maxHealth);
    });
  }
}
