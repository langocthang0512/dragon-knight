import Phaser from 'phaser';

export class Hud {
  private coinsLabel?: Phaser.GameObjects.Text;
  private healthLabel?: Phaser.GameObjects.Text;

  constructor(private readonly scene: Phaser.Scene) {}

  create() {
    this.healthLabel = this.scene.add
      .text(8, 20, 'HEARTS 3/3', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#f8fafc',
      })
      .setScrollFactor(0)
      .setDepth(900);

    this.coinsLabel = this.scene.add
      .text(372, 20, 'COIN 0', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#fde68a',
      })
      .setScrollFactor(0)
      .setDepth(900);

    this.scene.add
      .text(198, 20, 'ESC PAUSE', {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#94a3b8',
      })
      .setScrollFactor(0)
      .setDepth(900);
  }

  setCoins(coins: number) {
    this.coinsLabel?.setText(`COIN ${coins}`);
  }

  setHealth(health: number, maxHealth: number) {
    this.healthLabel?.setText(`HEARTS ${health}/${maxHealth}`);
  }
}
