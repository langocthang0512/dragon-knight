import Phaser from 'phaser';
import { PlayerAnimationState, PlayerVariant } from '../entities/player/playerTypes';

export const PlaceholderAssets = {
  player: 'placeholder-player',
  enemy: 'placeholder-enemy',
  dragonSmall: 'dragon-small-v2',
  dragonFlying: 'dragon-flying-v2',
  dragonHeavy: 'dragon-heavy-v2',
  dragonEgg: 'dragon-egg-v2',
  coin: 'coin-dragon-crest-v2',
  coinHud: 'coin-hud-v2',
  tile: 'moss-stone-tile-v2',
  trap: 'spike-trap-v2',
  bonfire: 'bonfire-checkpoint-v2',
  finishGate: 'finish-gate-v2',
  slash: 'vfx-slash-v2',
  dust: 'vfx-dust-v2',
  jumpBurst: 'vfx-jump-burst-v2',
  coinPickup: 'vfx-coin-pickup-v2',
  damage: 'vfx-damage-v2',
  checkpointBurst: 'vfx-checkpoint-burst-v2',
  deathBurst: 'vfx-death-burst-v2',
  uiPanel: 'ui-panel-stone-v2',
  uiButtonStone: 'ui-button-stone-v2',
  uiButtonWood: 'ui-button-wood-v2',
  uiIconButton: 'ui-icon-button-v2',
  heartFull: 'heart-full-v2',
  heartEmpty: 'heart-empty-v2',
  selectionFrame: 'selection-frame-v2',
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
  jump: 2,
  doubleJump: 3,
  fall: 2,
  attack: 5,
  hit: 2,
  death: 3,
};

const PLAYER_W = 64;
const PLAYER_H = 56;

