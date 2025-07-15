import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";
import { ReactComponent as TimeIcon } from "assets/icons/icon/time.svg";
import { ReactComponent as Trapzoid } from "assets/polygon/trapzoid.svg";
import { ReactComponent as DexIcon } from "assets/icons/button/dex.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import { ReactComponent as HeartIcon } from "assets/icons/button/heart.svg";
import { ReactComponent as CommentIcon } from "assets/icons/button/comment.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { useNavigate } from "react-router-dom";
import useBottomSheet from "hooks/useBottomSheet";
import ReportBottomSheet from "./ReportBottomSheet";
import { AnimatePresence } from "framer-motion";
import Modal from "components/common/Modal";
import { useEffect, useRef, useState } from "react";
import {
  fetchCollectionLikeListApi,
  getCollectionLikeStatusApi,
  toggleCollectionLikeApi,
} from "services/api/collections";
import CollectionLikeButton from "./LikeButton";
import CollectionCommentButton from "./CommentButton";

interface SaerokInfoProps {
  collectionId: number;
  img: string | null;
  date: string;
  address: string;
  locationAlias: string;
  note: string;
  birdInfo: {
    birdId: number | null;
    koreanName: string | null;
    scientificName: string | null;
  };
  user: {
    userId: number;
    nickname: string;
  };
  isMine?: boolean;
}

const SaerokInfo = ({
  collectionId,
  img,
  date,
  address,
  locationAlias,
  note,
  birdInfo,
  user,
  isMine = false,
}: SaerokInfoProps) => {
  const navigate = useNavigate();

  // report 바텀시트용 훅
  const {
    bottomSheetRef: reportSheetRef,
    openBottomSheet: openReportBottomSheet,
    closeBottomSheet: closeReportBottomSheet,
  } = useBottomSheet();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month}월 ${day}일`;
  }

  const handleEditClick = () => {
    navigate(`/edit-saerok/${collectionId}`);
  };

  const handleDexClick = () => {
    if (birdInfo.koreanName) {
      navigate(`/dex-detail/${birdInfo.birdId}`);
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleSortClick = () => {
    openReportBottomSheet();
  };

  const handleApply = () => {
    closeReportBottomSheet();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-500 min-h-screen bg-background-whitegray pb-120">
        <img src={img ?? ""} className="w-full h-auto object-cover rounded-b-20" />
        <div className="mx-24 -mt-25 ">
          <div className="relative -mb-19 h-60">
            <div className="absolute left-0 top-0 z-20 whitespace-nowrap text-subtitle-1 font-moneygraphy drop-shadow-5 bg-background-white px-17 py-19 text-center rounded-20">
              {birdInfo.koreanName ?? "이름 모를 새"}
            </div>
            <div className="absolute right-0 top-0 z-5 flex items-center h-60 w-127">
              <Trapzoid className="absolute top-0 right-0 h-60 w-full z-0" />
              <div className="absolute top-0 right-0 w-full h-full z-10 flex flex-row pl-27 pr-11 pt-11 pb-9 gap-9">
                <button
                  onClick={handleDexClick}
                  className="drop-shadow-1-2 w-40 h-40 rounded-full bg-mainBlue flex items-center justify-center"
                >
                  <DexIcon className="w-20 h-20 text-white" />
                </button>
                {isMine ? (
                  <button
                    onClick={handleEditClick}
                    className="drop-shadow-1-2  w-40 h-40 rounded-full bg-glassmorphism flex items-center justify-center"
                  >
                    <EditIcon className="w-24 h-24" />
                  </button>
                ) : (
                  <button
                    onClick={handleSortClick}
                    className="drop-shadow-1-2  w-40 h-40 rounded-full bg-glassmorphism flex items-center justify-center"
                  >
                    <SortIcon className="w-24 h-24" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-background-white rounded-b-20">
            <div className="pt-38 pb-19 px-26 text-font-black font-haru text-body-3-2 border-b-1 border-background-whitegray">
              {note}
            </div>
            <div className=" flex flex-row justify-around font-pretendard divide-x-1 divide-background-whitegray">
              <CollectionLikeButton collectionId={collectionId} />
              <CollectionCommentButton collectionId={collectionId} />
            </div>
          </div>
        </div>
        <div className="mt-10 mx-24 bg-background-white rounded-20 py-15 px-16 flex flex-col gap-20 font-pretendard">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-row items-start gap-5">
              <MapIcon className="w-17 h-17 text-font-pointYellow" />
              <div className="flex flex-col justify-start gap-5 ">
                <span className="leading-none text-body-4 text-font-black">{locationAlias}</span>
                <span className="text-caption-3 text-font-whitegrayDark">{address}</span>
              </div>
            </div>
            <BracketIcon className="w-17 h-17 text-font-whitegrayDark" />
          </div>
          <div className="flex flex-row justify-start items-center gap-5">
            <TimeIcon className="w-17 h-17 text-font-pointYellow" />
            <span className="text-body-4 text-font-black">{formatDate(date)}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-5">
              <UserIcon className="w-17 h-17 fill-font-pointYellow" />
              <span className="text-body-4 text-font-black">{user?.nickname ?? "알 수 없음"}</span>
            </div>
            <BracketIcon className="w-17 h-17 text-font-whitegrayDark" />
          </div>
        </div>
      </div>
      <ReportBottomSheet ref={reportSheetRef} close={closeReportBottomSheet} apply={handleApply} />

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

      <AnimatePresence>
        {isAlertOpen && (
          <Modal
            maintext="새 정보를 입력하시겠어요?"
            subtext="이름 모를 새는 도감 확인이 불가능해요."
            lefttext="돌아가기"
            righttext="입력하기"
            handleLeftClick={() => setIsAlertOpen(false)}
            handleRightClick={() => {
              setIsAlertOpen(false);
              navigate(`/edit-saerok/${collectionId}`);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SaerokInfo;
