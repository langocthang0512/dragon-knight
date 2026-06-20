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
  private coinsCollected = 0;
  private lastHealth = 0;
  private levelStartedAt = 0;
  private levelComplete = false;
  private readonly eggSpawns = new Map<Phaser.Physics.Arcade.Image, { x: number; y: number }>();

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    this.cameras.main.setBackgroundColor('#101827');
    this.physics.world.setBounds(0, 0, levelOne.worldWidth, GAME_HEIGHT);
    this.cameras.main.setBounds(0, 0, levelOne.worldWidth, GAME_HEIGHT);
    this.levelStartedAt = this.time.now;

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

    for (const marker of levelOne.tutorialMarkers) {
      this.add
        .image(marker.x, marker.y, PlaceholderAssets.uiButtonStone)
        .setDisplaySize(Math.max(104, marker.text.length * 6), 22)
        .setOrigin(0.5)
        .setAlpha(0.82)
        .setDepth(2);
      this.add
        .text(marker.x, marker.y, marker.text, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#172033',
          stroke: '#c7d6de',
          strokeThickness: 1,
        })
        .setOrigin(0.5)
        .setDepth(3);
    }

    const traps = this.physics.add.staticGroup();
    for (const trap of levelOne.traps) {
      const hazard = traps
        .create(trap.x + trap.width / 2, trap.y + trap.height / 2, PlaceholderAssets.trap)
        .setDisplaySize(trap.width, trap.height)
        .refreshBody();
      hazard.setOrigin(0.5);
    }

    const coins = this.physics.add.staticGroup();
    for (const coin of levelOne.coins) {
      const collectible = coins.create(coin.x, coin.y, PlaceholderAssets.coin);
      collectible.setOrigin(0.5);
    }

    const bonfire = this.add.image(levelOne.checkpoint.x, levelOne.checkpoint.y, PlaceholderAssets.bonfire).setOrigin(0.5, 1);
    const bonfireZone = this.add.zone(levelOne.checkpoint.x, levelOne.checkpoint.y - 12, 30, 30);
    this.physics.add.existing(bonfireZone, true);

    const save = SaveService.load();
    this.player = new Player(this, levelOne.playerSpawn.x, levelOne.playerSpawn.y, {
      variant: save.selectedKnight,
      maxHealth: save.maxHealth,
    });
    this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(this.player, traps, () => {
      this.player?.takeDamage(1, 'trap');
    });
    this.physics.add.overlap(this.player, coins, (_player, target) => {
      const coin = target as Phaser.Physics.Arcade.Image;
      this.spawnOneShot(PlaceholderAssets.coinPickup, coin.x, coin.y, 1.2, 260);
      coin.disableBody(true, true);
      this.coinsCollected += 1;
      this.hud?.setCoins(this.coinsCollected);
    });
    this.physics.add.overlap(this.player, bonfireZone, () => {
      if (!this.player) {
        return;
      }

      this.player.setCheckpoint(levelOne.checkpoint.x, levelOne.checkpoint.y);
      if (!this.checkpointActivated) {
        this.spawnOneShot(PlaceholderAssets.checkpointBurst, levelOne.checkpoint.x, levelOne.checkpoint.y - 28, 1.2, 420);
      }
      bonfire.setTint(0xfef08a);
      this.checkpointActivated = true;
    });

    const enemies = this.physics.add.group();
    for (const enemySpawn of levelOne.enemies) {
      const enemy = new Enemy(this, enemySpawn.x, enemySpawn.y, {
        type: enemySpawn.type,
        patrolDistance: enemySpawn.patrolDistance,
        patrolSpeed: enemySpawn.patrolSpeed,
      });
      enemies.add(enemy);
      if (enemySpawn.type === 'small') {
        this.physics.add.collider(enemy, platforms);
      }
    }
    this.physics.add.overlap(this.player, enemies, () => {
      this.player?.takeDamage(1, 'enemy');
    });
    this.physics.add.overlap(this.player.attackHitbox, enemies, (_hitbox, target) => {
      const enemy = target as unknown as Enemy;
      enemy.takeDamage(1);
    });

    const eggs = this.physics.add.group();
    for (const eggSpawn of levelOne.fallingEggs) {
      const egg = eggs.create(eggSpawn.x, eggSpawn.y, PlaceholderAssets.dragonEgg) as Phaser.Physics.Arcade.Image;
      const body = egg.body as Phaser.Physics.Arcade.Body;
      egg.setOrigin(0.5);
      body.setAllowGravity(true);
      body.enable = false;
      this.eggSpawns.set(egg, { x: eggSpawn.x, y: eggSpawn.y });

      const dropEgg = () => this.dropEgg(egg);
      this.time.delayedCall(eggSpawn.delayMs, () => {
        dropEgg();
        this.time.addEvent({ delay: eggSpawn.intervalMs, callback: dropEgg, loop: true });
      });
    }
    this.physics.add.overlap(this.player, eggs, (_player, target) => {
      this.player?.takeDamage(1, 'enemy');
      this.resetEgg(target as Phaser.Physics.Arcade.Image);
    });
    this.physics.add.collider(eggs, platforms, (eggObject) => {
      this.resetEgg(eggObject as Phaser.Physics.Arcade.Image);
    });

    const finishGate = this.add.image(levelOne.goal.x, levelOne.goal.y, PlaceholderAssets.finishGate).setOrigin(0.5, 1);
    const finishZone = this.add.zone(levelOne.goal.x, levelOne.goal.y - 22, 40, 48);
    this.physics.add.existing(finishZone, true);
    this.physics.add.overlap(this.player, finishZone, () => this.completeLevel());
    finishGate.setDepth(5);

    this.hud = new Hud(this);
    this.hud.create();
    this.hud.setCoins(this.coinsCollected);
    this.hud.setHealth(this.player.getHealthSnapshot().health, this.player.getHealthSnapshot().maxHealth);
    this.lastHealth = this.player.getHealthSnapshot().health;

    if (save.settings.showDebug) {
      this.debug = new DebugSystem(this);
      this.debug.create('debug: Level 1 / tutorial');
    }

    this.events.on(PlayerEvents.HealthChanged, ({ health, maxHealth }: PlayerHealthChangedEvent) => {
      this.hud?.setHealth(health, maxHealth);
      if (this.player && health < this.lastHealth) {
        this.spawnOneShot(health <= 0 ? PlaceholderAssets.deathBurst : PlaceholderAssets.damage, this.player.x, this.player.y - 24, 1.35, 260);
      }
      this.lastHealth = health;
      if (health <= 0 && !this.levelComplete) {
        this.sceneManager?.start(SceneKeys.GameOver);
      }
    });

    this.events.on(PlayerEvents.Respawned, ({ x, y }: { x: number; y: number }) => {
      this.spawnOneShot(PlaceholderAssets.dust, x, y - 4, 1.2, 240);
    });

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
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
      this.debug?.setText(`debug: Level 1 / checkpoint active / coins ${this.coinsCollected}`);
    }
  }

  private dropEgg(egg: Phaser.Physics.Arcade.Image) {
    const spawn = this.eggSpawns.get(egg);
    if (!spawn) {
      return;
    }

    const body = egg.body as Phaser.Physics.Arcade.Body;
    if (body.enable) {
      return;
    }

    egg.enableBody(true, spawn.x, spawn.y, true, true);
    egg.setVelocityY(170);
  }

  private resetEgg(egg: Phaser.Physics.Arcade.Image) {
    const spawn = this.eggSpawns.get(egg);
    if (!spawn) {
      return;
    }

    egg.disableBody(true, true);
    egg.setPosition(spawn.x, spawn.y);
    egg.setVelocity(0, 0);
  }

  private spawnOneShot(key: string, x: number, y: number, scale: number, durationMs: number) {
    const sprite = this.add.image(x, y, key).setScale(scale).setDepth(35);
    this.tweens.add({
      targets: sprite,
      y: y - 8,
      alpha: 0,
      duration: durationMs,
      onComplete: () => sprite.destroy(),
    });
  }

  private completeLevel() {
    if (this.levelComplete) {
      return;
    }

    this.levelComplete = true;
    const save = SaveService.load();
    const elapsedMs = Math.round(this.time.now - this.levelStartedAt);

    SaveService.save({
      ...save,
      coins: save.coins + this.coinsCollected,
      levelOneBestTimeMs:
        save.levelOneBestTimeMs === undefined ? elapsedMs : Math.min(save.levelOneBestTimeMs, elapsedMs),
    });

    this.sceneManager?.start(SceneKeys.Result, {
      coinsCollected: this.coinsCollected,
      elapsedMs,
      targetDurationMinutes: levelOne.targetDurationMinutes,
    });
  }
}
