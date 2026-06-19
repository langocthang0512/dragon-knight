import Phaser from 'phaser';

export type PlayerInputSnapshot = {
  left: boolean;
  right: boolean;
  jump: boolean;
  attack: boolean;
  pause: boolean;
};

export class InputSystem {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: Record<'a' | 'd' | 'w' | 'space' | 'j' | 'esc', Phaser.Input.Keyboard.Key>;

  constructor(private readonly scene: Phaser.Scene) {}

  create() {
    if (!this.scene.input.keyboard) {
      return;
    }

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      j: Phaser.Input.Keyboard.KeyCodes.J,
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
    }) as Record<'a' | 'd' | 'w' | 'space' | 'j' | 'esc', Phaser.Input.Keyboard.Key>;
  }

  snapshot(): PlayerInputSnapshot {
    const pauseKey = this.keys?.esc;

    return {
      left: Boolean(this.cursors?.left.isDown || this.keys?.a.isDown),
      right: Boolean(this.cursors?.right.isDown || this.keys?.d.isDown),
      jump: Boolean(this.cursors?.up.isDown || this.keys?.w.isDown || this.keys?.space.isDown),
      attack: Boolean(this.keys?.j.isDown),
      pause: pauseKey ? Phaser.Input.Keyboard.JustDown(pauseKey) : false,
    };
  }
}
