import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort2.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SortBottomSheet from "./SortBottomSheet.js";

const SaerokHeader = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSortClick = () => {
    setIsBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/search-bird`);
  };

  return (
    <div className="fixed top-0 h-76 px-24 w-full items-center flex flex-row justify-between bg-white font-moneygraphy z-20">
      <span className="text-[#0d0d0d] text-headline-1">나의 새록</span>
      <div className=" flex flex-row gap-24">
        <button onClick={() => handleSortClick()}>
          <SortIcon className="w-24 h-24 cursor-pointer " />
        </button>
        <button onClick={handleSearchClick}>
          <SearchIcon className="w-24 h-24 stroke-[1.5px] stroke-black cursor-pointer " />
        </button>
      </div>
      {/* <SortBottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet} /> */}
    </div>
  );
};
export default SaerokHeader;
