import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GrimoireLayout } from '../../../shared/ui/GrimoireLayout';
import { QuillInput } from '../../../shared/ui/QuillInput';
import { WaxSealButton } from '../../../shared/ui/WaxSealButton';
import { Fonts } from '../../../shared/assets/AssetManifest';

export const MagicalContract = ({ navigation }: any) => {
  const [trueName, setTrueName] = useState('');
  const [secretWord, setSecretWord] = useState('');

  const handleSignContract = () => {
    if (!trueName || !secretWord) {
      Alert.alert("The Contract is Incomplete", "You must inscribe your True Name and Secret Word.");
      return;
    }
    // TODO: Implement actual Supabase auth here
    // For now, we simulate a successful pact
    navigation.replace('QuestBoard');
  };

  return (
    <GrimoireLayout title="Magical Contract">
      <View style={styles.contractBody}>
        <Text style={styles.preamble}>
          I, the undersigned, hereby pledge my mana to the Council of Builders. 
          I accept the terms of the Quest and bind my soul to the Code.
        </Text>

        <View style={styles.form}>
          <QuillInput 
            label="True Name (Email)" 
            value={trueName}
            onChangeText={setTrueName}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <QuillInput 
            label="Secret Word (Password)" 
            value={secretWord}
            onChangeText={setSecretWord}
            secureTextEntry
          />
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.signatureLabel}>Sign in Blood (or Ink):</Text>
          <WaxSealButton 
            title="SEAL" 
            onPress={handleSignContract} 
            style={styles.sealButton}
          />
        </View>
      </View>
    </GrimoireLayout>
  );
};

const styles = StyleSheet.create({
  contractBody: {
    flex: 1,
    padding: 10,
  },
  preamble: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    color: '#2d1b15',
    lineHeight: 26,
    marginBottom: 30,
    textAlign: 'justify',
  },
  form: {
    marginBottom: 40,
  },
  signatureSection: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  signatureLabel: {
    fontFamily: Fonts.italic,
    fontSize: 16,
    color: '#5d4037',
    marginBottom: 10,
  },
  sealButton: {
    // Positioning handled by container
  }
});
