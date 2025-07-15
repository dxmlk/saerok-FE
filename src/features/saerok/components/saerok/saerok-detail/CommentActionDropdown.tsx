import { useRef, useState, useEffect } from "react";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import { Trash2, AlarmClock } from "lucide-react";

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

  // 바깥 클릭 시 닫힘
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

  // *** 바텀시트 onClick 버블링을 무조건 차단!
  return (
    <div
      className="relative inline-block"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        ref={triggerRef}
        className="w-17 h-17 flex items-center justify-center rounded-full"
        aria-label="더보기"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SortIcon className="w-17 h-17" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 min-w-[140px] rounded-2xl bg-background-white shadow-xl z-50 px-0 py-2"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isMine && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              className="flex items-center gap-2 text-red-500 px-5 py-3 w-full hover:bg-gray-50 text-left"
              type="button"
            >
              <Trash2 size={18} />
              <span>삭제하기</span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onReport();
            }}
            className="flex items-center gap-2 text-mainBlue px-5 py-3 w-full hover:bg-gray-50 text-left"
            type="button"
          >
            <AlarmClock size={18} />
            <span>신고하기</span>
          </button>
        </div>
      )}
    </div>
  );
}
