import { ReactComponent as BackIcon } from "assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddCollectionIcon } from "assets/icons/button/add-saerok.svg";
import { ReactComponent as ScrapBlackIcon } from "assets/icons/scrapblack.svg";

interface DexDetailHeaderProps {
  item: {
    koreanName: string;
    scientificName: string;
  };
}

const DexDetailHeader = ({ item }: DexDetailHeaderProps) => {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(`/dex`);
  }

  if (!item) {
    return null;
  }

  function handleScrapClick(): void {
    throw new Error("Function not implemented.");
  }

  function handleAddCollectionClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full h-[65px] flex flex-row items-center justify-between bg-white">
      <div className="ml-[24px] flex flex-row gap-[18px]">
        <button onClick={() => handleBackClick()}>
          <BackIcon className="w-[9px] h-[15.758px]" />
        </button>
        <div className="flex flex-col ">
          <span className="leading-tight font-pretendard font-700 text-black text-[20px]">{item.koreanName}</span>
          <span className="leading-none  font-pretendard font-400 text-[#979797] text-[15px]">
            {item.scientificName}
          </span>
        </div>
      </div>
      <div className="mr-[22px] flex flex-row gap-[17.31px] ">
        <button onClick={() => handleAddCollectionClick()}>
          <AddCollectionIcon className="h-[24.87px]" />
        </button>
        <button onClick={() => handleScrapClick()}>
          <ScrapBlackIcon className="w-[13px] h-[21px]" />
        </button>
      </div>
    </div>
  );
};

export default DexDetailHeader;
