import Phaser from 'phaser';
import { GAME_WIDTH } from '../../config/gameSettings';
import { characters } from '../../data/characters';
import { SceneKeys } from '../../core/SceneKeys';
import { SceneManager } from '../../core/SceneManager';
import { PlayerVariant } from '../../entities/player/playerTypes';
import { PlaceholderAssets, playerAnimationKey } from '../../services/AssetLoader';
import { SaveService } from '../../services/SaveService';
import { addMenuBackdrop, addPixelButton, addScreenTitle } from '../../ui/PixelUi';

export class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.CharacterSelect);
  }

  create() {
    const sceneManager = new SceneManager(this);
    const save = SaveService.load();

    addMenuBackdrop(this);
    addScreenTitle(this, 'SELECT CHARACTER', 36);

    characters.forEach((character, index) => {
      const x = index === 0 ? 156 : 324;
      const selected = save.selectedKnight === character.id;

      if (selected) {
        this.add.image(x, 128, PlaceholderAssets.selectionFrame).setScale(1.35).setDepth(8);
      }
      this.add
        .sprite(x, 120, `${playerAnimationKey(character.id, 'idle')}-0`)
        .setScale(0.95)
        .setDepth(15)
        .play(playerAnimationKey(character.id, 'idle'));
      addPixelButton(this, x, 174, character.id === 'male' ? 'Male Knight' : 'Female Knight', {
        onSelect: () => this.select(character.id),
        selected,
        tone: selected ? 'wood' : 'stone',
        width: 150,
        fontSize: '9px',
      });
      this.add
        .text(x, 198, character.hair, {
          fontFamily: 'monospace',
          fontSize: '9px',
          color: '#d7e8d0',
          stroke: '#050509',
          strokeThickness: 3,
        })
        .setOrigin(0.5);
    });

    addPixelButton(this, GAME_WIDTH / 2, 236, 'Back', { onSelect: () => sceneManager.start(SceneKeys.MainMenu), width: 150 });

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
