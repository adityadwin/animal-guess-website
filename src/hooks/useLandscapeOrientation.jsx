import { useEffect } from "react";

const useLandscapeOrientation = () => {
  useEffect(() => {
    const lockOrientation = () => {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          console.log("Orientation lock not supported");
        });
      }
    };

    const handleOrientationChange = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        document.body.classList.add("rotate-landscape");
      } else {
        document.body.classList.remove("rotate-landscape");
      }
    };

    lockOrientation();
    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
};

export default useLandscapeOrientation;