const colors = {
  ink: 0x050509,
  outline: 0x111018,
  shadow: 0x17131b,
  armorDeep: 0x151b24,
  armor: 0x243243,
  armorBlue: 0x35506b,
  armorLight: 0x9fb1b8,
  leatherDark: 0x3a1d15,
  leather: 0x7b3b1f,
  boot: 0x9b4d21,
  scarfDeep: 0x6e1517,
  scarf: 0xb52122,
  scarfHi: 0xf04b24,
  goldDark: 0x8c4b12,
  gold: 0xd59a26,
  goldLight: 0xffdf57,
  skinDark: 0xa85f43,
  skin: 0xefb489,
  skinLight: 0xffd5a2,
  eye: 0x11937b,
  maleHairDark: 0x17100e,
  maleHair: 0x2a1b17,
  femaleHairDark: 0x7d1b22,
  femaleHair: 0xd33a2c,
  femaleHairHi: 0xf06f3d,
  stoneInk: 0x16282c,
  stoneDark: 0x27434a,
  stone: 0x43676b,
  stoneLight: 0x90a98f,
  mossDark: 0x255c35,
  moss: 0x69a744,
  mossLight: 0xb2d85a,
  fireRed: 0xd91f19,
  fireOrange: 0xff6b1a,
  fireYellow: 0xffcf3d,
  fireWhite: 0xfff2b8,
  dragonRedDeep: 0x681418,
  dragonRedDark: 0x9f1b1d,
  dragonRed: 0xe72b1f,
  dragonOrange: 0xff6720,
  dragonBelly: 0xf2bf6a,
  dragonPurple: 0x663064,
  dragonGreenDark: 0x075145,
  dragonGreen: 0x0c8468,
  dragonGreenHi: 0x5dc56e,
  metalBlue: 0x91d4f1,
  metalWhite: 0xf8fbff,
  uiBlueDark: 0x384c67,
  uiBlue: 0x8ba7b9,
  uiBlueHi: 0xc7d6de,
  uiWoodDark: 0x71411f,
  uiWood: 0xbe7a3d,
  uiWoodHi: 0xe0ae72,
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
          frameRate: state === 'run' ? 12 : state === 'attack' ? 18 : state === 'death' ? 4 : 7,
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
    const idleBob = state === 'idle' && frame % 2 === 1 ? 1 : 0;
    const run = [-3, -1, 2, 3, 1, -2][frame] ?? 0;
    const airborne = state === 'jump' || state === 'doubleJump' || state === 'fall';

    if (state === 'death') {
      this.drawFallenKnight(g, variant, frame);
      g.generateTexture(key, PLAYER_W, PLAYER_H);
      g.destroy();
      return;
    }

    this.drawCape(g, state, frame, idleBob);
    this.drawKnightBody(g, state, run, idleBob, airborne);
    this.drawKnightHead(g, variant, state, frame, idleBob);

    if (state === 'attack') {
      this.drawHeldSwordAndSlash(g, frame);
    } else {
      this.drawSheathedSword(g, idleBob);
    }

    if (state === 'hit') {
      this.r(g, 14, 8, 28, 34, 0xfff1f2, 0.55);
      this.r(g, 9, 15, 4, 3, 0xff2d2d);
      this.r(g, 46, 26, 4, 3, 0xff2d2d);
    }

    if (state === 'doubleJump') {
      this.r(g, 19, 45, 5, 2, colors.fireYellow, 0.9);
      this.r(g, 31, 46, 8, 2, colors.fireOrange, 0.85);
      this.r(g, 26, 49, 4, 2, colors.fireWhite, 0.85);
    }

    g.generateTexture(key, PLAYER_W, PLAYER_H);
    g.destroy();
  }

  private drawCape(g: Phaser.GameObjects.Graphics, state: PlayerAnimationState, frame: number, idleBob: number) {
    const y = 20 + idleBob;
    const wind = state === 'run' ? [-1, 0, 2, 3, 1, 0][frame] : state === 'fall' ? -2 : 0;
    this.r(g, 4, y + 1, 23, 10, colors.ink);
    this.r(g, 2, y + 9 + wind, 22, 11, colors.ink);
    this.r(g, 1, y + 19 + wind, 14, 6, colors.ink);
    this.r(g, 6, y + 2, 20, 8, colors.scarfDeep);
    this.r(g, 4, y + 10 + wind, 18, 9, colors.scarf);
    this.r(g, 2, y + 19 + wind, 12, 4, colors.scarfDeep);
    this.r(g, 8, y + 4, 11, 2, colors.scarfHi);
    this.r(g, 6, y + 12 + wind, 10, 2, colors.scarfHi);
    this.r(g, 18, y + 10 + wind, 3, 7, colors.shadow);
  }

  private drawKnightBody(
    g: Phaser.GameObjects.Graphics,
    state: PlayerAnimationState,
    run: number,
    idleBob: number,
    airborne: boolean,
  ) {
    const y = 19 + idleBob + (state === 'fall' ? 1 : 0);
    const legA = airborne ? -2 : run;
    const legB = airborne ? 2 : -run;
    const attackArm = state === 'attack' ? -4 : 0;

    this.r(g, 22, y - 2, 22, 22, colors.ink);
    this.r(g, 18, y + 1, 8, 14, colors.ink);
    this.r(g, 42, y + 1 + attackArm, 8, 15, colors.ink);
    this.r(g, 22 + legA, y + 19, 9, 17, colors.ink);
    this.r(g, 36 + legB, y + 19, 9, 17, colors.ink);

    this.r(g, 24, y, 18, 17, colors.armorDeep);
    this.r(g, 25, y + 2, 15, 6, colors.armorBlue);
    this.r(g, 26, y + 9, 14, 6, colors.armor);
    this.r(g, 27, y + 2, 8, 2, colors.armorLight);
    this.r(g, 39, y + 5, 2, 6, colors.armorLight);
    this.r(g, 29, y + 16, 10, 3, colors.leatherDark);
    this.r(g, 23, y + 1, 5, 7, colors.goldDark);
    this.r(g, 42, y + 1 + attackArm, 5, 7, colors.goldDark);
    this.r(g, 24, y + 2, 3, 3, colors.goldLight);
    this.r(g, 43, y + 2 + attackArm, 3, 3, colors.goldLight);

    this.r(g, 27, y + 15, 16, 4, colors.leather);
    this.r(g, 31, y + 14, 6, 5, colors.goldLight);
    this.r(g, 32, y + 15, 3, 2, colors.goldDark);
    this.r(g, 31, y + 19, 7, 11, colors.scarfDeep);
    this.r(g, 33, y + 20, 4, 6, colors.scarf);
    this.r(g, 34, y + 27, 2, 3, colors.goldLight);

    this.r(g, 19, y + 4, 5, 12, colors.armor);
    this.r(g, 44, y + 4 + attackArm, 5, 12, colors.armor);
    this.r(g, 18, y + 15, 5, 4, colors.skin);
    this.r(g, 46, y + 15 + attackArm, 5, 4, colors.skin);

    this.r(g, 23 + legA, y + 21, 6, 12, colors.armorDeep);
    this.r(g, 37 + legB, y + 21, 6, 12, colors.armorDeep);
    this.r(g, 25 + legA, y + 23, 3, 6, colors.armorBlue);
    this.r(g, 39 + legB, y + 23, 3, 6, colors.armorBlue);
    this.r(g, 20 + legA, y + 34, 12, 4, colors.ink);
    this.r(g, 34 + legB, y + 34, 12, 4, colors.ink);
    this.r(g, 21 + legA, y + 34, 10, 3, colors.boot);
    this.r(g, 35 + legB, y + 34, 10, 3, colors.boot);
    this.r(g, 26 + legA, y + 29, 3, 3, colors.gold);
    this.r(g, 40 + legB, y + 29, 3, 3, colors.gold);
  }

  private drawKnightHead(
    g: Phaser.GameObjects.Graphics,
    variant: PlayerVariant,
    state: PlayerAnimationState,
    frame: number,
    idleBob: number,
  ) {
    const y = 8 + idleBob + (state === 'jump' ? -1 : 0);
    this.r(g, 23, y + 2, 20, 16, colors.ink);
    this.r(g, 25, y + 4, 16, 12, colors.skin);
    this.r(g, 26, y + 5, 6, 3, colors.skinLight);
    this.r(g, 38, y + 9, 3, 3, colors.eye);
    this.r(g, 30, y + 14, 6, 1, colors.skinDark);
    this.r(g, 25, y + 16, 17, 4, colors.scarfDeep);
    this.r(g, 27, y + 16, 12, 2, colors.scarf);

    if (variant === 'male') {
      this.r(g, 19, y, 26, 8, colors.ink);
      this.r(g, 22, y - 3, 7, 5, colors.ink);
      this.r(g, 30, y - 4, 5, 5, colors.ink);
      this.r(g, 39, y + 1, 5, 8, colors.ink);
      this.r(g, 20, y + 1, 24, 6, colors.maleHairDark);
      this.r(g, 23, y - 2, 5, 4, colors.maleHair);
      this.r(g, 31, y - 3, 4, 4, colors.maleHair);
      this.r(g, 39, y + 3, 4, 6, colors.maleHair);
      this.r(g, 25, y, 8, 2, 0x4a3024);
      return;
    }

    const sway = state === 'run' ? (frame % 2 === 0 ? 1 : -1) : state === 'fall' ? -2 : 0;
    this.r(g, 20, y, 26, 8, colors.ink);
    this.r(g, 13 + sway, y + 5, 12, 21, colors.ink);
    this.r(g, 8 + sway, y + 13, 10, 11, colors.ink);
    this.r(g, 21, y + 1, 23, 6, colors.femaleHairDark);
    this.r(g, 14 + sway, y + 6, 10, 19, colors.femaleHairDark);
    this.r(g, 9 + sway, y + 14, 9, 8, colors.femaleHair);
    this.r(g, 24, y + 2, 13, 3, colors.femaleHair);
    this.r(g, 16 + sway, y + 8, 5, 10, colors.femaleHairHi);
    this.r(g, 13 + sway, y + 6, 4, 3, colors.goldLight);
  }

  private drawSheathedSword(g: Phaser.GameObjects.Graphics, idleBob: number) {
    this.r(g, 42, 21 + idleBob, 5, 19, colors.ink);
    this.r(g, 44, 22 + idleBob, 2, 15, colors.metalBlue);
    this.r(g, 43, 23 + idleBob, 1, 12, colors.metalWhite);
    this.r(g, 40, 30 + idleBob, 8, 3, colors.gold);
    this.r(g, 46, 39 + idleBob, 3, 4, colors.goldLight);
  }

  private drawHeldSwordAndSlash(g: Phaser.GameObjects.Graphics, frame: number) {
    const reach = frame * 5;
    const y = 22 - frame;
    this.r(g, 45, y, 16 + reach, 6, colors.ink);
    this.r(g, 60 + reach, y - 2, 4, 9, colors.ink);
    this.r(g, 47, y + 1, 13 + reach, 3, colors.metalBlue);
    this.r(g, 48, y, 11 + reach, 2, colors.metalWhite);
    this.r(g, 42, y - 1, 7, 8, colors.goldLight);
    this.r(g, 42, y + 2, 7, 3, colors.goldDark);
    this.r(g, 40, y + 3, 4, 5, colors.leather);
    this.r(g, 39, y + 7, 4, 4, colors.ink);
    this.r(g, 40, y + 8, 2, 2, colors.fireRed);
    this.r(g, 43, 10 - frame, 30 + reach, 3, colors.fireWhite, 0.9);
    this.r(g, 48, 14 - frame, 29 + reach, 3, colors.fireYellow, 0.8);
    this.r(g, 54, 18 - frame, 22 + reach, 3, colors.fireOrange, 0.62);
    this.r(g, 66 + reach, 12 - frame, 5, 2, colors.fireWhite, 0.8);
  }

  private drawFallenKnight(g: Phaser.GameObjects.Graphics, variant: PlayerVariant, frame: number) {
    const y = 35 + frame;
    this.r(g, 9, y + 2, 36, 12, colors.ink);
    this.r(g, 43, y - 2, 13, 9, colors.ink);
    this.r(g, 11, y + 3, 30, 9, colors.armorDeep);
    this.r(g, 15, y + 5, 13, 3, colors.armorBlue);
    this.r(g, 3, y + 4, 20, 5, colors.scarfDeep);
    this.r(g, 5, y + 5, 12, 2, colors.scarf);
    this.r(g, 45, y, 9, 6, colors.skin);
    this.r(g, 41, y - 3, 15, 4, variant === 'female' ? colors.femaleHair : colors.maleHair);
    this.r(g, 30, y + 5, 7, 3, colors.goldLight);
    this.r(g, 51, y + 5, 4, 1, colors.scarf);
  }

  private createStoneTileTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.tile)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 0, 48, 32, colors.ink);
    this.r(g, 0, 0, 48, 8, colors.mossDark);
    this.r(g, 1, 0, 46, 5, colors.moss);
    this.r(g, 5, 0, 10, 2, colors.mossLight);
    this.r(g, 24, 1, 13, 2, colors.mossLight);
    this.r(g, 3, 6, 42, 24, colors.stone);
    this.r(g, 3, 22, 42, 8, colors.stoneDark);
    this.r(g, 5, 8, 15, 3, colors.stoneLight);
    this.r(g, 26, 9, 16, 3, colors.stoneLight);
    this.r(g, 4, 18, 10, 2, colors.stoneInk);
    this.r(g, 17, 13, 3, 10, colors.stoneInk);
    this.r(g, 32, 15, 3, 8, colors.stoneInk);
    this.r(g, 25, 24, 12, 2, colors.stoneInk);
    this.r(g, 8, 12, 4, 2, colors.mossDark);
    this.r(g, 39, 5, 3, 8, colors.mossDark);
    this.r(g, 14, 4, 3, 5, colors.mossDark);
    this.r(g, 22, 18, 4, 2, colors.goldDark, 0.35);
    g.generateTexture(PlaceholderAssets.tile, 48, 32);
    g.destroy();
  }

  private createCoinTexture(key: string, size: number) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const o = size === 20 ? 1 : 2;
    this.r(g, o + 4, 1, 10, 2, colors.ink);
    this.r(g, o + 2, 3, 14, 14, colors.ink);
    this.r(g, o + 4, 17, 10, 2, colors.ink);
    this.r(g, o + 4, 2, 10, 2, colors.goldDark);
    this.r(g, o + 3, 4, 12, 13, colors.gold);
    this.r(g, o + 5, 4, 8, 2, colors.goldLight);
    this.r(g, o + 4, 7, 3, 5, colors.goldLight);
    this.r(g, o + 12, 6, 2, 8, colors.goldDark);
    this.r(g, o + 7, 7, 6, 1, colors.goldDark);
    this.r(g, o + 8, 8, 5, 1, colors.goldDark);
    this.r(g, o + 7, 9, 3, 3, colors.goldDark);
    this.r(g, o + 10, 12, 4, 1, colors.goldDark);
    this.r(g, o + 6, 5, 2, 1, colors.fireWhite);
    this.r(g, o + 9, 14, 3, 1, colors.goldLight);
    g.generateTexture(key, size, size);
    g.destroy();
  }

  private createDragonTexture(key: string, type: 'small' | 'flying' | 'heavy') {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const width = type === 'heavy' ? 82 : type === 'flying' ? 78 : 62;
    const height = type === 'heavy' ? 52 : type === 'flying' ? 50 : 40;
    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const body = type === 'heavy' ? colors.dragonGreen : colors.dragonRed;
    const dark = type === 'heavy' ? colors.dragonGreenDark : colors.dragonRedDark;
    const deep = type === 'heavy' ? 0x032f2d : colors.dragonRedDeep;
    const wing = type === 'heavy' ? 0x0f6658 : type === 'flying' ? 0xc2471d : colors.dragonPurple;

    this.r(g, 5, 20, width - 29, 15, colors.ink);
    this.r(g, width - 28, 12, 22, 17, colors.ink);
    this.r(g, 0, 26, 12, 6, colors.ink);
    this.r(g, width - 15, 30, 12, 5, colors.ink);
    this.r(g, width - 7, 32, 5, 4, colors.ink);
    this.r(g, 14, 34, 8, 8, colors.ink);
    this.r(g, 34, 34, 8, 8, colors.ink);
    if (type !== 'small') {
      this.r(g, 20, 6, 28, 17, colors.ink);
      this.r(g, 33, 2, 10, 11, colors.ink);
    }

    this.r(g, 7, 21, width - 33, 13, deep);
    this.r(g, 10, 20, width - 38, 10, body);
    this.r(g, width - 26, 14, 18, 14, dark);
    this.r(g, width - 23, 13, 14, 10, body);
    this.r(g, width - 21, 23, 12, 3, colors.dragonBelly);
    this.r(g, 15, 30, width - 39, 5, colors.dragonBelly);
    this.r(g, 17, 23, 5, 4, colors.dragonOrange);
    this.r(g, 27, 24, 5, 4, colors.dragonOrange);
    this.r(g, 38, 23, 5, 4, type === 'heavy' ? colors.dragonGreenHi : colors.dragonOrange);
    this.r(g, width - 20, 9, 4, 7, colors.goldLight);
    this.r(g, width - 12, 7, 4, 8, colors.goldLight);
    this.r(g, width - 27, 10, 3, 6, colors.gold);
    this.r(g, width - 18, 18, 2, 3, colors.ink);
    this.r(g, width - 17, 18, 1, 1, colors.fireWhite);
    this.r(g, width - 10, 23, 6, 2, colors.ink);

    this.r(g, 19, type === 'flying' ? 6 : 10, 22, 12, colors.ink);
    this.r(g, 34, type === 'flying' ? 3 : 9, 20, 17, colors.ink);
    this.r(g, 21, type === 'flying' ? 8 : 12, 19, 9, wing);
    this.r(g, 36, type === 'flying' ? 5 : 11, 16, 12, wing);
    this.r(g, 24, type === 'flying' ? 10 : 14, 11, 4, type === 'heavy' ? colors.dragonGreenHi : colors.dragonOrange);
    this.r(g, 39, type === 'flying' ? 8 : 13, 9, 5, type === 'heavy' ? colors.mossLight : colors.dragonOrange);
    this.r(g, 14, 38, 6, 3, colors.fireWhite);
    this.r(g, 35, 38, 6, 3, colors.fireWhite);

    if (type === 'flying') {
      this.r(g, width - 4, 30, 7, 5, colors.fireYellow);
      this.r(g, width + 1, 31, 5, 3, colors.fireOrange);
    }

    g.generateTexture(key, width, height);
    g.destroy();
  }

  private createDragonEggTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.dragonEgg)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 9, 1, 12, 3, colors.ink);
    this.r(g, 5, 4, 20, 23, colors.ink);
    this.r(g, 7, 27, 16, 4, colors.ink);
    this.r(g, 7, 5, 16, 22, colors.dragonRedDeep);
    this.r(g, 9, 4, 13, 20, colors.dragonOrange);
    this.r(g, 12, 4, 7, 4, colors.fireYellow);
    this.r(g, 10, 10, 4, 4, colors.fireYellow);
    this.r(g, 18, 15, 4, 5, colors.fireYellow);
    this.r(g, 13, 5, 3, 1, colors.fireWhite);
    this.r(g, 8, 13, 9, 2, colors.dragonRedDark);
    this.r(g, 13, 14, 2, 9, colors.dragonRedDark);
    this.r(g, 18, 8, 2, 8, colors.dragonRedDark);
    this.r(g, 15, 23, 5, 2, colors.goldLight);
    g.generateTexture(PlaceholderAssets.dragonEgg, 30, 32);
    g.destroy();
  }

  private createTrapTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.trap)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 20, 54, 10, colors.ink);
    this.r(g, 2, 22, 50, 7, colors.stoneDark);
    this.r(g, 5, 22, 14, 3, colors.stoneLight);
    this.r(g, 33, 22, 13, 3, colors.stone);
    for (let x = 4; x <= 43; x += 10) {
      this.r(g, x, 6, 8, 15, colors.ink);
      this.r(g, x + 1, 3, 6, 5, colors.ink);
      this.r(g, x + 3, 4, 3, 8, colors.fireWhite);
      this.r(g, x + 2, 11, 5, 8, colors.dragonBelly);
      this.r(g, x + 3, 16, 3, 4, colors.fireRed);
      this.r(g, x + 5, 8, 2, 7, colors.goldDark);
    }
    g.generateTexture(PlaceholderAssets.trap, 54, 30);
    g.destroy();
  }

  private createBonfireTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.bonfire)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 5, 38, 40, 9, colors.ink);
    this.r(g, 12, 33, 27, 8, colors.ink);
    this.r(g, 7, 39, 36, 6, colors.stoneDark);
    this.r(g, 9, 36, 12, 5, colors.stoneLight);
    this.r(g, 30, 35, 12, 6, colors.stone);
    this.r(g, 15, 34, 22, 4, colors.leatherDark);
    this.r(g, 23, 28, 4, 12, colors.leather);
    this.r(g, 18, 8, 17, 26, colors.ink);
    this.r(g, 13, 19, 24, 14, colors.ink);
    this.r(g, 20, 9, 13, 24, colors.fireRed);
    this.r(g, 15, 20, 20, 11, colors.fireRed);
    this.r(g, 22, 11, 8, 21, colors.fireOrange);
    this.r(g, 18, 23, 13, 7, colors.fireOrange);
    this.r(g, 24, 19, 5, 12, colors.fireYellow);
    this.r(g, 25, 24, 3, 6, colors.fireWhite);
    this.r(g, 10, 13, 4, 10, colors.fireOrange);
    this.r(g, 39, 11, 4, 9, colors.fireOrange);
    this.r(g, 34, 5, 3, 7, colors.fireYellow);
    g.generateTexture(PlaceholderAssets.bonfire, 50, 48);
    g.destroy();
  }

  private createFinishGateTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.finishGate)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 5, 14, 13, 45, colors.ink);
    this.r(g, 43, 14, 13, 45, colors.ink);
    this.r(g, 5, 10, 51, 12, colors.ink);
    this.r(g, 20, 2, 22, 14, colors.ink);
    this.r(g, 8, 16, 9, 41, colors.stoneDark);
    this.r(g, 44, 16, 9, 41, colors.stoneDark);
    this.r(g, 8, 12, 45, 8, colors.stone);
    this.r(g, 11, 17, 6, 12, colors.stone);
    this.r(g, 46, 17, 6, 12, colors.stone);
    this.r(g, 12, 11, 15, 3, colors.moss);
    this.r(g, 38, 11, 13, 3, colors.moss);
    this.r(g, 11, 25, 3, 11, colors.mossDark);
    this.r(g, 27, 3, 8, 12, colors.goldLight);
    this.r(g, 30, 6, 3, 5, colors.fireOrange);
    this.r(g, 22, 20, 20, 38, colors.leatherDark);
    this.r(g, 24, 22, 16, 34, colors.leather);
    this.r(g, 31, 24, 2, 30, colors.ink);
    this.r(g, 36, 39, 3, 4, colors.goldLight);
    g.generateTexture(PlaceholderAssets.finishGate, 62, 62);
    g.destroy();
  }

  private createUiTextures() {
    this.createPanelTexture();
    this.createButtonTexture(PlaceholderAssets.uiButtonStone, 'stone');
    this.createButtonTexture(PlaceholderAssets.uiButtonWood, 'wood');
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
    this.r(g, 5, 5, 170, 118, colors.stoneDark);
    this.r(g, 10, 10, 160, 108, 0x77b95a);
    this.r(g, 10, 10, 160, 108, 0x8ed765, 0.55);
    for (let x = 12; x < 168; x += 8) {
      for (let y = 13; y < 116; y += 8) {
        this.r(g, x, y, 2, 2, colors.mossDark, 0.5);
      }
    }
    for (let x = 2; x < 176; x += 18) {
      this.r(g, x, 0, 14, 7, colors.stoneLight);
      this.r(g, x + 2, 121, 14, 7, colors.stoneLight);
      this.r(g, x + 5, 6, 10, 4, colors.stoneDark);
    }
    for (let y = 10; y < 116; y += 20) {
      this.r(g, 0, y, 8, 15, colors.stoneLight);
      this.r(g, 172, y + 4, 8, 15, colors.stoneLight);
      this.r(g, 3, y + 4, 4, 10, colors.stoneDark);
    }
    this.r(g, 18, 5, 4, 12, colors.mossDark);
    this.r(g, 152, 5, 4, 16, colors.mossDark);
    g.generateTexture(PlaceholderAssets.uiPanel, 180, 128);
    g.destroy();
  }

  private createButtonTexture(key: string, type: 'stone' | 'wood') {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const w = type === 'stone' ? 154 : 146;
    const h = type === 'stone' ? 36 : 30;
    const dark = type === 'stone' ? colors.uiBlueDark : colors.uiWoodDark;
    const mid = type === 'stone' ? colors.uiBlue : colors.uiWood;
    const hi = type === 'stone' ? colors.uiBlueHi : colors.uiWoodHi;
    this.r(g, 4, 0, w - 8, 3, colors.ink);
    this.r(g, 1, 3, w - 2, h - 7, colors.ink);
    this.r(g, 4, h - 4, w - 8, 4, colors.ink);
    this.r(g, 5, 4, w - 10, h - 10, mid);
    this.r(g, 7, 5, w - 14, 6, hi);
    this.r(g, 7, h - 11, w - 14, 5, dark);
    this.r(g, 12, 12, 28, 2, hi, 0.55);
    this.r(g, w - 38, 10, 23, 2, dark, 0.55);
    if (type === 'wood') {
      this.r(g, 12, 9, w - 24, 2, colors.uiWoodDark, 0.45);
      this.r(g, 18, 19, w - 40, 2, colors.uiWoodDark, 0.35);
    }
    g.generateTexture(key, w, h);
    g.destroy();
  }

  private createIconButtonTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.uiIconButton)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 3, 0, 34, 3, colors.ink);
    this.r(g, 0, 3, 40, 32, colors.ink);
    this.r(g, 4, 4, 32, 27, colors.uiBlue);
    this.r(g, 6, 5, 28, 6, colors.uiBlueHi);
    this.r(g, 6, 27, 28, 4, colors.uiBlueDark);
    g.generateTexture(PlaceholderAssets.uiIconButton, 40, 36);
    g.destroy();
  }

  private createHeartTexture(key: string, full: boolean) {
    if (this.scene.textures.exists(key)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    const a = full ? colors.fireRed : colors.uiBlueDark;
    const b = full ? colors.scarfDeep : colors.stoneDark;
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
      this.r(g, 4, 4, 2, 1, colors.fireWhite);
    }
    g.generateTexture(key, 16, 16);
    g.destroy();
  }

  private createSelectionFrameTexture() {
    if (this.scene.textures.exists(PlaceholderAssets.selectionFrame)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 0, 0, 72, 4, colors.goldLight);
    this.r(g, 0, 0, 4, 72, colors.goldLight);
    this.r(g, 68, 0, 4, 72, colors.goldDark);
    this.r(g, 0, 68, 72, 4, colors.goldDark);
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
    this.r(g, 2, 14, 52, 4, colors.fireWhite, 0.9);
    this.r(g, 12, 9, 43, 4, colors.fireYellow, 0.8);
    this.r(g, 20, 20, 32, 3, colors.fireOrange, 0.65);
    this.r(g, 40, 5, 18, 2, colors.fireWhite, 0.75);
    g.generateTexture(PlaceholderAssets.slash, 62, 30);
    g.destroy();
  }

  private createDustVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.dust)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 2, 12, 6, 3, 0xc2b8a3, 0.85);
    this.r(g, 12, 9, 9, 5, 0xe1d6bd, 0.75);
    this.r(g, 25, 11, 5, 3, 0xc2b8a3, 0.8);
    this.r(g, 7, 16, 20, 2, 0x8b7e6c, 0.75);
    g.generateTexture(PlaceholderAssets.dust, 36, 22);
    g.destroy();
  }

  private createJumpBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.jumpBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 15, 2, 4, 10, colors.fireYellow, 0.9);
    this.r(g, 4, 15, 10, 4, colors.fireYellow, 0.85);
    this.r(g, 23, 15, 10, 4, colors.fireOrange, 0.85);
    this.r(g, 10, 10, 4, 4, colors.fireWhite, 0.75);
    this.r(g, 24, 9, 4, 4, colors.fireOrange, 0.75);
    g.generateTexture(PlaceholderAssets.jumpBurst, 38, 28);
    g.destroy();
  }

  private createCoinPickupVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.coinPickup)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 14, 1, 3, 7, colors.goldLight);
    this.r(g, 14, 24, 3, 7, colors.goldLight);
    this.r(g, 1, 14, 7, 3, colors.goldLight);
    this.r(g, 24, 14, 7, 3, colors.goldLight);
    this.r(g, 7, 7, 3, 3, colors.fireWhite);
    this.r(g, 22, 7, 3, 3, colors.fireWhite);
    this.r(g, 7, 22, 3, 3, colors.fireYellow);
    this.r(g, 22, 22, 3, 3, colors.fireYellow);
    g.generateTexture(PlaceholderAssets.coinPickup, 32, 32);
    g.destroy();
  }

  private createDamageVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.damage)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 12, 2, 4, 10, 0xfff1f2, 0.85);
    this.r(g, 6, 10, 17, 4, 0xfff1f2, 0.85);
    this.r(g, 2, 4, 5, 5, 0xef2626, 0.85);
    this.r(g, 24, 16, 5, 5, 0xef2626, 0.85);
    g.generateTexture(PlaceholderAssets.damage, 32, 28);
    g.destroy();
  }

  private createCheckpointBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.checkpointBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 19, 0, 4, 12, colors.fireYellow, 0.9);
    this.r(g, 19, 31, 4, 12, colors.fireYellow, 0.9);
    this.r(g, 0, 19, 12, 4, colors.fireYellow, 0.9);
    this.r(g, 31, 19, 12, 4, colors.fireYellow, 0.9);
    this.r(g, 8, 8, 5, 5, colors.fireOrange, 0.75);
    this.r(g, 30, 8, 5, 5, colors.fireOrange, 0.75);
    this.r(g, 8, 30, 5, 5, colors.fireOrange, 0.75);
    this.r(g, 30, 30, 5, 5, colors.fireOrange, 0.75);
    g.generateTexture(PlaceholderAssets.checkpointBurst, 44, 44);
    g.destroy();
  }

  private createDeathBurstVfx() {
    if (this.scene.textures.exists(PlaceholderAssets.deathBurst)) {
      return;
    }

    const g = this.scene.make.graphics({ x: 0, y: 0 }, false);
    this.r(g, 3, 15, 11, 4, colors.scarfDeep, 0.9);
    this.r(g, 25, 8, 7, 7, colors.armorLight, 0.8);
    this.r(g, 15, 5, 5, 5, colors.goldLight, 0.9);
    this.r(g, 23, 23, 7, 4, colors.armorBlue, 0.8);
    this.r(g, 9, 4, 3, 3, colors.fireYellow, 0.9);
    this.r(g, 32, 18, 3, 3, colors.fireRed, 0.9);
    g.generateTexture(PlaceholderAssets.deathBurst, 40, 32);
    g.destroy();
  }
}
