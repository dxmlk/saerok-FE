import { ReactComponent as GreenCircle } from "assets/background/green-circle.svg";
import { ReactComponent as PinkCircle } from "assets/background/pink-circle.svg";
import { ReactComponent as BlueCircle } from "assets/background/blue-circle.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { ReactComponent as SortIcon } from "assets/icons/sort.svg";
const SaerokMain = () => {
  return (
    <>
      <div className="relative overflow-hidden h-428 border font-pretendard">
        {/* 배경 */}
        <GreenCircle className="absolute bottom-32 right-56" />
        <PinkCircle className="absolute bottom-200 left-288" />
        <BlueCircle className="absolute bottom-0 left-228" />
        <div className="absolute inset-0 bg-[#F2F2F2]/60 backdrop-blur-[80px] z-10" />

        {/* 메인 문구 */}
        <div className="absolute left-24 bottom-244 z-20 text-black font-bold text-50  leading-10">
          <div>Exploring</div>
          <div>Your</div>
          <div>Birds</div>
        </div>

        {/* 우측 상단 버튼 2개*/}
        <div>
          <SearchIcon />
        </div>
        <div></div>

        <SortIcon />
      </div>
    </>
  );
};

export default SaerokMain;
