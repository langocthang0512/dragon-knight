import Phaser from 'phaser';
import { gameSettings, GAME_HEIGHT, GAME_WIDTH } from '../../config/gameSettings';
import { characters } from '../../data/characters';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { PlayerVariant } from '../../entities/player/playerTypes';
import { playerAnimationKey } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';

export class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.CharacterSelect);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    this.cameras.main.setBackgroundColor(gameSettings.backgroundColor);
    this.add
      .text(GAME_WIDTH / 2, 42, 'SELECT CHARACTER', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#f8fafc',
      })
      .setOrigin(0.5);

    characters.forEach((character, index) => {
      const x = index === 0 ? 156 : 324;
      const selected = save.selectedKnight === character.id;

      this.add
        .sprite(x, 112, `${playerAnimationKey(character.id, 'idle')}-0`)
        .setScale(2)
        .play(playerAnimationKey(character.id, 'idle'));
      this.add
        .text(x, 156, `${index + 1}. ${character.name}`, {
          fontFamily: 'monospace',
          fontSize: '12px',
          color: selected ? '#fde68a' : '#f8fafc',
        })
        .setOrigin(0.5);
      this.add
        .text(x, 176, character.hair, {
          fontFamily: 'monospace',
          fontSize: '9px',
          color: '#94a3b8',
        })
        .setOrigin(0.5);
    });

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 36, '1 male | 2 female | ESC menu', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === '1') {
        this.select('male');
      } else if (event.key === '2') {
        this.select('female');
      }
    });
    this.input.keyboard?.once('keydown-ESC', () => sceneManager.start(SceneKeys.MainMenu));
  }

  private select(variant: PlayerVariant) {
    const save = SaveService.load();
    SaveService.save({ ...save, selectedKnight: variant });
    new SceneManager(this).start(SceneKeys.MainMenu);
  }
}
