import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddImage from "features/saerok/components/add-saerok/AddImage";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import DatePicker from "components/common/DatePicker";
import SearchBarBird from "features/saerok/components/add-saerok/SearchBarBird";
import SearchBarPlace from "features/saerok/components/add-saerok/SearchBarPlace";
import { ReactComponent as XBlackIcon } from "assets/icons/xblack.svg";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { useSaerokForm } from "states/useSaerokForm";
import { createCollectionApi, getPresignedUrlApi, registerImageMetaApi } from "services/api/collections/index";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Modal from "components/common/Modal";
import { useAuth } from "hooks/useAuth";

const AddSaerokPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const initializedRef = useRef(false); // 무한 루프 방지
  const {
    form,
    setBirdName,
    setBirdId,
    setAddress,
    setLocationAlias,
    setDate,
    setMemo,
    setImageFile,
    setAccessLevel,
    resetForm,
  } = useSaerokForm();

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
    if (isPrivate) {
      setAccessLevel("PRIVATE");
    } else {
      setAccessLevel("PUBLIC");
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!form.date || !form.address || !form.locationAlias || !form.memo || !form.imageFile) {
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
        accessLevel: form.accessLevel,
      });

      const collectionId = collectionRes.collectionId;
      const contentType = form.imageFile.type;

      const { presignedUrl, objectKey } = await getPresignedUrlApi(collectionId, contentType);

      await axios.put(presignedUrl, form.imageFile, {
        headers: { "Content-Type": contentType },
      });

      await registerImageMetaApi(collectionId, objectKey, contentType);

      alert("등록이 완료되었습니다!");
      resetForm();
      setIsChecked(false);
      navigate("/saerok");
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (initializedRef.current) return;
    const state = location.state as { birdId?: number; birdName?: string } | undefined;
    if (state?.birdId != null) {
      setBirdId(state.birdId);
      setBirdName(state.birdName ?? "");
    }
    initializedRef.current = true;
  }, []);

  return (
    <>
      <EditHeader
        leftContent={<span className="text-headline-2 font-moneygraphy text-font-black">새록 작성하기</span>}
        rightContent={
          <div className="w-[32px] h-[32px]">
            <button onClick={() => setIsModalOpen(true)}>
              <XBlackIcon />
            </button>
          </div>
        }
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
          <div className=" font-pretendard text-body-2 text-font-darkgray">새록 비공개하기</div>
        </div>
      </div>

      <EditFooter text="종 추가" onClick={handleSubmit} />
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            maintext="작성 중인 내용이 있어요"
            subtext="이대로 나가면 변경사항이 저장되지 않아요.
            취소할까요?"
            lefttext="나가기"
            righttext="계속하기"
            handleLeftClick={() => {
              resetForm();
              navigate("/saerok");
              setIsModalOpen(false);
            }}
            handleRightClick={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginModalOpen && (
          <Modal
            maintext="로그인하시겠어요?"
            subtext="로그인이 필요한 기능이에요."
            lefttext="돌아가기"
            righttext="로그인 하러가기"
            handleLeftClick={() => {
              setIsLoginModalOpen(false);
            }}
            handleRightClick={() => {
              navigate("/login");
              setIsLoginModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AddSaerokPage;
