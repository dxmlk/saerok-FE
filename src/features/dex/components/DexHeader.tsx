import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}
interface DexHeaderProps {
  selectedFilters: SelectedFilters;
  searchTerm: string;
  onToggleBookmarkView?: () => void;
  bookmarkedBirdIds?: number[];
}

const DexHeader = ({ selectedFilters, searchTerm, onToggleBookmarkView }: DexHeaderProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // 나중에 유저 id도 받아야 돼 유저마다 스크랩 다르니까...
  // const { id } = useParams();
  // navigate(`/${id}/scrap`);
  const navigate = useNavigate();

  const handleFilterClick = (filterName: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterName) ? prev.filter((name) => name !== filterName) : [...prev, filterName]
    );
  };

  const goToSearchPage = () => {
    const params = {
      ...selectedFilters,
      searchTerm,
    };

    const queryString = qs.stringify(params, { arrayFormat: "repeat" });
    navigate(`/search/dex?${queryString}`);
  };

  return (
    <div className="bg-white font-pretendard flex flex-row pt-26 justify-between h-60 pl-28 pr-24">
      <span className="font-moneygraphy text-font-black text-headline-1 ">도감</span>
      <div className="flex flex-row items-center gap-22">
        <button
          onClick={() => {
            handleFilterClick("스크랩");
            onToggleBookmarkView?.();
          }}
        >
          <ScrapIcon
            className={`w-24 h-24 stroke-[2px] cursor-pointer  ${activeFilters.includes("스크랩") ? `stroke-none fill-font-pointYellow ` : "fill-transparent stroke-black"} `}
          />
        </button>
        <button onClick={goToSearchPage}>
          <SearchIcon className="w-24 h-24 stroke-[1.5px] stroke-black cursor-pointer  " />
        </button>
      </div>
    </div>
  );
};

// 이거 아이콘 컴포넌트 디자인인 수정 필요

export default DexHeader;
