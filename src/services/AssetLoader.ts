import Phaser from 'phaser';
import { PlayerAnimationState, PlayerVariant } from '../entities/player/playerTypes';

export const PlaceholderAssets = {
  player: 'candidate-a-player',
  enemy: 'candidate-a-enemy',
  dragonSmall: 'candidate-a-dragon-small',
  dragonFlying: 'candidate-a-dragon-flying',
  dragonHeavy: 'candidate-a-dragon-heavy',
  dragonEgg: 'candidate-a-dragon-egg',
  coin: 'candidate-a-coin',
  coinHud: 'candidate-a-coin-hud',
  tile: 'candidate-a-moss-stone-tile',
  trap: 'candidate-a-spike-trap',
  bonfire: 'candidate-a-bonfire-checkpoint',
  finishGate: 'candidate-a-finish-gate',
  slash: 'candidate-a-vfx-slash',
  dust: 'candidate-a-vfx-dust',
  jumpBurst: 'candidate-a-vfx-jump-burst',
  coinPickup: 'candidate-a-vfx-coin-pickup',
  damage: 'candidate-a-vfx-damage',
  checkpointBurst: 'candidate-a-vfx-checkpoint-burst',
  deathBurst: 'candidate-a-vfx-death-burst',
  uiPanel: 'candidate-a-ui-panel-stone',
  uiButtonStone: 'candidate-a-ui-button-stone',
  uiButtonWood: 'candidate-a-ui-button-wood',
  uiIconButton: 'candidate-a-ui-icon-button',
  heartFull: 'candidate-a-heart-full',
  heartEmpty: 'candidate-a-heart-empty',
  selectionFrame: 'candidate-a-selection-frame',
} as const;

const playerStates: PlayerAnimationState[] = [
  'idle',
  'run',
  'jump',
  'doubleJump',
  'fall',
  'attack',
  'hit',
  'death',
];

const stateFrameCounts: Record<PlayerAnimationState, number> = {
  idle: 4,
  run: 6,
  jump: 1,
  doubleJump: 1,
  fall: 1,
  attack: 4,
  hit: 2,
  death: 3,
};

const PLAYER_W = 48;
const PLAYER_H = 48;

const colors = {
  ink: 0x050509,
  armor0: 0x111722,
  armor1: 0x1d2a38,
  armor2: 0x314a60,
  armor3: 0x6f8792,
  armor4: 0xb4c0bd,
  red0: 0x611216,
  red1: 0x9d1c1e,
  red2: 0xd83a24,
  red3: 0xff7430,
  gold0: 0x8a4d17,
  gold1: 0xd69724,
  gold2: 0xffde5a,
  skin0: 0x9c5b3d,
  skin1: 0xe7aa7c,
  skin2: 0xffd09b,
  eye: 0x0c9d82,
  hair0: 0x140f0d,
  hair1: 0x2c1b15,
  hair2: 0x4b3023,
  fHair0: 0x751a21,
  fHair1: 0xc4332a,
  fHair2: 0xef6b3a,
  leather0: 0x321912,
  leather1: 0x71401f,
  boot: 0x8f461e,
  stone0: 0x15282d,
  stone1: 0x29484f,
  stone2: 0x456b6e,
  stone3: 0x91aa94,
  moss0: 0x245c32,
  moss1: 0x62a141,
  moss2: 0xa9cf58,
  fire0: 0xc71f19,
  fire1: 0xff6720,
  fire2: 0xffcb3d,
  fire3: 0xfff0b0,
  dragon0: 0x651519,
  dragon1: 0xa91d1f,
  dragon2: 0xe33122,
  dragon3: 0xff6b20,
  belly: 0xf0bf68,
  green0: 0x053f38,
  green1: 0x0a7f67,
  green2: 0x59bc68,
  purple: 0x63315f,
  metal0: 0x82c7e8,
  metal1: 0xeef9ff,
  uiBlue0: 0x354b63,
  uiBlue1: 0x8ba9bb,
  uiBlue2: 0xc8d8de,
};

