import { ReactComponent as GlobeIcon } from "assets/icons/button/globe.svg";
import { useEffect, useRef, useState } from "react";

interface ToggleMapModeProps {
  isMineOnly: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleMapMode = ({ isMineOnly, onToggle }: ToggleMapModeProps) => {
  const [showNotice, setShowNotice] = useState(false);
  const [noticeText, setNoticeText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // isMineOnly가 변할 때마다 안내문구 보여줌
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isMineOnly) {
      setNoticeText("나의 새록만 보여요");
    } else {
      setNoticeText("다른 사람의 새록도 볼 수 있어요");
    }
    setShowNotice(true);

    // 1초 뒤 사라짐
    timeoutRef.current = setTimeout(() => setShowNotice(false), 1000);

    // 컴포넌트 언마운트 시 타임아웃 정리
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMineOnly]);

  return (
    <>
      <button
        className={`z-40 fixed bottom-120 right-24 w-72 h-44 flex items-center px-3 rounded-full transition-colors duration-300
        ${isMineOnly ? "bg-font-whitegrayLight" : "bg-mainBlue"}`}
        onClick={() => onToggle(!isMineOnly)}
        aria-pressed={isMineOnly}
        // style={{
        //   boxShadow: "0px 2px 8px 0px rgba(35, 53, 137, 0.10)",
        // }}
      >
        {/* 트랙 내부의 아이콘이 좌/우로 부드럽게 이동 */}
        <div
          className={`w-36 h-36 flex items-center justify-center rounded-full bg-white shadow
          transition-transform duration-300
          ${isMineOnly ? "translate-x-[-8px]" : "translate-x-[20px]"}`}
        >
          <GlobeIcon className={`w-24 h-24 ${isMineOnly ? "stroke-font-whitegrayLight" : "stroke-font-mainBlue"}`} />
        </div>
      </button>
      {showNotice && (
        <div className="whitespace-nowrap fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-10 bg-glassmorphism h-50  px-24 py-15 font-haru text-subtitle-2 text-black shadow-xl transition-opacity duration-300">
          {noticeText}
        </div>
      )}{" "}
    </>
  );
};

export default ToggleMapMode;
