import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { GrimoireLayout } from '../../../shared/ui/GrimoireLayout';
import { MOCK_QUESTS } from '../data/MockQuests';
import { QuestItem } from '../components/QuestItem';
import { QuestDetailModal } from '../components/QuestDetailModal';
import { Quest } from '../domain/Quest';
import { useGrimoire } from '../../grimoire/context/GrimoireContext';

export const QuestBoard = () => {
  // In a real app, we would fetch quests from an API.
  // Here we filter out quests that are already active or completed.
  const { activeQuests, completedQuests, acceptQuest } = useGrimoire();
  
  // Filter logic: Show available quests (not in active or completed)
  // For simplicity in this demo, we just show all MOCK_QUESTS but change their status visually if we wanted.
  // But let's do it right:
  const availableQuests = MOCK_QUESTS.filter(q => 
    !activeQuests.find(aq => aq.id === q.id) && 
    !completedQuests.find(cq => cq.id === q.id)
  );

  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handleQuestPress = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const handleAcceptQuest = (quest: Quest) => {
    acceptQuest(quest);
    Alert.alert("Quest Accepted", `You have undertaken: ${quest.title}`);
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
