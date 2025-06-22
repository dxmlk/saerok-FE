import SaerokList from "features/saerok/components/saerok/SaerokList.js";
import SaerokMain from "features/saerok/components/saerok/SaerokMain.js";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ScrollToTopButton from "components/common/button/ScrollToTopButton.js";

const SaerokPage = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치에 따라 opacity 조정 (0~1 사이)
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 384);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] mb-120">
      <div className={clsx("transition-all ease-in-out")} style={{ opacity }}>
        <SaerokMain />
      </div>
      <div className="px-12">
        <SaerokList />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default SaerokPage;
