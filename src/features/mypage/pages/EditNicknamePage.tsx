import SimpleHeader from "components/common/SimpleHeader";
import NicknameInput from "../components/NicknameInput";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "services/api/user/index";

const EditNicknamePage = () => {
  const [nickname, setNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNicknameCheckResult = (isAvailable: boolean, error?: string) => {
    setIsNicknameAvailable(isAvailable);
    setErrorMessage(error || "");
  };

  const handleButtonClick = async () => {
    if (!isNicknameAvailable || !nickname) {
      setErrorMessage("닉네임 중복확인을 완료해주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      await updateUserInfo({ nickname });
      navigate("/mypage");
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "닉네임 변경에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-white">
      <SimpleHeader title={"닉네임 변경하기"} />
      <div className="py-30 px-24">
        <NicknameInput
          nickname={nickname}
          setNickname={(v) => {
            setNickname(v);
            setIsNicknameAvailable(false);
          }}
          onCheckResult={handleNicknameCheckResult}
        />
      </div>
      <EditFooter text={"닉네임 변경하기"} onClick={handleButtonClick} />
    </div>
  );
};

export default EditNicknamePage;
