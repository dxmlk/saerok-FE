import { useEffect, useState } from "react";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import NicknameInput from "features/mypage/components/NicknameInput";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/common/LoadingScreen";
import { updateUserInfo } from "services/api/user";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) <LoadingScreen />;

    // 카카오 콜백이 아니면 로그인 페이지로 강제 이동
    if (!location.state || !location.state.fromKakao) {
      navigate("/login", { replace: true });
    }

    // 닉네임이 이미 등록된 유저면 saerok으로 이동
    if (user && user.nickname) {
      navigate("/saerok", { replace: true });
      return;
    }
  }, [user, loading, location, navigate]);

  // 닉네임 수정
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // API 요청 보내기
      const result = await updateUserInfo({ nickname });

      if (result && result.nickname) {
        setSubmitted(true); // 회원가입 완료 상태로 변경
      }
    } catch (error) {
      // console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full px-24 bg-white">
      {!submitted && (
        <>
          <div className="h-76 w-full bg-background-white flex items-center justify-start  ">
            <BackIcon onClick={() => navigate(-1)} className="h-17 w-17" />
          </div>
          <div className="mt-24 mb-54 text-font-black text-headline-1 font-moneygraphy">회원가입</div>
          <div className="flex flex-col gap-7 font-pretendard">
            <div className="ml-12 ">닉네임 입력(필수)</div>
            {/* NicknameInput에서 사용자가 입력한 닉네임을 상태로 업데이트 */}
            <NicknameInput nickname={nickname} setNickname={setNickname} />
          </div>
        </>
      )}

      {submitted && <div className="mt-92 text-black font-moneygraphy text-headline-1">회원가입이 완료됐어요</div>}

      {!submitted && (
        <div
          onClick={handleSubmit}
          className="fixed max-w-432 left-1/2 translate-x-[-50%] w-full bottom-44 bg-mainBlue h-52  rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white"
          style={{ width: "calc(100% - 3rem)" }}
        >
          다음
        </div>
      )}

      {submitted && (
        <div
          onClick={() => navigate(`/saerok`)}
          className="fixed max-w-432 left-1/2 translate-x-[-50%] w-full bottom-44 bg-mainBlue h-52 rounded-10 items-center flex justify-center font-pretendard text-button-1 text-white"
          style={{ width: "calc(100% - 3rem)" }}
        >
          새록 시작하기
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
