import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../shared/api/supabase';
import { Quest } from '../../quest/domain/Quest';
import { calculateLevel, getTitleForLevel } from '../logic/LevelingSystem';
import { Alert } from 'react-native';

interface GrimoireState {
  session: Session | null;
  xp: number;
  level: number;
  title: string;
  allQuests: Quest[];
  activeQuests: Quest[];
  completedQuests: Quest[];
  isLoading: boolean;
  acceptQuest: (quest: Quest) => Promise<void>;
  completeQuest: (quest: Quest) => Promise<void>;
  signOut: () => Promise<void>;
  refreshGrimoire: () => Promise<void>;
}

const GrimoireContext = createContext<GrimoireState | undefined>(undefined);

export const GrimoireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [xp, setXp] = useState(0);
  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Setup Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data when Session changes
  useEffect(() => {
    if (session?.user) {
      refreshGrimoire();
    } else {
      // Reset state on logout
      setXp(0);
      setActiveQuests([]);
      setCompletedQuests([]);
      setAllQuests([]);
    }
  }, [session]);

  const refreshGrimoire = async () => {
    if (!session?.user) return;
    setIsLoading(true);
    try {
      // A. Fetch Profile (XP)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('xp')
        .eq('id', session.user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      } else if (profile) {
        setXp(profile.xp || 0);
      }

      // B. Fetch All Quests (The World)
      const { data: questsData, error: questsError } = await supabase
        .from('quests')
        .select('*');
      
      if (questsError) throw questsError;
      
      // Map DB snake_case to Domain camelCase if needed, 
      // but let's assume our Domain matches or we map it here.
      // Our Quest interface likely expects camelCase.
      const mappedQuests: Quest[] = (questsData || []).map((q: any) => ({
        id: q.id,
        title: q.title,
        description: q.description,
        difficulty: q.difficulty,
        xpReward: q.xp_reward,
        status: 'AVAILABLE' // Default
      }));
      setAllQuests(mappedQuests);

      // C. Fetch User's Quest Log
      const { data: userQuests, error: userQuestsError } = await supabase
        .from('user_quests')
        .select('quest_id, status, completed_at')
        .eq('user_id', session.user.id);

      if (userQuestsError) throw userQuestsError;

      // D. Distribute into Active/Completed
      const active: Quest[] = [];
      const completed: Quest[] = [];

      userQuests?.forEach((uq: any) => {
        const originalQuest = mappedQuests.find(q => q.id === uq.quest_id);
        if (originalQuest) {
          if (uq.status === 'Active') {
            active.push({ ...originalQuest, status: 'IN_PROGRESS' });
          } else if (uq.status === 'Completed') {
            completed.push({ ...originalQuest, status: 'COMPLETED' });
          }
        }
      });

      setActiveQuests(active);
      setCompletedQuests(completed);

    } catch (error) {
      console.error("Error refreshing grimoire:", error);
      Alert.alert("Grimoire Error", "Failed to read the magical scrolls.");
    } finally {
      setIsLoading(false);
    }
  };

  // Derived state
  const level = calculateLevel(xp);
  const title = getTitleForLevel(level);

  const acceptQuest = async (quest: Quest) => {
    if (!session?.user) return;
    try {
      const { error } = await supabase
        .from('user_quests')
        .insert({
          user_id: session.user.id,
          quest_id: quest.id,
          status: 'Active'
        });
      
      if (error) throw error;
      
      // Optimistic Update
      setActiveQuests(prev => [...prev, { ...quest, status: 'IN_PROGRESS' }]);
      Alert.alert("Quest Accepted", "The pact is sealed.");
    } catch (error: any) {
      Alert.alert("Failed to Accept", error.message);
    }
  };

  const completeQuest = async (quest: Quest) => {
    if (!session?.user) return;
    try {
      // 1. Update User Quest Status
      const { error: questError } = await supabase
        .from('user_quests')
        .update({ status: 'Completed', completed_at: new Date().toISOString() })
        .eq('user_id', session.user.id)
        .eq('quest_id', quest.id);

      if (questError) throw questError;

      // 2. Award XP (RPC call would be better for atomicity, but client-side for now)
      const newXp = xp + quest.xpReward;
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ xp: newXp })
        .eq('id', session.user.id);

      if (profileError) throw profileError;

      // Optimistic Update
      setActiveQuests(prev => prev.filter(q => q.id !== quest.id));
      setCompletedQuests(prev => [...prev, { ...quest, status: 'COMPLETED' }]);
      setXp(newXp);
      
      Alert.alert("Victory!", `You gained ${quest.xpReward} XP.`);
    } catch (error: any) {
      Alert.alert("Completion Failed", error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <GrimoireContext.Provider value={{
      session,
      xp,
      level,
      title,
      allQuests,
      activeQuests,
      completedQuests,
      isLoading,
      acceptQuest,
      completeQuest,
      signOut,
      refreshGrimoire
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

