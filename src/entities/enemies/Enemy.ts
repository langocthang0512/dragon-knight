import Phaser from 'phaser';
import { PlaceholderAssets } from '../../services/AssetLoader';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private health = 1;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, PlaceholderAssets.enemy);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
  }

  takeDamage(amount: number) {
    this.health -= amount;
    this.setTint(0xfef08a);

    if (this.health <= 0) {
      this.disableBody(true, true);
      return;
    }

    this.scene.time.delayedCall(100, () => this.clearTint());
  }
}
