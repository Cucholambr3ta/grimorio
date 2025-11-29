jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('./src/shared/assets/AssetManifest', () => ({
  Fonts: {
    primary: 'System',
    bold: 'System-Bold',
    italic: 'System-Italic',
  },
  Textures: {
    paper: { parchment: { uri: 'mock' }, waxSeal: { uri: 'mock' } },
    wood: { oakTable: { uri: 'mock' }, darkOak: { uri: 'mock' } },
    book: { coverLeather: { uri: 'mock' }, spine: { uri: 'mock' }, openPages: { uri: 'mock' } },
  },
}));
