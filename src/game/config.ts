import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../config/gameSettings';
import { responsiveScaleConfig } from '../core/ResponsiveScaling';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { PauseScene } from './scenes/PauseScene';
import { PreloadScene } from './scenes/PreloadScene';
import { ResultScene } from './scenes/ResultScene';

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: gameSettings.backgroundColor,
    pixelArt: true,
    roundPixels: true,
    scale: responsiveScaleConfig,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: gameSettings.worldGravity },
        debug: false,
      },
    },
    scene: [BootScene, PreloadScene, MainMenuScene, GameScene, PauseScene, ResultScene],
  };
}
