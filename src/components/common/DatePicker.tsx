import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const CustomDatePicker = ({ selected, onChange }: { selected: Date | null; onChange: (date: Date | null) => void }) => (
  <div className="h-[44px] w-full rounded-[10px] border-[2px] border-[#d9d9d9] flex items-center px-[20px] text-[15px] text-font-black font-pretendard">
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy.MM.dd"
      placeholderText="발견 일시를 입력해 주세요"
      locale={ko}
      className="w-full h-full bg-transparent outline-none"
      popperPlacement="bottom"
    />
  </div>
);

export default CustomDatePicker;
