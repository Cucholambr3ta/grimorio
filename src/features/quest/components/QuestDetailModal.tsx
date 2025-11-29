import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { Quest } from '../domain/Quest';
import { Fonts, Textures } from '../../../shared/assets/AssetManifest';
import { WaxSealButton } from '../../../shared/ui/WaxSealButton';

interface QuestDetailModalProps {
  visible: boolean;
  quest: Quest | null;
  onClose: () => void;
  onAccept: (quest: Quest) => void;
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({ visible, quest, onClose, onAccept }) => {
  if (!quest) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Background: A large open scroll or parchment */}
          <ImageBackground 
            source={Textures.paper.parchment} 
            style={styles.parchment}
            imageStyle={styles.parchmentImage}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{quest.title}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.description}>{quest.description}</Text>
              
              <View style={styles.rewards}>
                <Text style={styles.rewardLabel}>Reward:</Text>
                <Text style={styles.rewardValue}>{quest.xpReward} XP</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.cancelText}>Decline</Text>
                </TouchableOpacity>
                
                <WaxSealButton 
                  title="ACCEPT" 
                  onPress={() => onAccept(quest)} 
                  style={styles.acceptButton}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 0.8, // Portrait scroll
  },
  parchment: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  parchmentImage: {
    borderRadius: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#2d1b15',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    width: '60%',
    height: 2,
    backgroundColor: '#5d4037',
    marginBottom: 20,
    opacity: 0.5,
  },
  description: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    color: '#3e2723',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
  },
  rewards: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  rewardLabel: {
    fontFamily: Fonts.italic,
    fontSize: 16,
    color: '#5d4037',
    marginRight: 8,
  },
  rewardValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#2d1b15',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 'auto',
  },
  cancelText: {
    fontFamily: Fonts.italic,
    fontSize: 16,
    color: '#8d6e63',
    textDecorationLine: 'underline',
  },
  acceptButton: {
    // Sizing handled by component
  }
});
