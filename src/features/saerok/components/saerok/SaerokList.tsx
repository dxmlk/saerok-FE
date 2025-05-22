import { useNavigate } from "react-router-dom";
import { saerokItems } from "features/saerok/mock/saerokItems";

const SaerokList = () => {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/collection-detail/${id}`);
  };

  const leftItems = saerokItems.filter((_, idx) => idx % 2 === 0);
  const rightItems = saerokItems.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="mt-16 flex gap-5">
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180">
        {leftItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img src={item.imageUrl} alt={item.birdName} className="rounded-10 w-full h-auto object-cover" />
            <div className="mt-8 font-moneygraphy text-caption-2">{item.birdName}</div>
          </div>
        ))}
      </div>

      {/* 오른쪽 컬럼 */}
      <div className="flex flex-col gap-12 w-180 justify-center ">
        {rightItems.map((item) => (
          <div key={item.collectionId} onClick={() => handleItemClick(item.collectionId)} className="cursor-pointer">
            <img src={item.imageUrl} alt={item.birdName} className="rounded-10 w-full h-auto object-cover" />
            <div className="mt-8 font-moneygraphy text-caption-2">{item.birdName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaerokList;
