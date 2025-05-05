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
      <div className="absolute inset-0"></div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        <h1
          className="text-5xl sm:text-5xl md:text-6xl lg:text-9xl font-bold mb-8 sm:mb-12 text-[#ffe98d] text-center" // Ukuran teks responsif
        >
          حَدِيقَةُ الحَيَوَانَاتِ
        </h1>

        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 px-4 sm:px-6 flex flex-col items-center space-y-4 sm:space-y-6 mb-8 md:mb-0">
            <Link
              to="/guess"
              className="w-full max-w-xl block hover:scale-[1.03] transition-transform duration-150 ease-in-out"
            >
              {/* Div Luar (Bingkai Kayu Terang) */}
              <div
                className="rounded-full p-1.5 sm:p-2 " // Bentuk kapsul, padding sebagai lebar border
                style={{
                  backgroundImage: "url(/assets/images/wood-light.jpg)", // Ganti dgn path gambar Anda jika beda
                  backgroundSize: "cover", // atau 'repeat' jika tileable
                  backgroundPosition: "center",
                }}
              >
                {/* Div Dalam (Background Kayu Gelap) */}
                <div
                  className="rounded-full px-4 py-2 sm:py-3 text-center" // Sedikit lebih tumpul, padding teks
                  style={{
                    backgroundImage: "url(/assets/images/wood-dark.jpg)", // Ganti dgn path gambar Anda jika beda
                    backgroundSize: "cover", // atau 'repeat' jika tileable
                    backgroundPosition: "center",
                  }}
                >
                  {/* Teks Tombol */}
                  <span
                    className="font-bold text-4xl sm:text-2xl lg:text-5xl text-[#ec8505] block select-none" // Warna teks kuning
                    // Efek shadow/outline coklat tua
                  >
                    Siapa yang Bersuara?
                  </span>
                </div>
              </div>
            </Link>

            {/* --- Tombol "Ayo Bernyanyi Bersama!" (Gaya Baru) --- */}
            <Link
              to="/sing"
              className="w-full max-w-xl block hover:scale-[1.03] transition-transform duration-150 ease-in-out"
            >
              {/* Div Luar (Bingkai Kayu Terang) */}
              <div
                className="rounded-full p-1.5 sm:p-2"
                style={{
                  backgroundImage: "url(/assets/images/wood-light.jpg)", // Ganti dgn path gambar Anda jika beda
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Div Dalam (Background Kayu Gelap) */}
                <div
                  className="rounded-full px-4 py-2 sm:py-3 text-center"
                  style={{
                    backgroundImage: "url(/assets/images/wood-dark.jpg)", // Ganti dgn path gambar Anda jika beda
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Teks Tombol */}
                  <span
                    className="font-bold text-3xl sm:text-2xl lg:text-5xl text-[#ec8505] block select-none" // Warna teks kuning
                    // Efek shadow/outline coklat tua
                  >
                    Ayo Bernyanyi Bersama!
                  </span>
                </div>
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
