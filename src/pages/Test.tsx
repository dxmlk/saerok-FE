import { DexDetailSkeleton, DexItemSkeleton, SaerokItemSkeleton } from "components/common/SkeletonItem";
import SaerokDetailHeader from "features/saerok/components/saerok/SaerokDetailHeader";
import { SaerokInfoSkeleton } from "components/common/SkeletonItem";
import { ReactComponent as BubbleTailIcon } from "assets/icons/icon/bubble-tail.svg";

const Test = () => {
  return (
    <div className="flex flex-col items-center gap-10 ">
      {/* 말풍선 본체 */}
      <button
        type="button"
        className="collection-overlay-btn relative gap-7 flex flex-col items-center bg-[#FEFEFE] rounded-[10px] max-w-[180px]  px-16 py-16 z-10"
      >
        <div className="font-moneygraphy text-body-3 text-black mb-1">검은머리물떼새</div>
        <div
          className="font-pretendard text-caption-1 text-center text-font-black"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          노트를 작성하는 곳노트를 작성하는 곳노트를 작성하는 곳노트를 작성하는 곳노트를 작성하는 곳노트를 작성하는
          곳노트를 작성하는 곳
        </div>
      </button>
      {/* 꼬리 SVG */}
      <div className="relative -mt-12 z-0">
        <BubbleTailIcon />
      </div>
      {/* 썸네일 버튼 */}
      <button
        className="collection-overlay-btn w-[60px] h-[60px] rounded-full border-[3px] border-white bg-white overflow-hidden box-border "
        type="button"
      >
        <img src={""} className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default Test;
