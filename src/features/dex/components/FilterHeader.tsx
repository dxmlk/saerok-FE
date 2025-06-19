import { ReactComponent as ResetIcon } from "assets/icons/icon/reset.svg";
import { ReactComponent as SeasonIcon } from "assets/icons/icon/season.svg";
import { ReactComponent as HabitatIcon } from "assets/icons/icon/habitat.svg";
import { ReactComponent as SizeIcon } from "assets/icons/icon/size.svg";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as RadioButton } from "assets/icons/button/radio-button.svg";
import { ReactComponent as SparrowIcon } from "assets/icons/image/sparrow.svg";
import { ReactComponent as PigeonIcon } from "assets/icons/image/pigeon.svg";
import { ReactComponent as DuckIcon } from "assets/icons/image/duck.svg";
import { ReactComponent as WildGooseIcon } from "assets/icons/image/wild-goose.svg";

import BottomSheet from "components/common/BottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import { useEffect, useState, useRef, ComponentType, SVGProps } from "react";

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

  const handleResetFilters = () => {
    onFilterChange("seasons", []);
    onFilterChange("habitats", []);
    onFilterChange("sizeCategories", []);
  };

  const toggleItem = (group: keyof SelectedFilters, item: string) => {
    const current = selectedFilters[group];
    const next = current.includes(item) ? current.filter((i) => i !== item) : [...current, item];
    onFilterChange(group, next);
  };

  const setAllItems = (group: keyof SelectedFilters, items: string[], selected: boolean) => {
    onFilterChange(group, selected ? items : []);
  };

  const CheckBox = ({ title, checked, onChange }: { title: string; checked: boolean; onChange: () => void }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`h-44 w-auto font-pretendard text-body-1 px-15 rounded-10 flex justify-between items-center ${
        checked ? "bg-mainBlue text-white" : "text-black bg-background-whitegray"
      }`}
    >
      <span className="text-body-1">{title}</span>
      <div
        className={`ml-10 w-18 h-18 rounded-4 flex items-center justify-center ${
          checked ? "bg-background-white border-none" : "bg-background-whitegray border-1.5 border-font-whitegray"
        }`}
      >
        {checked && <CheckIcon className="h-12 w-12 text-mainBlue" />}
      </div>
    </div>
  );

  const SizeCheckBox = ({
    Icon,
    label,
    desc,
    checked,
    onChange,
  }: {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    desc: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className="h-208 w-auto font-pretendard flex flex-col justify-center items-center "
    >
      <div className="flex-1 w-full flex items-end justify-center">
        <Icon />
      </div>

      <div className="mt-28 flex flex-col items-center">
        <div
          className={`w-18 h-18 rounded-4 flex items-center justify-center ${
            checked ? "bg-mainBlue" : "bg-background-white border-1.5 border-font-whitegray"
          }`}
        >
          {checked && <CheckIcon className="h-12 w-12 text-background-white" />}
        </div>
        <span className="text-body-1 mt-2">{label}</span>
        <span className="text-caption-1 text-font-darkgray">{desc}</span>
      </div>
    </div>
  );

  const getBottomSheetContent = () => {
    const key = currentFilter ? filterGroupKey(currentFilter) : "seasons";
    const selected = selectedFilters[key];

    if (currentFilter === "계절") {
      return (
        <div className="grid grid-cols-2 gap-x-13 gap-y-10">
          {seasons.map((season) => (
            <CheckBox
              key={season}
              title={season}
              checked={selected.includes(season)}
              onChange={() => toggleItem("seasons", season)}
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
                setAllItems("habitats", habitats, true);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {selected.length === habitats.length && (
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-font-whitegrayDark" />
                )}
              </div>
              전체선택
            </div>
            <div
              className="flex flex-row gap-10 cursor-pointer items-center"
              onClick={(e) => {
                e.stopPropagation();
                setAllItems("habitats", habitats, false);
              }}
            >
              <div className="relative w-18 h-18">
                <RadioButton className="w-18 h-18" />
                {selected.length === 0 && (
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
                checked={selected.includes(habitat)}
                onChange={() => toggleItem("habitats", habitat)}
              />
            ))}
          </div>
        </>
      );
    }

    if (currentFilter === "크기") {
      const sizeOptions = [
        { key: "참새", label: "참새", desc: "~15cm", Icon: SparrowIcon },
        { key: "비둘기", label: "비둘기", desc: "~30cm", Icon: PigeonIcon },
        { key: "오리", label: "오리", desc: "~54cm", Icon: DuckIcon },
        { key: "기러기", label: "기러기 이상", desc: "55cm~", Icon: WildGooseIcon },
      ];

      const margins = ["mr-[27px]", "mr-[20px]", "mr-[-17px]", "mr-0"];

      return (
        <div className="flex flex-row w-full justify-center">
          {sizeOptions.map(({ key, label, desc, Icon }, idx) => (
            <div key={key} className={margins[idx]}>
              <SizeCheckBox
                Icon={Icon}
                label={label}
                desc={desc}
                checked={selected.includes(key)}
                onChange={() => toggleItem("sizeCategories", key)}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex gap-7 font-pretendard bg-transparent">
        <button
          className={`gap-6 flex flex-row text-button-2  border-[0.35px] w-72 h-33 rounded-100 justify-center items-center ${
            selectedFilters.seasons.length > 0
              ? "bg-mainBlue text-background-white"
              : "bg-background-white text-font-black border-font-darkgray"
          }`}
          onClick={() => {
            setCurrentFilter("계절");
            openBottomSheet();
          }}
        >
          <SeasonIcon
            className={`w-17 h-17 ${selectedFilters.seasons.length > 0 ? " stroke-white" : " stroke-font-mainBlue"}`}
          />
          <span>계절</span>
        </button>

        <button
          className={`gap-6 flex flex-row text-button-2   border-[0.35px] w-84 h-33 rounded-100 justify-center items-center ${
            selectedFilters.habitats.length > 0
              ? "bg-mainBlue text-background-white "
              : "bg-background-white text-font-black border-font-darkgray"
          }`}
          onClick={() => {
            setCurrentFilter("서식지");
            openBottomSheet();
          }}
        >
          <HabitatIcon
            className={`w-17 h-17 ${selectedFilters.habitats.length > 0 ? "stroke-white" : "stroke-font-mainBlue"}`}
          />
          <span>서식지</span>
        </button>

        <button
          className={`gap-7 flex flex-row text-button-2   border-[0.35px] w-72 h-33 rounded-100 justify-center items-center ${
            selectedFilters.sizeCategories.length > 0
              ? "bg-mainBlue text-background-white "
              : "bg-background-white text-font-black border-font-darkgray"
          }`}
          onClick={() => {
            setCurrentFilter("크기");
            openBottomSheet();
          }}
        >
          <SizeIcon
            className={`w-17 h-17 ${selectedFilters.sizeCategories.length > 0 ? "fill-white" : "fill-font-mainBlue"}`}
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
        close={closeBottomSheet}
        apply={closeBottomSheet} // 완료 버튼 유지
      >
        <div ref={contentRef} className="p-4">
          {getBottomSheetContent()}
        </div>
      </BottomSheet>
    </>
  );
};

export default FilterHeader;
