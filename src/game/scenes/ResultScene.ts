import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { centerX, centerY } from '../../core/ResponsiveScaling';
import { addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

type ResultData = {
  coinsCollected?: number;
  elapsedMs?: number;
  targetDurationMinutes?: [number, number];
};

export class ResultScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Result);
  }

  create(data: ResultData) {
    const sceneManager = new SceneManager(this);
    const elapsedSeconds = Math.floor((data.elapsedMs ?? 0) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const target = data.targetDurationMinutes ?? [3, 5];

    addMenuBackdrop(this);
    addScreenTitle(this, 'VICTORY', centerY() - 72);
    this.add
      .text(centerX(), centerY() - 10, `Coins: ${data.coinsCollected ?? 0}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fff2b8',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 12, `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 34, `Target run: ${target[0]}-${target[1]} min`, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#d7e8d0',
        stroke: '#050509',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    addPixelButton(this, centerX(), centerY() + 68, 'Menu   R Replay', { hotkey: 'ENTER', tone: 'wood', width: 205 });

    this.input.keyboard?.once('keydown-ENTER', () => sceneManager.start(SceneKeys.MainMenu));
    this.input.keyboard?.once('keydown-R', () => sceneManager.start(SceneKeys.Game));
  }
}
