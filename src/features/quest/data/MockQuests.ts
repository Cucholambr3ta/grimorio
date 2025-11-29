import { Quest } from '../domain/Quest';

export const MOCK_QUESTS: Quest[] = [
  {
    id: '1',
    title: 'The First Hello',
    description: 'Inscribe "Hello World" into the console to prove your awakening.',
    difficulty: 'EASY',
    xpReward: 50,
    status: 'AVAILABLE',
  },
  {
    id: '2',
    title: 'Loop of Infinity',
    description: 'Create a loop that never ends, but does not freeze time (Async).',
    difficulty: 'MEDIUM',
    xpReward: 150,
    status: 'AVAILABLE',
  },
  {
    id: '3',
    title: 'The Bug Slayer',
    description: 'Find the memory leak in the ancient scroll of "UseEffect".',
    difficulty: 'HARD',
    xpReward: 300,
    status: 'AVAILABLE',
  },
  {
    id: '4',
    title: 'Architect of the Void',
    description: 'Design a system that exists, yet occupies no space (Serverless).',
    difficulty: 'LEGENDARY',
    xpReward: 1000,
    status: 'AVAILABLE',
  },
];
