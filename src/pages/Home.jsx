import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "../contexts/SoundContext";
// Hapus import useLandscapeOrientation

const Home = () => {
  // Hapus panggilan useLandscapeOrientation();
  const { playBgm } = useSound();

  useEffect(() => {
    playBgm("home");
  }, [playBgm]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-auto p-4 sm:p-6" // Ganti overflow-hidden -> overflow-auto, sesuaikan padding
      style={{
        backgroundImage: `url(/assets/images/hutan.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Agar background tidak ikut scroll
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} // Sedikit lebih gelap overlaynya
      ></div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-12 text-yellow-300 text-center" // Ukuran teks responsif
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          حَدِيقَةُ الحَيَوَانَاتِ
        </h1>

        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 px-4 sm:px-6 flex flex-col items-center space-y-4 sm:space-y-6 mb-8 md:mb-0">
            <Link to="/guess" className="w-full max-w-xs">
              <div className="bg-amber-700 rounded-full py-3 sm:py-4 px-6 text-center text-lg sm:text-xl font-bold text-white hover:bg-amber-800 transition-colors shadow-lg">
                Siapa yang Bersuara?
              </div>
            </Link>
            <Link to="/sing" className="w-full max-w-xs">
              <div className="bg-teal-600 rounded-full py-3 sm:py-4 px-6 text-center text-lg sm:text-xl font-bold text-white hover:bg-teal-700 transition-colors shadow-lg">
                Ayo Bernyanyi Bersama!
              </div>
            </Link>
          </div>

          <div className="w-full md:w-1/2 px-4 sm:px-6 flex justify-center">
            <img
              src="/assets/images/zoo.png"
              alt="Ilustrasi Hewan Kebun Binatang"
              className="w-auto max-h-[40vh] sm:max-h-[50vh] object-contain drop-shadow-xl" // Gunakan max-h viewport height, w-auto
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
