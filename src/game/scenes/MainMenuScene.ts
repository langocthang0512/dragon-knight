import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#101827');

    this.add
      .text(GAME_WIDTH / 2, 72, 'DRAGON KNIGHT', {
        fontFamily: 'monospace',
        fontSize: '28px',
        color: '#f8fafc',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 122, 'Vertical slice project initialized', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#cbd5e1',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 42, 'Next milestone: menu flow and core player prototype', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#94a3b8',
        align: 'center',
      })
      .setOrigin(0.5);
  }
}
