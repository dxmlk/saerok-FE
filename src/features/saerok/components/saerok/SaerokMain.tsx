import { ReactComponent as YellowCircle } from "assets/background/yellow-circle.svg";
import { ReactComponent as PinkCircle } from "assets/background/pink-circle.svg";
import { ReactComponent as BlueCircle } from "assets/background/blue-circle.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort2.svg";
import { ReactComponent as AddSaerokIcon } from "assets/icons/button/add-saerok.svg";
import { useNavigate } from "react-router-dom";

interface SaerokMainProps {
  birdCount: number;
}

const SaerokMain = ({ birdCount }: SaerokMainProps) => {
  const navigate = useNavigate();

  const handleSortClick = () => {
    console.log("Sort button clicked");
  };
  const handleAddSaerokClick = () => {
    navigate(`/add-saerok`);
  };

  return (
    <>
      <div className="relative overflow-hidden h-428 font-pretendard ">
        {/* 배경 */}
        <YellowCircle className="absolute bottom-32 right-56" />
        <PinkCircle className="absolute bottom-200 left-288" />
        <BlueCircle className="absolute bottom-0 left-228" />
        <div className="absolute inset-0 bg-[#F2F2F2]/60 backdrop-blur-[80px] z-10" />

        {/* 메인 문구 */}
        <div className="absolute left-24 bottom-312 z-20 text-black font-bold text-50  leading-10">
          <div>나의 새록</div>
        </div>

        {/* 우측 상단 정렬 버튼*/}
        <div
          onClick={() => handleSortClick()}
          className="absolute right-24 bottom-316 w-40 h-40 rounded-full bg-glassmorphism z-20 flex items-center justify-center"
        >
          <SortIcon />
        </div>

        {/* 몇 종의 새 */}
        <div className="absolute left-24 bottom-20 z-20 leading-10 ">
          <div className="font-bold text-40 text-[#4190FF]">{birdCount}</div>
          <div className="text-caption-1 text-font-black">종의 새가 새록에 담겨있어요</div>
        </div>

        {/* 우측 하단 종추 버튼 */}
        <div
          onClick={() => handleAddSaerokClick()}
          className="absolute right-24 bottom-22 w-60 h-60 rounded-full bg-mainBlue z-20 flex items-center justify-center "
        >
          <AddSaerokIcon className="text-white h-36 w-36" />
        </div>
      </div>
    </>
  );
};

export default SaerokMain;
