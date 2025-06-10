import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import React from "react";

const Test = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-xs">
        <div className="relative w-[180px] h-[97px]">
          <img src="/src/assets/icons/button/speech-bubble.svg" className="w-full h-full" />
          <div className="w-full absolute top-0 left-1/2 -translate-x-1/2 pt-[12px] pl-[18px] pr-[24px] text-center text-font-black">
            <div className="font-moneygraphy text-body-3 ">까치</div>
            <div style={{ minHeight: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                className="mt-[7px] font-pretendard text-caption-1 text-center text-font-black"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                드디어 까치를 보다니 드디어 까치를 보다니드디어 까치를 보다니드디어 까치를 보다니드디어 까치를
                보다니드디어 까치를 보다니드디어 까치를 보다니
              </div>
            </div>
          </div>
        </div>
        <button className="w-[60px] h-[60px] rounded-full border-[3px] border-white bg-white overflow-hidden box-border">
          <img src="${imageUrl}" className="w-full h-full object-cover" />
        </button>
      </div>
    </>
  );
};

export default Test;
