import { ReactNode } from "react";

interface EditHeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const EditHeader = ({ leftContent, rightContent }: EditHeaderProps) => {
  return (
    <div className=" px-30 w-full h-68 bg-white flex flex-row items-center justify-between mb-20">
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  );
};

export default EditHeader;
