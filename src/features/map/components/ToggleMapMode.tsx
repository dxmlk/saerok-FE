import { ReactComponent as GlobeIcon } from "assets/icons/button/globe.svg";

interface ToggleMapModeProps {
  isMineOnly: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleMapMode = ({ isMineOnly, onToggle }: ToggleMapModeProps) => {
  return (
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
  );
};

export default ToggleMapMode;
