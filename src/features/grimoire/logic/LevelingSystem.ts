/**
 * THE DUNGEON MASTER'S ALGORITHM
 * Calculates the level based on accumulated XP.
 * Formula: Level = floor(sqrt(XP / 100)) + 1
 * 
 * XP Table:
 * Level 1: 0 - 99 XP
 * Level 2: 100 - 399 XP
 * Level 3: 400 - 899 XP
 * ...
 */

export const calculateLevel = (xp: number): number => {
  if (xp < 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const calculateXpForNextLevel = (currentLevel: number): number => {
  // Inverse: XP = ((Level) ^ 2) * 100
  // Next Level = Current Level + 1
  return Math.pow(currentLevel, 2) * 100;
};

export const getTitleForLevel = (level: number): string => {
  if (level < 2) return "Novice Scribe";
  if (level < 5) return "Apprentice Builder";
  if (level < 10) return "Journeyman Coder";
  if (level < 20) return "Master Architect";
  return "Grand Wizard of the Void";
};
