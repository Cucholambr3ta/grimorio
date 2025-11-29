import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { GrimoireLayout } from '../../../shared/ui/GrimoireLayout';
import { useGrimoire } from '../context/GrimoireContext';
import { calculateXpForNextLevel } from '../logic/LevelingSystem';
import { Fonts, Textures } from '../../../shared/assets/AssetManifest';

export const CharacterSheet = () => {
  const { xp, level, title, completedQuests } = useGrimoire();
  
  const xpForNext = calculateXpForNextLevel(level);
  const xpForCurrent = calculateXpForNextLevel(level - 1);
  
  // Progress calculation
  const xpInCurrentLevel = xp - xpForCurrent;
  const xpNeededForLevel = xpForNext - xpForCurrent;
  const progress = Math.min(Math.max(xpInCurrentLevel / xpNeededForLevel, 0), 1);

  return (
    <GrimoireLayout title="Character Sheet">
      <View style={styles.container}>
        
        {/* Avatar / Class Icon Placeholder */}
        <View style={styles.avatarContainer}>
          <ImageBackground 
            source={Textures.paper.waxSeal} 
            style={styles.avatar}
            resizeMode="contain"
          >
            <Text style={styles.levelText}>{level}</Text>
          </ImageBackground>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>The Awakened Coder</Text>

        {/* XP Bar */}
        <View style={styles.statsContainer}>
          <Text style={styles.statLabel}>Experience</Text>
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.xpText}>{xp} / {xpForNext} XP</Text>
        </View>

        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedQuests.length}</Text>
            <Text style={styles.statName}>Quests Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{level * 5}</Text>
            <Text style={styles.statName}>Mana Capacity</Text>
          </View>
        </View>

      </View>
    </GrimoireLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontFamily: Fonts.bold,
    fontSize: 40,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#2d1b15',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.italic,
    fontSize: 18,
    color: '#5d4037',
    marginBottom: 30,
  },
  statsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  statLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#2d1b15',
    marginBottom: 8,
  },
  xpBarContainer: {
    height: 12,
    backgroundColor: '#d7ccc8',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8d6e63',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#7b1fa2', // Magical Purple
  },
  xpText: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    color: '#5d4037',
    textAlign: 'right',
    marginTop: 4,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#8d6e63',
    opacity: 0.3,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: '#2d1b15',
  },
  statName: {
    fontFamily: Fonts.italic,
    fontSize: 14,
    color: '#5d4037',
  }
});
