import { ReactComponent as ArrowUpIcon } from "assets/icons/button/arrow-up.svg";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
