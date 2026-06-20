import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameSettings';
import { PlaceholderAssets } from '../services/AssetLoader';

const textStyle = {
  fontFamily: 'monospace',
  align: 'center',
} as const;

export function addMenuBackdrop(scene: Phaser.Scene) {
  scene.cameras.main.setBackgroundColor('#0b2d32');
  scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, PlaceholderAssets.uiPanel).setDisplaySize(430, 232).setDepth(0);
}

export function addScreenTitle(scene: Phaser.Scene, text: string, y = 36) {
  return scene.add
    .text(GAME_WIDTH / 2, y, text, {
      ...textStyle,
      fontSize: '22px',
      color: '#fff2b8',
      stroke: '#050509',
      strokeThickness: 4,
    })
    .setOrigin(0.5)
    .setDepth(20);
}

export function addPixelButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  options: { width?: number; tone?: 'stone' | 'wood'; hotkey?: string; selected?: boolean } = {},
) {
  const texture = options.tone === 'wood' ? PlaceholderAssets.uiButtonWood : PlaceholderAssets.uiButtonStone;
  const width = options.width ?? (options.tone === 'wood' ? 150 : 164);
  const button = scene.add.image(x, y, texture).setDisplaySize(width, options.tone === 'wood' ? 32 : 38).setDepth(10);
  const caption = options.hotkey ? `${options.hotkey}  ${label}` : label;
  const text = scene.add
    .text(x, y - 1, caption.toUpperCase(), {
      ...textStyle,
      fontSize: '11px',
      color: options.selected ? '#fff2b8' : '#172033',
      stroke: options.selected ? '#050509' : '#c7d6de',
      strokeThickness: options.selected ? 3 : 1,
    })
    .setOrigin(0.5)
    .setDepth(11);

  return { button, text };
}

export function addFooterHint(scene: Phaser.Scene, text: string) {
  return scene.add
    .text(GAME_WIDTH / 2, GAME_HEIGHT - 20, text, {
      ...textStyle,
      fontSize: '9px',
      color: '#d7e8d0',
      stroke: '#050509',
      strokeThickness: 3,
    })
    .setOrigin(0.5)
    .setDepth(20);
}

export function addPanel(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
  return scene.add.image(x, y, PlaceholderAssets.uiPanel).setDisplaySize(width, height).setDepth(5);
}
