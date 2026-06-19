import Phaser from 'phaser';
import { PlayerAnimationState, PlayerVariant } from '../entities/player/playerTypes';

export const PlaceholderAssets = {
  player: 'placeholder-player',
  enemy: 'placeholder-enemy',
  dragonSmall: 'placeholder-dragon-small',
  dragonFlying: 'placeholder-dragon-flying',
  dragonEgg: 'placeholder-dragon-egg',
  coin: 'placeholder-coin',
  tile: 'placeholder-tile',
  trap: 'placeholder-trap',
  bonfire: 'placeholder-bonfire',
  finishGate: 'placeholder-finish-gate',
} as const;

const playerStates: PlayerAnimationState[] = ['idle', 'run', 'jump', 'fall', 'attack', 'hit', 'death'];
const stateFrameCounts: Record<PlayerAnimationState, number> = {
  idle: 2,
  run: 4,
  jump: 1,
  fall: 1,
  attack: 3,
  hit: 1,
  death: 1,
};

export function playerAnimationKey(variant: PlayerVariant, state: PlayerAnimationState) {
  return `player-${variant}-${state}`;
}

export class AssetLoader {
  constructor(private readonly scene: Phaser.Scene) {}

  createGeneratedTextures() {
    this.createPlayerTextures('male');
    this.createPlayerTextures('female');
    this.createTexture(PlaceholderAssets.enemy, 16, 16, 0x8b5cf6);
    this.createTexture(PlaceholderAssets.tile, 16, 16, 0x475569);
    this.createCoinTexture();
    this.createDragonTexture(PlaceholderAssets.dragonSmall, 26, 18, 0x16a34a, false);
    this.createDragonTexture(PlaceholderAssets.dragonFlying, 28, 18, 0x7c3aed, true);
    this.createDragonEggTexture();
    this.createTrapTexture();
    this.createBonfireTexture();
    this.createFinishGateTexture();
    this.createPlayerAnimations();
  }

  private createTexture(key: string, width: number, height: number, color: number) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.lineStyle(1, 0x0f172a, 1);
    graphics.strokeRect(0.5, 0.5, width - 1, height - 1);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  private createPlayerTextures(variant: PlayerVariant) {
    for (const state of playerStates) {
      for (let frame = 0; frame < stateFrameCounts[state]; frame += 1) {
        this.createPlayerFrame(`${playerAnimationKey(variant, state)}-${frame}`, variant, state, frame);
      }
    }

    if (variant === 'male' && !this.scene.textures.exists(PlaceholderAssets.player)) {
      this.createPlayerFrame(PlaceholderAssets.player, variant, 'idle', 0);
    }
  }

  private createPlayerAnimations() {
    for (const variant of ['male', 'female'] as PlayerVariant[]) {
      for (const state of playerStates) {
        const key = playerAnimationKey(variant, state);

        if (this.scene.anims.exists(key)) {
          continue;
        }

        this.scene.anims.create({
          key,
          frames: Array.from({ length: stateFrameCounts[state] }, (_, frame) => ({
            key: `${key}-${frame}`,
          })),
          frameRate: state === 'run' ? 9 : state === 'attack' ? 14 : 4,
          repeat: state === 'idle' || state === 'run' ? -1 : 0,
        });
      }
    }
  }

  private createPlayerFrame(
    key: string,
    variant: PlayerVariant,
    state: PlayerAnimationState,
    frame: number,
  ) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const runStep = state === 'run' ? (frame % 2 === 0 ? -1 : 1) : 0;
    const idleBob = state === 'idle' && frame === 1 ? 1 : 0;
    const attackReach = state === 'attack' ? frame : 0;
    const knockedDown = state === 'death';
    const originY = knockedDown ? 14 : 0;

    if (knockedDown) {
      this.drawFallenKnight(graphics, variant);
      graphics.generateTexture(key, 32, 28);
      graphics.destroy();
      return;
    }

    this.drawScarf(graphics, idleBob);
    this.drawBody(graphics, runStep, idleBob, state);
    this.drawHeadAndHair(graphics, variant, idleBob);

