import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";

const CustomDatePicker = ({ selected, onChange }: { selected: Date | null; onChange: (date: Date | null) => void }) => (
  <div className="[&_.react-datepicker__triangle]:hidden h-[44px] w-full rounded-[10px] border-[2px] border-[#d9d9d9] flex items-center px-[20px] text-[15px] text-font-black font-pretendard">
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy.MM.dd"
      placeholderText="발견 일시를 입력해 주세요"
      className="w-full h-full bg-transparent outline-none"
      popperPlacement="bottom"
      calendarClassName="font-pretendard rounded-10 [filter:drop-shadow(0_10px_60px_rgba(0,0,0,0.1))] ml-2 px-8 py-8  "
      popperClassName="mt-12"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }: any) => (
        <div className="px-16 flex justify-between items-center mb-2">
          <span className=" text-font-black font-pretendard font-bold text-[15px]">
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </span>
          <div className="flex gap-30">
            <button onClick={decreaseMonth} className="text-mainBlue ">
              <BackIcon className="w-8 h-16" />
            </button>
            <button onClick={increaseMonth} className="text-mainBlue ">
              <BracketIcon className="w-8 h-16" />
            </button>
          </div>
        </div>
      )}
    />
  </div>
);

export default CustomDatePicker;
