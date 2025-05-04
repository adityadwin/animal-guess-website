import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Howl } from "howler";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentBgmType, setCurrentBgmType] = useState(null);
  const bgmSoundsRef = useRef({});
  const animalSoundsRef = useRef({});

  useEffect(() => {
    bgmSoundsRef.current = {
      home: new Howl({
        src: ["/assets/sounds/home_bgm.mp3"],
        loop: true,
        volume: 0.4,
        html5: true,
        preload: true,
      }),
      guess: new Howl({
        src: ["/assets/sounds/guess_bgm.mp3"],
        loop: true,
        volume: 0.4,
        html5: true,
        preload: true,
      }),
    };
    return () => {
      Object.values(bgmSoundsRef.current).forEach((sound) => {
        if (sound) {
          sound.stop();
          sound.unload();
        }
      });
      bgmSoundsRef.current = {};
    };
  }, []);

  useEffect(() => {
    animalSoundsRef.current = {
      ular: new Howl({
        src: ["/assets/sounds/ular.mp3"],
        preload: true,
        html5: true,
        volume: 0.8,
      }),
      monyet: new Howl({
        src: ["/assets/sounds/monyet.mp3"],
        preload: true,
        html5: true,
        volume: 0.8,
      }),
      harimau: new Howl({
        src: ["/assets/sounds/harimau.mp3"],
        preload: true,
        html5: true,
        volume: 0.8,
      }),
      gajah: new Howl({
        src: ["/assets/sounds/gajah.mp3"],
        preload: true,
        html5: true,
        volume: 0.8,
      }),
      merak: new Howl({
        src: ["/assets/sounds/merak.mp3"],
        preload: true,
        html5: true,
        volume: 0.8,
      }),
    };
    return () => {
      Object.values(animalSoundsRef.current).forEach((sound) => {
        if (sound) {
          sound.unload();
        }
      });
      animalSoundsRef.current = {};
    };
  }, []);

  const stopAllAnimalSounds = useCallback(() => {
    Object.values(animalSoundsRef.current).forEach((sound) => {
      if (sound && sound.playing()) {
        sound.stop();
      }
    });
  }, []);

  const playAnimalSound = useCallback(
    (animal) => {
      if (isMuted || !animalSoundsRef.current[animal]) return;
      stopAllAnimalSounds();
      animalSoundsRef.current[animal].play();
    },
    [isMuted, stopAllAnimalSounds]
  );

  const playBgm = useCallback(
    (type) => {
      const soundToPlay = type ? bgmSoundsRef.current[type] : null;
      const currentSound = bgmSoundsRef.current[currentBgmType];

      if (currentBgmType === type) {
        if (soundToPlay) {
          soundToPlay.mute(isMuted);
          if (
            !isMuted &&
            !soundToPlay.playing() &&
            soundToPlay.state() === "loaded"
          ) {
            soundToPlay.play();
          }
        }
        return;
      }

      if (currentSound) {
        currentSound.stop();
      }

      if (soundToPlay) {
        setCurrentBgmType(type);
        soundToPlay.mute(isMuted);
        if (!isMuted) {
          if (soundToPlay.state() === "loaded") {
            soundToPlay.play();
          } else {
            soundToPlay.once("load", () => {
              if (!isMuted && currentBgmType === type) {
                soundToPlay.play();
              }
            });
            if (soundToPlay.state() === "unloaded") {
              soundToPlay.load();
            }
          }
        }
      } else {
        setCurrentBgmType(null);
      }
    },
    [currentBgmType, isMuted]
  );

  const stopCurrentBgm = useCallback(() => {
    const currentSound = bgmSoundsRef.current[currentBgmType];
    if (currentSound) {
      currentSound.stop();
    }
    setCurrentBgmType(null);
  }, [currentBgmType]);

  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    const currentSound = bgmSoundsRef.current[currentBgmType];

    if (currentSound) {
      currentSound.mute(newMuteState);
      if (newMuteState) {
        if (currentSound.playing()) {
          currentSound.pause();
        }
      } else {
        if (!currentSound.playing()) {
          if (currentSound.state() === "loaded") {
            currentSound.play();
          } else {
            currentSound.once("load", () => {
              if (
                !isMuted &&
                bgmSoundsRef.current[currentBgmType] === currentSound
              ) {
                currentSound.play();
              }
            });
            if (currentSound.state() === "unloaded") {
              currentSound.load();
            }
          }
        }
      }
    }

    Object.values(animalSoundsRef.current).forEach((sound) => {
      if (sound) {
        sound.mute(newMuteState);
      }
    });
  }, [isMuted, currentBgmType]);

  const contextValue = useMemo(
    () => ({
      playAnimalSound,
      stopAllAnimalSounds,
      playBgm,
      stopCurrentBgm,
      toggleMute,
      isMuted,
      currentBgmType,
    }),
    [
      playAnimalSound,
      stopAllAnimalSounds,
      playBgm,
      stopCurrentBgm,
      toggleMute,
      isMuted,
      currentBgmType,
    ]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
