import Phaser from 'phaser';
import { PlaceholderAssets } from '../services/AssetLoader';

export class Hud {
  private coinsLabel?: Phaser.GameObjects.Text;
  private readonly hearts: Phaser.GameObjects.Image[] = [];

  constructor(private readonly scene: Phaser.Scene) {}

  create() {
    const plate = this.scene.add.image(66, 20, PlaceholderAssets.uiButtonStone).setDisplaySize(116, 30);
    plate.setScrollFactor(0).setDepth(895);

    for (let index = 0; index < 5; index += 1) {
      const heart = this.scene.add.image(20 + index * 16, 20, PlaceholderAssets.heartEmpty);
      heart.setScrollFactor(0).setDepth(900).setScale(1.25);
      this.hearts.push(heart);
    }

    this.scene.add
      .image(376, 20, PlaceholderAssets.uiButtonStone)
      .setDisplaySize(82, 30)
      .setScrollFactor(0)
      .setDepth(895);
    this.scene.add.image(348, 20, PlaceholderAssets.coinHud).setScrollFactor(0).setDepth(900);

    this.coinsLabel = this.scene.add
      .text(366, 20, '0', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(900);

    this.scene.add
      .text(234, 20, 'ESC', {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(900);
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
