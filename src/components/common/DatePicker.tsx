import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const DatePicker = ({ value, onChange }: { value: DateValueType; onChange: (value: DateValueType) => void }) => {
  return (
    <div className="h-[44px] w-full border rounded-[10px] border-[2px] border-[#d9d9d9] flex items-center px-[20px] text-[15px] text-[#6d6d6d] font-pretendard">
      <Datepicker
        value={value}
        onChange={onChange}
        useRange={false}
        asSingle={true}
        placeholder={"발견 일시를 입력해주세요"}
        inputClassName="w-full h-full outline-none bg-transparent"
        toggleClassName="hidden"
        displayFormat="YYYY.MM.DD"
        containerClassName="w-full"
        popoverDirection="down"
      />
    </div>
  );
};

export default DatePicker;
