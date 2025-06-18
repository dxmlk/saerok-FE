import { ReactComponent as BackIcon } from "assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { CollectionDetail } from "services/api/collections";

interface CollectionDetailHeaderProps {
  item: CollectionDetail;
}

const CollectionDetailHeader = ({ item }: CollectionDetailHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/saerok");
  };

  const handleEditClick = () => {
    // TODO: 편집 페이지로 라우팅 또는 모달 등 연결
    console.log("편집 기능 미구현");
  };

  return (
    <div className="font-pretendard w-full h-[65px] flex flex-row items-center justify-between bg-white">
      <div className="ml-[24px] flex flex-row gap-[18px]">
        <button onClick={handleBackClick}>
          <BackIcon className="w-[9px] h-[15.758px]" />
        </button>
        <div className="flex flex-col">
          <span className="leading-tight font-700 text-black text-[20px]">{item.bird.koreanName ?? "이름 없음"}</span>
          <span className="leading-none font-400 text-[#979797] text-[15px]">
            {item.bird.scientificName ?? "학명 없음"}
          </span>
        </div>
      </div>
      <button onClick={handleEditClick} className="mr-[24px] font-400 text-[18px] text-[#0d0d0d]">
        편집
      </button>
    </div>
  );
};

export default CollectionDetailHeader;