export function playerAnimationKey(variant: PlayerVariant, state: PlayerAnimationState) {
  return `player-${variant}-${state}`;
}

export class AssetLoader {
  constructor(private readonly scene: Phaser.Scene) {}

  createGeneratedTextures() {
    this.createPlayerTextures('male');
    this.createPlayerTextures('female');
    this.createDragonTexture(PlaceholderAssets.enemy, 'small');
    this.createDragonTexture(PlaceholderAssets.dragonSmall, 'small');
    this.createDragonTexture(PlaceholderAssets.dragonFlying, 'flying');
    this.createDragonTexture(PlaceholderAssets.dragonHeavy, 'heavy');
    this.createStoneTileTexture();
    this.createCoinTexture(PlaceholderAssets.coin, 20);
    this.createCoinTexture(PlaceholderAssets.coinHud, 22);
    this.createDragonEggTexture();
    this.createTrapTexture();
    this.createBonfireTexture();
    this.createFinishGateTexture();
    this.createUiTextures();
    this.createVfxTextures();
    this.createPlayerAnimations();
  }

  private r(g: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number, color: number, alpha = 1) {
    g.fillStyle(color, alpha);
    g.fillRect(x, y, w, h);
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
          frames: Array.from({ length: stateFrameCounts[state] }, (_, frame) => ({ key: `${key}-${frame}` })),
          frameRate: state === 'run' ? 12 : state === 'attack' ? 16 : state === 'death' ? 4 : 6,
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

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const bob = state === 'idle' && frame % 2 === 1 ? 1 : 0;
    const run = [-2, -1, 1, 2, 1, -1][frame] ?? 0;
    const airborne = state === 'jump' || state === 'doubleJump' || state === 'fall';

    if (state === 'death') {
      this.drawFallenKnight(g, variant, frame);
      g.generateTexture(key, PLAYER_W, PLAYER_H);
      g.destroy();
      return;
    }

    this.drawCandidateCape(g, state, frame, bob);
    this.drawCandidateBody(g, state, run, bob, airborne);
    this.drawCandidateHead(g, variant, state, frame, bob);

    if (state === 'attack') {
      this.drawCandidateSword(g, frame);
    } else {
      this.drawCandidateSheathedSword(g, bob);
    }

    if (state === 'hit') {
      this.r(g, 13, 8, 21, 30, 0xfff1f2, 0.48);
      this.r(g, 8, 14, 4, 3, 0xff2d2d);
      this.r(g, 35, 24, 4, 3, 0xff2d2d);
    }

    if (state === 'doubleJump') {
      this.r(g, 15, 43, 5, 2, colors.fire2);
      this.r(g, 27, 43, 6, 2, colors.fire1);
      this.r(g, 22, 45, 3, 2, colors.fire3);
    }

    g.generateTexture(key, PLAYER_W, PLAYER_H);
    g.destroy();
  }

  private drawCandidateCape(g: Phaser.GameObjects.Graphics, state: PlayerAnimationState, frame: number, bob: number) {
    const y = 18 + bob;
    const wind = state === 'run' ? [-1, 0, 1, 2, 1, 0][frame] : state === 'fall' ? -1 : 0;
    this.r(g, 5, y + 2, 17, 8, colors.ink);
    this.r(g, 3, y + 9 + wind, 15, 9, colors.ink);
    this.r(g, 6, y + 3, 15, 6, colors.red0);
    this.r(g, 4, y + 10 + wind, 12, 7, colors.red1);
    this.r(g, 7, y + 5, 7, 2, colors.red2);
    this.r(g, 5, y + 13 + wind, 7, 2, colors.red2);
  }

