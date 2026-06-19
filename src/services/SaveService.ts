import { gameSettings } from '../config/gameSettings';

export type SaveData = {
  selectedKnight: string;
  coins: number;
  unlockedKnights: string[];
  levelOneBestTimeMs?: number;
};

const defaultSaveData: SaveData = {
  selectedKnight: 'ember',
  coins: 0,
  unlockedKnights: ['ember'],
};

export class SaveService {
  static load(): SaveData {
    try {
      const raw = window.localStorage.getItem(gameSettings.storageKey);
      return raw ? { ...defaultSaveData, ...JSON.parse(raw) } : { ...defaultSaveData };
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
