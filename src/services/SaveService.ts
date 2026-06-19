import { gameSettings } from '../config/gameSettings';
import { PlayerVariant } from '../entities/player/playerTypes';

export type SaveData = {
  selectedKnight: PlayerVariant;
  coins: number;
  maxHealth: number;
  unlockedKnights: PlayerVariant[];
  levelOneBestTimeMs?: number;
  settings: {
    showDebug: boolean;
    reduceMotion: boolean;
  };
};

const defaultSaveData: SaveData = {
  selectedKnight: 'male',
  coins: 0,
  maxHealth: gameSettings.defaultHealth,
  unlockedKnights: ['male', 'female'],
  settings: {
    showDebug: true,
    reduceMotion: false,
  },
};

export class SaveService {
  static load(): SaveData {
    try {
      const raw = window.localStorage.getItem(gameSettings.storageKey);
      const saveData = raw ? { ...defaultSaveData, ...JSON.parse(raw) } : { ...defaultSaveData };
      const maxHealth = Math.min(Math.max(saveData.maxHealth ?? gameSettings.defaultHealth, gameSettings.defaultHealth), gameSettings.maxHealth);
      const settings = { ...defaultSaveData.settings, ...(saveData.settings ?? {}) };

      return saveData.selectedKnight === 'female'
        ? { ...saveData, maxHealth, settings, selectedKnight: 'female' }
        : { ...saveData, maxHealth, settings, selectedKnight: 'male' };
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