  private drawCandidateBody(
    g: Phaser.GameObjects.Graphics,
    state: PlayerAnimationState,
    run: number,
    bob: number,
    airborne: boolean,
  ) {
    const y = 18 + bob + (state === 'fall' ? 1 : 0);
    const legA = airborne ? -1 : run;
    const legB = airborne ? 1 : -run;
    const armLift = state === 'attack' ? -3 : 0;

    this.r(g, 16, y, 17, 19, colors.ink);
    this.r(g, 13, y + 3, 6, 11, colors.ink);
    this.r(g, 31, y + 3 + armLift, 6, 12, colors.ink);
    this.r(g, 16 + legA, y + 18, 7, 16, colors.ink);
    this.r(g, 27 + legB, y + 18, 7, 16, colors.ink);

    this.r(g, 18, y + 1, 13, 15, colors.armor0);
    this.r(g, 19, y + 2, 10, 5, colors.armor2);
    this.r(g, 20, y + 8, 9, 5, colors.armor1);
    this.r(g, 20, y + 2, 5, 2, colors.armor4);
    this.r(g, 17, y + 2, 4, 6, colors.gold0);
    this.r(g, 31, y + 3 + armLift, 4, 6, colors.gold0);
    this.r(g, 18, y + 3, 2, 2, colors.gold2);
    this.r(g, 32, y + 4 + armLift, 2, 2, colors.gold2);
    this.r(g, 19, y + 14, 12, 3, colors.leather1);
    this.r(g, 23, y + 13, 4, 4, colors.gold2);
    this.r(g, 23, y + 17, 5, 9, colors.red0);
    this.r(g, 24, y + 18, 3, 5, colors.red2);
    this.r(g, 24, y + 24, 2, 3, colors.gold1);

    this.r(g, 14, y + 5, 4, 9, colors.armor1);
    this.r(g, 32, y + 5 + armLift, 4, 9, colors.armor1);
    this.r(g, 13, y + 14, 4, 3, colors.skin1);
    this.r(g, 34, y + 14 + armLift, 4, 3, colors.skin1);

    this.r(g, 17 + legA, y + 20, 5, 11, colors.armor0);
    this.r(g, 28 + legB, y + 20, 5, 11, colors.armor0);
    this.r(g, 18 + legA, y + 22, 2, 5, colors.armor2);
    this.r(g, 29 + legB, y + 22, 2, 5, colors.armor2);
    this.r(g, 15 + legA, y + 32, 10, 4, colors.ink);
    this.r(g, 26 + legB, y + 32, 10, 4, colors.ink);
    this.r(g, 16 + legA, y + 32, 8, 3, colors.boot);
    this.r(g, 27 + legB, y + 32, 8, 3, colors.boot);
    this.r(g, 20 + legA, y + 28, 2, 2, colors.gold1);
    this.r(g, 31 + legB, y + 28, 2, 2, colors.gold1);
  }

  private drawCandidateHead(
    g: Phaser.GameObjects.Graphics,
    variant: PlayerVariant,
    state: PlayerAnimationState,
    frame: number,
    bob: number,
  ) {
    const y = 5 + bob + (state === 'jump' ? -1 : 0);
    this.r(g, 17, y + 4, 15, 13, colors.ink);
    this.r(g, 18, y + 6, 12, 9, colors.skin1);
    this.r(g, 19, y + 7, 5, 2, colors.skin2);
    this.r(g, 29, y + 10, 2, 2, colors.eye);
    this.r(g, 23, y + 14, 5, 1, colors.skin0);
    this.r(g, 18, y + 16, 14, 4, colors.red0);
    this.r(g, 20, y + 16, 9, 2, colors.red1);

    if (variant === 'male') {
      this.r(g, 13, y + 2, 22, 7, colors.ink);
      this.r(g, 16, y - 1, 6, 4, colors.ink);
      this.r(g, 24, y - 2, 5, 4, colors.ink);
      this.r(g, 32, y + 3, 4, 6, colors.ink);
      this.r(g, 14, y + 3, 20, 5, colors.hair0);
      this.r(g, 17, y, 4, 3, colors.hair1);
      this.r(g, 25, y - 1, 3, 3, colors.hair1);
      this.r(g, 31, y + 4, 3, 5, colors.hair1);
      this.r(g, 19, y + 2, 6, 1, colors.hair2);
      return;
    }

    const sway = state === 'run' ? (frame % 2 === 0 ? 1 : -1) : 0;
    this.r(g, 14, y + 2, 22, 7, colors.ink);
    this.r(g, 10 + sway, y + 8, 9, 18, colors.ink);
    this.r(g, 6 + sway, y + 15, 8, 9, colors.ink);
    this.r(g, 15, y + 3, 19, 5, colors.fHair0);
    this.r(g, 11 + sway, y + 9, 7, 16, colors.fHair0);
    this.r(g, 7 + sway, y + 16, 7, 7, colors.fHair1);
    this.r(g, 18, y + 4, 10, 2, colors.fHair1);
    this.r(g, 13 + sway, y + 11, 4, 8, colors.fHair2);
    this.r(g, 11 + sway, y + 9, 3, 2, colors.gold2);
  }

