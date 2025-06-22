import { forwardRef, ReactNode } from "react";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";
import BottomSheetPortal from "components/common/BottomSheetPortal";

interface Props {
  close: () => void;
  apply: () => void;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ close, apply }, ref) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the click event from bubbling up to the overlay
    close(); // close the BottomSheet when the close button is clicked
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the click event from bubbling up to the overlay
    apply(); // close the BottomSheet when the close button is clicked
  };

  const handleOverlayClick = () => {
    close(); // close the BottomSheet when the overlay (background) is clicked
  };

  return (
    <BottomSheetPortal>
      <div
        className="font-pretendard fixed bottom-0 left-0 right-0 top-0 z-[100] hidden bg-black/50"
        onClick={handleOverlayClick}
      >
        <div
          ref={ref}
          role="dialog"
          className="fixed px-24 -bottom-60 pb-60 left-0 right-0 hidden max-h-[90dvh] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-white  transition-transform duration-0 ease-out"
        >
          <button onClick={handleApply} className="cursor-pointer rounded-10 py-36 text-center text-red text-button-1">
            신고하기
          </button>
          <button
            onClick={handleClose}
            className="border-t cursor-pointer py-28 text-center text-body-1 text-font-whitegrayDark"
          >
            닫기
          </button>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
