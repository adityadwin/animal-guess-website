import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ControlButton from "../components/ControlButton";
// Hapus import useLandscapeOrientation
import { useSound } from "../contexts/SoundContext";

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

const Sing = () => {
  // Hapus panggilan useLandscapeOrientation();
  const videoRef = useRef(null);
  const { isMuted, playBgm } = useSound();

  useEffect(() => {
    playBgm(null);
  }, [playBgm]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
      <div className="z-10 mb-6 sm:mb-8">
        <Link to="/">
          <ControlButton icon={<BackIcon />} ariaLabel="Back to home" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center z-10">
        {" "}
        {/* Container agar judul & video terpusat */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-amber-500"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
        >
          Ayo Bernyanyi Bersama!
        </h1>
        {/* Kontainer Video dengan Batasan Tinggi */}
        <div className="w-full max-w-4xl flex-1 flex items-center justify-center mb-4">
          {/* Beri max-h pada parent video, kurangi padding/margin/header */}
          <div className="bg-black bg-opacity-40 p-1 sm:p-2 rounded-lg w-full shadow-xl max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-15rem)]">
            <video
              ref={videoRef}
              src="/assets/videos/animal-song.mp4"
              controls
              className="w-full h-full object-contain rounded" // h-full & object-contain agar pas dgn parent
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sing;
