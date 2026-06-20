import Phaser from 'phaser';
import { gameSettings } from '../../config/gameSettings';
import { PlayerInputSnapshot } from '../../core/InputSystem';
import { playerAnimationKey } from '../../services/AssetLoader';
import {
  PlayerAnimationState,
  PlayerDamageSource,
  PlayerEvents,
  PlayerHealthChangedEvent,
  PlayerVariant,
} from './playerTypes';

type PlayerOptions = {
  variant: PlayerVariant;
  maxHealth?: number;
};

export class Player extends Phaser.Physics.Arcade.Sprite {
  moveSpeed = 125;
  jumpSpeed = 320;
  readonly maxJumps = 2;
  readonly attackHitbox: Phaser.GameObjects.Zone;

  private readonly variant: PlayerVariant;
  private health: number = gameSettings.defaultHealth;
  private maxHealth: number = gameSettings.defaultHealth;
  private currentState?: PlayerAnimationState;
  private checkpoint: Phaser.Math.Vector2;
  private jumpsUsed = 0;
  private lastGroundedAt = 0;
  private lastJumpPressedAt = -Infinity;
  private attackEndsAt = 0;
  private invulnerableUntil = 0;
  private respawning = false;
  private dead = false;
  private lastJumpWasDouble = false;

  constructor(scene: Phaser.Scene, x: number, y: number, options: PlayerOptions) {
    super(scene, x, y, `${playerAnimationKey(options.variant, 'idle')}-0`);

    this.variant = options.variant;
    this.maxHealth = Math.min(options.maxHealth ?? gameSettings.defaultHealth, gameSettings.maxHealth);
    this.health = this.maxHealth;
    this.checkpoint = new Phaser.Math.Vector2(x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
    this.setOrigin(0.5, 1);
    this.setDepth(20);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(12, 20);
    body.setOffset(18, 27);

    this.attackHitbox = scene.add.zone(x, y - 12, 26, 18);
    scene.physics.add.existing(this.attackHitbox);
    this.setAttackHitboxEnabled(false);

    this.playState('idle');
    this.emitHealthChanged();
  }

  updateFromInput(input: PlayerInputSnapshot) {
    const now = this.scene.time.now;
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.y > this.scene.physics.world.bounds.height + 48 && !this.respawning) {
      this.takeDamage(1, 'trap');
    }

    if (this.x < 8) {
      this.setX(8);
    }

    this.updateGrounding(now, body);
    this.updateAttackHitbox(body);

    if (this.dead || this.respawning) {
      this.setVelocityX(0);
      this.updateAnimationState(body);
      return;
    }

    if (input.jumpPressed) {
      this.lastJumpPressedAt = now;
    }

    if (input.attackPressed) {
      this.startAttack(now);
    }

    if (input.left) {
      this.setVelocityX(-this.moveSpeed);
      this.setFlipX(true);
    } else if (input.right) {
      this.setVelocityX(this.moveSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    this.tryBufferedJump(now);
    this.updateAnimationState(body);
  }

  setCheckpoint(x: number, y: number) {
    if (this.checkpoint.x === x && this.checkpoint.y === y) {
      return;
    }

    this.checkpoint.set(x, y);
    this.scene.events.emit(PlayerEvents.CheckpointChanged, { x, y });
  }

  takeDamage(amount: number, source: PlayerDamageSource) {
    const now = this.scene.time.now;

    if (this.dead || this.respawning || now < this.invulnerableUntil) {
      return false;
    }

    this.health = Phaser.Math.Clamp(this.health - amount, 0, this.maxHealth);
    this.invulnerableUntil = now + 850;
    this.setTint(0xfca5a5);
    this.playState('hit');
    this.emitHealthChanged();

    if (this.health <= 0) {
      this.dieAndRespawn();
      return true;
    }

    if (source === 'trap') {
      this.scene.time.delayedCall(140, () => this.respawnAtCheckpoint(false));
    } else {
      const knockback = this.flipX ? 120 : -120;
      this.setVelocity(knockback, -120);
      this.scene.time.delayedCall(180, () => this.clearTint());
    }

    return true;
  }

  getHealthSnapshot(): PlayerHealthChangedEvent {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
    };
  }

  private updateGrounding(now: number, body: Phaser.Physics.Arcade.Body) {
    if (body.blocked.down || body.touching.down) {
      this.lastGroundedAt = now;
      this.jumpsUsed = 0;
    } else if (now - this.lastGroundedAt > gameSettings.coyoteTimeMs && this.jumpsUsed === 0) {
      this.jumpsUsed = 1;
    }
  }

  private tryBufferedJump(now: number) {
    const jumpBuffered = now - this.lastJumpPressedAt <= gameSettings.jumpBufferMs;
    const body = this.body as Phaser.Physics.Arcade.Body;
    const grounded = body.blocked.down || body.touching.down;
    const canCoyoteJump = now - this.lastGroundedAt <= gameSettings.coyoteTimeMs && this.jumpsUsed === 0;
    const canDoubleJump = !grounded && !canCoyoteJump && this.jumpsUsed < this.maxJumps;

    if (!jumpBuffered || (!grounded && !canCoyoteJump && !canDoubleJump)) {
      return;
    }

    this.setVelocityY(-this.jumpSpeed);
    this.lastJumpWasDouble = canDoubleJump;
    this.jumpsUsed = grounded || canCoyoteJump ? 1 : this.jumpsUsed + 1;
    this.lastJumpPressedAt = -Infinity;
  }

  private startAttack(now: number) {
    if (now < this.attackEndsAt - 80) {
      return;
    }

    this.attackEndsAt = now + 220;
    this.playState('attack');
    this.setAttackHitboxEnabled(true);
  }

  private updateAttackHitbox(body: Phaser.Physics.Arcade.Body) {
    const now = this.scene.time.now;
    const attackBody = this.attackHitbox.body as Phaser.Physics.Arcade.Body;
    const direction = this.flipX ? -1 : 1;

    this.attackHitbox.setPosition(this.x + direction * 18, this.y - 14);
    attackBody.setSize(26, 18);
    attackBody.updateFromGameObject();

    if (now >= this.attackEndsAt && attackBody.enable) {
      this.setAttackHitboxEnabled(false);
    }

    if (!body.enable) {
      this.setAttackHitboxEnabled(false);
    }
  }

  private setAttackHitboxEnabled(enabled: boolean) {
    this.attackHitbox.setActive(enabled);
    const body = this.attackHitbox.body as Phaser.Physics.Arcade.Body;
    body.enable = enabled;
  }

  private updateAnimationState(body: Phaser.Physics.Arcade.Body) {
    const now = this.scene.time.now;

    if (this.dead) {
      this.playState('death');
      return;
    }

    if (now < this.attackEndsAt) {
      this.playState('attack');
      return;
    }

    if (now < this.invulnerableUntil && this.currentState === 'hit') {
      return;
    }

    this.clearTint();

    if (!body.blocked.down && body.velocity.y < 0) {
      this.playState(this.lastJumpWasDouble ? 'doubleJump' : 'jump');
    } else if (!body.blocked.down && body.velocity.y > 12) {
      this.lastJumpWasDouble = false;
      this.playState('fall');
    } else if (Math.abs(body.velocity.x) > 6) {
      this.lastJumpWasDouble = false;
      this.playState('run');
    } else {
      this.lastJumpWasDouble = false;
      this.playState('idle');
    }
  }

  private playState(state: PlayerAnimationState) {
    if (this.currentState === state) {
      return;
    }

    this.currentState = state;
    this.play(playerAnimationKey(this.variant, state), true);
  }

  private dieAndRespawn() {
    this.dead = true;
    this.setVelocity(0, 0);
    this.setAttackHitboxEnabled(false);
    this.playState('death');

    this.scene.time.delayedCall(700, () => this.respawnAtCheckpoint(true));
  }

  private respawnAtCheckpoint(restoreHealth: boolean) {
    this.respawning = true;
    this.dead = false;
    this.clearTint();
    this.setPosition(this.checkpoint.x, this.checkpoint.y);
    this.setVelocity(0, 0);
    this.setAttackHitboxEnabled(false);
    this.jumpsUsed = 0;
    this.lastJumpWasDouble = false;
    this.lastJumpPressedAt = -Infinity;

    if (restoreHealth) {
      this.health = gameSettings.defaultHealth;
      this.emitHealthChanged();
    }

    this.scene.events.emit(PlayerEvents.Respawned, { x: this.checkpoint.x, y: this.checkpoint.y });
    this.scene.time.delayedCall(100, () => {
      this.respawning = false;
      this.invulnerableUntil = this.scene.time.now + 450;
      this.playState('idle');
    });
  }

  private emitHealthChanged() {
    this.scene.events.emit(PlayerEvents.HealthChanged, this.getHealthSnapshot());
  }
}
