import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "../contexts/SoundContext";
import ControlButton from "../components/ControlButton";
import Button from "../components/Button";
// Hapus import useLandscapeOrientation

// --- Komponen Ikon (BackIcon, SoundIcon, PlaySoundIcon) ---
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);
const SoundIcon = ({ isMuted }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={
        isMuted
          ? "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          : "M15.536 8.464a5 5 0 010 7.072M12 18a6 6 0 01-7.743-9M12 18c-3.866 0-7-3.272-7-7a7 7 0 017-7 7 7 0 017 7M12 6v12"
      }
    />
  </svg>
);
const PlaySoundIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 sm:h-10 sm:w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- Array animals (sudah diperbaiki sebelumnya) ---
const animals = [
  { id: "ular", name: "ثعبان", img: "/assets/images/ular.png", sound: "ular" },
  {
    id: "monyet",
    name: "قرد",
    img: "/assets/images/monyet.png",
    sound: "monyet",
  },
  {
    id: "harimau",
    name: "نمر",
    img: "/assets/images/harimau.png",
    sound: "harimau",
  },
  { id: "gajah", name: "فيل", img: "/assets/images/gajah.png", sound: "gajah" },
  {
    id: "merak",
    name: "طاووس",
    img: "/assets/images/merak.png",
    sound: "merak",
  },
  { id: "buaya", name: "تمساح", img: "/assets/images/buaya.png", sound: null },
  {
    id: "zebra",
    name: "حمار وحشي",
    img: "/assets/images/zebra.png",
    sound: null,
  },
  {
    id: "jerapah",
    name: "زرافة",
    img: "/assets/images/jerapah.png",
    sound: null,
  },
  {
    id: "kancil",
    name: "أيل الفأر",
    img: "/assets/images/kancil.png",
    sound: null,
  },
  { id: "burung", name: "طائر", img: "/assets/images/burung.png", sound: null },
];

// --- Fungsi shuffleArray, getRandomAnimalsWithSound, getPairForQuestion ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const getRandomAnimalsWithSound = () => {
  const animalsWithSound = animals.filter((animal) => animal.sound);
  const count = Math.min(5, animalsWithSound.length);
  return shuffleArray(animalsWithSound).slice(0, count);
};
const getPairForQuestion = (correctAnimal) => {
  const wrongAnimals = animals.filter(
    (animal) => animal.id !== correctAnimal.id
  );
  if (wrongAnimals.length === 0) {
    return [correctAnimal, correctAnimal];
  }
  const randomWrongAnimal =
    wrongAnimals[Math.floor(Math.random() * wrongAnimals.length)];
  return Math.random() > 0.5
    ? [correctAnimal, randomWrongAnimal]
    : [randomWrongAnimal, correctAnimal];
};

