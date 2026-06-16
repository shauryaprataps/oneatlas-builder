interface MessageBubbleProps {
  message?: string;
  sender?: "user" | "assistant";
  timestamp?: string;
}

export function MessageBubble({
  message = "Tell me what you would like to build.",
  sender = "user",
  timestamp = "2:14 PM",
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-5 ${
          isUser
            ? "rounded-br-md bg-orange-50 text-gray-800"
            : "rounded-bl-md bg-gray-100 text-gray-700"
        }`}
      >
        {message}
      </div>
      <time className="mt-1.5 px-1 text-[10px] text-gray-400">{timestamp}</time>
    </div>
  );
}
