import Phaser from 'phaser';
import { DebugSystem } from '../../core/DebugSystem';
import { InputSystem } from '../../core/InputSystem';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { Enemy } from '../../entities/enemies/Enemy';
import { Player } from '../../entities/player/Player';
import { levelOne } from '../../levels/levelOne';
import { PlaceholderAssets } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';
import { Hud } from '../../ui/Hud';

export class GameScene extends Phaser.Scene {
  private inputSystem?: InputSystem;
  private player?: Player;
  private hud?: Hud;
  private debug?: DebugSystem;
  private sceneManager?: SceneManager;

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    this.cameras.main.setBackgroundColor('#172554');
    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.sceneManager = new SceneManager(this);
    this.inputSystem = new InputSystem(this);
    this.inputSystem.create();

    const platforms = this.physics.add.staticGroup();
    for (const platform of levelOne.platforms) {
      const tile = platforms
        .create(platform.x + platform.width / 2, platform.y + platform.height / 2, PlaceholderAssets.tile)
        .setDisplaySize(platform.width, platform.height)
        .refreshBody();
      tile.setOrigin(0.5);
    }

    this.player = new Player(this, levelOne.playerSpawn.x, levelOne.playerSpawn.y);
    this.physics.add.collider(this.player, platforms);

    for (const enemySpawn of levelOne.enemies) {
      const enemy = new Enemy(this, enemySpawn.x, enemySpawn.y);
      this.physics.add.collider(enemy, platforms);
    }

    this.add
      .rectangle(levelOne.goal.x, levelOne.goal.y, 14, 42, 0x22c55e)
      .setOrigin(0.5, 1);

    const save = SaveService.load();
    this.hud = new Hud(this);
    this.hud.create();
    this.hud.setCoins(save.coins);

    this.debug = new DebugSystem(this);
    this.debug.create('debug: game scene / level 1 placeholder');
  }

  update() {
    const input = this.inputSystem?.snapshot();
    if (!input) {
      return;
    }

    if (input.pause) {
      this.scene.pause();
      this.sceneManager?.launch(SceneKeys.Pause);
      return;
    }

    this.player?.applyInput(input);
  }
}
