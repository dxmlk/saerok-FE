import { forwardRef, ReactNode } from "react";
import { ReactComponent as XIcon } from "assets/icons/button/x.svg";
import BottomSheetPortal from "components/common/BottomSheetPortal";

interface Props {
  close: () => void;
  apply: () => void;
  address: string;
  alias: string;
  onAliasChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ close, apply, address, alias, onAliasChange }, ref) => {
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
          className="fixed  px-24 -bottom-60 pb-60 left-0 right-0 hidden max-h-[90dvh] min-h-100 w-full max-w-500 -translate-x-1/2 flex-col rounded-t-[20px] bg-white  transition-transform duration-0 ease-out"
        >
          <div className="flex justify-between items-start rounded-20 pt-30 pb-24">
            <div className="flex flex-col justify-start gap-7 pl-4">
              <div className="font-moneygraphy text-subtitle-1 text-black ">어디서 봤냐면요... </div>
              <div className=" text-body-2 text-font-whitegrayDark ">이 장소가 어디인지 소개해주세요!</div>
            </div>
            <button onClick={handleClose}>
              <XIcon className="h-11 w-11 text-font-whitegrayDark" />
            </button>
          </div>
          <div className="overflow-hidden border-2 rounded-10 bg-background-white w-full h-44">
            <input
              className="outline-none w-full h-full px-20 py-12 text-body-2 text-font-black placeholder-font-whitegrayLight"
              placeholder="ex. 난지한강공원, 푸르른 산속 ..."
              value={alias}
              onChange={onAliasChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="mt-6 ml-12 text-caption-1 text-font-whitegrayDark">{address}</div>
          <button
            onClick={handleApply}
            className="cursor-pointer rounded-10 mt-44 h-52 py-16 text-center bg-mainBlue text-background-white text-button-1"
          >
            발견 장소 등록
          </button>
          <button
            onClick={handleApply}
            className=" cursor-pointer mt-30 mb-60 text-center text-body-1 text-font-whitegrayDark"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </BottomSheetPortal>
  );
});
BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
