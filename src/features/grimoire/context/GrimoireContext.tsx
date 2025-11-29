import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quest } from '../../quest/domain/Quest';
import { calculateLevel, getTitleForLevel } from '../logic/LevelingSystem';

interface GrimoireState {
  xp: number;
  level: number;
  title: string;
  activeQuests: Quest[];
  completedQuests: Quest[];
  acceptQuest: (quest: Quest) => void;
  completeQuest: (quest: Quest) => void;
}

const GrimoireContext = createContext<GrimoireState | undefined>(undefined);

export const GrimoireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);

  // Derived state
  const level = calculateLevel(xp);
  const title = getTitleForLevel(level);

  const acceptQuest = (quest: Quest) => {
    if (activeQuests.find(q => q.id === quest.id)) return;
    if (completedQuests.find(q => q.id === quest.id)) return;
    
    setActiveQuests(prev => [...prev, { ...quest, status: 'IN_PROGRESS' }]);
  };

  const completeQuest = (quest: Quest) => {
    // Remove from active
    setActiveQuests(prev => prev.filter(q => q.id !== quest.id));
    // Add to completed
    setCompletedQuests(prev => [...prev, { ...quest, status: 'COMPLETED' }]);
    // Award XP
    setXp(prev => prev + quest.xpReward);
  };

  return (
    <GrimoireContext.Provider value={{
      xp,
      level,
      title,
      activeQuests,
      completedQuests,
      acceptQuest,
      completeQuest
    }}>
      {children}
    </GrimoireContext.Provider>
  );
};

export const useGrimoire = () => {
  const context = useContext(GrimoireContext);
  if (!context) {
    throw new Error("useGrimoire must be used within a GrimoireProvider");
  }
  return context;
};
