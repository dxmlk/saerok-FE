import { ReactComponent as XBlackIcon } from "assets/icons/xblack.svg";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="w-[32px] h-[32px]">
      <button onClick={() => handleBackButton()}>
        <XBlackIcon />
      </button>
    </div>
  );
};
export default BackButton;
