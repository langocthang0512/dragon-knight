import Phaser from 'phaser';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create() {
    new SceneManager(this).start(SceneKeys.Preload);
  }
}
