export type QuestDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'LEGENDARY';
export type QuestStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  xpReward: number;
  status: QuestStatus;
}
