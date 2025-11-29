// src/shared/assets/AssetManifest.ts

/**
 * THE SCRIBE'S VAULT
 * Central registry of all textures and organic assets.
 * 
 * Usage:
 * import { Textures } from '@/shared/assets/AssetManifest';
 * <Image source={Textures.paper.parchment} />
 */

export const Textures = {
  paper: {
    // Using placeholders for now as local assets are missing
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
  // Fallback to system fonts since local font files are missing
  primary: 'serif',
  bold: 'serif', // In React Native, we usually use fontWeight: 'bold' with the family
  italic: 'serif',
};

// Async preload helper
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const loadGrimoireAssets = async () => {
  // Preloading remote images is good practice but not strictly required for them to show up eventually.
  // We skip Font.loadAsync as we are using system fonts.
  
  const imageAssets = [
    Textures.paper.parchment,
    Textures.paper.waxSeal,
    Textures.wood.oakTable,
    Textures.wood.darkOak,
    Textures.book.coverLeather,
    Textures.book.spine,
  ];

  // For remote URIs, Asset.fromModule might not work as expected for preloading in the same way as local requires,
  // but Image.prefetch is the standard way. However, for this setup, we can just resolve.
  return Promise.resolve();
};

