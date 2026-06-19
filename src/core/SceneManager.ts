import Phaser from 'phaser';
import { SceneKey } from './SceneKeys';

export class SceneManager {
  constructor(private readonly scene: Phaser.Scene) {}

  start(key: SceneKey, data?: object) {
    this.scene.scene.start(key, data);
  }

  launch(key: SceneKey, data?: object) {
    if (!this.scene.scene.isActive(key)) {
      this.scene.scene.launch(key, data);
    }
  }

  stop(key: SceneKey) {
    if (this.scene.scene.isActive(key)) {
      this.scene.scene.stop(key);
    }
  }

  restart(data?: object) {
    this.scene.scene.restart(data);
  }
}
