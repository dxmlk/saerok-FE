import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as AddCommentIcon } from "assets/icons/button/add-comment.svg";

interface CommentInputBarProps {
  onSubmit: (value: string) => void;
}

const CommentInputBar = ({ onSubmit }: CommentInputBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (value.length > 0) {
      onSubmit(value);
      setInputValue("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const isActive = inputValue.trim().length > 0;

  return createPortal(
    <form
      className="fixed w-full max-w-500 left-1/2 -translate-x-[50%] bottom-0 z-[101] bg-background-white pt-19 px-9 pb-44 border-t-1 border-font-whitegray"
      style={{ paddingBottom: "calc(44px + env(safe-area-inset-bottom, 0px))" }}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <div className="w-full h-full rounded-23 bg-background-whitegray flex flex-row gap-8 pl-24 pr-5 py-5 items-center">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full font-pretendard bg-transparent placeholder-font-whitegrayDark outline-none"
          placeholder="파오리님에게 댓글 남기기"
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
        />
        <button
          type="submit"
          tabIndex={0}
          aria-label="댓글 전송"
          disabled={!isActive}
          className={`${isActive ? " cursor-pointer" : " cursor-default"}`}
        >
          <AddCommentIcon className={`w-40 h-40 ${isActive ? "fill-font-mainBlue" : "fill-font-whitegray"}`} />
        </button>
      </div>
    </form>,
    document.body
  );
};

export default CommentInputBar;
