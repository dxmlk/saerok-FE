import React, { useRef, useEffect } from "react";

interface AutoResizeTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

const AutoResizeTextArea: React.FC<AutoResizeTextAreaProps> = ({ value, onChange, placeholder = "" }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full px-20 py-16 text-body-4 border border-gray-300 rounded-20 resize-none
        focus:outline-none focus:ring-2 focus:ring-mainBlue
        overflow-hidden
      `}
      rows={1}
    />
  );
};

export default AutoResizeTextArea;
