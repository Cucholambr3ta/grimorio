import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert, RefreshControl } from 'react-native';
import { GrimoireLayout } from '../../../shared/ui/GrimoireLayout';
// import { MOCK_QUESTS } from '../data/MockQuests'; // Deprecated
import { QuestItem } from '../components/QuestItem';
import { QuestDetailModal } from '../components/QuestDetailModal';
import { Quest } from '../domain/Quest';
import { useGrimoire } from '../../grimoire/context/GrimoireContext';

export const QuestBoard = () => {
  // Now we fetch quests from the Grimoire (Supabase)
  const { allQuests, activeQuests, completedQuests, acceptQuest, isLoading, refreshGrimoire } = useGrimoire();
  
  // Filter logic: Show available quests (not in active or completed)
  const availableQuests = allQuests.filter(q => 
    !activeQuests.find(aq => aq.id === q.id) && 
    !completedQuests.find(cq => cq.id === q.id)
  );

  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handleQuestPress = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const handleAcceptQuest = (quest: Quest) => {
    acceptQuest(quest);
    // Alert is handled in context, but we can close modal here
    setSelectedQuest(null);
  };

  return (
    <GrimoireLayout title="Quest Board">
      <FlatList
        data={availableQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuestItem quest={item} onPress={handleQuestPress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshGrimoire} tintColor="#5d4037" />
        }
      />
      
      <QuestDetailModal 
        visible={!!selectedQuest}
        quest={selectedQuest}
        onClose={() => setSelectedQuest(null)}
        onAccept={handleAcceptQuest}
      />
    </GrimoireLayout>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
