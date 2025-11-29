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
    // TODO: Add actual texture files to assets/textures/paper/
    parchment: require('./textures/paper/parchment.png'), 
    waxSeal: require('./textures/paper/wax_seal.png'),
  },
  wood: {
    // TODO: Add actual texture files to assets/textures/wood/
    oakTable: require('./textures/wood/oak_table.png'),
    darkOak: require('./textures/wood/dark_oak.png'),
  },
  book: {
    // TODO: Add actual texture files to assets/textures/book/
    coverLeather: require('./textures/book/cover_leather.png'),
    spine: require('./textures/book/spine.png'),
    openPages: require('./textures/book/open_pages.png'),
  }
};

export const Fonts = {
  // Serif fonts only (The Scribe's Decree)
  primary: 'CrimsonText-Regular',
  bold: 'CrimsonText-Bold',
  italic: 'CrimsonText-Italic',
};

// Async preload helper
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const loadGrimoireAssets = async () => {
  const imageAssets = [
    Textures.paper.parchment,
    Textures.paper.waxSeal,
    Textures.wood.oakTable,
    Textures.wood.darkOak,
    Textures.book.coverLeather,
    Textures.book.spine,
  ];

  const fontAssets = Font.loadAsync({
    [Fonts.primary]: require('./fonts/CrimsonText-Regular.ttf'),
    [Fonts.bold]: require('./fonts/CrimsonText-Bold.ttf'),
    [Fonts.italic]: require('./fonts/CrimsonText-Italic.ttf'),
  });

  await Promise.all([...imageAssets.map(image => Asset.fromModule(image).downloadAsync()), fontAssets]);
};
