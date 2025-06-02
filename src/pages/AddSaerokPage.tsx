import SearchBarSaerok from "components/common/textfield/SearchBarSaerok";
import AddImage from "features/saerok/components/add-saerok/AddImage";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";
import { useState, useEffect } from "react";
import BackButton from "components/common/BackButton";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "components/common/DatePicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";

const AddSaerokPage = () => {
  const [searchName, setSearchName] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [searchLocation, setSearchLocation] = useState("");
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace;

  const [review, setReview] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPlace) {
      const name = selectedPlace.road_address_name || selectedPlace.address_name;
      setSearchLocation(name);
    }
  }, [selectedPlace]);

  const getBorderColor = (field: string) => {
    return focusedField === field ? "#51BEA6" : "#d9d9d9";
  };

  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const onSearch = (keyword: string) => {
    console.log("Searching for:", keyword);
  };

  return (
    <>
      <EditHeader
        leftContent={<span className="text-headline-2 font-moneygraphy text-font-black">새록 작성하기</span>}
        rightContent={<BackButton />}
      />

      {/* // 편집
        <EditHeader
            leftContent={<span className='text-black text-[18px] font-400'>취소</span>}
            rightContent={}
        /> */}

      <div className="px-24  bg-white h-[100vh] font-pretendard">
        <AddImage />
        <div className="mt-32">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">새 이름</div>
          <SearchBarSaerok
            searchTerm={searchName}
            setSearchTerm={setSearchName}
            placeholder="새 이름을 입력해주세요"
            searchType="bird"
            disabled={isChecked}
          />
          <div
            onClick={() => setIsChecked(!isChecked)}
            className="mt-9 flex flex-row items-center justify-end gap-6 cursor-pointer"
          >
            <div
              className={`w-18 h-18 rounded-4 flex justify-center items-center ${isChecked ? "bg-mainBlue border-none" : "bg-transparent border-1.5 border-font-whitegrayLight"}`}
            >
              <CheckIcon className="w-12 h-12 text-white" />
            </div>
            <div className="text-font-darkgray font-pretendard font-medium text-13">모르겠어요</div>
          </div>
        </div>
        <div className="mt-12">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">발견 일시</div>
          <DatePicker value={dateValue} onChange={setDateValue} />
        </div>
        <div className="mt-[20px]">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">발견 장소</div>
          <SearchBarSaerok
            searchTerm={searchName}
            setSearchTerm={setSearchName}
            placeholder="발견 장소를 선택해주세요"
            searchType="place"
          />
          {/* {selectedPlace && (
            <div className="mt-2 text-sm text-gray-500">
              {selectedPlace.road_address_name || selectedPlace.address_name}
            </div>
          )} */}
        </div>
        <div className="mt-[20px]">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">한 줄 평</div>
          <div
            className=" h-[44px] w-full flex rounded-[10px] border-[2px] items-center"
            style={{ borderColor: `${getBorderColor("review")}` }}
          >
            <input
              className="outline-none w-full h-full items-center text-[15px] font-400 ml-[20px] mr-[26px]  placeholder-font-whitegrayDark"
              placeholder="한 줄 평을 입력해주세요"
              value={review}
              onFocus={() => setFocusedField("review")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setReview(e.target.value);
                }
              }}
            />
          </div>
          <div className="mt-[5px] text-right text-[#979797] font-400 text-[13px]">({review.length}/100)</div>
        </div>
      </div>
      <EditFooter text="종 추가" />
    </>
  );
};
export default AddSaerokPage;
