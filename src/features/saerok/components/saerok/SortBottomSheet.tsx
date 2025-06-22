interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SortBottomSheet = ({ isOpen, onClose }: SortBottomSheetProps) => {
  return (
    <div
      className={`z-50 font-pretendard text-[#0d0d0d] fixed inset-0 flex justify-center items-end transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`font-400 text-[18px] bg-white w-full max-w-md rounded-[20px] transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <button className="mt-[29px] mb-[19px]  inline-flex justify-center w-full ">편집하기</button>
        <div className="flex flex-col gap-[24px] text-[#0d0d0d]">
          <div className="mx-[24px] border border-[1px] border-[#d9d9d9]" />
          <div className="inline-flex justify-center w-full font-600 ">정렬하기</div>
          <button className="inline-flex justify-center w-full ">이름순으로 정렬</button>
          <button className="inline-flex justify-center w-full ">등록일순으로 정렬</button>
          <button className="inline-flex justify-center w-full ">수정일순으로 정렬</button>
        </div>
        <div className="mx-[24px] mt-[27px] border border-[1px] border-[#d9d9d9]" />
        <button
          onClick={onClose}
          className="inline-flex justify-center w-full mt-[21px] mb-[52px] font-600 text-[#D90000] "
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SortBottomSheet;
