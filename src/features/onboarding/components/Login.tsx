import { ReactComponent as AppleIcon } from "assets/icons/logo/apple.svg";
import { ReactComponent as KakaoIcon } from "assets/icons/logo/kakao.svg";
import Modal from "components/common/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "servies/api/auth/kakaoLogin";
import { AnimatePresence } from "framer-motion";

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

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            key="modal"
            maintext={"로그인 없이 이용하시겠어요?"}
            subtext={"도감과 지도만 열람할 수 있어요!"}
            lefttext={"취소"}
            handleLeftClick={() => setIsModalOpen(false)}
            righttext={"계속하기"}
            handleRightClick={() => {
              setIsModalOpen(false);
              navigate("/map");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
