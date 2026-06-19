import Phaser from 'phaser';
import { PlaceholderAssets } from '../../services/AssetLoader';
import { PlayerInputSnapshot } from '../../core/InputSystem';

export class Player extends Phaser.Physics.Arcade.Sprite {
  moveSpeed = 125;
  jumpSpeed = 320;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, PlaceholderAssets.player);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
  }

  applyInput(input: PlayerInputSnapshot) {
    if (input.left) {
      this.setVelocityX(-this.moveSpeed);
      this.setFlipX(true);
    } else if (input.right) {
      this.setVelocityX(this.moveSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (input.jump && this.body?.blocked.down) {
      this.setVelocityY(-this.jumpSpeed);
    }
  }
}
