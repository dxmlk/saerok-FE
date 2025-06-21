import { ReactComponent as YellowCircle } from "assets/background/yellow-circle.svg";
import { ReactComponent as PinkCircle } from "assets/background/pink-circle.svg";
import { ReactComponent as BlueCircle } from "assets/background/blue-circle.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort2.svg";
import { ReactComponent as AddSaerokIcon } from "assets/icons/button/add-saerok.svg";
import { ReactComponent as SpeechBubbleIcon } from "assets/icons/image/speech-bubble.svg";
import { ReactComponent as RadioButton } from "assets/icons/button/radio-button.svg";

import { useNavigate } from "react-router-dom";
import SAEROK_MESSAGES from "constants/saerokMessages";
import { useEffect, useMemo, useState } from "react";
import { fetchMyCollections } from "services/api/collections";
import { useAuth } from "hooks/useAuth";
import useBottomSheet from "hooks/useBottomSheet";
import BottomSheet from "components/common/BottomSheet";

const SaerokMain = () => {
  const navigate = useNavigate();
  const [birdCount, setBirdCount] = useState(0);
  const { isLoggedIn } = useAuth();

  // const SortItem = ({title, checked, onChange}: {title: string; checked: boolean; onChange: () => void}) => {
  //   <button onClick={(e) => {
  //     e.stopPropagation();
  //     onChange();
  //   }} className="flex flex-row justify-between items-center">
  //     <div className="flex flex-row gap-0 justify-start items-center text-subtitle-3 font-pretendard">
  //       <span className="text-font-mainBlue" >{title}</span>
  //       <span className="text-font-black">으로 정렬</span>
  //     </div>
  //     <RadioButton className={`w-24 h-24 stroke-[1.5px] ${checked ? "text-mainBlue" : "text-font-whitegrayDark" }`} />
  //               {checked && (
  //                 <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-mainBlue" />
  //               )}
  //   </button>
  // }
  // const getBottomSheetContent = () => {
  //   return (
  //     <div className="flex flex-col gap-25">
  //       <SortItem title={"이름 순"} checked={} onChange={}></SortItem>
  //     </div>
  //   )
  // }

  const handleAddSaerokClick = () => {
    navigate(`/add-saerok`);
  };

  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * SAEROK_MESSAGES.length);
    return SAEROK_MESSAGES[idx];
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await fetchMyCollections();
        setBirdCount(items.length);
      } catch (err) {
        console.log("컬렉션 불러오기 실패", err);
      }
    };

    loadData();
  }, []);
  return (
    <>
      <div className="relative overflow-hidden h-384 font-pretendard ">
        {/* 배경 */}
        <YellowCircle className="absolute bottom-32 right-56" />
        <PinkCircle className="absolute bottom-200 left-288" />
        <BlueCircle className="absolute bottom-0 left-228" />
        <div className="absolute inset-0 bg-[#F2F2F2]/60 backdrop-blur-[80px] z-10" />

        {/* 메인 문구 */}
        <div
          style={{ whiteSpace: "pre-line" }}
          className="absolute left-24 top-30 z-20 text-black text-headline-1 font-haru leading-10"
        >
          <div>{randomMessage}</div>
        </div>

        {/* 우측 상단 정렬 버튼*/}
        {/* <div
          onClick={() => openBottomSheet()}
          className="active:opacity-70 transition-opacity duration-100 absolute right-24 bottom-316 w-40 h-40 rounded-full bg-glassmorphism z-20 flex items-center justify-center"
        >
          <SortIcon />
        </div> */}

        {/* 몇 종의 새 */}
        <div className="absolute left-24 bottom-28 z-20 leading-10 ">
          <div className="font-bold text-40 text-[#4190FF]">{birdCount}</div>
          <div className="text-caption-1 text-font-black">종의 새가 새록에 담겨있어요</div>
        </div>

        {/* 우측 하단 종추 버튼 */}
        {isLoggedIn && (
          <button
            onClick={() => handleAddSaerokClick()}
            className="active:opacity-70 transition-opacity duration-100 absolute right-24 bottom-28 w-60 h-60 rounded-full bg-font-mainBlue z-20 flex items-center justify-center "
          >
            <AddSaerokIcon className="text-white h-40 w-40" />
          </button>
        )}
        {!isLoggedIn && (
          <>
            <button className="absolute right-24 bottom-100 z-20" onClick={() => navigate("/login")}>
              <div className="relative w-176 h-56">
                <SpeechBubbleIcon className="absolute top-0 left-0 w-full h-full" />
              </div>
            </button>
            <button
              disabled
              className="active:opacity-70 transition-opacity duration-100 absolute right-24 bottom-28 w-60 h-60 rounded-full bg-font-whitegray z-20 flex items-center justify-center "
            >
              <AddSaerokIcon className="text-white h-40 w-40" />
            </button>
          </>
        )}
      </div>

      {/* <BottomSheet
        ref={bottomSheetRef}
        title={"정렬하기"}
        close={closeBottomSheet}
        apply={closeBottomSheet}
      >
        <div ref={contentRef} className="px-36">
        {getBottomSheetContent}
        </div>
      </BottomSheet> */}
    </>
  );
};

export default SaerokMain;
