import { ReactComponent as ResetIcon } from "assets/icons/icon/reset.svg";
import { ReactComponent as SeasonIcon } from "assets/icons/icon/season.svg";
import { ReactComponent as HabitatIcon } from "assets/icons/icon/habitat.svg";
import { ReactComponent as SizeIcon } from "assets/icons/icon/size.svg";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as RadioButton } from "assets/icons/button/radio-button.svg";
import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import { useEffect, useState, useRef } from "react";

interface SelectedFilters {
  habitats: string[];
  seasons: string[];
  sizeCategories: string[];
}

interface FilterHeaderProps {
  selectedFilters: SelectedFilters;
  onFilterChange: (filterGroup: keyof SelectedFilters, values: string[]) => void;
}

const FilterHeader = ({ selectedFilters, onFilterChange }: FilterHeaderProps) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);

  const handleResetFilters = () => {
    onFilterChange("seasons", []);
    onFilterChange("habitats", []);
    onFilterChange("sizeCategories", []);
  };

  // 바텀시트 내 임시 선택 상태
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  const prevFilterRef = useRef<string | null>(null);

  // 필터 그룹 키 매핑
  const filterGroupKey = (filterGroup: string) => {
    switch (filterGroup) {
      case "계절":
        return "seasons";
      case "서식지":
        return "habitats";
      case "크기":
        return "sizeCategories";
      default:
        return "seasons";
    }
  };

  // 필터 상세 옵션 목록
  const seasons = ["봄", "여름", "가을", "겨울"];
  const habitats = [
    "갯벌",
    "경작지/들판",
    "산림/계곡",
    "해양",
    "거주지역",
    "평지숲",
    "하천/호수",
    "인공시설",
    "동굴",
    "습지",
    "기타",
  ];
  const sizeCategories = ["참새", "비둘기", "오리", "기러기"];

  // 바텀시트 열릴 때 해당 필터 그룹 상세 선택값 복사 (초기화)
  useEffect(() => {
    if (currentFilter && prevFilterRef.current !== currentFilter) {
      const key = filterGroupKey(currentFilter);
      setTempSelected(selectedFilters[key] || []);
      prevFilterRef.current = currentFilter;
    }
  }, [currentFilter, selectedFilters]);

  // 임시 선택 토글 (체크박스)
  const toggleTempSelected = (item: string) => {
    setTempSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  // 임시 전체선택/해제
  const setAllTempSelected = (selectAll: boolean, items: string[]) => {
    setTempSelected(selectAll ? [...items] : []);
  };

  // 완료 눌렀을 때 부모 상태 업데이트
  const handleApplyFilters = () => {
    if (!currentFilter) return;
    const key = filterGroupKey(currentFilter);
    onFilterChange(key, tempSelected);
    closeBottomSheet();
  };

  // 닫기(x버튼, 배경 클릭 시)
  const handleCloseWithoutApply = () => {
    closeBottomSheet();
  };

  // 바텀시트 열기
  const handleButtonClick = (filter: string) => {
    setCurrentFilter(filter);
    openBottomSheet();
  };

  // CheckBox 컴포넌트
  interface CheckBoxProps {
    title: string;
    checked?: boolean;
    onChange: (title: string) => void;
  }

  const CheckBox = ({ title, checked = false, onChange }: CheckBoxProps) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(title);
    };
    return (
      <div
        onClick={handleClick}
        className={`h-44 w-auto font-pretendard text-body-1 px-15 rounded-10 flex justify-between items-center ${
          checked ? "bg-saerokGreen text-white" : "text-black bg-background-whitegray"
        }`}
      >
        <span className="text-body-1">{title}</span>
        <div
          className={`ml-10 w-18 h-18 rounded-4 flex items-center justify-center ${
            checked ? "bg-background-white border-none" : "bg-background-whitegray border-1.5 border-font-whitegray"
          }`}
        >
          {checked && <CheckIcon className="h-12 w-12 text-saerokGreen" />}
        </div>
      </div>
    );
  };

  // 바텀시트 내용 렌더링
  const getBottomSheetContent = () => {
    if (currentFilter === "계절") {
      return (
        <div className="grid grid-cols-2 gap-x-13 gap-y-10">
          {seasons.map((season) => (
            <CheckBox
              key={season}
              title={season}
              checked={tempSelected.includes(season)}
              onChange={toggleTempSelected}
            />
          ))}
        </div>
      );
    }
    if (currentFilter === "서식지") {
      return (
        <>
          <div className="flex flex-row justify-start gap-24 text-body-2 text-black mb-20">
            <div
              className="flex flex-row gap-10 cursor-pointer items-center"
              onClick={(e) => {
                e.stopPropagation();
                setAllTempSelected(true, habitats);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {tempSelected.length === habitats.length && (
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-font-whitegrayDark" />
                )}
              </div>
              전체선택
            </div>
            <div
              className="flex flex-row gap-10 cursor-pointer items-center"
              onClick={(e) => {
                e.stopPropagation();
                setAllTempSelected(false, habitats);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {tempSelected.length === 0 && (
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-font-whitegrayDark" />
                )}
              </div>
              전체해제
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {habitats.map((habitat) => (
              <CheckBox
                key={habitat}
                title={habitat}
                checked={tempSelected.includes(habitat)}
                onChange={toggleTempSelected}
              />
            ))}
          </div>
        </>
      );
    }
    if (currentFilter === "크기") {
      return (
        <>
          <div className="flex flex-wrap gap-10">
            {sizeCategories.map((size) => (
              <CheckBox key={size} title={size} checked={tempSelected.includes(size)} onChange={toggleTempSelected} />
            ))}
          </div>
        </>
      );
    }
    return <p>선택이 없습니다.</p>;
  };

  return (
    <>
      <div className="flex gap-7 font-pretendard bg-transparent">
        <button
          className={`gap-6 flex flex-row text-body-1  border-[0.35px] w-72 h-33 rounded-100 justify-center items-center ${
            selectedFilters.seasons.length > 0
              ? "bg-mainBlue text-background-white border-font-mainBlue "
              : "bg-background-whitegray text-font-black border-font-darkgray"
          }`}
          onClick={() => handleButtonClick("계절")}
        >
          <SeasonIcon
            className={`w-17 h-17 ${selectedFilters.seasons.length > 0 ? " stroke-white" : " stroke-black"}`}
          />

          {/* {selectedFilters.seasons.length > 0 ? (
            <CalendarFilledIcon className="w-[13px] h-[13px]" />
          ) : (
            <CalendarIcon className="w-[13px] h-[13px]" />
          )} */}
          <span>계절</span>
        </button>

        <button
          className={`gap-6 flex flex-row text-body-1  border-[0.35px] w-84 h-33 rounded-100 justify-center items-center ${
            selectedFilters.habitats.length > 0
              ? "bg-mainBlue text-background-white border-font-mainBlue "
              : "bg-background-whitegray text-font-black border-font-darkgray"
          }`}
          onClick={() => handleButtonClick("서식지")}
        >
          <HabitatIcon
            className={`w-17 h-17 ${selectedFilters.habitats.length > 0 ? "stroke-white" : "stroke-black"}`}
          />
          <span>서식지</span>
        </button>

        <button
          className={`gap-7 flex flex-row text-body-1  border-[0.35px] w-72 h-33 rounded-100 justify-center items-center ${
            selectedFilters.sizeCategories.length > 0
              ? "bg-mainBlue text-background-white border-font-mainBlue "
              : "bg-background-whitegray text-font-black border-font-darkgray"
          }`}
          onClick={() => handleButtonClick("크기")}
        >
          <SizeIcon
            className={`w-17 h-17 ${selectedFilters.sizeCategories.length > 0 ? "fill-white" : "fill-black"}`}
          />
          <span>크기</span>
        </button>

        <button
          className={
            "w-33 h-33 flex justify-center items-center rounded-full bg-background-white border-[0.35px] border-font-whitegrayDark"
          }
          onClick={handleResetFilters}
        >
          <ResetIcon className="w-17 h-17 stroke-black" />
        </button>
      </div>

      <BottomSheet
        ref={bottomSheetRef}
        title={`${currentFilter} 선택` || "선택"}
        close={handleCloseWithoutApply}
        apply={handleApplyFilters}
      >
        <div ref={contentRef} className="p-4">
          {getBottomSheetContent()}
        </div>
      </BottomSheet>
    </>
  );
};

export default FilterHeader;
