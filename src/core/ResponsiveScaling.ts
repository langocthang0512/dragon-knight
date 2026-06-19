import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameSettings';

export const responsiveScaleConfig: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

export function centerX() {
  return GAME_WIDTH / 2;
}

export function centerY() {
  return GAME_HEIGHT / 2;
}
