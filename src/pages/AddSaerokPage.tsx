import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSaerokForm } from "states/useSaerokForm";
import Modal from "components/common/Modal";
import { AnimatePresence } from "framer-motion";
import { createCollectionApi, getPresignedUrlApi, registerImageMetaApi } from "services/api/collections/index";
import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { ReactComponent as XBlackIcon } from "assets/icons/xblack.svg";
import SaerokForm from "features/saerok/components/add-saerok/SaerokForm";
import EditHeader from "features/saerok/components/add-saerok/EditHeader";

const AddSaerokPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const initializedRef = useRef(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { form, setBirdName, setBirdId, setDate, resetForm } = useSaerokForm();

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
      navigate("/saerok");
    } catch (err) {
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!initializedRef.current) {
      resetForm();
      setDate(new Date().toISOString().split("T")[0]);
      setIsChecked(false);
      initializedRef.current = true;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full mb-60">
      <SaerokForm
        headerContent={
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
        }
        footerText="종 추가"
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleSubmit={handleSubmit}
      >
        <AnimatePresence>
          {isModalOpen && (
            <Modal
              maintext="작성 중인 내용이 있어요"
              subtext="이대로 나가면 변경사항이 저장되지 않아요.\n취소할까요?"
              lefttext="나가기"
              righttext="계속하기"
              handleLeftClick={() => {
                resetForm();
                navigate("/saerok");
                setIsModalOpen(false);
              }}
              handleRightClick={() => setIsModalOpen(false)}
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
              handleLeftClick={() => setIsLoginModalOpen(false)}
              handleRightClick={() => {
                navigate("/login");
                setIsLoginModalOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </SaerokForm>
    </div>
  );
};

export default AddSaerokPage;
