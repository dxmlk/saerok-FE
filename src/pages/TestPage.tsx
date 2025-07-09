import { useEffect, useState } from "react";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import NicknameInput from "features/mypage/components/NicknameInput";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/common/LoadingScreen";
import { updateUserInfo } from "services/api/user";

const TestPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const location = useLocation();
  const { user, loading } = useAuth();
  return (
    <div className="h-[100dvh] w-full px-24 bg-white">
      <div className="h-76 w-full bg-background-white flex items-center justify-start  ">
        <BackIcon onClick={() => navigate(-1)} className="h-17 w-17" />
      </div>
      <div className="mt-24 mb-54 text-font-black text-headline-1 font-moneygraphy">회원가입</div>
      <div className="flex flex-col gap-7 font-pretendard">
        <div className="ml-12 ">닉네임 입력(필수)</div>
        {/* NicknameInput에서 사용자가 입력한 닉네임을 상태로 업데이트 */}
        <NicknameInput nickname={nickname} setNickname={setNickname} />
      </div>

      <div
        className="cursor-pointer fixed max-w-432 left-1/2 translate-x-[-50%] w-full bottom-44 bg-mainBlue h-52  rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white"
        style={{ width: "calc(100% - 3rem)" }}
      >
        다음
      </div>
    </div>
  );
};

export default TestPage;
