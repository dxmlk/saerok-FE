import { ReactComponent as ArrowUpIcon } from "assets/icons/button/arrow-up.svg";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      /// 디바이스 높이 넘으면 show = true
      setShow(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <>
      <button
        onClick={scrollToTop}
        className="fixed bottom-120 right-24 z-50 w-40 h-40 bg-glassmorphism rounded-full flex justify-center items-center"
      >
        <ArrowUpIcon className="w-24 h-24 stroke-black" />
      </button>
    </>
  );
};

export default ScrollToTopButton;
