import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Modal from "components/common/Modal";
import LoadingScreen from "components/common/LoadingScreen";
import { AnimatePresence } from "framer-motion";
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
import SaerokForm from "features/saerok/components/add-saerok/SaerokForm";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";

const EditSaerokPage = () => {
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    form,
    setBirdName,
    setBirdId,
    setDate,
    setLatitude,
    setLongitude,
    setLocationAlias,
    setAddress,
    setMemo,
    setAccessLevel,
    setImageId,
    setImageFile,
    setImagePreviewUrl,
    resetForm,
  } = useSaerokForm();

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
        setImageId(data.imageId ?? null);
        setImageFile(null);
        setImagePreviewUrl(data.imageUrl);
        setIsChecked(data.birdId === null);

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

      if (form.imageFile) {
        if (form.imageId) {
          await deleteCollectionImageApi(Number(id), form.imageId);
        }
        const contentType = form.imageFile.type;
        const { presignedUrl, objectKey } = await getPresignedUrlApi(Number(id), contentType);
        await axios.put(presignedUrl, form.imageFile, {
          headers: { "Content-Type": contentType },
        });
        await registerImageMetaApi(Number(id), objectKey, contentType);
      }

      resetForm();
      navigate("/saerok");
    } catch (err) {}
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteCollectionApi(Number(id));
      resetForm();
      navigate("/saerok");
    } catch (err) {}
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SaerokForm
      headerContent={
        <EditHeader
          leftContent={
            <button
              onClick={() => navigate(-1)}
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
      }
      footerText="편집 완료"
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      handleSubmit={handleSubmit}
    >
      <AnimatePresence>
        {isEditModalOpen && (
          <Modal
            maintext="작성 중인 내용이 있어요"
            subtext="이대로 나가면 변경사항이 저장되지 않아요.\n취소할까요?"
            lefttext="나가기"
            righttext="계속하기"
            handleLeftClick={() => {
              resetForm();
              navigate("/saerok");
              setIsEditModalOpen(false);
            }}
            handleRightClick={() => setIsEditModalOpen(false)}
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
            handleRightClick={() => setIsDeleteModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </SaerokForm>
  );
};

export default EditSaerokPage;
