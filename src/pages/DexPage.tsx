import axios from "axios";
import DexHeader from "features/dex/components/DexHeader";
import DexList from "features/dex/components/DexList";
import { useEffect, useState } from "react";
import qs from "qs";

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
  const [dexItems, setDexItems] = useState<DexItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    habitats: [],
    seasons: [],
    sizeCategories: [],
  });

  const handleFilterChange = (filterGroup: keyof SelectedFilters, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterGroup]: values,
    }));
    setPage(1);
    setDexItems([]);
    setHasMore(true);
  };

  const fetchDexItems = async (pageNum: number, filters: SelectedFilters) => {
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
      };

      console.log("Fetching dex items with params:", params);

      const res = await axios.get("/api/v1/birds/", {
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }), // 핵심 옵션: 배열을 반복 파라미터로 변환
      });

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
    console.log("현재 페이지:", page, "hasMore:", hasMore, "loading:", loading);
    fetchDexItems(page, selectedFilters);
  }, [page, selectedFilters]);

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

  return (
    <>
      <DexHeader selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      <div className="p-24">
        <DexList dexItems={dexItems} />
      </div>
    </>
  );
};

export default DexPage;
