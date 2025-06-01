import { ReactComponent as AppleIcon } from "assets/icons/logo/apple.svg";
import { ReactComponent as KakaoIcon } from "assets/icons/logo/kakao.svg";
import { ReactComponent as NoticeIcon } from "assets/icons/notice.svg";
import { is } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "servies/api/auth/kakaoLogin";

const Modal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  return (
    <>
      <div className="fixed inset-0 bg-white z-40"></div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-10 w-316 h-200 flex flex-col items-center justify-center gap-15 px-16 py-18">
          <NoticeIcon className="w-30 h-30 text-mainBlue" />
          <div className="text-center flex flex-col gap-6 ">
            <div className="text-body-3 text-black font-moneygraphy">로그인 없이 이용하시겠어요?</div>
            <div className="text-body-2 text-font-darkgray font-pretendard ">도감과 지도만 열람할 수 있어요!</div>
          </div>
          <div className="mt-5 flex flex-row  px-4 justify-between gap-16 w-full">
            <button
              onClick={onClose}
              className="w-full h-40 border-1.5 rounded-10 border-mainBlue text-center text-mainBlue bg-white"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="w-full h-40 border-none rounded-10 text-center bg-mainBlue text-white"
            >
              계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="px-24 flex flex-col justify-center gap-10 font-pretendard font-600 text-20">
        <div className="flex flex-row h-54 w-full bg-black text-white gap-15 items-center justify-center rounded-10 ">
          <AppleIcon />
          <div>Apple로 계속하기</div>
        </div>
        <div
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          className="flex flex-row h-54 w-full bg-[#FEE500] text-black gap-5 items-center justify-center rounded-10 "
        >
          <KakaoIcon />
          <div>카카오로 계속하기</div>
        </div>
      </div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="mt-28 text-subtitle-3 flex justify-center text-font-whitegrayDark cursor-pointer"
      >
        로그인 없이 이용하기
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            navigate("/map");
          }}
        />
      )}
    </>
  );
};

export default Login;
