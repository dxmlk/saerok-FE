import { useEffect, useRef, useState } from "react";
import { ReactComponent as CommentIcon } from "assets/icons/button/comment.svg";
import useBottomSheet from "hooks/useBottomSheet";
import {
  createCollectionCommentApi,
  deleteCollectionCommentApi,
  fetchCollectionCommentListApi,
  getCollectionCommentCountApi,
} from "services/api/collections";
import CommentBottomSheet from "./CommentBottomSheet";
import CommentInputBar from "./CommentInput";

export interface CommentBoxProps {
  commentId: number;
  userId: number;
  nickname: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isMine: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CollectionCommentButtonProps {
  collectionId: number;
}

const CollectionCommentButton = ({ collectionId }: CollectionCommentButtonProps) => {
  const commentCount = useRef(0);
  const [commentList, setCommentList] = useState<CommentBoxProps[]>([]);

  useEffect(() => {
    if (!collectionId) return;
    const fetchCommentList = async () => {
      try {
        const items = await fetchCollectionCommentListApi(collectionId);
        setCommentList(items);
      } catch {}
    };
    const fetchCount = async () => {
      try {
        const count = await getCollectionCommentCountApi(collectionId);
        commentCount.current = count;
      } catch {}
    };
    fetchCommentList();
    fetchCount();
  }, [collectionId]);

  // 바텀시트 관리
  const { bottomSheetRef, openCommentBottomSheet, closeBottomSheet, isOpen, isFull } = useBottomSheet();

  const handleSubmit = async (content: string) => {
    try {
      await createCollectionCommentApi(collectionId, content);
      const items = await fetchCollectionCommentListApi(collectionId);
      setCommentList(items);
      const count = await getCollectionCommentCountApi(collectionId);
      commentCount.current = count;
    } catch {}
  };

  const handleDelete = async (commentId: number) => {
    try {
      await deleteCollectionCommentApi(collectionId, commentId);
      const items = await fetchCollectionCommentListApi(collectionId);
      setCommentList(items);
      const count = await getCollectionCommentCountApi(collectionId);
      commentCount.current = count;
    } catch {}
  };

  return (
    <>
      <button
        onClick={openCommentBottomSheet}
        className="py-16 pl-15 pr-19 w-full flex justify-between"
        aria-label="댓글 보기"
      >
        <CommentIcon className="stroke-font-black" />
        <span className="text-subtitle-3 text-font-black">{commentCount.current}</span>
      </button>
      <CommentBottomSheet
        ref={bottomSheetRef}
        close={closeBottomSheet}
        onDelete={handleDelete}
        items={commentList}
        isFull={isFull}
      />
      {isOpen && <CommentInputBar onSubmit={handleSubmit} />}
    </>
  );
};

export default CollectionCommentButton;
