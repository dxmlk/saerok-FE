import SearchBar from "components/common/textfield/SearchBar";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs, { ParsedQs } from "qs";
import FilterHeader from "features/dex/components/FilterHeader";
import { set } from "date-fns";

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

interface SearchRecord {
  keyword: string;
  date: string;
}

const SearchBirdPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const safeStringArray = (val: string | ParsedQs | (string | ParsedQs)[] | undefined): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.filter((v): v is string => typeof v === "string");
    }
    return typeof val === "string" ? [val] : [];
  };

  const parseQueryParams = () => {
    const params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      parseArrays: true,
    });
    return {
      seasons: safeStringArray(params.seasons),
      habitats: safeStringArray(params.habitats),
      sizeCategories: safeStringArray(params.sizeCategories),
      searchTerm: typeof params.searchTerm === "string" ? params.searchTerm : "",
    };
  };

  const initialFilters = parseQueryParams();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    habitats: initialFilters.habitats,
    seasons: initialFilters.seasons,
    sizeCategories: initialFilters.sizeCategories,
  });

  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);

  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);

  // 컴포넌트 마운트 시 localstorage에서 검색 기록 불러오기
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      try {
        setSearchHistory(JSON.parse(storedHistory));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  // URL 쿼리 변경 시 필터 상태 초기화
  useEffect(() => {
    const parsed = parseQueryParams();
    console.log("[useEffect location.search] parsed filters:", parsed);
    setSelectedFilters({
      habitats: parsed.habitats,
      seasons: parsed.seasons,
      sizeCategories: parsed.sizeCategories,
    });
    setSearchTerm(parsed.searchTerm);
  }, [location.search]);

  // 필터 상태 변경 함수
  const handleFilterChange = (filterGroup: keyof SelectedFilters, values: string[]) => {
    console.log("[handleFilterChange]", filterGroup, values);
    setSelectedFilters((prev) => ({
      ...prev,
      [filterGroup]: values,
    }));
  };

  // 검색 기록 추가 함수
  const addSearchRecord = (newRocord: SearchRecord) => {
    setSearchHistory((prev) => {
      const updatedHistory = [...prev, newRocord];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  // 검색 실행 함수 (명시적 이벤트에서만 URL 변경)
  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    console.log("[handleSearch] trimmedTerm:", trimmedTerm);
    console.log("[handleSearch] selectedFilters:", selectedFilters);

    if (
      !trimmedTerm &&
      selectedFilters.habitats.length === 0 &&
      selectedFilters.seasons.length === 0 &&
      selectedFilters.sizeCategories.length === 0
    ) {
      console.log("[handleSearch] 검색어, 필터 모두 없음, 이동 안 함");
      return;
    }

    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}.`;
    const newRecord: SearchRecord = {
      keyword: trimmedTerm,
      date: formattedDate,
    };
    addSearchRecord(newRecord);

    const params = {
      ...selectedFilters,
      searchTerm: trimmedTerm,
    };
    const queryString = qs.stringify(params, { arrayFormat: "repeat" });
    console.log("[handleSearch] navigate to:", `/dex?${queryString}`);

    navigate(`/dex?${queryString}`);

    setSearchTerm(""); // 검색 후 비우기
  };

  const handleDeleteHistory = (index: number) => {
    console.log("[handleDeleteHistory] index:", index);
    setSearchHistory((prev) => {
      const updated = prev.filter((_, idx) => idx !== index);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-[100vh] bg-white font-pretendard">
      <div className="mx-[24px] my-[12px] flex flex-col gap-12">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="궁금한 새를 검색해보세요"
          onSearch={handleSearch}
        />
        <FilterHeader selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      </div>

      <div className="flex flex-col">
        {searchHistory.length === 0 ? (
          <span className="h-500 items-center justify-center flex text-caption-4 text-[#979797]">
            아직 검색 기록이 없어요
          </span>
        ) : (
          searchHistory.map((history, index) => (
            <div key={index} className="border-t border-[#d9d9d9] flex h-[55px] justify-between items-center">
              <span className="ml-[25px] text-[15px] font-400 text-[#455154]">{history.keyword}</span>
              <div className="flex gap-[7px]">
                <span className="text-[13px] font-400 text-[#979797]">{history.date}</span>
                <button onClick={() => handleDeleteHistory(index)} className="mr-[25px]">
                  <XIcon className="w-[10px] h-[10px] ml-15 fill-[#979797]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBirdPage;
