import Modal from "components/common/Modal";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleCancle = () => {
    onClose();
  };

  const handleLogin = () => {
    onClose();
    navigate(`/`);
  };

  return (
    <>
      <Modal
        maintext="로그인하시겠어요?"
        subtext="로그인이 필요한 기능이에요."
        lefttext="돌아가기"
        handleLeftClick={handleCancle}
        righttext="로그인 하러가기"
        handleRightClick={handleLogin}
      />
    </>
  );
};

export default LoginModal;
