import { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  content: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const MenuItem = ({ icon, content, isActive, onClick }: MenuItemProps) => {
  return (
    <button
      className={`inline-flex bg-background-whitegray rounded-30.5 h-40 px-15 gap-8 w-fit items-center ${!isActive ? "cursor-not-allowed" : "cursor-pointer"}`}
      disabled={!isActive}
      onClick={onClick}
    >
      <div
        className={`w-24 h-24 ${isActive ? " text-font-pointYellow stroke-font-pointYellow" : "text-font-whitegrayLight stroke-font-whitegrayLight"}`}
      >
        {icon}
      </div>
      <div className={`font-pretendard text-body-2 ${isActive ? "text-black" : "text-font-darkgray"}`}>{content}</div>
    </button>
  );
};
export default MenuItem;
