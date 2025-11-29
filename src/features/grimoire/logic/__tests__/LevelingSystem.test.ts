import { calculateLevel, getTitleForLevel } from '../LevelingSystem';

describe('LevelingSystem', () => {
  describe('calculateLevel', () => {
    it('should return level 1 for 0 XP', () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it('should return level 1 for 99 XP', () => {
      expect(calculateLevel(99)).toBe(1);
    });

    it('should return level 2 for 100 XP', () => {
      expect(calculateLevel(100)).toBe(2);
    });

    it('should return level 3 for 400 XP', () => {
      // Formula: floor(sqrt(400/100)) + 1 = floor(2) + 1 = 3
      expect(calculateLevel(400)).toBe(3);
    });
  });

  describe('getTitleForLevel', () => {
    it('should return "Novice Scribe" for level 1', () => {
      expect(getTitleForLevel(1)).toBe('Novice Scribe');
    });

    it('should return "Apprentice Builder" for level 4', () => {
      expect(getTitleForLevel(4)).toBe('Apprentice Builder');
    });

    it('should return "Grand Wizard of the Void" for level 20', () => {
      expect(getTitleForLevel(20)).toBe('Grand Wizard of the Void');
    });
  });
});
