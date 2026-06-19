import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { centerX, centerY } from '../../core/ResponsiveScaling';

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

    this.cameras.main.setBackgroundColor('#111827');
    this.add
      .text(centerX(), centerY() - 52, 'LEVEL 1 COMPLETE', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() - 10, `Coins: ${data.coinsCollected ?? 0}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#fde68a',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 12, `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 34, `Target run: ${target[0]}-${target[1]} min`, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);
    this.add
      .text(centerX(), centerY() + 66, 'ENTER return to menu', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => sceneManager.start(SceneKeys.MainMenu));
  }
}
