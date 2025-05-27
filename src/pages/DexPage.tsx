import axios from "axios";
import DexHeader from "features/dex/components/DexHeader";
import DexList from "features/dex/components/DexList";
import { useEffect, useState } from "react";

interface DexItem {
  id: number;
  koreanName: string;
  scientificName: string;
  thumbImageUrl: string;
}

const PAGE_SIZE = 10;

const DexPage = () => {
  const [dexItems, setDexItems] = useState<DexItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDexItems = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/v1/birds/", {
        params: {
          page,
          size: PAGE_SIZE,
        },
      });

      const newItems: DexItem[] = res.data.birds;

      setDexItems((prev) => {
        const filteredItems = newItems.filter((newItem) => !prev.some((item) => item.id === newItem.id));
        return [...prev, ...filteredItems];
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
    fetchDexItems(page);
  }, [page]);

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
      <DexHeader />
      <div className="p-24">
        <DexList dexItems={dexItems} />
      </div>
    </>
  );
};

export default DexPage;
