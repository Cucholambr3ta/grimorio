// src/shared/assets/AssetManifest.ts
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

/**
 * THE SCRIBE'S VAULT
 * Central registry of all textures and organic assets.
 */

export const Textures = {
  paper: {
    parchment: { uri: 'https://placehold.co/400x800/f5f5dc/5d4037/png?text=Parchment' }, 
    waxSeal: { uri: 'https://placehold.co/100x100/8b0000/ffffff/png?text=Seal' },
  },
  wood: {
    oakTable: { uri: 'https://placehold.co/800x1200/3e2723/ffffff/png?text=Oak+Table' },
    darkOak: { uri: 'https://placehold.co/100x100/212121/ffffff/png?text=Dark+Oak' },
  },
  book: {
    coverLeather: { uri: 'https://placehold.co/400x600/3e2723/ffffff/png?text=Leather+Cover' },
    spine: { uri: 'https://placehold.co/50x600/212121/ffffff/png?text=Spine' },
    openPages: { uri: 'https://placehold.co/600x400/fff8e1/000000/png?text=Open+Pages' },
  }
};

export const Fonts = {
  primary: 'serif',
  bold: 'serif',
  italic: 'serif',
};

export const Sounds = {
  music: {
    // mainTheme: require('./audio/music/main_theme.mp3'),
  },
  sfx: {
    // pageTurn: require('./audio/sfx/page_turn.mp3'),
    // questComplete: require('./audio/sfx/quest_complete.mp3'),
  }
};

export const loadGrimoireAssets = async () => {
  // Preloading remote images is good practice but not strictly required for them to show up eventually.
  // We skip Font.loadAsync as we are using system fonts.
  return Promise.resolve();
};
