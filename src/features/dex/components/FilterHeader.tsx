import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg";
import { ReactComponent as CalendarFilledIcon } from "assets/icons/calendarfilled.svg";
import { ReactComponent as HabitatIcon } from "assets/icons/button/habitat.svg";
import { ReactComponent as SizeIcon } from "assets/icons/button/size.svg";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as RadioButton } from "assets/icons/button/radio-button.svg";
import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import { useEffect, useRef, useState } from "react";

interface FilterHeaderProps {
  activeFilters: string[];
  handleFilterClick: (filterName: string) => void;
}

const FilterHeader = ({ activeFilters, handleFilterClick }: FilterHeaderProps) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);

  // 실제 체크 상태 (완료 누르면 업데이트)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // 바텀시트 내 임시 체크 상태 (실시간 변경 반영용)
  const [tempCheckedItems, setTempCheckedItems] = useState<Record<string, boolean>>({});

  // 서식지 전체선택/전체해제 상태 (null: 일부선택, true: 전체선택, false: 전체해제)
  const [habitatSelectState, setHabitatSelectState] = useState<null | boolean>(null);

  // 이전 currentFilter 저장용 ref (불필요한 리렌더링 방지)
  const prevFilterRef = useRef<string | null>(null);

  const titles = [
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

  // 바텀시트 열릴 때마다 tempCheckedItems 초기화
  useEffect(() => {
    if (currentFilter !== prevFilterRef.current) {
      // currentFilter 변경될 때만 초기화
      setTempCheckedItems(checkedItems);
      prevFilterRef.current = currentFilter;
    }
  }, [currentFilter, checkedItems]);

  // tempCheckedItems 변경시 habitatSelectState 업데이트
  useEffect(() => {
    const allChecked = titles.every((title) => tempCheckedItems[title]);
    const allUnchecked = titles.every((title) => !tempCheckedItems[title]);

    if (allChecked) {
      setHabitatSelectState(true);
    } else if (allUnchecked) {
      setHabitatSelectState(false);
    } else {
      setHabitatSelectState(null);
    }
  }, [tempCheckedItems]);

  // 바텀시트 내 체크박스 토글
  const toggleTempChecked = (title: string) => {
    setTempCheckedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // 바텀시트 내 전체선택/전체해제 (임시 상태)
  const handleTempHabitatSelect = (selectAll: boolean) => {
    const newState: Record<string, boolean> = {};
    titles.forEach((title) => {
      newState[title] = selectAll;
    });
    setTempCheckedItems(newState);
  };

  // 완료 버튼 눌렀을 때 실제 상태와 activeFilters 업데이트
  const handleApplyFilters = () => {
    setCheckedItems(tempCheckedItems);

    // 현재 필터 그룹에 체크된 항목 하나라도 있으면 activeFilters에 포함시키고,
    // 없으면 activeFilters에서 제거하는 로직 구현
    if (!currentFilter) {
      closeBottomSheet();
      return;
    }

    const hasCheckedItem = Object.entries(tempCheckedItems).some(([key, val]) => val === true);
    const isActive = activeFilters.includes(currentFilter);

    if (hasCheckedItem && !isActive) {
      handleFilterClick(currentFilter); // 필터 그룹 추가
    } else if (!hasCheckedItem && isActive) {
      handleFilterClick(currentFilter); // 필터 그룹 제거
    }
    closeBottomSheet();
  };

  // 닫기(X) 또는 배경 클릭 시 변경 없이 닫기
  const handleCloseWithoutApply = () => {
    closeBottomSheet();
  };

  // 필터 그룹 버튼 클릭: 바텀시트 열기 및 임시 상태 초기화
  const handleButtonClick = (filter: string) => {
    setCurrentFilter(filter);
    setTempCheckedItems(checkedItems); // 임시 상태 초기화
    openBottomSheet();
  };

  interface CheckBoxProps {
    title: string;
    checked?: boolean;
    onChange: (title: string) => void;
  }

  const SeasonCheckBox = ({ title, checked = false, onChange }: CheckBoxProps) => {
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

  const getBottomSheetContent = () => {
    if (currentFilter === "계절") {
      const seasons = ["봄", "여름", "가을", "겨울"];
      return (
        <div className="grid grid-cols-2 gap-x-13 gap-y-10">
          {seasons.map((season) => (
            <SeasonCheckBox
              key={season}
              title={season}
              checked={!!tempCheckedItems[season]}
              onChange={toggleTempChecked}
            />
          ))}
        </div>
      );
    } else if (currentFilter === "서식지") {
      return (
        <>
          <div className="flex flex-row justify-start gap-24 text-body-2 text-black mb-20">
            <div
              className="flex flex-row gap-10 cursor-pointer items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleTempHabitatSelect(true);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {habitatSelectState && (
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-font-whitegrayDark" />
                )}
              </div>
              전체선택
            </div>
            <div
              className="flex flex-row gap-10 cursor-pointer items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleTempHabitatSelect(false);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {habitatSelectState === false && (
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-font-whitegrayDark" />
                )}
              </div>
              전체해제
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {titles.map((title) => (
              <SeasonCheckBox
                key={title}
                title={title}
                checked={!!tempCheckedItems[title]}
                onChange={toggleTempChecked}
              />
            ))}
          </div>
        </>
      );
    } else if (currentFilter === "크기") {
      return (
        <>
          <div className="relative"></div>
          <button
            className="mt-4 px-3 py-2 bg-gray-500 text-white rounded"
            onClick={() => handleFilterClick("크기-작음")}
          >
            작음
          </button>
          <button
            className="mt-4 px-3 py-2 bg-green-500 text-white rounded"
            onClick={() => handleFilterClick("크기-보통")}
          >
            보통
          </button>
          <button className="mt-4 px-3 py-2 bg-red-500 text-white rounded" onClick={() => handleFilterClick("크기-큼")}>
            큼
          </button>
        </>
      );
    }
    return <p>선택이 없습니다.</p>;
  };

  return (
    <>
      <div className="mb-[12px] flex gap-[12px]">
        <button
          className={`gap-[5px] flex flex-row text-[15px] w-[70px] h-[33px] rounded-[100px] justify-center items-center ${
            activeFilters.includes("계절")
              ? "bg-saerokGreen text-[#fefefe] font-700"
              : "text-[#0d0d0d] font-400 bg-[#f2f2f2]"
          }`}
          onClick={() => handleButtonClick("계절")}
        >
          {activeFilters.includes("계절") ? (
            <CalendarFilledIcon className="w-[13px] h-[13px]" />
          ) : (
            <CalendarIcon className="w-[13px] h-[13px]" />
          )}
          <span>계절</span>
        </button>
        <button
          className={`gap-[5px] flex flex-row text-[15px] w-[83px] h-[33px] rounded-[100px] justify-center items-center ${
            activeFilters.includes("서식지")
              ? "bg-saerokGreen text-[#fefefe] font-700"
              : "text-[#0d0d0d] font-400 bg-[#f2f2f2]"
          }`}
          onClick={() => handleButtonClick("서식지")}
        >
          <HabitatIcon className={`w-13 h-11 ${activeFilters.includes("서식지") ? "text-white" : "text-black"}`} />
          <span>서식지</span>
        </button>
        <button
          className={`gap-[5px] flex flex-row text-[15px] w-[72px] h-[33px] rounded-[100px] justify-center items-center ${
            activeFilters.includes("크기")
              ? "bg-saerokGreen text-[#fefefe] font-700 "
              : "text-[#0d0d0d] font-400 bg-[#f2f2f2]"
          }`}
          onClick={() => handleButtonClick("크기")}
        >
          <SizeIcon className={`w-13 h-11 ${activeFilters.includes("서식지") ? "text-white" : "text-black"}`} />
          <span>크기</span>
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
