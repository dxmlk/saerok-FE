import { forwardRef, ReactNode } from "react";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";
import BottomSheetPortal from "components/common/BottomSheetPortal";
import CommentBox from "./CommentBox";
import { CommentBoxProps } from "features/saerok/components/saerok/saerok-detail/CommentButton";
import EmptyPage from "features/dex/components/EmptyPage";

interface Props {
  close: () => void;
  items: CommentBoxProps[];
  isFull: boolean;
  onDelete: (commentId: number) => void;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ close, items, isFull, onDelete }, ref) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the click event from bubbling up to the overlay
    close(); // close the BottomSheet when the close button is clicked
  };

  const handleOverlayClick = () => {
    close(); // close the BottomSheet when the overlay (background) is clicked
  };

  return (
    <BottomSheetPortal>
      <div
        className="font-pretendard fixed w-full max-w-500 bottom-0 left-1/2 -translate-x-[50%] top-0 z-[100] hidden bg-black/50"
        onClick={handleOverlayClick}
      >
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          className=" bottom-0 left-0 right-0 absolute w-full -translate-x-1/2 flex-col rounded-t-[20px] bg-background-whitegray  transition-transform duration-0 ease-out"
          style={{
            height: isFull ? "100dvh" : "67dvh",
            maxHeight: "100dvh",
          }}
        >
          <div className="px-24 flex flex-col items-center pb-80">
            <div className="mt-5 w-108 h-3 bg-font-whitegrayLight rounded-3" />
            <div className="mt-14 flex flex-row w-full justify-between items-start">
              <div className="flex flex-row gap-5 text-subtitle-2">
                <span className="font-moneygraphy text-font-black">댓글</span>
                <span className="font-haru text-font-mainBlue">{items.length}</span>
              </div>
              <button onClick={handleClose}>
                <XIcon className="w-14 h-14" />
              </button>
            </div>
            <div
              className="mt-20 flex flex-col gap-7 w-full pb-20 mb-114 overflow-y-auto"
              style={{
                height: isFull ? "calc(100dvh - 176px)" : "calc(67dvh - 176px)",
              }}
            >
              {items.length > 0 ? (
                items.map((item) => (
                  <CommentBox handleDelete={() => onDelete(item.commentId)} key={item.commentId} {...item} />
                ))
              ) : (
                <EmptyPage bgColor="gray" upperText="아직 댓글이 없어요!" lowerText="댓글을 남겨보세요." />
              )}
            </div>
          </div>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
