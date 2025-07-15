import React, { useState } from "react";
import { useSaerokForm } from "states/useSaerokForm";
import AddImage from "./AddImage";
import SearchBarBird from "./SearchBarBird";
import SearchBarPlace from "./SearchBarPlace";
import DatePicker from "components/common/DatePicker";
import EditFooter from "./EditFooter";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";

interface SaerokFormProps {
  headerContent: React.ReactNode;
  footerText: string;
  handleSubmit: () => void;
  children?: React.ReactNode;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaerokForm: React.FC<SaerokFormProps> = ({
  headerContent,
  footerText,
  handleSubmit,
  children,
  isChecked,
  setIsChecked,
}) => {
  const { form, setBirdName, setBirdId, setAddress, setLocationAlias, setDate, setMemo, setImageFile, setAccessLevel } =
    useSaerokForm();

  const [isPrivate, setIsPrivate] = useState(form.accessLevel === "PRIVATE");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getBorderColor = (field: string) => {
    return focusedField === field ? "#4190FF" : "#d9d9d9";
  };

  const handleToggleUnknownBird = () => {
    const newCheck = !isChecked;
    setIsChecked(newCheck);
    if (newCheck) {
      setBirdName("이름 모를 새");
      setBirdId(null);
    } else {
      setBirdName("");
    }
  };

  const handleAccessLevel = () => {
    setIsPrivate(!isPrivate);
    setAccessLevel(!isPrivate ? "PRIVATE" : "PUBLIC");
  };

  return (
    <>
      {headerContent}
      <div className="px-24 bg-white min-h-screen font-pretendard">
        <AddImage />
        <div className="mt-32">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">새 이름</div>
          <SearchBarBird
            searchTerm={form.birdName ?? ""}
            setBirdName={setBirdName}
            setBirdId={setBirdId}
            disabled={isChecked}
          />
          <div
            onClick={handleToggleUnknownBird}
            className="mt-9 flex flex-row items-center justify-end gap-6 cursor-pointer"
          >
            <div
              className={`w-18 h-18 rounded-4 flex justify-center items-center ${
                isChecked ? "bg-mainBlue border-none" : "bg-transparent border-1.5 border-font-whitegrayLight"
              }`}
            >
              <CheckIcon className="w-12 h-12 text-white" />
            </div>
            <div className="text-font-darkgray font-pretendard font-medium text-13">모르겠어요</div>
          </div>
        </div>
        <div className="mt-12">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">발견 일시</div>
          <DatePicker
            selected={form.date ? new Date(form.date) : null}
            onChange={(date) => {
              if (date) {
                const formatted = date.toISOString().split("T")[0];
                setDate(formatted);
              }
            }}
          />
        </div>
        <div className="mt-[20px]">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">발견 장소</div>
          <SearchBarPlace searchTerm={form.address} setSearchTerm={setAddress} />
          {form.locationAlias && (
            <div className="flex flex-row gap-4 items-center justify-end mt-6">
              <MapIcon className="w-24 h-24 text-font-pointYellow" />
              <span className="text-black text-body-2">{form.locationAlias}</span>
            </div>
          )}
        </div>
        <div className="mt-[20px]">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">한 줄 평</div>
          <div
            className="h-88 w-full flex rounded-[10px] border-[2px] items-center overflow-hidden"
            style={{ borderColor: getBorderColor("review") }}
          >
            <textarea
              rows={3}
              className="outline-none w-full h-full resize-none ml-20 mr-26 py-12 text-body-2  placeholder-font-whitegrayDark"
              placeholder="한 줄 평을 입력해주세요"
              value={form.memo}
              onFocus={() => setFocusedField("review")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setMemo(e.target.value);
                }
              }}
            />
          </div>
          <div className="mt-[5px] text-right text-[#979797] font-400 text-[13px]">({form.memo.length}/50)</div>
        </div>
        <div onClick={handleAccessLevel} className="mt-12 flex flex-row items-center justify-end gap-8 cursor-pointer">
          <div
            className={`w-24 h-24 rounded-4 flex justify-center items-center ${
              isPrivate ? "bg-mainBlue border-none" : "bg-transparent border-1.5 border-font-whitegrayLight"
            }`}
          >
            <CheckIcon className="w-16 h-16 text-white" />
          </div>
          <div className="font-pretendard text-body-2 text-font-darkgray">새록 비공개하기</div>
        </div>
      </div>
      <EditFooter text={footerText} onClick={handleSubmit} />
      {children}
    </>
  );
};

export default SaerokForm;
