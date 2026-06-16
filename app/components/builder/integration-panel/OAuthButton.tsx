"use client";

import { useState } from "react";

export function OAuthButton({
  connected,
  onToggle,
}: {
  connected: boolean;
  onToggle: () => void;
}) {
  // Local UI-only behavior. No backend/API.
  const [pressed, setPressed] = useState(false);

  const isConnected = connected || pressed;

  return (
    <button
      type="button"
      className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-80"
      onClick={() => {
        setPressed(true);
        onToggle();
      }}
      disabled={isConnected}
      aria-pressed={isConnected}
    >
      {isConnected ? "Connected ✓" : "Connect"}
    </button>
  );
}

