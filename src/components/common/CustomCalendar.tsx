import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "index.css";
import { enUS } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

const customLocale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][n],
  },
};

registerLocale("custom-en", customLocale);

const CustomCalendar = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    // <DatePicker
    //   selected={date}
    //   onChange={(date: Date | null) => setDate(date)}
    //   dateFormat="yyyy??MM??dd??
    //   className="font-pretendard w-full px-4 py-2 border border-gray-300 rounded-md text-black"
    //   placeholderText="? ì§œë¥?? íƒ?˜ì„¸??
    //   locale="custom-en"
    // />
    <></>
  );
};
export default CustomCalendar;
