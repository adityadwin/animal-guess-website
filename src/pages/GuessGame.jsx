import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "../contexts/SoundContext";
import ControlButton from "../components/ControlButton";
import Button from "../components/Button";
// Hapus import useLandscapeOrientation jika tidak dipakai lagi

// --- Komponen Ikon ---
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
    strokeWidth={2}
  >
    {" "}
    {isMuted ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    )}{" "}
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

// --- Ikon Feedback Baru ---
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-20 w-20 sm:h-24 sm:w-24 text-green-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-20 w-20 sm:h-24 sm:w-24 text-red-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Array animals ---
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
    id: "Rusa",
    name: "غَزَالٌ",
    img: "/assets/images/rusa.png",
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
  // Hapus useLandscapeOrientation(); jika tidak dipakai
  const {
    playBgm,
    playAnimalSound,
    stopAllAnimalSounds,
    playCorrectSound,
    playWrongSound,
    toggleMute,
    isMuted,
  } = useSound(); // <-- Ambil playCorrectSound & playWrongSound
  const [gameQuestions, setGameQuestions] = useState([]);
  const [questionPairs, setQuestionPairs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPair, setCurrentPair] = useState([]);
  const [correctAnimal, setCorrectAnimal] = useState(null);
  const [showWrong, setShowWrong] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState(null); // <-- State baru untuk feedback ('correct', 'wrong', null)
  const [isAnswering, setIsAnswering] = useState(false); // <-- State untuk mencegah klik ganda saat feedback

  // Effect setup game
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
      setIsAnswering(false); // Izinkan menjawab lagi
    } else if (
      gameQuestions.length > 0 &&
      currentQuestionIndex >= gameQuestions.length &&
      !gameComplete
    ) {
      setGameComplete(true);
    }
  }, [gameQuestions, currentQuestionIndex, questionPairs, gameComplete]);

  // --- Modifikasi handleAnimalClick ---
  const handleAnimalClick = (animal) => {
    // Cegah klik ganda saat feedback tampil atau game selesai
    if (isAnswering || gameComplete || showWrong) return;

    setIsAnswering(true); // Mulai proses menjawab
    stopAllAnimalSounds(); // Hentikan suara hewan (jika ada)

    if (animal.id === correctAnimal.id) {
      // --- Jawaban Benar ---
      playCorrectSound(); // Mainkan suara benar
      setFeedback("correct"); // Tampilkan ikon benar

      setTimeout(() => {
        setFeedback(null); // Sembunyikan ikon
        if (currentQuestionIndex < gameQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1); // Lanjut soal berikutnya
        } else {
          setGameComplete(true); // Selesaikan game
        }
        // setIsAnswering(false) akan di-set oleh useEffect [currentQuestionIndex]
      }, 1500); // Durasi feedback benar (1.5 detik)
    } else {
      // --- Jawaban Salah ---
      playWrongSound(); // Mainkan suara salah
      setFeedback("wrong"); // Tampilkan ikon salah
      setShowWrong(true); // Terapkan animasi shake

      setTimeout(() => {
        setFeedback(null); // Sembunyikan ikon
        setShowWrong(false); // Hentikan animasi shake
        setIsAnswering(false); // Izinkan menjawab lagi
      }, 1500); // Durasi feedback salah (1.5 detik)
    }
  };

  const handlePlaySound = () => {
    if (correctAnimal && correctAnimal.sound && !isAnswering) {
      playAnimalSound(correctAnimal.sound);
    }
  }; // Cegah play sound saat feedback
  const handleRestart = () => {
    stopAllAnimalSounds();
    setFeedback(null);
    setIsAnswering(false);
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
      ></div>
    );
  }

  // --- Render JSX Utama ---
  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-auto p-4 sm:p-6"
      style={{
        backgroundImage: `url(/assets/images/hutan.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* --- Container Feedback Overlay --- */}
      {feedback && (
        <div className="absolute inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white bg-opacity-80 p-4 sm:p-6 rounded-full shadow-xl">
            {feedback === "correct" && <CheckCircleIcon />}
            {feedback === "wrong" && <XCircleIcon />}
          </div>
        </div>
      )}
      {/* --- Akhir Container Feedback --- */}

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
        <div className="flex-1 flex flex-col">
          <h1
            className="text-5xl lg:text-6xl sm:text-4xl md:text-6xl font-bold text-center mt-16 mb-6 sm:mb-10 text-amber-500 z-10"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
          >
            Siapa yang Bersuara?
          </h1>
          <div className="flex-1 flex justify-around items-end z-10 mb-4 pb-4">
            <div className="w-[30%] sm:w-1/3 flex flex-col items-center">
              {currentPair.length > 0 && currentPair[0] && (
                <div
                  className={`cursor-pointer transition-transform duration-100 ${
                    showWrong &&
                    currentPair[0].id !== correctAnimal?.id &&
                    feedback === "wrong"
                      ? "shake"
                      : "hover:scale-105"
                  } ${isAnswering ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() => handleAnimalClick(currentPair[0])}
                >
                  <img
                    src={currentPair[0].img}
                    alt={currentPair[0].name}
                    className="w-auto max-h-[35vh] sm:max-h-[40vh] object-contain"
                  />
                </div>
              )}
              {currentPair.length > 0 && currentPair[0] && (
                <p
                  className={`mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center ${
                    isAnswering ? "opacity-50" : ""
                  }`}
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {currentPair[0].name}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center pb-4 sm:pb-6">
              <button
                onClick={handlePlaySound}
                aria-label="Play animal sound"
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white transition-opacity duration-300 ${
                  isAnswering
                    ? "opacity-50 pointer-events-none"
                    : "hover:bg-yellow-600"
                }`}
              >
                <PlaySoundIcon />
              </button>
            </div>
            <div className="w-[30%] sm:w-1/3 flex flex-col items-center">
              {currentPair.length > 1 && currentPair[1] && (
                <div
                  className={`cursor-pointer transition-transform duration-100 ${
                    showWrong &&
                    currentPair[1].id !== correctAnimal?.id &&
                    feedback === "wrong"
                      ? "shake"
                      : "hover:scale-105"
                  } ${isAnswering ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() => handleAnimalClick(currentPair[1])}
                >
                  <img
                    src={currentPair[1].img}
                    alt={currentPair[1].name}
                    className="w-auto max-h-[35vh] sm:max-h-[40vh] object-contain"
                  />
                </div>
              )}
              {currentPair.length > 1 && currentPair[1] && (
                <p
                  className={`mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center ${
                    isAnswering ? "opacity-50" : ""
                  }`}
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {currentPair[1].name}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
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
