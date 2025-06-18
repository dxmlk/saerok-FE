import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddImage from "features/saerok/components/add-saerok/AddImage";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import DatePicker from "components/common/DatePicker";
import SearchBarBird from "features/saerok/components/add-saerok/SearchBarBird";
import SearchBarPlace from "features/saerok/components/add-saerok/SearchBarPlace";
import BackButton from "components/common/BackButton";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { useSaerokForm } from "states/useSaerokForm";
import { createCollectionApi, getPresignedUrlApi, registerImageMetaApi } from "services/api/collections";
import axios from "axios";

const AddSaerokPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const { form, setBirdName, setBirdId, setPlaceName, setDate, setMemo, setImageFile } = useSaerokForm();

  const getBorderColor = (field: string) => {
    return focusedField === field ? "#4190FF" : "#d9d9d9";
  };

  const handleToggleUnknownBird = () => {
    const newCheck = !isChecked;
    setIsChecked(newCheck);
    if (newCheck) {
      setBirdName(null);
      setBirdId(null);
    }
  };

  const handleSubmit = async () => {
    console.log("form:", form);
    if (form.birdId == null || !form.date || !form.address || !form.locationAlias || !form.memo || !form.imageFile) {
      alert("모든 항목을 입력하고 이미지를 선택해주세요.");
      return;
    }
    try {
      const collectionRes = await createCollectionApi({
        birdId: form.birdId,
        discoveredDate: form.date,
        latitude: form.latitude ?? 0,
        longitude: form.longitude ?? 0,
        locationAlias: form.locationAlias,
        address: form.address,
        note: form.memo,
      });

      const collectionId = collectionRes.collectionId;
      const contentType = form.imageFile.type;

      const { presignedUrl, objectKey } = await getPresignedUrlApi(collectionId, contentType);

      await axios.put(presignedUrl, form.imageFile, {
        headers: { "Content-Type": contentType },
      });

      await registerImageMetaApi(collectionId, objectKey, contentType);

      alert("등록이 완료되었습니다!");
      navigate("/saerok");
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <EditHeader
        leftContent={<span className="text-headline-2 font-moneygraphy text-font-black">새록 작성하기</span>}
        rightContent={<BackButton />}
      />

      <div className="px-24 bg-white h-[100vh] font-pretendard">
        <AddImage />

        <div className="mt-32">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">새 이름</div>
          <SearchBarBird
            searchTerm={form.birdName ?? ""}
            setBirdName={setBirdName}
            setBirdId={setBirdId}
            disabled={isChecked}
          />{" "}
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
          <SearchBarPlace searchTerm={form.placeName} setSearchTerm={setPlaceName} />
        </div>

        <div className="mt-[20px]">
          <div className="ml-13 mb-7 text-caption-1 text-font-black">한 줄 평</div>
          <div
            className="h-[44px] w-full flex rounded-[10px] border-[2px] items-center"
            style={{ borderColor: getBorderColor("review") }}
          >
            <input
              className="outline-none w-full h-full items-center text-[15px] font-400 ml-[20px] mr-[26px] placeholder-font-whitegrayDark"
              placeholder="한 줄 평을 입력해주세요"
              value={form.memo}
              onFocus={() => setFocusedField("review")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setMemo(e.target.value);
                }
              }}
            />
          </div>
          <div className="mt-[5px] text-right text-[#979797] font-400 text-[13px]">({form.memo.length}/100)</div>
        </div>
      </div>

      <EditFooter text="종 추가" onClick={handleSubmit} />
    </>
  );
};

export default AddSaerokPage;
