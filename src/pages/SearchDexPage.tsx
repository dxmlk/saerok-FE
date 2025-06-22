import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import axios from "axios";
import { filtersState, searchTermState } from "states/dexSearchState";
import { useNavigate } from "react-router-dom";
import SearchBar from "components/common/textfield/SearchBar";
import SearchSuggestions from "components/common/textfield/SearchSuggestions";
import { getBirdInfoByNameApi, BirdInfo } from "services/api/birds";
import FilterHeader from "features/dex/components/FilterHeader";
import qs, { ParsedQs } from "qs";

interface SearchRecord {
  keyword: string;
  date: string;
}

const SearchDexPage = () => {
  const navigate = useNavigate();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<BirdInfo[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);

  const [selectedFilters, setSelectedFilters] = useRecoilState(filtersState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  // 자동완성 API
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const debounce = setTimeout(async () => {
      try {
        const res = await axios.get("/api/v1/birds/autocomplete", {
          params: { q: searchTerm.trim() },
        });
        const names = res.data.suggestions || [];
        const infos = await Promise.all(names.map((name: string) => getBirdInfoByNameApi(name)));
        setSuggestions(infos.filter((x): x is BirdInfo => x !== null));
      } catch (err) {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const safeStringArray = (val: string | ParsedQs | (string | ParsedQs)[] | undefined): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.filter((v): v is string => typeof v === "string");
    }
    return typeof val === "string" ? [val] : [];
  };

  useEffect(() => {
    const params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      parseArrays: true,
    });
    setSelectedFilters({
      seasons: safeStringArray(params.seasons),
      habitats: safeStringArray(params.habitats),
      sizeCategories: safeStringArray(params.sizeCategories),
    });
    // searchTerm 은 여기서 덮어쓰지 않움
  }, [location.search, setSelectedFilters]);

  // 검색 기록 로드/저장
  useEffect(() => {
    setSearchTerm("");
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  // 안전한 addSearchRecord
  const addSearchRecord = (newRec: SearchRecord) => {
    setSearchHistory((prev) => {
      const updated = [...prev, newRec];
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  // handleSearch에서 사용
  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (
      !trimmed &&
      selectedFilters.habitats.length === 0 &&
      selectedFilters.seasons.length === 0 &&
      selectedFilters.sizeCategories.length === 0
    ) {
      return;
    }

    setSearchTerm(trimmed);

    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}.`;

    addSearchRecord({ keyword: trimmed, date });

    // URL 파라미터 반영 (필요시)
    const params: Record<string, any> = {
      ...selectedFilters,
      searchTerm: trimmed,
    };
    const qsStr = qs.stringify(params, { arrayFormat: "repeat" });
    navigate(`/dex?${qsStr}`);
  };

  // handleDeleteHistory도 동일하게
  const handleDeleteHistory = (idx: number) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSuggestionSelect = (info: BirdInfo) => {
    setSearchTerm(info.koreanName);
    handleSearch(info.koreanName);
    setShowSuggestions(false); // 자동완성창 닫기
  };

  return (
    <div className="min-h-[100vh] mb-120 bg-white font-pretendard relative">
      <div className="px-24 my-12 flex flex-col gap-12">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(v) => {
            setSearchTerm(v);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="궁금한 새를 검색해보세요"
          onSearch={handleSearch}
        />

        {showSuggestions && (
          <div className="absolute top-100 left-0 right-0 ">
            <SearchSuggestions
              visible={searchTerm.trim().length > 0}
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
            />
          </div>
        )}

        <FilterHeader
          selectedFilters={selectedFilters}
          onFilterChange={(group, vals) => {
            setSelectedFilters((prev) => ({ ...prev, [group]: vals }));
          }}
        />
      </div>

      {/* 검색 히스토리: 검색어 없을 때만 */}
      {!searchTerm.trim() && (
        <div className="flex flex-col">
          {searchHistory.length === 0 ? (
            <div className="px-24 pt-12 text-center text-font-whitegrayDark">
              검색 기록이 없어요! 궁금한 새를 검색해보세요.
            </div>
          ) : (
            searchHistory
              .slice()
              .reverse()
              .map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchTerm(rec.keyword);
                    handleSearch(rec.keyword);
                  }}
                  className="border-t border-background-whitegray flex h-54 justify-between items-center"
                >
                  <span className="ml-26 text-body-2 text-font-darkgray">{rec.keyword}</span>
                  <div className="flex gap-15 items-center mr-26">
                    <span className="text-caption-1 text-font-whitegrayDark">{rec.date}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(idx);
                      }}
                    >
                      {/* 삭제 아이콘 예시 */}
                      <svg className="w-10 h-10" fill="none" stroke="gray" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDexPage;
