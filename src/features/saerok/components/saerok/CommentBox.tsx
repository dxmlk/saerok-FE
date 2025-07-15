import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";

const CommentBox = () => {
  return (
    <div className="h-auto w-full py-12 px-14 bg-background-white rounded-20">
      <div className="flex flex-row w-full gap-6 items-start">
        <div className="w-25 h-25 rounded-full bg-background-whitegray flex items-center justify-center">
          <img src="" className="w-21 h-21 rounded-full object-cover" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-5 items-center">
              <span className="font-moneygraphy text-font-black text-body-3-2">닉네임</span>
              <span className="font-pretendard text-font-whitegrayDark text-caption-3">시간</span>
            </div>
            <button>
              <SortIcon className="w-17 h-17" />
            </button>
          </div>
          {/* 댓글 75자 최대 */}
          <div className="w-full font-pretendard text-font-black text-caption-1-2">
            댓글 내용이 길어지면 어떻게 될까 댓글 내용이 길어지면 어떻게 될까댓글 내용이 길어지면 어떻게 될까댓글 내용이
            길어지면 어떻게 될까댓글 내용이 길어지면 어떻게 될까
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
