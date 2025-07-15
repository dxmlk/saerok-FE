import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as DexIcon } from "assets/icons/button/dex.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import { AnimatePresence } from "framer-motion";
import Modal from "components/common/Modal";
import ReportBottomSheet from "features/saerok/components/saerok/saerok-detail/ReportBottomSheet";
import useBottomSheet from "hooks/useBottomSheet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { set } from "date-fns";

const CollectionDetailHeader = ({ birdId, collectionId, isMine }: any) => {
  const navigate = useNavigate();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGoToDex = () => {
    navigate(`/dex-detail/${birdId}`);
  };

  const handleEdit = () => {
    navigate(`/edit-saerok/${collectionId}`);
  };

  const handleReportClick = () => {
    openBottomSheet();
  };

  const handleApply = () => {
    closeBottomSheet();
    setIsModalOpen(true);
  };

  return (
    <div className="z-10 fixed top-0 w-full bg-transparent h-auto flex flex-row items-center justify-between px-24 py-10">
      <button
        onClick={handleBackClick}
        className="w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
      >
        <BackIcon className="w-17 h-17" />
      </button>
      {/* <div className="flex flex-row gap-9">
        <button
          onClick={handleGoToDex}
          className="w-40 h-40 rounded-full bg-mainBlue z-10 flex items-center justify-center"
        >
          <DexIcon className="w-20 h-20 text-white" />
        </button>
        {isMine && (
          <button
            onClick={handleEdit}
            className="w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
          >
            <EditIcon className="w-24 h-24" />
          </button>
        )}
        {!isMine && (
          <button
            onClick={handleReportClick}
            className="w-40 h-40 rounded-full bg-glassmorphism z-10 flex items-center justify-center"
          >
            <SortIcon className="w-20 h-20" />
          </button>
        )}
      </div> */}

      <ReportBottomSheet ref={bottomSheetRef} close={closeBottomSheet} apply={handleApply} />

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            maintext="게시물을 신고하시겠어요?"
            subtext="커뮤니티 가이드에 따라
            신고 사유에 해당하는지 검토 후 처리돼요"
            lefttext="신고하기"
            righttext="돌아가기"
            handleLeftClick={() => setIsModalOpen(false)}
            handleRightClick={() => setIsModalOpen(false)}
            isDeleted={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionDetailHeader;
