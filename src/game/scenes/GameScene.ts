import Phaser from 'phaser';
import { DebugSystem } from '../../core/DebugSystem';
import { InputSystem } from '../../core/InputSystem';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { Enemy } from '../../entities/enemies/Enemy';
import { Player } from '../../entities/player/Player';
import { PlayerEvents, PlayerHealthChangedEvent } from '../../entities/player/playerTypes';
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
  private checkpointActivated = false;

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

    const traps = this.physics.add.staticGroup();
    for (const trap of levelOne.traps) {
      const hazard = traps
        .create(trap.x + trap.width / 2, trap.y + trap.height / 2, PlaceholderAssets.trap)
        .setDisplaySize(trap.width, trap.height)
        .refreshBody();
      hazard.setOrigin(0.5);
    }

    const bonfire = this.add.image(levelOne.checkpoint.x, levelOne.checkpoint.y, PlaceholderAssets.bonfire).setOrigin(0.5, 1);
    const bonfireZone = this.add.zone(levelOne.checkpoint.x, levelOne.checkpoint.y - 12, 30, 30);
    this.physics.add.existing(bonfireZone, true);

    const save = SaveService.load();
    this.player = new Player(this, levelOne.playerSpawn.x, levelOne.playerSpawn.y, {
      variant: save.selectedKnight,
    });
    this.player.setCheckpoint(levelOne.checkpoint.x, levelOne.checkpoint.y);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(this.player, traps, () => {
      this.player?.takeDamage(1, 'trap');
    });
    this.physics.add.overlap(this.player, bonfireZone, () => {
      if (!this.player) {
        return;
      }

      this.player.setCheckpoint(levelOne.checkpoint.x, levelOne.checkpoint.y);
      bonfire.setTint(0xfef08a);
      this.checkpointActivated = true;
    });

    const enemies = this.physics.add.group();
    for (const enemySpawn of levelOne.enemies) {
      const enemy = new Enemy(this, enemySpawn.x, enemySpawn.y);
      enemies.add(enemy);
      this.physics.add.collider(enemy, platforms);
    }
    this.physics.add.overlap(this.player, enemies, () => {
      this.player?.takeDamage(1, 'enemy');
    });
    this.physics.add.overlap(this.player.attackHitbox, enemies, (_hitbox, target) => {
      const enemy = target as Enemy;
      enemy.takeDamage(1);
    });

    this.add
      .rectangle(levelOne.goal.x, levelOne.goal.y, 14, 42, 0x22c55e)
      .setOrigin(0.5, 1);

    this.hud = new Hud(this);
    this.hud.create();
    this.hud.setCoins(save.coins);
    this.hud.setHealth(this.player.getHealthSnapshot().health, this.player.getHealthSnapshot().maxHealth);

    this.debug = new DebugSystem(this);
    this.debug.create('debug: A2 player / checkpoint inactive');

    this.events.on(PlayerEvents.HealthChanged, ({ health, maxHealth }: PlayerHealthChangedEvent) => {
      this.hud?.setHealth(health, maxHealth);
    });
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

    this.player?.updateFromInput(input);

    if (this.checkpointActivated) {
      this.debug?.setText('debug: A2 player / bonfire checkpoint active');
    }
  }
}
