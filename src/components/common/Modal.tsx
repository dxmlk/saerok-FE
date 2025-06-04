import { ReactComponent as NoticeIcon } from "assets/icons/notice.svg";

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
      <div className="fixed inset-0 bg-transparent z-40"></div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-10 w-316 h-200 flex flex-col items-center justify-center gap-15 px-16 py-18">
          <NoticeIcon className="w-30 h-30 text-mainBlue" />
          <div className="text-center flex flex-col gap-6 ">
            <div className="text-body-3 text-black font-moneygraphy">{maintext}</div>
            {subtext && <div className="text-body-2 text-font-darkgray font-pretendard ">{subtext}</div>}
          </div>
          <div className="mt-5 flex flex-row  px-4 justify-between gap-16 w-full">
            <button
              onClick={handleLeftClick}
              className={`w-full h-40 border-1.5 rounded-10 bg-white text-center ${isDeleted ? "border-red text-red" : "border-mainBlue  text-mainBlue"} `}
            >
              {lefttext}
            </button>
            <button
              onClick={handleRightClick}
              className="w-full h-40 border-none rounded-10 text-center bg-mainBlue text-white"
            >
              {righttext}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
