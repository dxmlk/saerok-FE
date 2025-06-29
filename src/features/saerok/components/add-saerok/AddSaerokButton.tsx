import { ReactComponent as AddSaerokIcon } from "assets/icons/button/add-saerok.svg";
import { useNavigate } from "react-router-dom";

const AddCollectionButton = () => {
  const navigate = useNavigate();

  const handleAddCollection = () => {
    navigate(`/add-collection`);
  };

  return (
    <button
      onClick={() => handleAddCollection()}
      className="fixed right-[24px] bottom-[117px] flex justify-center items-center border-none bg-green text-white h-[61px] w-[61px] rounded-[100px] drop-shadow"
    >
      <AddSaerokIcon />
    </button>
  );
};

export default AddCollectionButton;
