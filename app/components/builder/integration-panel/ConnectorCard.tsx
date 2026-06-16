"use client";

import { useMemo, useState } from "react";
import type { Integration } from "../types";
import { OAuthButton } from "./OAuthButton";

export function ConnectorCard({ integration }: { integration: Integration }) {
  // Local UI-only toggle state.
  const [connected, setConnected] = useState(
    integration.status === "connected",
  );

  const statusLabel = useMemo(() => {
    if (connected) return "connected";
    return integration.status;
  }, [connected, integration.status]);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 font-bold text-orange-600">
        {integration.name.charAt(0)}
      </div>
      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
      {integration.description && (
        <p className="mt-1 text-sm text-gray-500">{integration.description}</p>
      )}
      <p className="mt-3 text-xs font-medium capitalize text-gray-400">
        {statusLabel}
      </p>

      <OAuthButton
        connected={connected}
        onToggle={() => {
          setConnected(true);
        }}
      />
    </article>
  );
}

