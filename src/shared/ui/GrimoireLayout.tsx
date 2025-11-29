import React from 'react';
import { StyleSheet, View, ImageBackground, Text, SafeAreaView, StatusBar } from 'react-native';
import { Textures, Fonts } from '../assets/AssetManifest';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

interface GrimoireLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const GrimoireLayout: React.FC<GrimoireLayoutProps> = ({ children, title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Layer 1: The Wooden Table */}
      <ImageBackground source={Textures.wood.oakTable} style={styles.background} resizeMode="cover">
        
        {/* Layer 2: The Open Book Pages */}
        {/* Note: In a real app, this would be a 9-slice image or a complex SVG. 
            For now, we assume a full-screen page texture. */}
        <ImageBackground 
          source={Textures.paper.parchment} 
          style={styles.pageContainer}
          imageStyle={styles.pageImage}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerRow}>
               {/* Profile Button (Top Right) */}
               <TouchableOpacity 
                 style={styles.profileButton}
                 onPress={() => navigation.navigate('CharacterSheet' as never)}
               >
                 <Text style={styles.profileButtonText}>Profile</Text>
               </TouchableOpacity>
            </View>

            {title && (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.divider} />
              </View>
            )}
            <View style={styles.content}>
              {children}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    margin: 10,
    marginTop: 40, // Space for status bar/top of book
    marginBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  pageImage: {
    borderRadius: 8,
    opacity: 0.95, // Slight transparency to blend with wood if needed
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerRow: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
  },
  profileButton: {
    padding: 8,
  },
  profileButtonText: {
    fontFamily: Fonts.italic,
    fontSize: 14,
    color: '#5d4037',
    textDecorationLine: 'underline',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: '#2d1b15', // Ink color
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  divider: {
    width: 100,
    height: 2,
    backgroundColor: '#8d6e63',
    marginTop: 8,
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
});
