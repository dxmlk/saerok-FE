import { ReactComponent as NoticeIcon } from "assets/icons/notice.svg";
import { motion } from "framer-motion";

interface ModalProps {
  maintext: string;
  subtext?: string;
  lefttext: string;
  handleLeftClick: () => void;
  righttext: string;
  handleRightClick: () => void;
  isDeleted?: boolean; // 계정 탈퇴 시에만 사용, 탈퇴하기 버튼 빨간색으로 구현하기 위해서
}

const Modal = ({
  maintext,
  subtext,
  lefttext,
  handleLeftClick,
  righttext,
  handleRightClick,
  isDeleted = false,
}: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="w-316 bg-white rounded-10  flex flex-col items-center justify-center gap-15 px-16 py-18 z-20">
            <NoticeIcon className="w-30 h-30 text-mainBlue" />
            <div className="text-center flex flex-col gap-6 ">
              <div className="text-body-3 text-black font-moneygraphy">{maintext}</div>
              {subtext && (
                <div className="text-body-2 text-font-darkgray font-pretendard whitespace-pre-line ">{subtext}</div>
              )}
            </div>
            <div className="mt-5 flex flex-row px-4 justify-between gap-16 w-full">
              <button
                onClick={handleLeftClick}
                className={`w-128 h-40 border-1.5 rounded-10 bg-white text-center ${isDeleted ? "border-red text-red" : "border-mainBlue  text-mainBlue"} `}
              >
                {lefttext}
              </button>
              <button
                onClick={handleRightClick}
                className="w-128 h-40 border-none rounded-10 text-center bg-mainBlue text-white"
              >
                {righttext}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
