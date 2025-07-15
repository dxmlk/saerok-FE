import { useState, useRef, useEffect } from "react";
import { ReactComponent as HeartIcon } from "assets/icons/button/heart.svg";
import {
  fetchCollectionLikeListApi,
  getCollectionLikeStatusApi,
  toggleCollectionLikeApi,
} from "services/api/collections";

interface CollectionLikeButtonProps {
  collectionId: number;
}

const CollectionLikeButton = ({ collectionId }: CollectionLikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const likeCount = useRef(0);

  // 좋아요 상태 및 개수 초기 조회
  useEffect(() => {
    if (!collectionId) return;
    const fetchStatus = async () => {
      try {
        const liked = await getCollectionLikeStatusApi(collectionId);
        setIsLiked(liked);
      } catch {}
    };
    const fetchCount = async () => {
      try {
        const items = await fetchCollectionLikeListApi(collectionId);
        likeCount.current = items.length;
      } catch {}
    };
    fetchStatus();
    fetchCount();
  }, [collectionId]);

  // 좋아요 토글
  const handleLikeToggle = async () => {
    try {
      await toggleCollectionLikeApi(collectionId);
      setIsLiked((prev) => !prev);
      if (!isLiked) likeCount.current += 1;
      else likeCount.current -= 1;
    } catch {}
  };

  return (
    <button
      onClick={handleLikeToggle}
      className="outline-none cursor-pointer py-16 pl-14 pr-21 w-full flex justify-between"
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
    >
      <HeartIcon className={`text-font-black ${isLiked ? "stroke-none fill-red" : "stroke-font-black fill-none"}`} />
      <span className="text-subtitle-3 text-font-black">{likeCount.current}</span>
    </button>
  );
};

export default CollectionLikeButton;
