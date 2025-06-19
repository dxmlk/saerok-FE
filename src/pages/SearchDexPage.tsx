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
    // searchTerm 은 여기서 덮어쓰지 않습니다!
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
          <span className="h-500 flex items-center justify-center text-caption-4 text-[#979797]">
            아직 검색 기록이 없어요
          </span>
        ) : (
          searchHistory.map((rec, idx) => (
            <div key={idx} className="border-t border-[#d9d9d9] flex h-[55px] justify-between items-center">
              <span className="ml-[25px] text-[15px] font-400 text-[#455154]">{rec.keyword}</span>
              <div className="flex gap-[7px] items-center mr-[25px]">
                <span className="text-[13px] font-400 text-[#979797]">{rec.date}</span>
                <button onClick={() => handleDeleteHistory(idx)}>
                  <XIcon className="w-[10px] h-[10px] fill-[#979797]" />
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
