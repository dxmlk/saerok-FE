import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionItem, fetchMyCollections } from "services/api/collections/index.js";
import EmptyPage from "features/dex/components/EmptyPage.js";
import { useAuth } from "hooks/useAuth.js";
import LoginButton from "components/common/button/LoginButton.js";
import { SaerokItemSkeleton } from "components/common/SkeletonItem.js";

const SaerokList = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

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

  if (!isLoggedIn)
    return (
      <div className="px-24 py-16 mt-10 flex flex-col gap-5 bg-white">
        <div className="font-haru text-subtitle-1-2 text-black">로그인이 필요한 서비스예요</div>
        <div className="font-pretendard text-body-2 text-font-darkgray">로그인하고 탐조 기록을 시작해보세요!</div>
        <div className="flex justify-center mt-88">
          <LoginButton />
        </div>
      </div>
    );

  // 스켈레톤 로딩
  if (loading)
    return (
      <div className="mt-12 flex gap-9 justify-center">
        <div className="flex flex-col gap-12 flex-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SaerokItemSkeleton key={idx} />
          ))}
        </div>
        <div className="flex flex-col gap-12 flex-1 ">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SaerokItemSkeleton key={idx} />
          ))}
        </div>
      </div>
    );

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
      <div className="flex flex-col gap-12 flex-1">
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
      <div className="flex flex-col gap-12 flex-1 ">
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
