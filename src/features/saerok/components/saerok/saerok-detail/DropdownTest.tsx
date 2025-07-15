import React, { useState, useRef, useEffect } from "react";

export default function DropdownTest() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭시 닫힘
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
    <div
      style={{
        position: "relative",
        width: 300,
        height: 300,
        border: "1px solid red",
        margin: "100px auto",
        padding: 50,
      }}
    >
      <button
        ref={triggerRef}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          background: "#91BFFF",
          border: "none",
        }}
        onClick={() => setOpen((p) => !p)}
      >
        ⋮
      </button>
      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: 50, // 버튼 바로 아래
            right: 0,
            minWidth: 100,
            background: "#fff",
            border: "1px solid #aaa",
            borderRadius: 8,
            zIndex: 1000,
            padding: 8,
            boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
          }}
        >
          <button style={{ display: "block", width: "100%", marginBottom: 8 }}>삭제하기</button>
          <button style={{ display: "block", width: "100%" }}>신고하기</button>
        </div>
      )}
    </div>
  );
}
