import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../config/gameSettings';
import { PlaceholderAssets } from '../services/AssetLoader';

const textStyle = {
  fontFamily: 'monospace',
  align: 'center',
} as const;

function animateIn(scene: Phaser.Scene, targets: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[], delay = 0) {
  const items = Array.isArray(targets) ? targets : [targets];
  items.forEach((item) => {
    const alphaTarget = item as unknown as Phaser.GameObjects.Components.Alpha;
    alphaTarget.setAlpha?.(0);
  });

  scene.tweens.add({
    targets: items,
    alpha: 1,
    scaleX: '+=0.015',
    scaleY: '+=0.015',
    duration: 160,
    delay,
    ease: 'Quad.easeOut',
  });
}

export function addMenuBackdrop(scene: Phaser.Scene) {
  scene.cameras.main.setBackgroundColor('#0b2d32');
  const panel = scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, PlaceholderAssets.uiPanel).setDisplaySize(410, 224).setDepth(0);
  animateIn(scene, panel);
  return panel;
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
  options: {
    width?: number;
    height?: number;
    tone?: 'stone' | 'wood';
    selected?: boolean;
    fontSize?: string;
    onSelect?: () => void;
  } = {},
) {
  const texture = options.tone === 'wood' ? PlaceholderAssets.uiButtonWood : PlaceholderAssets.uiButtonStone;
  const width = options.width ?? (options.tone === 'wood' ? 150 : 164);
  const height = options.height ?? 34;
  const button = scene.add.image(x, y, texture).setDisplaySize(width, height).setDepth(10);
  const setSelectedTint = () => {
    button.setTint(options.selected ? 0xfff2b8 : 0xffffff);
  };
  if (options.onSelect) {
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setTint(0xfff2b8));
    button.on('pointerout', setSelectedTint);
    button.on('pointerdown', options.onSelect);
  }
  if (options.selected) {
    button.setTint(0xfff2b8);
  }
  const text = scene.add
    .text(x, y - 1, label.toUpperCase(), {
      ...textStyle,
      fontSize: options.fontSize ?? '10px',
      color: options.selected ? '#fff2b8' : '#172033',
      stroke: options.selected ? '#050509' : '#c7d6de',
      strokeThickness: options.selected ? 3 : 1,
      fixedWidth: width - 18,
    })
    .setOrigin(0.5)
    .setDepth(11);
  if (options.onSelect) {
    text.setInteractive({ useHandCursor: true });
    text.on('pointerover', () => button.setTint(0xfff2b8));
    text.on('pointerout', setSelectedTint);
    text.on('pointerdown', options.onSelect);
  }

  animateIn(scene, [button, text], 30);

  return { button, text };
}

export function addIconCell(
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: string,
  options: { onSelect?: () => void; selected?: boolean; scale?: number } = {},
) {
  const button = scene.add.image(x, y, texture).setScale(options.scale ?? 1).setDepth(10);
  const setSelectedTint = () => {
    button.setTint(options.selected ? 0xfff2b8 : 0xffffff);
  };
  if (options.selected) {
    button.setTint(0xfff2b8);
  }
  if (options.onSelect) {
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setTint(0xfff2b8));
    button.on('pointerout', setSelectedTint);
    button.on('pointerdown', options.onSelect);
  }

  animateIn(scene, button, 30);
  return button;
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
  const panel = scene.add.image(x, y, PlaceholderAssets.uiPanel).setDisplaySize(width, height).setDepth(5);
  animateIn(scene, panel, 20);
  return panel;
}
