import DexHeader from "features/dex/components/DexHeader";
import DexList from "features/dex/components/DexList";
import { useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import DexMain from "features/dex/components/DexMain";
import FilterHeader from "features/dex/components/FilterHeader";
import ScrollToTopButton from "components/common/button/ScrollToTopButton";
import { fetchBookmarksApi, fetchDexItemsApi, toggleBookmarkApi } from "services/api/birds";
import { ReactComponent as SaerokImage } from "assets/icons/image/saerok.svg";

const seasonMap: Record<string, string> = {
  봄: "spring",
  여름: "summer",
  가을: "autumn",
  겨울: "winter",
};

const habitatMap: Record<string, string> = {
  갯벌: "mudflat",
  "경작지/들판": "farmland",
  "산림/계곡": "forest",
  해양: "marine",
  거주지역: "residential",
  평지숲: "plains_forest",
  "하천/호수": "river_lake",
  인공시설: "artificial",
  동굴: "cave",
  습지: "wetland",
  기타: "others",
};

const sizeCategoryMap: Record<string, string> = {
  참새: "xsmall",
  비둘기: "small",
  오리: "medium",
  기러기: "large",
};

const convertFiltersToApiParams = (filters: SelectedFilters) => {
  return {
    habitats: filters.habitats.map((h) => habitatMap[h]).filter(Boolean),
    seasons: filters.seasons.map((s) => seasonMap[s]).filter(Boolean),
    sizeCategories: filters.sizeCategories.map((s) => sizeCategoryMap[s]).filter(Boolean),
  };
};

interface DexItem {
  id: number;
  koreanName: string;
  scientificName: string;
  thumbImageUrl: string;
}

const PAGE_SIZE = 10;

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

const DexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookmarkedBirdIds, setBookmarkedBirdIds] = useState<number[]>([]);
  const [showBookmarkOnly, setShowBookmarkOnly] = useState(false);

  // 안전한 string[] 반환 헬퍼 함수
  const safeStringArray = (val: unknown): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.filter((v): v is string => typeof v === "string");
    }
    if (typeof val === "string") return [val];
    return [];
  };

  // 쿼리 파라미터 파싱 및 필터/검색어 초기화
  const parseQueryParams = () => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    return {
      seasons: safeStringArray(params.seasons),
      habitats: safeStringArray(params.habitats),
      sizeCategories: safeStringArray(params.sizeCategories),
      searchTerm: typeof params.searchTerm === "string" ? params.searchTerm : "",
    };
  };

  // 초기값 설정용 변수
  const initialFilters = parseQueryParams();

  const [dexItems, setDexItems] = useState<DexItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    habitats: initialFilters.habitats,
    seasons: initialFilters.seasons,
    sizeCategories: initialFilters.sizeCategories,
  });

  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);

  // URL 쿼리 변경 시 상태 동기화
  useEffect(() => {
    const parsed = parseQueryParams();
    console.log("[useEffect location.search] parsed filters:", parsed);
    setSelectedFilters({
      habitats: parsed.habitats,
      seasons: parsed.seasons,
      sizeCategories: parsed.sizeCategories,
    });
    setSearchTerm(parsed.searchTerm);
    setPage(1);
    setDexItems([]);
    setHasMore(true);
  }, [location.search]);

  const handleFilterChange = (filterGroup: keyof SelectedFilters, values: string[]) => {
    console.log("[handleFilterChange]", filterGroup, values);
    setSelectedFilters((prev) => ({
      ...prev,
      [filterGroup]: values,
    }));
    setPage(1);
    setDexItems([]);
    setHasMore(true);
  };

  const fetchDexItems = async (pageNum: number, filters: SelectedFilters, search: string) => {
    try {
      setLoading(true);
      setError(null);

      const apiParams = convertFiltersToApiParams(filters);
      const params = {
        page: pageNum,
        size: PAGE_SIZE,
        ...(apiParams.habitats.length > 0 && { habitats: apiParams.habitats }),
        ...(apiParams.seasons.length > 0 && { seasons: apiParams.seasons }),
        ...(apiParams.sizeCategories.length > 0 && { sizeCategories: apiParams.sizeCategories }),
        ...(search && { q: search }),
      };

      const res = await fetchDexItemsApi(params);
      const newItems = res.data.birds || [];

      setDexItems((prev) => {
        if (pageNum === 1) return newItems;
        const filtered = newItems.filter((ni: { id: number }) => !prev.some((pi) => pi.id === ni.id));
        return [...prev, ...filtered];
      });
      setHasMore(newItems.length === PAGE_SIZE);
    } catch (err) {
      setError("도감 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("[useEffect] fetchDexItems call with", page, selectedFilters, searchTerm);
    fetchDexItems(page, selectedFilters, searchTerm);
  }, [page, selectedFilters, searchTerm]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300 && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    const params: Record<string, any> = {
      ...selectedFilters,
    };

    if (searchTerm.trim() !== "") {
      params.searchTerm = searchTerm;
    }
    const queryString = qs.stringify(params, { arrayFormat: "repeat" });

    if (queryString === "") {
      navigate(`/dex`, { replace: true });
    } else {
      navigate(`/dex?${queryString}`, { replace: true });
    }
  }, [selectedFilters, searchTerm]);

  useEffect(() => {
    fetchBookmarksApi()
      .then((res) => {
        const ids = res.data.items.map((b: { birdId: number }) => b.birdId);
        setBookmarkedBirdIds(ids);
      })
      .catch((err) => console.error("북마크 에러", err));
  }, []);

  const toggleBookmark = async (birdId: number) => {
    await toggleBookmarkApi(birdId);
    setBookmarkedBirdIds((prev) => (prev.includes(birdId) ? prev.filter((id) => id !== birdId) : [...prev, birdId]));
  };
  // Main 에서 Header 전환
  const [opacity, setOpacity] = useState(1);
  const [showMain, setShowMain] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (showMain) {
        const newOpacity = Math.max(0, 1 - scrollY / 190);
        setOpacity(newOpacity);

        if (scrollY > 190) {
          setShowMain(false);
          setShowHeader(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showMain]);

  return (
    <div className="bg-background-whitegray min-h-[100dvh]">
      {showMain && (
        <div className={clsx("transition-all ease-in-out")} style={{ opacity }}>
          <DexMain
            birdCount={585}
            selectedFilters={selectedFilters}
            searchTerm={searchTerm}
            onToggleBookmarkView={() => setShowBookmarkOnly((prev) => !prev)}
            bookmarkedBirdIds={bookmarkedBirdIds}
          />
        </div>
      )}

      {showHeader && (
        <div className={clsx("transition-all ease-in-out opacity-100 translate-y-0")}>
          <DexHeader
            selectedFilters={selectedFilters}
            searchTerm={searchTerm}
            onToggleBookmarkView={() => setShowBookmarkOnly((prev) => !prev)}
            bookmarkedBirdIds={bookmarkedBirdIds}
          />
        </div>
      )}

      <div className={`px-28 ${showHeader ? "bg-white py-18 mb-20" : "py-22"} `}>
        <FilterHeader selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      </div>

      <div className="px-24">
        {showBookmarkOnly && dexItems.filter((item) => bookmarkedBirdIds.includes(item.id)).length === 0 ? (
          <div className="mt-10 px-1 w-full flex flex-col gap-5">
            <div className="font-haru text-subtitle-1-2 text-black">스크랩한 새가 없어요!</div>
            <div className="font-pretendard text-body-2 text-font-darkgray">
              새 카드 오른쪽 위 스크랩 버튼을 눌러 스크랩해보세요.
            </div>
            <div className="flex justify-center mt-88">
              <SaerokImage />
            </div>
          </div>
        ) : (
          <DexList
            dexItems={showBookmarkOnly ? dexItems.filter((item) => bookmarkedBirdIds.includes(item.id)) : dexItems}
            bookmarkedBirdIds={bookmarkedBirdIds}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default DexPage;
