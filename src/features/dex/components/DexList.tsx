import { ReactComponent as ScrapIcon } from "assets/icons/scrap.svg";
import { ReactComponent as ScrapFilledIcon } from "assets/icons/scrapfilled.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DexItem {
  id: number;
  koreanName: string;
  scientificName: string;
  thumbImageUrl: string;
}

interface DexListProps {
  dexItems: DexItem[];
  bookmarkedBirdIds?: number[];
  onToggleBookmark?: (id: number) => void;
}

const DexList = ({ dexItems, bookmarkedBirdIds = [], onToggleBookmark }: DexListProps) => {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/dex-detail/${id}`);
  };
  const handleScrapClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(id);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
        {dexItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="relative rounded-10 border-1 border-font-whitegrayLight bg-background-white flex flex-col w-full h-198 overflow-hidden transform transition-transform duration-300 hover:hover:scale-105"
          >
            <button
              type="button"
              onClick={(e) => {
                handleScrapClick(e, item.id);
              }}
              className="absolute top-15 right-14 z-10"
            >
              {bookmarkedBirdIds.includes(item.id) ? (
                <ScrapFilledIcon className="h-21 " />
              ) : (
                <ScrapIcon className="h-21" />
              )}
            </button>
            <img src={item.thumbImageUrl} alt={item.koreanName} loading="lazy" className="w-full h-142 object-cover" />
            <span className="mx-11 mt-10 font-pretendard flex flex-col text-black text-15 font-600">
              {item.koreanName}
            </span>
            <span className="mx-11 font-pretendard flex flex-col text-font-whitegrayDark text-13 font-400">
              {item.scientificName}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default DexList;
