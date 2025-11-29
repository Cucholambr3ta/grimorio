import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withDelay,
  interpolate,
  Extrapolation,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Textures } from '../../../shared/assets/AssetManifest';

// [THE ARTIFICER] Performance Note:
// Using Reanimated 3 for 60fps UI thread animations.
// Avoid JS thread bridges during the opening sequence.

const { width, height } = Dimensions.get('window');

interface GrimoireOpeningProps {
  onOpenComplete: () => void;
}

export const GrimoireOpening: React.FC<GrimoireOpeningProps> = ({ onOpenComplete }) => {
  // Animation Values
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0); // 0 -> 90 (Open)
  const opacity = useSharedValue(1);
  const contentOpacity = useSharedValue(0);

  // The Ritual: Tap to Open
  const tapGesture = Gesture.Tap()
    .onStart(() => {
      // 1. Scale UP (Zoom into the book)
      scale.value = withSpring(3, { damping: 15 });
      
      // 2. Rotate (Open the cover)
      rotateY.value = withDelay(100, withTiming(90, { duration: 800 }));

      // 3. Fade out the book container
      opacity.value = withDelay(600, withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          runOnJS(onOpenComplete)();
        }
      }));
    });

  const animatedBookStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { perspective: 1000 },
        { rotateY: `${rotateY.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Background: The Wooden Table */}
      <ImageBackground 
        source={Textures.wood.oakTable} 
        style={styles.background}
        resizeMode="cover"
      >
        <GestureDetector gesture={tapGesture}>
          <Animated.View style={[styles.bookContainer, animatedBookStyle]}>
            {/* The Closed Grimoire */}
            <ImageBackground
              source={Textures.book.coverLeather}
              style={styles.bookCover}
              resizeMode="cover"
            >
              {/* Optional: Add a title or rune on the cover */}
              <View style={styles.spine} />
            </ImageBackground>
          </Animated.View>
        </GestureDetector>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Fallback for dark mode
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookContainer: {
    width: width * 0.6,
    height: height * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  bookCover: {
    flex: 1,
    borderRadius: 12, // Organic feel, not too sharp
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3e2723', // Dark wood border
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: '#2d1b15', // Darker spine
    borderRightWidth: 1,
    borderRightColor: '#5d4037',
  }
});
