import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import React from "react";

const Test = () => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  return (
    <>
      <button onClick={openBottomSheet} className="px-4 py-2 bg-blue-600 text-white rounded">
        바텀시트 열기
      </button>

      {/* BottomSheet는 내부에서 BottomSheetPortal을 사용하므로 따로 감쌀 필요 없음 */}
      <BottomSheet ref={bottomSheetRef} title="예시 바텀시트">
        <div ref={contentRef} className="p-4">
          <p>바텀시트 내용입니다.</p>
          <button onClick={closeBottomSheet} className="mt-4 px-3 py-2 bg-red-500 text-white rounded">
            닫기
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default Test;
