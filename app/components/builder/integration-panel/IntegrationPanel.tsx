"use client";

import { Plug } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import { ConnectorCard } from "./ConnectorCard";

import type { BuilderState } from "../types";

function seedDemoIntegrationsIfNeeded(params: {
  stateIntegrationsItemsLength: number;
  setBuilderState: React.Dispatch<React.SetStateAction<BuilderState>>;
}) {
  const { stateIntegrationsItemsLength, setBuilderState } = params;

  if (stateIntegrationsItemsLength > 0) return;

  setBuilderState((current) => {
    if (current.integrations.items.length > 0) return current;




    const nowDisconnected = (
      name: string,
      description: string,
      category: string,
    ) => ({
      id: crypto.randomUUID(),
      name,
      description,
      category,
      status: "disconnected" as const,
    });

    return {
      ...current,
      integrations: {
        items: [
          nowDisconnected(
            "Google",
            "Connect Google services to enable authentication and data sync.",
            "oauth",
          ),
          nowDisconnected(
            "GitHub",
            "Connect GitHub repositories for automation and workflow triggers.",
            "oauth",
          ),
          nowDisconnected(
            "Stripe",
            "Connect Stripe to manage billing events and customer updates.",
            "billing",
          ),
          nowDisconnected(
            "Slack",
            "Connect Slack to receive notifications and collaborate with channels.",
            "communications",
          ),
        ],
        status: "success" as const,
        error: null,
      },
    };
  });
}

export function IntegrationPanel() {
  const { state, setBuilderState } = useBuilder();
  const isLoading =
    state.status === "loading" || state.integrations.status === "loading";

  useEffect(() => {
    seedDemoIntegrationsIfNeeded({
      stateIntegrationsItemsLength: state.integrations.items.length,
      setBuilderState,
    });
  }, [state.integrations.items.length, setBuilderState]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900">Integrations</h2>
        <p className="text-sm text-gray-500">
          Connect the services your app needs.
        </p>
      </div>
      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : state.integrations.status === "error" ? (
        <ErrorState
          title="Integrations unavailable"
          message={state.integrations.error ?? "Connection lost."}
          onRetry={() => undefined}
        />
      ) : state.integrations.items.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.integrations.items.map((integration) => (
            <ConnectorCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="Available and connected services will appear here."
          icon={Plug}
          title="No integrations yet"
        />
      )}
    </section>
  );
}
