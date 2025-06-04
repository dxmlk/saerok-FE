import SimpleHeader from "components/common/SimpleHeader";
import NicknameInput from "../components/NicknameInput";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import { useNavigate } from "react-router-dom";

const EditNicknamePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/mypage`);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-white">
      <SimpleHeader title={"닉네임 변경하기"} />
      <div className="py-30 px-24">
        <NicknameInput />
      </div>
      <EditFooter text={"닉네임 변경하기"} onClick={handleButtonClick} />
    </div>
  );
};

export default EditNicknamePage;
