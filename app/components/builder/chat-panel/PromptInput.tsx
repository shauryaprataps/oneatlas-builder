"use client";

import { ArrowUp, Paperclip } from "lucide-react";
import { useEffect, useRef } from "react";

interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export function PromptInput({
  value = "",
  onChange,
  onSubmit,
  disabled = false,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
  }, [value]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_4px_18px_rgba(17,24,39,0.08)] transition focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100">
      <textarea
        ref={textareaRef}
        aria-label="Builder prompt"
        className="max-h-36 min-h-20 w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 text-gray-900 outline-none placeholder:text-gray-400"
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit?.();
          }
        }}
        placeholder="Describe the application you want to build..."
        rows={2}
        value={value}
      />
      <div className="flex items-center justify-between pt-1">
        <button
          aria-label="Attach file"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          type="button"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <button
          aria-label="Send prompt"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          disabled={disabled || !value.trim()}
          onClick={onSubmit}
          type="button"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

