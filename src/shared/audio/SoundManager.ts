import { Audio } from 'expo-av';
import { Sounds } from '../assets/AssetManifest';

class SoundManager {
  private static instance: SoundManager;
  private backgroundMusic: Audio.Sound | null = null;
  private sfx: Record<string, Audio.Sound> = {};

  private constructor() {}

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  async playBackgroundMusic(source: any) {
    if (this.backgroundMusic) {
      await this.backgroundMusic.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(source, {
      shouldPlay: true,
      isLooping: true,
      volume: 0.5,
    });
    this.backgroundMusic = sound;
  }

  async playSfx(source: any) {
    try {
      const { sound } = await Audio.Sound.createAsync(source);
      await sound.playAsync();
      // Unload after playback to free resources (simplified)
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.warn("Failed to play SFX", error);
    }
  }

  async stopBackgroundMusic() {
    if (this.backgroundMusic) {
      await this.backgroundMusic.stopAsync();
    }
  }
}

export const soundManager = SoundManager.getInstance();
