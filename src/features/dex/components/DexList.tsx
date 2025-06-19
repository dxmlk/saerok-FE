import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { useNavigate } from "react-router-dom";

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
}

const DexList = ({ dexItems, bookmarkedBirdIds = [], onToggleBookmark }: DexListProps) => {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/dex-detail/${id}`);
  };
  const handleScrapClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(id);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
        {dexItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="relative rounded-10 stroke-font-whitegrayLight stroke-1 bg-background-white flex flex-col w-full h-198 overflow-visible "
            // style={{
            //   boxShadow: bookmarkedBirdIds.includes(item.id)
            //     ? "0px 0px 5px rgba(152, 194, 253, 1)" // 북마크 O
            //     : "0px 0px 10px rgba(13, 13, 13, 0.1)", // 북마크 x
            // }}
            // 북마크 여부가 아니라 새록 여부네... 나중에 수정 필요
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
                className={`w-15 h-22 stroke-[1.5px] text-font-darkgray [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))] ${bookmarkedBirdIds.includes(item.id) ? `stroke-background-white fill-font-pointYellow ` : " stroke-font-darkgray fill-[#d9d9d9] opacity-60"} `}
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
    </>
  );
};
export default DexList;