  private drawCandidateSheathedSword(g: Phaser.GameObjects.Graphics, bob: number) {
    this.r(g, 32, 21 + bob, 4, 16, colors.ink);
    this.r(g, 34, 22 + bob, 1, 13, colors.metal0);
    this.r(g, 33, 23 + bob, 1, 8, colors.metal1);
    this.r(g, 31, 29 + bob, 6, 2, colors.gold1);
  }

  private drawCandidateSword(g: Phaser.GameObjects.Graphics, frame: number) {
    const x = 34 + frame * 2;
    const y = 23 - frame;
    this.r(g, x, y, 12, 5, colors.ink);
    this.r(g, x + 9, y - 3, 5, 6, colors.ink);
    this.r(g, x + 1, y + 1, 10, 2, colors.metal0);
    this.r(g, x + 2, y, 8, 1, colors.metal1);
    this.r(g, x - 3, y - 1, 6, 7, colors.gold2);
    this.r(g, x - 4, y + 6, 3, 4, colors.ink);
    this.r(g, x - 3, y + 7, 1, 1, colors.fire0);
    this.r(g, 32, 12 - frame, 16, 2, colors.fire3, 0.9);
    this.r(g, 35, 15 - frame, 14, 2, colors.fire2, 0.75);
    this.r(g, 38, 18 - frame, 10, 2, colors.fire1, 0.55);
  }

  private drawFallenKnight(g: Phaser.GameObjects.Graphics, variant: PlayerVariant, frame: number) {
    const y = 35 + frame;
    this.r(g, 8, y, 28, 9, colors.ink);
    this.r(g, 32, y - 3, 10, 7, colors.ink);
    this.r(g, 10, y + 1, 23, 6, colors.armor0);
    this.r(g, 12, y + 3, 10, 2, colors.armor2);
    this.r(g, 4, y + 2, 15, 4, colors.red0);
    this.r(g, 34, y - 2, 7, 5, colors.skin1);
    this.r(g, 31, y - 4, 11, 3, variant === 'female' ? colors.fHair1 : colors.hair1);
    this.r(g, 24, y + 3, 5, 2, colors.gold2);
  }

