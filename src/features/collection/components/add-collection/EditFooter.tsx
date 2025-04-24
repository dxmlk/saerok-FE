interface EditFooterProps {
  text: string;
}

const EditFooter = ({ text }: EditFooterProps) => {
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-[24px] pb-[43px] z-50">
      <button
        className=" font-pretendard text-white text-[18px] rounded-[10px] font-700  left-0 bg-green h-[53px] w-full "
        onClick={() => handleClick()}
      >
        {text}
      </button>
    </div>
  );
};
export default EditFooter;
