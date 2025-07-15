import { useRef, useEffect, useState } from "react";
import { Trash2, Pencil, AlarmClock } from "lucide-react";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";

interface Props {
  isMine: boolean;
  onModify: () => void;
  onDelete: () => void;
  onReport: () => void;
}

export default function CommentActionDropdown({ isMine, onModify, onDelete, onReport }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭시 닫힘
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-block font-pretendard">
      <button
        ref={triggerRef}
        className="w-17 h-17 flex items-center justify-center rounded-full"
        aria-label="더보기"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SortIcon className="w-17 h-17" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 min-w-108 rounded-2xl bg-background-white shadow-xl z-50 px-7 py-4"
        >
          {isMine && (
            <>
              <button
                type="button"
                className="flex justify-between items-center gap-2 text-font-black px-5 py-3 w-full hover:bg-gray-50 text-left"
                onClick={() => {
                  setOpen(false);
                  onModify();
                }}
              >
                <span>수정하기</span>
                <Pencil size={18} />
              </button>
              <button
                type="button"
                className="flex justify-between items-center gap-2 text-font-black px-5 py-3 w-full hover:bg-gray-50 text-left"
                onClick={() => {
                  setOpen(false);
                  onDelete();
                }}
              >
                <span>삭제하기</span>
                <Trash2 size={18} />
              </button>
            </>
          )}
          {/* <button
            type="button"
            className="flex justify-between items-center gap-2 text-font-black px-5 py-3 w-full hover:bg-gray-50 text-left"
            onClick={() => {
              setOpen(false);
              onReport();
            }}
          >
            <span>신고하기</span>
            <AlarmClock size={18} />
          </button> */}
        </div>
      )}
    </div>
  );
}
