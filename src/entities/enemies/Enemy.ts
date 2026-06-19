import Phaser from 'phaser';
import { PlaceholderAssets } from '../../services/AssetLoader';

export type EnemyType = 'small' | 'flying';

type EnemyOptions = {
  type: EnemyType;
  patrolDistance?: number;
  patrolSpeed?: number;
};

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private health = 1;
  private readonly spawnX: number;
  private readonly enemyType: EnemyType;
  private readonly patrolDistance: number;
  private readonly patrolSpeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, options: EnemyOptions) {
    const textureKey = options.type === 'flying' ? PlaceholderAssets.dragonFlying : PlaceholderAssets.dragonSmall;
    super(scene, x, y, textureKey);

    this.spawnX = x;
    this.enemyType = options.type;
    this.patrolDistance = options.patrolDistance ?? 80;
    this.patrolSpeed = options.patrolSpeed ?? 30;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(options.type === 'flying' ? 24 : 22, 14);
    body.setOffset(2, options.type === 'flying' ? 4 : 4);

    if (options.type === 'flying') {
      body.setAllowGravity(false);
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.active) {
      return;
    }

    const body = this.body as Phaser.Physics.Arcade.Body;
    const direction = this.x >= this.spawnX + this.patrolDistance ? -1 : this.x <= this.spawnX - this.patrolDistance ? 1 : Math.sign(body.velocity.x || 1);

    this.setVelocityX(direction * this.patrolSpeed);
    this.setFlipX(direction < 0);

    if (this.enemyType === 'flying') {
      this.y += Math.sin(time / 180) * (delta / 1000) * 18;
    }
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
