import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchTermState } from "states/dexSearchState";

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

interface DexMainProps {
  birdCount: number;
  selectedFilters: SelectedFilters;
  searchTerm: string;
  onToggleBookmarkView?: () => void;
  bookmarkedBirdIds?: number[];
}

const DexMain = ({ birdCount, selectedFilters, searchTerm, onToggleBookmarkView }: DexMainProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const setSearchTerm = useSetRecoilState(searchTermState);
  const [headerBgOpacity, setHeaderBgOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = 120;
      const y = Math.min(window.scrollY, maxScroll);
      setHeaderBgOpacity(y / maxScroll);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFilterClick = (filterName: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterName) ? prev.filter((name) => name !== filterName) : [...prev, filterName]
    );
  };

  const goToSearchPage = () => {
    const params = { ...selectedFilters };
    const queryString = qs.stringify(params, { arrayFormat: "repeat" });
    navigate(`/search/dex?${queryString}`);
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-[#F2F2F2]/60 backdrop-blur-[80px] z-0"
        style={{
          backgroundImage: "linear-gradient(to left, rgba(205,221,243,1) 23%, rgba(243,243,243,1) 84%)",
          height: 232,
          minHeight: 232,
          width: "100%",
        }}
      />

      <div className="fixed top-0 left-0 w-full h-84 z-50 pointer-events-none">
        {/* 흰색 반투명 배경 */}
        <div
          className="absolute top-0 left-0 w-full h-84 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "white",
            opacity: headerBgOpacity,
            boxShadow: headerBgOpacity > 0.15 ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            borderBottom: headerBgOpacity > 0.15 ? "1px solid #e4e4e7" : "none",
          }}
        />

        <div className="relative flex items-center justify-between h-60  px-24 pointer-events-auto">
          <div className="text-black text-headline-1 font-haru mt-32">도감</div>
          <div className="flex gap-7 mt-28">
            <button
              onClick={() => {
                handleFilterClick("스크랩");
                onToggleBookmarkView?.();
              }}
              className="w-40 h-40 rounded-full bg-glassmorphism flex items-center justify-center z-10"
            >
              <ScrapIcon
                className={`h-24 w-24 ${
                  activeFilters.includes("스크랩")
                    ? "stroke-none fill-font-pointYellow"
                    : "stroke-[2px] stroke-black fill-transparent"
                }`}
              />
            </button>
            <button
              onClick={goToSearchPage}
              className="w-40 h-40 rounded-full bg-glassmorphism flex items-center justify-center z-10"
            >
              <SearchIcon className="h-26 w-26 mb-1 mr-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-500 px-24" style={{ height: 232 }}>
        <div className="absolute left-24 bottom-28 z-10 leading-10">
          <div className="font-bold text-40 text-font-mainBlue">{birdCount}</div>
          <div className="text-caption-1 text-font-black">종의 새가 도감에 준비되어 있어요</div>
        </div>
      </div>
    </>
  );
};

export default DexMain;
