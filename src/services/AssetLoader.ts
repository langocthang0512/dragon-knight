import Phaser from 'phaser';

export const PlaceholderAssets = {
  player: 'placeholder-player',
  enemy: 'placeholder-enemy',
  coin: 'placeholder-coin',
  tile: 'placeholder-tile',
} as const;

export class AssetLoader {
  constructor(private readonly scene: Phaser.Scene) {}

  createGeneratedTextures() {
    this.createTexture(PlaceholderAssets.player, 16, 20, 0xf97316);
    this.createTexture(PlaceholderAssets.enemy, 16, 16, 0x8b5cf6);
    this.createTexture(PlaceholderAssets.coin, 8, 8, 0xfacc15);
    this.createTexture(PlaceholderAssets.tile, 16, 16, 0x475569);
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
}
