import SaerokHeader from "features/saerok/components/saerok/SaerokHeader";
import SaerokList from "features/saerok/components/saerok/SaerokList";
import SaerokMain from "features/saerok/components/saerok/SaerokMain";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ScrollToTopButton from "components/common/button/ScrollToTopButton";

const SaerokPage = () => {
  const [opacity, setOpacity] = useState(1);
  const [showMain, setShowMain] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (showMain) {
        const newOpacity = Math.max(0, 1 - scrollY / 300);
        setOpacity(newOpacity);

        if (scrollY > 362) {
          setShowMain(false);
          setShowHeader(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showMain]);

  return (
    <div className="min-h-[100dvh] pb-120">
      {showMain && (
        <div className={clsx("transition-all ease-in-out")} style={{ opacity }}>
          <SaerokMain />
        </div>
      )}

      {showHeader && (
        <div className={clsx("transition-all ease-in-out opacity-100 translate-y-0")}>
          <SaerokHeader />
          <div className="h-72" />
        </div>
      )}

      <div className="px-12">
        <SaerokList />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default SaerokPage;
