import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddImage from "features/saerok/components/add-saerok/AddImage";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";
import EditFooter from "features/saerok/components/add-saerok/EditFooter";
import DatePicker from "components/common/DatePicker";
import SearchBarBird from "features/saerok/components/add-saerok/SearchBarBird";
import SearchBarPlace from "features/saerok/components/add-saerok/SearchBarPlace";
// import BackButton from "components/common/BackButton";
import { ReactComponent as CheckIcon } from "assets/icons/button/check.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { useSaerokForm } from "states/useSaerokForm";
import {
  fetchEditCollectionDetail,
  patchCollectionApi,
  deleteCollectionApi,
  getPresignedUrlApi,
  registerImageMetaApi,
  deleteCollectionImageApi,
} from "services/api/collections/index";
import { fetchDexDetailApi } from "services/api/birds/index";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Modal from "components/common/Modal";

const EditSaerokPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

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
    setLatitude,
    setLongitude,
    setImagePreviewUrl,
    setImageId,
  } = useSaerokForm();

  // 기존 정보 로딩
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchEditCollectionDetail(Number(id))
      .then(async (data) => {
        setBirdId(data.birdId);
        setDate(data.discoveredDate);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setLocationAlias(data.locationAlias);
        setAddress(data.address);
        setMemo(data.note);
        setAccessLevel(data.accessLevel);
        setIsChecked(data.birdId === null);
        setIsPrivate(data.accessLevel === "PRIVATE");
        setImageId(data.imageId ?? null);
        setImageFile(null);
        setImagePreviewUrl(data.imageUrl);

        if (data.birdId) {
          try {
            const res = await fetchDexDetailApi(data.birdId);
            setBirdName(res.data.koreanName);
          } catch {
            setBirdName("이름 모를 새");
          }
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [id]);

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
    setAccessLevel(isPrivate ? "PUBLIC" : "PRIVATE");
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (!form.date || !form.address || !form.locationAlias || !form.memo) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (form.memo.length > 50) {
      alert("한 줄 평은 50자 이하여야 합니다.");
      return;
    }

    try {
      await patchCollectionApi(Number(id), {
        isBirdIdUpdated: true,
        birdId: form.birdId,
        discoveredDate: form.date,
        latitude: form.latitude ?? 0,
        longitude: form.longitude ?? 0,
        locationAlias: form.locationAlias,
        address: form.address,
        note: form.memo,
        accessLevel: form.accessLevel,
      });

      // 2. 이미지 교체(새로 업로드된 파일이 있는 경우만)
      if (form.imageFile) {
        // 기존 이미지가 있다면 삭제
        // form.imageId가 컬렉션 상세에서 받아온 기존 이미지의 id라고 가정
        if (form.imageId) {
          await deleteCollectionImageApi(Number(id), form.imageId);
        }

        // Presigned URL 발급 및 업로드
        const contentType = form.imageFile.type;
        const { presignedUrl, objectKey } = await getPresignedUrlApi(Number(id), contentType);

        await axios.put(presignedUrl, form.imageFile, {
          headers: { "Content-Type": contentType },
        });

        await registerImageMetaApi(Number(id), objectKey, contentType);
      }

      resetForm();
      navigate("/saerok");
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  // 삭제 버튼 핸들러
  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteCollectionApi(Number(id));
      resetForm();
      navigate("/saerok");
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  if (loading) {
    return <div className="p-24 text-center">불러오는 중..</div>;
  }

  return (
    <>
      <EditHeader
        leftContent={
          <button
            onClick={() => navigate(`/saerok-detail/${id}`)}
            className="text-subtitle-3 font-pretendard text-font-black cursor-pointer"
          >
            취소
          </button>
        }
        rightContent={
          <button onClick={() => setIsDeleteModalOpen(true)} className="text-button-1 font-pretendard text-red">
            삭제
          </button>
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
      <EditFooter text="편집 완료" onClick={handleSubmit} />

      <AnimatePresence>
        {isEditModalOpen && (
          <Modal
            maintext="작성 중인 내용이 있어요"
            subtext="이대로 나가면 변경사항이 저장되지 않아요.
            취소할까요?"
            lefttext="나가기"
            righttext="계속하기"
            handleLeftClick={() => {
              resetForm();
              navigate("/saerok");
              setIsEditModalOpen(false);
            }}
            handleRightClick={() => {
              setIsEditModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal
            maintext="삭제하시겠어요?"
            subtext={`'${form.birdName || "이름 모를 새"}' 새록이 삭제돼요.`}
            lefttext="삭제하기"
            righttext="취소"
            isDeleted={true}
            handleLeftClick={() => {
              handleDelete();
              setIsDeleteModalOpen(false);
              navigate("/saerok");
            }}
            handleRightClick={() => {
              setIsDeleteModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EditSaerokPage;