  private createStoneTileTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.tile)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 0, 48, 32, colors.ink);
    this.r(g, 0, 0, 48, 8, colors.moss0);
    this.r(g, 1, 0, 46, 5, colors.moss1);
    this.r(g, 5, 0, 9, 2, colors.moss2);
    this.r(g, 25, 1, 11, 2, colors.moss2);
    this.r(g, 3, 7, 42, 23, colors.stone1);
    this.r(g, 3, 22, 42, 8, colors.stone0);
    this.r(g, 5, 9, 13, 3, colors.stone3);
    this.r(g, 25, 10, 14, 3, colors.stone2);
    this.r(g, 8, 15, 2, 10, colors.stone0);
    this.r(g, 20, 13, 3, 13, colors.stone0);
    this.r(g, 34, 16, 2, 9, colors.stone0);
    this.r(g, 27, 24, 9, 2, colors.stone2);
    this.r(g, 39, 5, 3, 8, colors.moss0);
    this.r(g, 13, 4, 3, 5, colors.moss0);
    g.generateTexture(PlaceholderAssets.tile, 48, 32);
    g.destroy();
  }

  private createCoinTexture(key: string, size: number) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const o = Math.floor((size - 20) / 2);
    this.r(g, o + 4, 1, 12, 2, colors.ink);
    this.r(g, o + 2, 3, 16, 14, colors.ink);
    this.r(g, o + 4, 17, 12, 2, colors.ink);
    this.r(g, o + 4, 2, 12, 2, colors.gold0);
    this.r(g, o + 3, 4, 14, 13, colors.gold1);
    this.r(g, o + 5, 4, 9, 2, colors.gold2);
    this.r(g, o + 5, 7, 10, 8, colors.gold0);
    this.r(g, o + 8, 7, 4, 4, colors.fire3);
    this.r(g, o + 9, 8, 2, 2, colors.fire0);
    this.r(g, o + 6, 5, 2, 1, colors.fire3);
    g.generateTexture(key, size, size);
    g.destroy();
  }

  private createDragonTexture(key: string, type: 'small' | 'flying' | 'heavy') {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const width = type === 'heavy' ? 76 : type === 'flying' ? 56 : 48;
    const height = type === 'heavy' ? 52 : type === 'flying' ? 36 : 32;
    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const body = type === 'heavy' ? colors.green1 : colors.dragon2;
    const dark = type === 'heavy' ? colors.green0 : colors.dragon1;
    const wing = type === 'heavy' ? colors.green0 : type === 'flying' ? colors.dragon3 : colors.purple;
    const bodyY = type === 'flying' ? 15 : type === 'heavy' ? 23 : 17;
    const headX = width - (type === 'heavy' ? 27 : type === 'flying' ? 23 : 20);

    this.r(g, 5, bodyY, width - 28, 11, colors.ink);
    this.r(g, headX, bodyY - 7, 18, 14, colors.ink);
    this.r(g, 0, bodyY + 5, 10, 5, colors.ink);
    this.r(g, width - 13, bodyY + 9, 9, 4, colors.ink);
    this.r(g, 11, bodyY + 11, 6, 7, colors.ink);
    this.r(g, 28, bodyY + 11, 6, 7, colors.ink);
    this.r(g, 7, bodyY + 1, width - 31, 9, dark);
    this.r(g, 10, bodyY, width - 36, 7, body);
    this.r(g, headX + 2, bodyY - 6, 14, 10, dark);
    this.r(g, headX + 4, bodyY - 7, 10, 7, body);
    this.r(g, 13, bodyY + 8, width - 35, 4, colors.belly);
    this.r(g, 15, bodyY + 2, 4, 3, colors.dragon3);
    this.r(g, 24, bodyY + 3, 4, 3, type === 'heavy' ? colors.green2 : colors.dragon3);
    this.r(g, headX + 5, bodyY - 11, 3, 6, colors.gold2);
    this.r(g, headX + 11, bodyY - 12, 3, 7, colors.gold2);
    this.r(g, headX + 7, bodyY - 2, 2, 2, colors.ink);
    this.r(g, headX + 8, bodyY - 2, 1, 1, colors.fire3);
    this.r(g, headX + 13, bodyY + 2, 5, 2, colors.ink);

    this.r(g, 17, bodyY - 9, 18, 10, colors.ink);
    this.r(g, 20, bodyY - 7, 13, 7, wing);
    this.r(g, 23, bodyY - 5, 7, 3, type === 'heavy' ? colors.green2 : colors.dragon3);
    this.r(g, 12, bodyY + 16, 4, 2, colors.fire3);
    this.r(g, 29, bodyY + 16, 4, 2, colors.fire3);

    if (type === 'flying') {
      this.r(g, 27, 3, 15, 12, colors.ink);
      this.r(g, 30, 5, 10, 8, wing);
      this.r(g, width - 4, bodyY + 8, 6, 4, colors.fire2);
      this.r(g, width, bodyY + 9, 4, 3, colors.fire1);
    }

    g.generateTexture(key, width, height);
    g.destroy();
  }

  private createDragonEggTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.dragonEgg)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 7, 1, 10, 3, colors.ink);
    this.r(g, 4, 4, 16, 23, colors.ink);
    this.r(g, 6, 27, 12, 4, colors.ink);
    this.r(g, 6, 5, 12, 22, colors.dragon0);
    this.r(g, 8, 4, 10, 19, colors.fire1);
    this.r(g, 10, 4, 6, 4, colors.fire2);
    this.r(g, 8, 11, 4, 4, colors.fire2);
    this.r(g, 15, 16, 3, 5, colors.fire2);
    this.r(g, 11, 5, 2, 1, colors.fire3);
    this.r(g, 7, 13, 8, 2, colors.dragon1);
    this.r(g, 12, 14, 2, 9, colors.dragon1);
    this.r(g, 16, 8, 1, 8, colors.dragon1);
    g.generateTexture(PlaceholderAssets.dragonEgg, 24, 32);
    g.destroy();
  }

  private createTrapTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.trap)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 17, 48, 7, colors.ink);
    this.r(g, 2, 18, 44, 5, colors.stone0);
    this.r(g, 5, 18, 12, 2, colors.stone3);
    this.r(g, 29, 18, 11, 2, colors.stone2);
    for (let x = 4; x <= 34; x += 10) {
      this.r(g, x, 7, 7, 11, colors.ink);
      this.r(g, x + 2, 3, 4, 5, colors.ink);
      this.r(g, x + 3, 4, 2, 7, colors.fire3);
      this.r(g, x + 2, 10, 4, 7, colors.belly);
      this.r(g, x + 3, 15, 2, 3, colors.fire0);
    }
    g.generateTexture(PlaceholderAssets.trap, 48, 24);
    g.destroy();
  }

  private createBonfireTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.bonfire)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 4, 31, 32, 7, colors.ink);
    this.r(g, 10, 27, 21, 7, colors.ink);
    this.r(g, 6, 32, 28, 5, colors.stone0);
    this.r(g, 8, 29, 9, 4, colors.stone3);
    this.r(g, 25, 29, 9, 4, colors.stone2);
    this.r(g, 12, 28, 18, 3, colors.leather0);
    this.r(g, 18, 23, 3, 9, colors.leather1);
    this.r(g, 14, 7, 14, 22, colors.ink);
    this.r(g, 10, 16, 20, 12, colors.ink);
    this.r(g, 16, 8, 10, 20, colors.fire0);
    this.r(g, 12, 18, 16, 9, colors.fire0);
    this.r(g, 18, 10, 6, 18, colors.fire1);
    this.r(g, 15, 20, 9, 6, colors.fire1);
    this.r(g, 19, 17, 4, 10, colors.fire2);
    this.r(g, 20, 22, 2, 5, colors.fire3);
    this.r(g, 7, 11, 3, 7, colors.fire1);
    this.r(g, 33, 10, 3, 7, colors.fire1);
    g.generateTexture(PlaceholderAssets.bonfire, 40, 40);
    g.destroy();
  }

  private createFinishGateTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.finishGate)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 4, 15, 11, 45, colors.ink);
    this.r(g, 41, 15, 11, 45, colors.ink);
    this.r(g, 4, 11, 48, 11, colors.ink);
    this.r(g, 18, 4, 20, 12, colors.ink);
    this.r(g, 6, 17, 8, 41, colors.stone0);
    this.r(g, 42, 17, 8, 41, colors.stone0);
    this.r(g, 7, 13, 42, 7, colors.stone1);
    this.r(g, 10, 12, 12, 3, colors.moss1);
    this.r(g, 35, 12, 11, 3, colors.moss1);
    this.r(g, 24, 5, 7, 10, colors.gold2);
    this.r(g, 26, 8, 2, 4, colors.fire1);
    this.r(g, 20, 22, 16, 36, colors.leather0);
    this.r(g, 22, 24, 12, 32, colors.leather1);
    this.r(g, 27, 25, 2, 29, colors.ink);
    this.r(g, 32, 41, 3, 4, colors.gold2);
    this.r(g, 8, 28, 3, 10, colors.moss0);
    g.generateTexture(PlaceholderAssets.finishGate, 56, 64);
    g.destroy();
  }

  private createUiTextures() {
    this.createPanelTexture();
    this.createButtonTexture(PlaceholderAssets.uiButtonStone);
    this.createButtonTexture(PlaceholderAssets.uiButtonWood);
    this.createIconButtonTexture();
    this.createHeartTexture(PlaceholderAssets.heartFull, true);
    this.createHeartTexture(PlaceholderAssets.heartEmpty, false);
    this.createSelectionFrameTexture();
  }

  private createPanelTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.uiPanel)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 0, 180, 128, colors.ink);
    this.r(g, 5, 5, 170, 118, colors.stone0);
    this.r(g, 10, 10, 160, 108, 0x82c969);
    for (let x = 13; x < 168; x += 8) {
      for (let y = 14; y < 116; y += 8) {
        this.r(g, x, y, 2, 2, colors.moss0, 0.5);
      }
    }
    for (let x = 2; x < 176; x += 18) {
      this.r(g, x, 0, 14, 7, colors.stone3);
      this.r(g, x + 2, 121, 14, 7, colors.stone3);
      this.r(g, x + 5, 6, 10, 4, colors.stone0);
    }
    for (let y = 10; y < 116; y += 20) {
      this.r(g, 0, y, 8, 15, colors.stone3);
      this.r(g, 172, y + 4, 8, 15, colors.stone3);
    }
    this.r(g, 18, 5, 4, 13, colors.moss0);
    this.r(g, 152, 5, 4, 17, colors.moss0);
    g.generateTexture(PlaceholderAssets.uiPanel, 180, 128);
    g.destroy();
  }

  private createButtonTexture(key: string) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 4, 0, 146, 3, colors.ink);
    this.r(g, 1, 3, 152, 29, colors.ink);
    this.r(g, 4, 32, 146, 4, colors.ink);
    this.r(g, 5, 4, 144, 25, colors.uiBlue1);
    this.r(g, 7, 5, 140, 6, colors.uiBlue2);
    this.r(g, 7, 25, 140, 5, colors.uiBlue0);
    this.r(g, 12, 13, 28, 2, colors.uiBlue2, 0.6);
    this.r(g, 112, 12, 23, 2, colors.uiBlue0, 0.55);
    g.generateTexture(key, 154, 36);
    g.destroy();
  }

  private createIconButtonTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.uiIconButton)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 3, 0, 34, 3, colors.ink);
    this.r(g, 0, 3, 40, 32, colors.ink);
    this.r(g, 4, 4, 32, 27, colors.uiBlue1);
    this.r(g, 6, 5, 28, 6, colors.uiBlue2);
    this.r(g, 6, 27, 28, 4, colors.uiBlue0);
    g.generateTexture(PlaceholderAssets.uiIconButton, 40, 36);
    g.destroy();
  }

  private createHeartTexture(key: string, full: boolean) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const a = full ? colors.fire0 : colors.uiBlue0;
    const b = full ? colors.red0 : colors.stone0;
    this.r(g, 2, 2, 4, 3, colors.ink);
    this.r(g, 9, 2, 4, 3, colors.ink);
    this.r(g, 1, 5, 13, 5, colors.ink);
    this.r(g, 3, 10, 9, 3, colors.ink);
    this.r(g, 5, 13, 5, 2, colors.ink);
    this.r(g, 3, 3, 3, 3, a);
    this.r(g, 9, 3, 3, 3, a);
    this.r(g, 2, 6, 11, 4, a);
    this.r(g, 4, 10, 7, 2, b);
    this.r(g, 6, 12, 3, 1, b);
    if (full) {
      this.r(g, 4, 4, 2, 1, colors.fire3);
    }
    g.generateTexture(key, 16, 16);
    g.destroy();
  }

  private createSelectionFrameTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.selectionFrame)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 0, 72, 4, colors.gold2);
    this.r(g, 0, 0, 4, 72, colors.gold2);
    this.r(g, 68, 0, 4, 72, colors.gold0);
    this.r(g, 0, 68, 72, 4, colors.gold0);
    this.r(g, 4, 4, 64, 3, colors.ink);
    this.r(g, 4, 65, 64, 3, colors.ink);
    g.generateTexture(PlaceholderAssets.selectionFrame, 72, 72);
    g.destroy();
  }

  private createVfxTextures() {
    this.createSlashVfx();
    this.createDustVfx();
    this.createJumpBurstVfx();
    this.createCoinPickupVfx();
    this.createDamageVfx();
    this.createCheckpointBurstVfx();
    this.createDeathBurstVfx();
  }

  private createSlashVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.slash)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 2, 11, 34, 3, colors.fire3, 0.9);
    this.r(g, 9, 7, 29, 3, colors.fire2, 0.8);
    this.r(g, 16, 15, 22, 2, colors.fire1, 0.65);
    g.generateTexture(PlaceholderAssets.slash, 42, 22);
    g.destroy();
  }

  private createDustVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.dust)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 2, 9, 5, 3, 0xc2b8a3, 0.85);
    this.r(g, 10, 7, 7, 4, 0xe1d6bd, 0.75);
    this.r(g, 20, 9, 4, 3, 0xc2b8a3, 0.8);
    this.r(g, 6, 12, 14, 2, 0x8b7e6c, 0.75);
    g.generateTexture(PlaceholderAssets.dust, 28, 18);
    g.destroy();
  }

  private createJumpBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.jumpBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 12, 2, 3, 8, colors.fire2, 0.9);
    this.r(g, 4, 12, 8, 3, colors.fire2, 0.85);
    this.r(g, 19, 12, 8, 3, colors.fire1, 0.85);
    this.r(g, 8, 8, 3, 3, colors.fire3, 0.75);
    g.generateTexture(PlaceholderAssets.jumpBurst, 30, 22);
    g.destroy();
  }

  private createCoinPickupVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.coinPickup)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 11, 1, 2, 5, colors.gold2);
    this.r(g, 11, 18, 2, 5, colors.gold2);
    this.r(g, 1, 11, 5, 2, colors.gold2);
    this.r(g, 18, 11, 5, 2, colors.gold2);
    this.r(g, 5, 5, 2, 2, colors.fire3);
    this.r(g, 17, 17, 2, 2, colors.fire2);
    g.generateTexture(PlaceholderAssets.coinPickup, 24, 24);
    g.destroy();
  }

  private createDamageVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.damage)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 10, 2, 3, 8, 0xfff1f2, 0.85);
    this.r(g, 5, 8, 13, 3, 0xfff1f2, 0.85);
    this.r(g, 2, 3, 4, 4, 0xef2626, 0.85);
    this.r(g, 18, 13, 4, 4, 0xef2626, 0.85);
    g.generateTexture(PlaceholderAssets.damage, 24, 22);
    g.destroy();
  }

  private createCheckpointBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.checkpointBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 15, 0, 3, 9, colors.fire2, 0.9);
    this.r(g, 15, 25, 3, 9, colors.fire2, 0.9);
    this.r(g, 0, 15, 9, 3, colors.fire2, 0.9);
    this.r(g, 25, 15, 9, 3, colors.fire2, 0.9);
    this.r(g, 7, 7, 4, 4, colors.fire1, 0.75);
    this.r(g, 23, 23, 4, 4, colors.fire1, 0.75);
    g.generateTexture(PlaceholderAssets.checkpointBurst, 34, 34);
    g.destroy();
  }

  private createDeathBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.deathBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 3, 12, 8, 3, colors.red0, 0.9);
    this.r(g, 20, 7, 5, 5, colors.armor3, 0.8);
    this.r(g, 12, 5, 4, 4, colors.gold2, 0.9);
    this.r(g, 18, 17, 5, 3, colors.armor2, 0.8);
    this.r(g, 8, 3, 2, 2, colors.fire2, 0.9);
    g.generateTexture(PlaceholderAssets.deathBurst, 30, 24);
    g.destroy();
  }
}
