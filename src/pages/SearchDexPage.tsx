// src/pages/SearchBirdPage.tsx
import SearchBar from "components/common/textfield/SearchBar";
import SearchSuggestions from "components/common/textfield/SearchSuggestions";
import FilterHeader from "features/dex/components/FilterHeader";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs, { ParsedQs } from "qs";

import { useRecoilState } from "recoil";
import { filtersState, searchTermState } from "states/dexSearchState";
import EmptyPage from "features/dex/components/EmptyPage";

interface SearchRecord {
  keyword: string;
  date: string;
}

const SearchBirdPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recoil 로 전역 관리
  const [selectedFilters, setSelectedFilters] = useRecoilState(filtersState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);

  // URL 에서 파라미터를 문자열 배열로 안전하게 꺼내는 헬퍼
  const safeStringArray = (val: string | ParsedQs | (string | ParsedQs)[] | undefined): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.filter((v): v is string => typeof v === "string");
    }
    return typeof val === "string" ? [val] : [];
  };

  // URL → 상태 동기화 (필터만, searchTerm 은 Recoil atom 에서 관리)
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

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  // 검색 기록 추가
  const addSearchRecord = (newRec: SearchRecord) => {
    setSearchHistory((prev) => {
      const updated = [...prev, newRec];
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  // 실제 검색 실행 (명시적 이벤트)
  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    // 검색어·필터 둘 다 없으면 동작 안 함
    if (
      !trimmed &&
      selectedFilters.habitats.length === 0 &&
      selectedFilters.seasons.length === 0 &&
      selectedFilters.sizeCategories.length === 0
    ) {
      return;
    }

    // atom 에도 저장
    setSearchTerm(trimmed);

    // 검색 기록에 추가
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}.`;
    addSearchRecord({ keyword: trimmed, date });

    // URL 파라미터 반영
    const params: Record<string, any> = {
      ...selectedFilters,
      searchTerm: trimmed,
    };
    const qsStr = qs.stringify(params, { arrayFormat: "repeat" });
    navigate(`/dex?${qsStr}`);
  };

  const handleDeleteHistory = (idx: number) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-[100vh] bg-white font-pretendard">
      <div className="mx-[24px] my-[12px] flex flex-col gap-12">
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

        <SearchSuggestions
          visible={showSuggestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <FilterHeader
          selectedFilters={selectedFilters}
          onFilterChange={(group, vals) => {
            setSelectedFilters((prev) => ({ ...prev, [group]: vals }));
          }}
        />
      </div>

      <div className="flex flex-col">
        {searchHistory.length === 0 ? (
          <div className="px-24 pt-12">
            <EmptyPage upperText="검색 기록이 없어요!" lowerText="궁금한 새를 검색해보세요." bgColor="white" />
          </div>
        ) : (
          searchHistory.map((rec, idx) => (
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
                  <XIcon className="w-10 h-10 fill-font-whitegrayDark" />
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
