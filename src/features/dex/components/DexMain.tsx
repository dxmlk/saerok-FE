import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DexMainProps {
  birdCount: number;
  onToggleBookmarkView?: () => void;
}

const DexMain = ({ birdCount, onToggleBookmarkView }: DexMainProps) => {
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/search-bird`);
  };

  return (
    <>
      <div className="relative overflow-hidden h-276 font-pretendard ">
        {/* 배경 */}
        <div
          className="absolute inset-0 bg-[#F2F2F2]/60 backdrop-blur-[80px] z-0"
          style={{
            backgroundImage: "linear-gradient(to left, rgba(205,221,243,1) 23%, rgba(243,243,243,1) 84%)",
          }}
        />

        {/* 메인 문구 */}
        <div className="absolute left-24 bottom-168 z-10 text-black text-headline-1 font-moneygraphy">
          <div>도감</div>
        </div>

        {/* 우측 상단 스크랩/검색 버튼*/}
        <div
          onClick={() => {
            setIsBookmarkActive(!isBookmarkActive);
            onToggleBookmarkView?.();
          }}
          className="absolute right-72 bottom-164 w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
        >
          <ScrapIcon
            className={`h-24 w-24 ${isBookmarkActive ? "stroke-none fill-font-mainBlue" : "stroke-[2px] stroke-black fill-transparent"}`}
          />
        </div>
        <div
          onClick={() => handleSearchClick()}
          className="absolute right-24 bottom-164 w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
        >
          <SearchIcon className="h-24 w-24 stroke-[1.6px] stroke-black " />
        </div>

        {/* 몇 종의 새 */}
        <div className="absolute left-24 bottom-28 z-10 leading-10 ">
          <div className="font-bold text-40 text-font-mainBlue">{birdCount}</div>
          <div className="text-caption-1 text-font-black">종의 새가 도감에 준비되어 있어요</div>
        </div>
      </div>
    </>
  );
};

export default DexMain;
