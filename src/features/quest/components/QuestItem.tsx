import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Quest, QuestDifficulty } from '../domain/Quest';
import { Fonts, Textures } from '../../../shared/assets/AssetManifest';

interface QuestItemProps {
  quest: Quest;
  onPress: (quest: Quest) => void;
}

const getDifficultyColor = (difficulty: QuestDifficulty): string => {
  switch (difficulty) {
    case 'EASY': return '#4caf50'; // Green
    case 'MEDIUM': return '#ff9800'; // Orange
    case 'HARD': return '#f44336'; // Red
    case 'LEGENDARY': return '#9c27b0'; // Purple
    default: return '#8d6e63';
  }
};

export const QuestItem: React.FC<QuestItemProps> = ({ quest, onPress }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => onPress(quest)}
      style={styles.container}
    >
      {/* Paper Strip Background - Using Parchment for now, ideally a specific strip asset */}
      <ImageBackground 
        source={Textures.paper.parchment} 
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{quest.title}</Text>
            <Text style={styles.reward}>{quest.xpReward} XP</Text>
          </View>
          
          {/* Difficulty Seal */}
          <View style={styles.sealContainer}>
            <ImageBackground 
              source={Textures.paper.waxSeal} 
              style={styles.seal}
              resizeMode="contain"
              tintColor={getDifficultyColor(quest.difficulty)}
            >
               <Text style={styles.sealText}>{quest.difficulty[0]}</Text>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    borderRadius: 4,
    // Add a jagged edge effect via masking in future
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#2d1b15',
  },
  reward: {
    fontFamily: Fonts.italic,
    fontSize: 14,
    color: '#5d4037',
    marginTop: 4,
  },
  sealContainer: {
    marginLeft: 16,
  },
  seal: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sealText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});