    if (state === 'attack') {
      this.drawSword(graphics, attackReach);
    }

    if (state === 'hit') {
      graphics.lineStyle(1, 0xfef2f2, 1);
      graphics.strokeRect(9.5, 3.5, 13, 22);
    }

    if (state === 'jump') {
      graphics.fillStyle(0xfef3c7, 1);
      graphics.fillRect(20, 17 + originY, 3, 2);
    }

    graphics.generateTexture(key, 32, 28);
    graphics.destroy();
  }

  private drawScarf(graphics: Phaser.GameObjects.Graphics, idleBob: number) {
    graphics.fillStyle(0xb91c1c, 1);
    graphics.fillRect(8, 9 + idleBob, 11, 3);
    graphics.fillRect(5, 10 + idleBob, 5, 3);
    graphics.fillRect(4, 13 + idleBob, 4, 2);
  }

  private drawBody(
    graphics: Phaser.GameObjects.Graphics,
    runStep: number,
    idleBob: number,
    state: PlayerAnimationState,
  ) {
    const bodyY = 12 + idleBob;

    graphics.fillStyle(0x111827, 1);
    graphics.fillRect(12, bodyY, 8, 8);
    graphics.fillStyle(0xd97706, 1);
    graphics.fillRect(11, bodyY + 1, 2, 4);
    graphics.fillRect(19, bodyY + 1, 2, 4);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(14, bodyY + 7, 5, 2);
    graphics.fillStyle(0x991b1b, 1);
    graphics.fillRect(14, bodyY + 9, 4, 5);

    const armY = state === 'attack' ? bodyY + 4 : bodyY + 5;
    graphics.fillStyle(0x1f2937, 1);
    graphics.fillRect(9, armY, 3, 7);
    graphics.fillRect(20, armY, 3, 7);

    graphics.fillStyle(0x0f172a, 1);
    graphics.fillRect(12 + runStep, bodyY + 14, 3, 6);
    graphics.fillRect(18 - runStep, bodyY + 14, 3, 6);
    graphics.fillStyle(0x92400e, 1);
    graphics.fillRect(11 + runStep, bodyY + 20, 5, 2);
    graphics.fillRect(17 - runStep, bodyY + 20, 5, 2);
  }

  private drawHeadAndHair(graphics: Phaser.GameObjects.Graphics, variant: PlayerVariant, idleBob: number) {
    graphics.fillStyle(0xf2b78a, 1);
    graphics.fillRect(12, 5 + idleBob, 8, 7);
    graphics.fillStyle(0x0f766e, 1);
    graphics.fillRect(18, 8 + idleBob, 1, 1);

    if (variant === 'male') {
      graphics.fillStyle(0x1f130f, 1);
      graphics.fillRect(10, 3 + idleBob, 11, 4);
      graphics.fillRect(11, 2 + idleBob, 3, 2);
      graphics.fillRect(16, 2 + idleBob, 3, 2);
      return;
    }

    graphics.fillStyle(0xb91c1c, 1);
    graphics.fillRect(10, 3 + idleBob, 11, 5);
    graphics.fillRect(7, 6 + idleBob, 5, 10);
    graphics.fillStyle(0xf59e0b, 1);
    graphics.fillRect(8, 5 + idleBob, 2, 2);
  }

  private drawSword(graphics: Phaser.GameObjects.Graphics, attackReach: number) {
    graphics.fillStyle(0xf8fafc, 1);
    graphics.fillRect(22, 13 - attackReach, 7 + attackReach * 3, 2);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(20, 12, 3, 5);
    graphics.fillStyle(0xfef3c7, 0.75);
    graphics.fillRect(24, 10 - attackReach, 6 + attackReach * 2, 1);
  }

  private drawFallenKnight(graphics: Phaser.GameObjects.Graphics, variant: PlayerVariant) {
    graphics.fillStyle(0x111827, 1);
    graphics.fillRect(9, 18, 15, 6);
    graphics.fillStyle(0xb91c1c, 1);
    graphics.fillRect(5, 19, 8, 3);
    graphics.fillStyle(0xf2b78a, 1);
    graphics.fillRect(22, 17, 6, 5);

    graphics.fillStyle(variant === 'female' ? 0xb91c1c : 0x1f130f, 1);
    graphics.fillRect(21, 15, 8, 3);
    if (variant === 'female') {
      graphics.fillRect(18, 17, 5, 5);
    }
  }

  private createTrapTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.trap)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0x475569, 1);
    graphics.fillRect(0, 10, 32, 6);
    graphics.fillStyle(0xe5e7eb, 1);
    for (let x = 2; x < 30; x += 6) {
      graphics.fillRect(x, 5, 4, 5);
      graphics.fillRect(x + 1, 2, 2, 3);
    }
    graphics.generateTexture(PlaceholderAssets.trap, 32, 16);
    graphics.destroy();
  }

  private createCoinTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.coin)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(2, 0, 6, 2);
    graphics.fillRect(1, 2, 8, 6);
    graphics.fillRect(2, 8, 6, 2);
    graphics.fillStyle(0xfef3c7, 1);
    graphics.fillRect(4, 2, 2, 6);
    graphics.generateTexture(PlaceholderAssets.coin, 10, 10);
    graphics.destroy();
  }

  private createDragonTexture(key: string, width: number, height: number, color: number, flying: boolean) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const belly = flying ? 0xf0abfc : 0xfef3c7;

    graphics.fillStyle(color, 1);
    graphics.fillRect(5, 7, 14, 8);
    graphics.fillRect(16, 4, 8, 7);
    graphics.fillRect(2, 10, 5, 4);
    graphics.fillRect(7, 14, 3, 4);
    graphics.fillRect(16, 14, 3, 4);
    graphics.fillStyle(belly, 1);
    graphics.fillRect(11, 10, 6, 4);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(20, 2, 2, 3);
    graphics.fillRect(23, 2, 2, 3);
    graphics.fillStyle(0x0f172a, 1);
    graphics.fillRect(21, 6, 1, 1);

    if (flying) {
      graphics.fillStyle(0xa78bfa, 1);
      graphics.fillRect(4, 2, 8, 5);
      graphics.fillRect(10, 0, 6, 5);
      graphics.fillStyle(0xddd6fe, 0.85);
      graphics.fillRect(6, 3, 8, 2);
    }

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  private createDragonEggTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.dragonEgg)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0xfef3c7, 1);
    graphics.fillRect(4, 1, 8, 3);
    graphics.fillRect(2, 4, 12, 9);
    graphics.fillRect(4, 13, 8, 2);
    graphics.fillStyle(0xef4444, 1);
    graphics.fillRect(4, 5, 3, 3);
    graphics.fillRect(9, 9, 3, 3);
    graphics.lineStyle(1, 0x78350f, 1);
    graphics.strokeRect(2.5, 3.5, 11, 10);
    graphics.generateTexture(PlaceholderAssets.dragonEgg, 16, 16);
    graphics.destroy();
  }

  private createBonfireTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.bonfire)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0x92400e, 1);
    graphics.fillRect(5, 13, 10, 3);
    graphics.fillStyle(0xf97316, 1);
    graphics.fillRect(8, 6, 4, 8);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(9, 3, 2, 8);
    graphics.fillStyle(0x38bdf8, 0.85);
    graphics.fillRect(1, 15, 18, 1);
    graphics.generateTexture(PlaceholderAssets.bonfire, 20, 18);
    graphics.destroy();
  }

  private createFinishGateTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.finishGate)) {
      return;
    }

    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
    graphics.fillStyle(0x14532d, 1);
    graphics.fillRect(4, 6, 8, 34);
    graphics.fillRect(28, 6, 8, 34);
    graphics.fillRect(4, 6, 32, 8);
    graphics.fillStyle(0x22c55e, 1);
    graphics.fillRect(8, 10, 24, 3);
    graphics.fillStyle(0xfacc15, 1);
    graphics.fillRect(17, 0, 6, 10);
    graphics.generateTexture(PlaceholderAssets.finishGate, 40, 42);
    graphics.destroy();
  }
}
