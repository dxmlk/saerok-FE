import { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  content: ReactNode;
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const MenuItem = ({ icon, content, isActive, onClick, disabled }: MenuItemProps) => {
  return (
    <button
      className={`inline-flex bg-background-whitegray rounded-30.5 h-40 px-15 gap-8 w-fit items-center ${!isActive || disabled ? "cursor-not-allowed" : "cursor-pointer active:opacity-70 transition-opacity duration-100"}`}
      disabled={!isActive || disabled}
      onClick={onClick}
    >
      <div
        className={`w-24 h-24 stroke-[2px] ${isActive ? " text-font-pointYellow stroke-font-pointYellow" : "text-font-whitegrayLight stroke-font-whitegrayLight fill-none"}`}
      >
        {icon}
      </div>
      <div className={`font-pretendard text-body-2 ${isActive ? "text-black" : "text-font-darkgray"}`}>{content}</div>
    </button>
  );
};
export default MenuItem;
