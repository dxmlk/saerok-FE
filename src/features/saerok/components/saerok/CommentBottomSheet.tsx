import { forwardRef } from "react";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";
import { ReactComponent as AddCommentIcon } from "assets/icons/button/add-comment.svg";
import BottomSheetPortal from "components/common/BottomSheetPortal";
import CommentBox from "./CommentBox";

interface Props {
  close: () => void;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ close }, ref) => {
  // 디버깅용 close trace
  const closeWithTrace = () => {
    console.trace("[close] 호출됨");
    close();
  };

  // overlay 클릭 시에만 닫힘
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("[overlay] click, target:", e.target, e.currentTarget);
    if (e.target === e.currentTarget) closeWithTrace();
  };

  return (
    <BottomSheetPortal>
      <div
        className="font-pretendard fixed bottom-0 left-0 right-0 top-0 z-[100] bg-black/50"
        onClick={handleOverlayClick}
      >
        {/* 바텀시트 */}
        <div
          ref={ref}
          role="dialog"
          className="fixed -bottom-60 left-0 right-0 max-h-[100dvh] min-h-540 w-full -translate-x-1/2 flex-col rounded-t-[20px] bg-background-whitegray transition-transform duration-0 ease-out"
        >
          <div className="px-24 flex flex-col items-center pb-80">
            <div className="mt-5 w-108 h-3 bg-font-whitegrayLight rounded-3" />
            <div className="mt-14 flex flex-row w-full justify-between items-start">
              <div className="flex flex-row gap-5 text-subtitle-2">
                <span className="font-moneygraphy text-font-black">댓글</span>
                <span className="font-haru text-font-mainBlue">2</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWithTrace();
                }}
              >
                <XIcon className="w-14 h-14" />
              </button>
            </div>
            <div className="mt-20 flex flex-col gap-7 w-full h-632 pb-108 overflow-y-auto">
              <CommentBox />
              <CommentBox />
              <CommentBox />
              <CommentBox />
              <CommentBox />
            </div>
          </div>
        </div>
        {/* 입력란 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed left-0 right-0 bottom-0 z-[101] bg-background-white w-full pt-19 px-9 pb-44 border-t-1 border-font-whitegray"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full rounded-23 bg-background-whitegray flex flex-row gap-8 pl-24 pr-5 py-5 items-center"
          >
            <input
              onClick={(e) => {
                console.log("[input] 클릭");
                e.stopPropagation();
              }}
              onFocus={(e) => console.log("[input] 포커스")}
              onBlur={(e) => console.log("[input] 블러")}
              className="w-full font-pretendard bg-transparent placeholder-font-whitegrayDark outline-none"
              placeholder="파오리님에게 댓글 남기기"
            />
            <button onClick={(e) => e.stopPropagation()} className="">
              <AddCommentIcon className="w-40 h-40 fill-font-whitegray" />
            </button>
          </div>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
