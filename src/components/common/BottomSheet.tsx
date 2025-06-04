import { forwardRef, ReactNode } from "react";
import BottomSheetPortal from "./BottomSheetPortal";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";

interface Props {
  children: ReactNode;
  close: () => void;
  apply: () => void;
  title: string;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ children, close, title, apply }, ref) => {
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
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] hidden bg-black/50" onClick={handleOverlayClick}>
        <div
          ref={ref}
          role="dialog"
          className="fixed -bottom-60 pb-60 left-0 right-0 hidden max-h-[90dvh] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-white  transition-transform duration-0 ease-out"
        >
          <div className="flex justify-between items-center px-24 rounded-20">
            <div className="flex-grow text-center font-moneygraphy text-subtitle-2 text-black py-24">{title}</div>
            <button onClick={handleClose} className="h-14 w-14 text-font-whitegrayDark">
              <XIcon />
            </button>
          </div>
          <div className="px-16">{children}</div>

          <button
            onClick={handleApply}
            className="mt-20 border-t border-1 border-background-whitegray h-96 text-font-mainBlue text-button-1"
          >
            완료
          </button>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
