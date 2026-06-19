import { gameSettings } from '../config/gameSettings';
import { PlayerVariant } from '../entities/player/playerTypes';

export type SaveData = {
  selectedKnight: PlayerVariant;
  coins: number;
  unlockedKnights: PlayerVariant[];
  levelOneBestTimeMs?: number;
};

const defaultSaveData: SaveData = {
  selectedKnight: 'male',
  coins: 0,
  unlockedKnights: ['male', 'female'],
};

export class SaveService {
  static load(): SaveData {
    try {
      const raw = window.localStorage.getItem(gameSettings.storageKey);
      const saveData = raw ? { ...defaultSaveData, ...JSON.parse(raw) } : { ...defaultSaveData };
      return saveData.selectedKnight === 'female'
        ? { ...saveData, selectedKnight: 'female' }
        : { ...saveData, selectedKnight: 'male' };
    } catch {
      return { ...defaultSaveData };
    }
  }

  static save(data: SaveData) {
    window.localStorage.setItem(gameSettings.storageKey, JSON.stringify(data));
  }

  static reset() {
    window.localStorage.removeItem(gameSettings.storageKey);
  }
}
