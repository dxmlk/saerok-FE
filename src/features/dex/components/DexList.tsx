import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { useNavigate } from "react-router-dom";
import { DexItemSkeleton } from "../../../components/common/SkeletonItem";

interface DexItem {
  id: number;
  koreanName: string;
  scientificName: string;
  thumbImageUrl: string;
}

interface DexListProps {
  dexItems: DexItem[];
  bookmarkedBirdIds?: number[];
  onToggleBookmark?: (id: number) => void;
  loading?: boolean;
}

const DexList = ({ dexItems, bookmarkedBirdIds = [], onToggleBookmark, loading }: DexListProps) => {
  const navigate = useNavigate();

  // 초기 로딩 판별 (ex. 아이템이 하나도 없고 loading 중이면 초기 로딩)
  const isInitialLoading = loading && dexItems.length === 0;

  const handleItemClick = (id: number) => {
    navigate(`/dex-detail/${id}`);
  };
  const handleScrapClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(id);
    }
  };

  if (isInitialLoading) {
    // 최초 진입/새 필터 등에서만 전체 Skeleton
    return (
      <div className="grid grid-cols-2 gap-15">
        {Array.from({ length: 8 }).map((_, i) => (
          <DexItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  // 기존 리스트
  return (
    <>
      <div className="grid grid-cols-2 gap-15">
        {dexItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="relative rounded-10 stroke-font-whitegrayLight stroke-1 bg-background-white flex flex-col w-full h-198 overflow-visible "
            style={{ boxShadow: "0px 0px 5px rgba(13,13,13,0.1)" }}
          >
            <button
              type="button"
              onClick={(e) => {
                handleScrapClick(e, item.id);
              }}
              className="absolute w-25 h-25 top-9 right-9 z-20"
            >
              <ScrapIcon
                className={`w-15 h-22 stroke-[1.5px] text-font-darkgray [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))] ${bookmarkedBirdIds.includes(item.id) ? `stroke-background-white fill-pointYellow ` : " stroke-font-darkgray fill-[#d9d9d9] opacity-60"} `}
              />
            </button>
            <img
              src={item.thumbImageUrl}
              alt={item.koreanName}
              loading="lazy"
              className="absolute top-0 left-0 w-full h-170 object-cover z-0 rounded-10"
            />

            <div
              className="absolute bottom-26 w-full h-26  backdrop-blur-[1.5px] z-10 rounded-t-10 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to bottom, rgba(254,254,254,0.8) 0%, rgba(254,254,254,1) 100%)",
              }}
            />

            <div className="absolute bottom-0 w-full h-52 flex flex-col gap-0 bg-transparent px-14 py-10 z-30 ">
              <span className="truncate overflow-hidden whitespace-nowrap font-moneygraphy text-body-3 text-black ">
                {item.koreanName}
              </span>
              <span className="truncate overflow-hidden whitespace-nowrap font-pretendard text-caption-1 text-font-whitegrayDark">
                {item.scientificName}
              </span>
            </div>
          </div>
        ))}
      </div>
      {loading && dexItems.length > 0 && (
        <div className="flex justify-center py-4">
          <DexItemSkeleton />
        </div>
      )}
    </>
  );
};
export default DexList;
