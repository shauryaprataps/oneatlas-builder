"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mic, Paperclip } from "lucide-react";

const prompts = [
  "Build a CRM for a sales team with reporting and analytics...",
  "Create an HR onboarding portal with approval workflows...",
  "Generate an inventory management platform...",
  "Build a customer support dashboard with ticket management...",
  "Create an internal company wiki with permissions...",
];

const suggestions = [
  "CRM",
  "Inventory",
  "HR Portal",
  "Analytics",
  "Customer Support",
];

const models = [
  {
    name: "Automatic",
    vendor: "OneAtlas",
    logo: "/models/Hexagram.png",
    bg: "#F1F0FF",
  },
  {
    name: "GPT-5",
    vendor: "OpenAI",
    logo: "/models/openai.png",
    bg: "#D9F0E8",
  },
  {
    name: "Claude",
    vendor: "Anthropic",
    logo: "/models/anthropic1.png",
    bg: "#FBE5DA",
  },
  {
    name: "Gemini",
    vendor: "Google",
    logo: "/models/gemini.png",
    bg: "#DCE7FB",
  },
];

export default function AIPromptSection() {
  const [prompt, setPrompt] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Automatic");
  const [showModels, setShowModels] = useState(false);

  const pauseRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const currentPrompt = prompts[promptIndex];

    if (pauseRef.current) {
      timeout = setTimeout(() => {
        pauseRef.current = false;
        setIsDeleting(true);
      }, 1800);
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }

    if (!isDeleting) {
      if (displayText.length < currentPrompt.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
        }, 40);
      } else {
        pauseRef.current = true;
        timeout = setTimeout(() => {
          pauseRef.current = false;
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
      } else {
        const nextPromptIndex = (promptIndex + 1) % prompts.length;
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setPromptIndex(nextPromptIndex);
        }, 0);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayText, isDeleting, promptIndex]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModels(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModelObj =
    models.find((m) => m.name === selectedModel) ?? models[0];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-4xl mx-auto">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-[48px] font-[650] tracking-[-0.03em] leading-none text-[#111111]">
          What would you like to build today?
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-white border border-[#E5E7EB] rounded-[32px] shadow-sm overflow-visible"
        style={{ padding: "18px 28px 20px 28px" }}
      >
        <div
          className="relative cursor-text mb-5"
          onClick={() => textareaRef.current?.focus()}
        >
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              const textarea = textareaRef.current;
              if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
              }
            }}
            rows={1}
            className="w-full resize-none overflow-hidden bg-transparent outline-none min-h-[12px] text-[17px] leading-relaxed text-[#111111] placeholder-transparent font-[system-ui,sans-serif]"
            style={{
              caretColor: "#FF6600",
              height: "auto",
            }}
          />

          {!prompt && (
            <div className="absolute inset-0 pointer-events-none flex items-start pt-[2px]">
              <p className="text-[17px] leading-relaxed text-[#B0B7C3] font-[system-ui,sans-serif] select-none">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block ml-[1px] text-[#B0B7C3]"
                >
                  |
                </motion.span>
              </p>
            </div>
          )}
        </div>

        <div className="h-px bg-[#F0F0ED] mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] text-[13px] font-medium hover:border-[#D1D5DB] transition-colors"
            >
              <Paperclip size={14} strokeWidth={2} />
              Attach
            </motion.button>

            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowModels((v) => !v)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] text-[13px] font-medium hover:border-[#D1D5DB] transition-colors"
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: currentModelObj.bg }}
                >
                  <Image
                    src={currentModelObj.logo}
                    alt={currentModelObj.name}
                    width={14}
                    height={14}
                  />
                </div>
                <span>{selectedModel}</span>
                <motion.span
                  animate={{ rotate: showModels ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={13} strokeWidth={2} />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {showModels && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 bottom-12 z-50 bg-white border border-[#E5E7EB] rounded-2xl shadow-lg overflow-hidden min-w-[160px]"
                  >
                    {models.map((model) => (
                      <button
                        key={model.name}
                        onClick={() => {
                          setSelectedModel(model.name);
                          setShowModels(false);
                        }}
                        className={`w-full px-4 py-2.5 flex items-center gap-3 text-[13px] font-medium transition-colors text-left ${
                          selectedModel === model.name
                            ? "bg-[#FFF3EB] text-[#FF6600]"
                            : "text-[#111111] hover:bg-[#FAFAF8]"
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: model.bg }}
                        >
                          <Image
                            src={model.logo}
                            alt={model.name}
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[13px] font-medium">{model.name}</span>
                          <span className="text-[11px] text-[#9CA3AF]">{model.vendor}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              className="w-9 h-9 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:border-[#D1D5DB] transition-colors"
            >
              <Mic size={15} strokeWidth={2} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07, backgroundColor: "#E65C00" }}
              whileTap={{ scale: 0.94 }}
              className="w-9 h-9 rounded-full bg-[#FF6600] flex items-center justify-center text-white transition-colors shadow-sm shadow-[#FF6600]/20"
            >
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="flex items-center gap-2 flex-wrap justify-center"
      >
        <span className="text-[12px] text-[#9CA3AF] font-medium mr-1">Try:</span>
        {suggestions.map((item, i) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05, borderColor: "#FF6600", color: "#FF6600" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setPrompt(`Build a ${item}`);
              textareaRef.current?.focus();
            }}
            className="px-3.5 py-1.5 rounded-full border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#6B7280] transition-colors"
          >
            {item}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

