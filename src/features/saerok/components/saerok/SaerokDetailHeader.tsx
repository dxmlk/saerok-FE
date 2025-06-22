import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as DexIcon } from "assets/icons/button/dex.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import { useNavigate } from "react-router-dom";

const CollectionDetailHeader = ({ birdId, collectionId }: any) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGoToDex = () => {
    navigate(`/dex-detail/${birdId}`);
  };

  const handleEdit = () => {
    navigate(`/edit-saerok/${collectionId}`);
  };

  return (
    <div className="z-10 fixed top-0 w-full bg-transparent h-auto flex flex-row items-center justify-between px-24 py-10">
      <button
        onClick={handleBackClick}
        className="w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
      >
        <BackIcon className="w-17 h-17" />
      </button>
      <div className="flex flex-row gap-9">
        <button
          onClick={handleGoToDex}
          className="w-40 h-40 rounded-full bg-mainBlue z-10 flex items-center justify-center"
        >
          <DexIcon className="w-20 h-20 text-white" />
        </button>
        <button
          onClick={handleEdit}
          className="w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
        >
          <EditIcon className="w-24 h-24" />
        </button>
      </div>
    </div>
  );
};

export default CollectionDetailHeader;
