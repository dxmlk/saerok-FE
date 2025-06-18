import { useNavigate } from "react-router-dom";
import { saerokItems } from "features/saerok/mock/saerokItems";
import { useEffect, useState } from "react";
import { CollectionItem, fetchMyCollections } from "services/api/collections";

const SaerokList = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await fetchMyCollections();
        setCollections(items);
      } catch (err) {
        console.error("컬렉션 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleItemClick = (id: number) => {
    navigate(`/saerok-detail/${id}`);
  };

  const leftItems = collections.filter((_, idx) => idx % 2 === 0);
  const rightItems = collections.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="mt-12 flex gap-9 justify-center">
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180">
        {leftItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img src={item.imageUrl ?? ""} alt={item.koreanName} className="rounded-10 w-full h-auto object-cover" />
            <div className="mt-8 font-moneygraphy text-caption-2 truncate overflow-hidden whitespace-nowrap">
              {item.koreanName}
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180 justify-center ">
        {rightItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img src={item.imageUrl ?? ""} alt={item.koreanName} className="rounded-10 w-full h-auto object-cover" />
            <div className="mt-8 font-moneygraphy text-caption-2 truncate overflow-hidden whitespace-nowrap">
              {item.koreanName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaerokList;
