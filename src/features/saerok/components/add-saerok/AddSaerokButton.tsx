import { ReactComponent as AddCollection } from "assets/icons/addcollection.svg";
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
      <AddCollection />
    </button>
  );
};

export default AddCollectionButton;