const GuessGame = () => {
  // Hapus panggilan useLandscapeOrientation();
  const { playBgm, playAnimalSound, stopAllAnimalSounds, toggleMute, isMuted } =
    useSound();
  const [gameQuestions, setGameQuestions] = useState([]);
  const [questionPairs, setQuestionPairs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPair, setCurrentPair] = useState([]);
  const [correctAnimal, setCorrectAnimal] = useState(null);
  const [showWrong, setShowWrong] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Effect setup game (dependensi kosong)
  useEffect(() => {
    playBgm("guess");
    const questions = getRandomAnimalsWithSound();
    setGameQuestions(questions);
    if (questions.length > 0) {
      const pairs = questions.map((q) => getPairForQuestion(q));
      setQuestionPairs(pairs);
    } else {
      setQuestionPairs([]);
    }
    return () => {
      stopAllAnimalSounds();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect update soal/pair
  useEffect(() => {
    if (
      questionPairs.length > 0 &&
      currentQuestionIndex < questionPairs.length
    ) {
      const currentQuestion = gameQuestions[currentQuestionIndex];
      const pair = questionPairs[currentQuestionIndex];
      setCorrectAnimal(currentQuestion);
      setCurrentPair(pair);
      setShowWrong(false);
    } else if (
      gameQuestions.length > 0 &&
      currentQuestionIndex >= gameQuestions.length &&
      !gameComplete
    ) {
      setGameComplete(true);
    }
  }, [gameQuestions, currentQuestionIndex, questionPairs, gameComplete]);

  // --- Fungsi Handler (handleAnimalClick, handlePlaySound, handleRestart) ---
  const handleAnimalClick = (animal) => {
    if (gameComplete || showWrong) return;
    if (animal.id === correctAnimal.id) {
      stopAllAnimalSounds();
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameComplete(true);
      }
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 500);
    }
  };
  const handlePlaySound = () => {
    if (correctAnimal && correctAnimal.sound) {
      playAnimalSound(correctAnimal.sound);
    }
  };
  const handleRestart = () => {
    stopAllAnimalSounds();
    const newQuestions = getRandomAnimalsWithSound();
    let newPairs = [];
    if (newQuestions.length > 0) {
      newPairs = newQuestions.map((q) => getPairForQuestion(q));
    }
    setGameQuestions(newQuestions);
    setQuestionPairs(newPairs);
    setCurrentQuestionIndex(0);
    setCorrectAnimal(null);
    setCurrentPair(newPairs[0] || []);
    setGameComplete(false);
    setShowWrong(false);
    playBgm("guess");
  };

  // --- Render Loading ---
  if (
    gameQuestions.length === 0 ||
    questionPairs.length === 0 ||
    (!correctAnimal && !gameComplete && currentPair.length === 0)
  ) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(/assets/images/hutan.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        ></div>{" "}
        <div className="text-2xl text-white bg-black bg-opacity-50 p-4 rounded z-10">
          Loading...
        </div>{" "}
      </div>
    );
  }

  // --- Render JSX ---
  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-auto p-4 sm:p-6" // Ganti overflow-hidden -> overflow-auto, sesuaikan padding
      style={{
        backgroundImage: `url(/assets/images/hutan.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      ></div>

      {/* Header Tombol Kontrol */}
      <div className="z-10 flex justify-between mb-6 sm:mb-8">
        <div className="flex space-x-3 sm:space-x-4">
          <Link to="/">
            {" "}
            <ControlButton icon={<BackIcon />} ariaLabel="Back to home" />{" "}
          </Link>
          <ControlButton
            icon={<SoundIcon isMuted={isMuted} />}
            onClick={toggleMute}
            ariaLabel={isMuted ? "Unmute" : "Mute"}
          />
        </div>
      </div>

      {!gameComplete ? (
        // Tampilan Game Berlangsung
        <div className="flex-1 flex flex-col">
          {" "}
          {/* Container utama game agar bisa push footer */}
          <h1
            className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-amber-500 z-10"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
          >
            Siapa yang Bersuara?
          </h1>
          {/* Area Pilihan Hewan & Tombol Suara */}
          <div className="flex-1 flex justify-around items-center z-10 mb-4">
            {/* Pilihan Hewan Kiri */}
            <div className="w-[30%] sm:w-1/3 flex flex-col items-center">
              {currentPair.length > 0 && currentPair[0] && (
                <div
                  className={`cursor-pointer transition-transform duration-100 ${
                    showWrong && currentPair[0].id !== correctAnimal?.id
                      ? "shake"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleAnimalClick(currentPair[0])}
                >
                  <img
                    src={currentPair[0].img}
                    alt={currentPair[0].name}
                    className="w-auto max-h-[35vh] object-contain"
                  />{" "}
                  {/* Max Height relatif VH */}
                </div>
              )}
              {currentPair.length > 0 && currentPair[0] && (
                <p
                  className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center"
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {currentPair[0].name}
                </p>
              )}
            </div>

            {/* Tombol Play Suara di Tengah */}
            <div className="flex justify-center items-center">
              {" "}
              {/* Tanpa width agar fleksibel */}
              <button
                onClick={handlePlaySound}
                aria-label="Play animal sound"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition-colors"
              >
                <PlaySoundIcon />
              </button>
            </div>

            {/* Pilihan Hewan Kanan */}
            <div className="w-[30%] sm:w-1/3 flex flex-col items-center">
              {currentPair.length > 1 && currentPair[1] && (
                <div
                  className={`cursor-pointer transition-transform duration-100 ${
                    showWrong && currentPair[1].id !== correctAnimal?.id
                      ? "shake"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleAnimalClick(currentPair[1])}
                >
                  <img
                    src={currentPair[1].img}
                    alt={currentPair[1].name}
                    className="w-auto max-h-[35vh] object-contain"
                  />{" "}
                  {/* Max Height relatif VH */}
                </div>
              )}
              {currentPair.length > 1 && currentPair[1] && (
                <p
                  className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center"
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {currentPair[1].name}
                </p>
              )}
            </div>
          </div>
          {/* Indikator Soal (Footer) */}
          <div className="mt-auto w-full flex justify-center z-10 pb-4">
            <div className="bg-white bg-opacity-70 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
              <p className="text-base sm:text-lg">
                {" "}
                Soal {currentQuestionIndex + 1} dari {gameQuestions.length}{" "}
              </p>
            </div>
          </div>
        </div> // Akhir container utama game
      ) : (
        // Tampilan Game Selesai
        <div className="flex-1 flex flex-col items-center justify-center z-10 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-green-500"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
          >
            {" "}
            Selamat!{" "}
          </h2>
          <p
            className="text-xl md:text-2xl mb-8 text-white"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            {" "}
            Kamu telah menyelesaikan semua soal.{" "}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Button onClick={handleRestart} className="w-full sm:w-auto">
              Main Lagi
            </Button>
            <Link to="/" className="w-full sm:w-auto">
              {" "}
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Kembali ke Menu
              </Button>{" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessGame;
