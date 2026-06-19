import Phaser from 'phaser';

export class DebugSystem {
  private label?: Phaser.GameObjects.Text;

  constructor(private readonly scene: Phaser.Scene) {}

  create(initialText = 'debug: foundation') {
    this.label = this.scene.add
      .text(8, 8, initialText, {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#93c5fd',
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        padding: { x: 4, y: 2 },
      })
      .setDepth(1000)
      .setScrollFactor(0);
  }

  setText(value: string) {
    this.label?.setText(value);
  }
}
