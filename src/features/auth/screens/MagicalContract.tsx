import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GrimoireLayout } from '../../../shared/ui/GrimoireLayout';
import { QuillInput } from '../../../shared/ui/QuillInput';
import { WaxSealButton } from '../../../shared/ui/WaxSealButton';
import { Fonts } from '../../../shared/assets/AssetManifest';
import { supabase } from '../../../shared/api/supabase';

export const MagicalContract = ({ navigation }: any) => {
  const [trueName, setTrueName] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignContract = async () => {
    if (!trueName || !secretWord) {
      Alert.alert("The Contract is Incomplete", "You must inscribe your True Name and Secret Word.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: trueName,
          password: secretWord,
        });
        if (signUpError) throw signUpError;

        if (user) {
          // Create the wizard's profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id, 
                username: trueName.split('@')[0], // Default username from email
                class: 'Novice'
              }
            ]);
          
          if (profileError) {
            console.error("Error creating profile:", profileError);
            // We don't stop the flow, but we warn.
          }
        }

        Alert.alert("Pact Sealed", "Check your ethereal inbox (email) to confirm your soul's binding.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: trueName,
          password: secretWord,
        });
        if (error) throw error;
        // Navigation is handled by the auth state listener in App/Navigator usually, 
        // but here we can force it or let the listener do it. 
        // For now, we'll let the listener in GrimoireContext update the session, 
        // and we might need to listen to that or just navigate.
        // Actually, navigation.replace('QuestBoard') is fine if we want immediate feedback,
        // but better to let the navigator handle auth state.
        // For this existing flow:
        navigation.replace('QuestBoard');
      }
    } catch (error: any) {
      Alert.alert("The Ritual Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GrimoireLayout title={isSignUp ? "New Pact" : "Magical Contract"}>
      <View style={styles.contractBody}>
        <Text style={styles.preamble}>
          {isSignUp 
            ? "I hereby offer my skills to the Council, seeking to join the ranks of the Builders." 
            : "I, the undersigned, hereby pledge my mana to the Council of Builders. I accept the terms of the Quest and bind my soul to the Code."}
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
          {loading ? (
            <ActivityIndicator size="large" color="#5d4037" />
          ) : (
            <>
              <Text style={styles.signatureLabel}>
                {isSignUp ? "Inscribe Name:" : "Sign in Blood (or Ink):"}
              </Text>
              <WaxSealButton 
                title={isSignUp ? "FORGE" : "SEAL"} 
                onPress={handleSignContract} 
                style={styles.sealButton}
              />
            </>
          )}
          
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? "Already have a pact? Sign In" : "New to the Order? Create Pact"}
            </Text>
          </TouchableOpacity>
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
  },
  toggleButton: {
    marginTop: 20,
    padding: 10,
  },
  toggleText: {
    fontFamily: Fonts.italic,
    fontSize: 14,
    color: '#8d6e63',
    textDecorationLine: 'underline',
  }
});
