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
  const fxSoundsRef = useRef({}); // Pisahkan Ref untuk SFX (Sound Effects)

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

  // Pisahkan inisialisasi SFX
  useEffect(() => {
    fxSoundsRef.current = {
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
      // Tambahkan suara feedback
      correct: new Howl({
        src: ["/assets/sounds/correct.mp3"],
        preload: true,
        html5: true,
        volume: 0.7,
      }),
      wrong: new Howl({
        src: ["/assets/sounds/wrong.mp3"],
        preload: true,
        html5: true,
        volume: 0.7,
      }),
    };
    return () => {
      Object.values(fxSoundsRef.current).forEach((sound) => {
        if (sound) {
          sound.unload();
        }
      });
      fxSoundsRef.current = {};
    };
  }, []);

  const stopAllAnimalSounds = useCallback(() => {
    // Hanya stop suara hewan, bukan feedback
    ["ular", "monyet", "harimau", "gajah", "merak"].forEach((animalId) => {
      const sound = fxSoundsRef.current[animalId];
      if (sound && sound.playing()) {
        sound.stop();
      }
    });
  }, []);

  const playAnimalSound = useCallback(
    (animal) => {
      if (isMuted || !fxSoundsRef.current[animal]) return;
      stopAllAnimalSounds(); // Hentikan suara hewan lain
      fxSoundsRef.current[animal].play();
    },
    [isMuted, stopAllAnimalSounds]
  );

  // Fungsi baru untuk suara feedback
  const playCorrectSound = useCallback(() => {
    if (isMuted || !fxSoundsRef.current.correct) return;
    fxSoundsRef.current.correct.play();
  }, [isMuted]);

  const playWrongSound = useCallback(() => {
    if (isMuted || !fxSoundsRef.current.wrong) return;
    fxSoundsRef.current.wrong.play();
  }, [isMuted]);

  // --- Fungsi BGM (playBgm, stopCurrentBgm) tetap sama ---
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

    // Mute/Unmute BGM
    const currentBgmSound = bgmSoundsRef.current[currentBgmType];
    if (currentBgmSound) {
      currentBgmSound.mute(newMuteState);
      if (newMuteState && currentBgmSound.playing()) {
        currentBgmSound.pause();
      } else if (!newMuteState && !currentBgmSound.playing()) {
        if (currentBgmSound.state() === "loaded") {
          currentBgmSound.play();
        } else {
          currentBgmSound.once("load", () => {
            if (
              !isMuted &&
              bgmSoundsRef.current[currentBgmType] === currentBgmSound
            ) {
              currentBgmSound.play();
            }
          });
          if (currentBgmSound.state() === "unloaded") {
            currentBgmSound.load();
          }
        }
      }
    }

    // Mute/Unmute semua SFX
    Object.values(fxSoundsRef.current).forEach((sound) => {
      if (sound) {
        sound.mute(newMuteState);
      }
    });
  }, [isMuted, currentBgmType]);

  const contextValue = useMemo(
    () => ({
      playAnimalSound,
      stopAllAnimalSounds,
      playCorrectSound, // <-- Export fungsi baru
      playWrongSound, // <-- Export fungsi baru
      playBgm,
      stopCurrentBgm,
      toggleMute,
      isMuted,
      currentBgmType,
    }),
    [
      playAnimalSound,
      stopAllAnimalSounds,
      playCorrectSound, // <-- Tambah dependency
      playWrongSound, // <-- Tambah dependency
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
