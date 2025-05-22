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

const DexPage = () => {
  const [dexItems, setDexItems] = useState<DexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDexItems = async () => {
      try {
        const res = await axios.get("/api/v1/birds/");
        setDexItems(res.data.birds);
      } catch (err) {
        setError("도감 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDexItems();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center absolute top-1/2 w-full h-full text-subtitle-1">
        도감 데이터 불러오는 중...
      </div>
    );
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <>
      <DexHeader />
      <div className="p-[24px]">
        <DexList dexItems={dexItems} />
      </div>
    </>
  );
};

export default DexPage;
