import { ReactNode } from "react";

interface EditHeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const EditHeader = ({ leftContent, rightContent }: EditHeaderProps) => {
  return (
    <div className=" px-[24px] font-pretendard w-full h-[66px] bg-white flex flex-row items-center justify-between ">
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  );
};

export default EditHeader;
