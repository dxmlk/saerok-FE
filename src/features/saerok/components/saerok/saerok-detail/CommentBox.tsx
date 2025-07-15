import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import CommentActionDropdown from "./CommentActionDropdown";
import DropdownTest from "./DropdownTest";

interface CommentBoxProps {
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

const CommentBox = ({
  commentId,
  userId,
  nickname,
  content,
  likeCount,
  isLiked,
  isMine,
  createdAt,
  updatedAt,
}: CommentBoxProps) => {
  const handleModify = () => {};
  const handleDelete = () => {
    /* 삭제 로직 */
  };
  const handleReport = () => {
    /* 신고 로직 */
  };

  return (
    <div className="h-auto w-full py-12 px-14 bg-background-white rounded-20">
      <div className="flex flex-row w-full gap-6 items-start">
        <div className="w-25 h-25 rounded-full bg-background-whitegray flex items-center justify-center">
          <img src="/src/assets/icons/image/profile-default.svg" className="w-21 h-21 rounded-full object-cover" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-5 items-center">
              <span className="font-moneygraphy text-font-black text-body-3-2">{nickname}</span>
              <span className="font-pretendard text-font-whitegrayDark text-caption-3">
                {updatedAt.toString().split("T")[0]}
              </span>
            </div>
            <CommentActionDropdown
              isMine={isMine}
              onModify={handleModify}
              onDelete={handleDelete}
              onReport={handleReport}
            />
          </div>
          {/* 댓글 75자 최대 */}
          <div className="w-full font-pretendard text-font-black text-caption-1-2">{content}</div>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
