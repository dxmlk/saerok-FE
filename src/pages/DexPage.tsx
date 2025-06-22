import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import clsx from "clsx";

import DexMain from "features/dex/components/DexMain";
import DexList from "features/dex/components/DexList";
import FilterHeader from "features/dex/components/FilterHeader";
import ScrollToTopButton from "components/common/button/ScrollToTopButton";
import EmptyPage from "features/dex/components/EmptyPage";

import { fetchDexItemsApi, fetchBookmarksApi, fetchDexDetailApi } from "services/api/birds/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { filtersState, searchTermState } from "states/dexSearchState";
import { bookmarkedBirdIdsState, useSyncBookmarks, useToggleBookmarkAndSync } from "states/bookmarkState";

interface DexItem {
  id: number;
  koreanName: string;
  scientificName: string;
  thumbImageUrl: string;
}

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

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

const PAGE_SIZE = 10;

export default function DexPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recoil 전역 상태
  const [selectedFilters, setSelectedFilters] = useRecoilState(filtersState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const bookmarkedBirdIds = useRecoilValue(bookmarkedBirdIdsState);
  const syncBookmarks = useSyncBookmarks();
  const toggleBookmark = useToggleBookmarkAndSync();

  // 로컬 상태
  const [dexItems, setDexItems] = useState<DexItem[]>([]);
  const [bookmarkItems, setBookmarkItems] = useState<DexItem[]>([]); // 북마크용 별도 상태
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBookmarkOnly, setShowBookmarkOnly] = useState(false);

  // URL parse 헬퍼
  const safeStringArray = (val: unknown): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter((v): v is string => typeof v === "string");
    return typeof val === "string" ? [val] : [];
  };

  const parseQueryParams = (): SelectedFilters & { searchTerm: string } => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    return {
      habitats: safeStringArray(params.habitats),
      seasons: safeStringArray(params.seasons),
      sizeCategories: safeStringArray(params.sizeCategories),
      searchTerm: typeof params.searchTerm === "string" ? params.searchTerm : "",
    };
  };

  // 1️. 마운트 시 URL→Recoil 초기화 + URL에서 searchTerm 삭제 + 북마크 동기화
  useEffect(() => {
    const { habitats, seasons, sizeCategories, searchTerm: q } = parseQueryParams();
    setSelectedFilters({ habitats, seasons, sizeCategories });
    setSearchTerm(q);

    // URL에서 searchTerm 파라미터만 제거
    if (q) {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      delete params.searchTerm;
      const cleaned = qs.stringify(params, { arrayFormat: "repeat" });
      navigate(cleaned ? `/dex?${cleaned}` : "/dex", { replace: true });
    }

    // 북마크 동기화(앱 첫 진입)
    syncBookmarks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2.  URL 변경 시 필터만 Recoil 동기화 (searchTerm은 건드리지 않음)
  useEffect(() => {
    const { habitats, seasons, sizeCategories } = parseQueryParams();
    setSelectedFilters({ habitats, seasons, sizeCategories });
    setPage(1);
    setDexItems([]);
    setHasMore(true);
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  // 필터 변경 핸들러
  const handleFilterChange = (group: keyof SelectedFilters, vals: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [group]: vals }));
    setPage(1);
    setDexItems([]);
    setHasMore(true);
  };

  // API 파라미터 변환
  const convertFiltersToApiParams = (f: SelectedFilters) => ({
    habitats: f.habitats.map((h) => habitatMap[h]).filter(Boolean),
    seasons: f.seasons.map((s) => seasonMap[s]).filter(Boolean),
    sizeCategories: f.sizeCategories.map((s) => sizeCategoryMap[s]).filter(Boolean),
  });

  // 데이터 페칭
  const fetchDexItems = async (p: number, filters: SelectedFilters, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiParams = convertFiltersToApiParams(filters);
      const params: any = { page: p, size: PAGE_SIZE, ...apiParams };
      if (q) params.q = q;

      const res = await fetchDexItemsApi(params);
      const newList: DexItem[] = res.data.birds || [];

      setDexItems((prev) =>
        p === 1 ? newList : [...prev, ...newList.filter((item) => !prev.some((x) => x.id === item.id))]
      );
      setHasMore(newList.length === PAGE_SIZE);
    } catch {
      setError("도감 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 페이징 이펙트
  useEffect(() => {
    if (!showBookmarkOnly) {
      fetchDexItems(page, selectedFilters, searchTerm);
    }
  }, [page, selectedFilters, searchTerm, showBookmarkOnly]); // showBookmarkOnly 의존성 추가

  // 무한 스크롤
  useEffect(() => {
    if (showBookmarkOnly) return; // 북마크 뷰에서는 스크롤 무의미
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300 && !loading && hasMore) {
        setPage((x) => x + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, showBookmarkOnly]);

  // 3. Recoil → URL 동기화 (필터+검색어 반영)
  useEffect(() => {
    const params: any = { ...selectedFilters };
    if (searchTerm.trim()) params.searchTerm = searchTerm.trim();
    const qsStr = qs.stringify(params, { arrayFormat: "repeat" });
    navigate(qsStr ? `/dex?${qsStr}` : "/dex", { replace: true });
  }, [selectedFilters, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  // 4. 북마크 전용 뷰에서 북마크 아이템 로드
  useEffect(() => {
    if (!showBookmarkOnly) return;
    (async () => {
      try {
        const res = await fetchBookmarksApi();
        const ids = (res.data.items || []).map((item: any) => item.birdId);

        // 모든 birdId에 대해 병렬로 상세 정보 fetch
        const birds = await Promise.all(
          ids.map(async (id: number) => {
            try {
              const detailRes = await fetchDexDetailApi(id);
              const bird = detailRes.data;
              if (!bird) return null;
              return {
                id: bird.id,
                koreanName: bird.koreanName,
                scientificName: bird.scientificName,
                thumbImageUrl: Array.isArray(bird.imageUrls) && bird.imageUrls.length > 0 ? bird.imageUrls[0] : "",
              };
            } catch {
              return null;
            }
          })
        );

        // null 필터링 후 set
        setBookmarkItems(birds.filter(Boolean));
      } catch {
        setBookmarkItems([]);
      }
    })();
  }, [showBookmarkOnly, bookmarkedBirdIds]);

  //  스크롤에 따른 Main/Header 전환
  const [opacity, setOpacity] = useState(1);
  const [showMain, setShowMain] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background-whitegray min-h-[100dvh] pb-120">
      {/* {showMain && (
        <div className={clsx("transition-all ease-in-out")} style={{ opacity }}> */}
      <DexMain
        birdCount={585}
        selectedFilters={selectedFilters}
        searchTerm={searchTerm}
        onToggleBookmarkView={() => setShowBookmarkOnly((x) => !x)}
        bookmarkedBirdIds={bookmarkedBirdIds}
      />
      {/* </div>
      )} */}

      {/* {showHeader && (
        <div className={clsx("transition-all ease-in-out opacity-100 translate-y-0")}>
          <DexHeader
            selectedFilters={selectedFilters}
            searchTerm={searchTerm}
            onToggleBookmarkView={() => setShowBookmarkOnly((x) => !x)}
            bookmarkedBirdIds={bookmarkedBirdIds}
          />
        </div>
      )} */}

      <div className={clsx("px-28", showHeader ? "bg-white py-18 mb-20" : "py-22")}>
        <FilterHeader selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      </div>

      <div className="px-24">
        {showBookmarkOnly ? (
          bookmarkItems.length === 0 ? (
            <EmptyPage
              upperText="스크랩한 새가 없어요!"
              lowerText="새 카드 오른쪽 위 스크랩 버튼을 눌러 스크랩해보세요."
              bgColor="gray"
            />
          ) : (
            <DexList
              dexItems={bookmarkItems}
              bookmarkedBirdIds={bookmarkedBirdIds}
              onToggleBookmark={toggleBookmark}
              loading={loading}
            />
          )
        ) : (
          <DexList
            dexItems={dexItems}
            bookmarkedBirdIds={bookmarkedBirdIds}
            onToggleBookmark={toggleBookmark}
            loading={loading}
          />
        )}
      </div>

      <ScrollToTopButton />
    </div>
  );
}
