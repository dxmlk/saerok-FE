import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SortBottomSheet from "./SortBottomSheet";

const CollectionHeader = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSortClick = () => {
    setIsBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/search`);
  };

  return (
    <div className="h-[66px] px-[24px] items-center flex flex-row justify-between bg-white font-pretendard">
      <span className="text-black font-700 text-[22px]">컬렉션</span>
      <div className="text-[#0d0d0d] font--400 text-[18px] flex flex-row gap-[18px]">
        <button onClick={() => handleSortClick()}>
          <SortIcon className="w-[4px]" />
        </button>
        <button onClick={handleSearchClick}>
          <SearchIcon className="h-[18.28px] text-[#0d0d0d]" />
        </button>
      </div>
      <SortBottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} />
    </div>
  );
};
export default CollectionHeader;
