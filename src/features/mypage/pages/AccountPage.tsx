import SimpleHeader from "components/common/SimpleHeader";
import { ReactComponent as LoginIcon } from "assets/icons/icon/login.svg";
import { ReactComponent as NoticeIcon } from "assets/icons/icon/notice.svg";
import { useState } from "react";
import Modal from "components/common/Modal";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[100dvh] bg-white">
      <SimpleHeader title={"내 계정 관리"} />
      <div className="flex flex-col gap-28 px-24 py-28">
        <div className="flex flex-row text-body-2 justify-between">
          <span className="text-font-black">연관된 소셜 로그인 계정</span>
          <span className="text-font-whitegrayDark">{user?.email}</span>
        </div>
        <div className="flex flex-row text-body-2 justify-between">
          <span className="text-font-black">가입일자</span>
          <span className="text-font-whitegrayDark">{user?.joinedDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-16 mt-12 px-24 ">
        <button
          onClick={() => setIsLogoutClicked(true)}
          className="active:opacity-70 transition-opacity duration-100 w-fit px-15 py-9 bg-background-whitegray rounded-30.5 gap-8 flex flex-row items-center"
        >
          <LoginIcon className="w-24 h-24 stroke-font-black" />
          <span className="text-body-2 text-font-black">로그아웃</span>
        </button>
        {/* <button
          onClick={() => setIsDeleteClicked(true)}
          className="w-fit px-15 py-9 bg-background-whitegray rounded-30.5 gap-8 flex flex-row items-center"
        >
          <NoticeIcon className="w-24 h-24 stroke-red" />
          <span className="text-body-2 text-font-black">회원 탈퇴</span>
        </button> */}
      </div>

      <AnimatePresence>
        {isLogoutClicked && (
          <Modal
            key="modal"
            maintext={"정말 로그아웃 하시겠어요?"}
            lefttext={"취소"}
            handleLeftClick={() => setIsLogoutClicked(false)}
            righttext={"로그아웃"}
            handleRightClick={() => {
              setIsLogoutClicked(false);
              logout();
              navigate("/");
            }}
          />
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {isDeleteClicked && (
          <Modal
            key="modal"
            maintext={"정말 탈퇴하시겠어요?"}
            subtext={"탈퇴 시 탐조 기록이 모두 삭제돼요."}
            lefttext={"탈퇴하기"}
            handleLeftClick={() => {
              setIsDeleteClicked(false);
              // 탈퇴 로직
            }}
            righttext={"돌아가기"}
            handleRightClick={() => setIsDeleteClicked(false)}
            isDeleted={true}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default AccountPage;
