import React from 'react';
import { StyleSheet, TextInput, View, Text, TextInputProps } from 'react-native';
import { Fonts } from '../assets/AssetManifest';

interface QuillInputProps extends TextInputProps {
  label?: string;
}

export const QuillInput: React.FC<QuillInputProps> = ({ label, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#8d6e63"
        selectionColor="#2d1b15"
        {...props}
      />
      {/* The handwritten underline */}
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#5d4037',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    fontFamily: Fonts.italic,
    fontSize: 20,
    color: '#2d1b15', // Ink black
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  underline: {
    height: 2,
    backgroundColor: '#5d4037',
    opacity: 0.5,
    borderRadius: 1,
    marginTop: -2, // Pull up slightly
  },
});
