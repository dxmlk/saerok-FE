import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionItem, fetchMyCollections } from "services/api/collections";
import EmptyPage from "features/dex/components/EmptyPage";

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

  if (loading) return <div className="text-center mt-12">로딩 중...</div>;

  return collections.length === 0 ? (
    <div className="px-24 py-16 ">
      <EmptyPage
        bgColor="white"
        upperText="아직 발견한 새가 없어요!"
        lowerText="오른쪽 깃털 버튼을 눌러 탐조 기록을 시작해보세요."
      />
    </div>
  ) : (
    <div className="mt-12 flex gap-9 justify-center">
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180">
        {leftItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img
              src={item.imageUrl ?? ""}
              alt={item.koreanName ?? "이름 모를 새"}
              className="rounded-10 w-full h-auto object-cover"
            />
            <div className="mt-8 font-pretendard text-caption-1 truncate overflow-hidden whitespace-nowrap">
              {item.koreanName ?? "이름 모를 새"}
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180 justify-center ">
        {rightItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img
              src={item.imageUrl ?? ""}
              alt={item.koreanName ?? "이름 모를 새"}
              className="rounded-10 w-full h-auto object-cover"
            />
            <div className="mt-8 font-pretendard text-caption-1 truncate overflow-hidden whitespace-nowrap">
              {item.koreanName ?? "이름 모를 새"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaerokList;
