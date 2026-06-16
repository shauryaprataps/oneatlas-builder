"use client";

import { Check, LoaderCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import { MessageBubble } from "./MessageBubble";
import { PromptInput } from "./PromptInput";
import { SuggestionChips } from "./SuggestionChips";

function getTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function ChatPanel() {
  const { state, setBuilderState, updateUi } = useBuilder();
  const [prompt, setPrompt] = useState("");
  const isLoading = state.status === "loading";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  function handleSubmit() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    setBuilderState((current) => ({
      ...current,
      messages: [
        ...current.messages,
        {
          id: crypto.randomUUID(),
          message: trimmedPrompt,
          sender: "user",
          timestamp: getTimestamp(),
        },
      ],
      status: "loading",
      errors: { ...current.errors, generation: null },
    }));

    const text = trimmedPrompt.toLowerCase();
    const isCRM = ["crm", "customer", "lead", "deal", "pipeline", "sales"].some(
      (k) => text.includes(k),
    );
    const isInventory = [
      "inventory", "product", "supplier", "stock", "warehouse", "sku",
    ].some((k) => text.includes(k));

    const generated = isCRM
      ? {
          pages: ["Dashboard", "Customers", "Leads", "Reports"],
          entities: ["Customer", "Lead"],
          workflows: ["Lead Assignment"],
        }
      : isInventory
        ? {
            pages: ["Dashboard", "Products", "Inventory", "Suppliers"],
            entities: ["Product", "Supplier"],
            workflows: ["Stock Alert"],
          }
        : {
            pages: ["Dashboard"],
            entities: [],
            workflows: [],
          };

    const pages = generated.pages.map((name) => ({
      id: crypto.randomUUID(),
      name,
      slug: name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      description: undefined,
      blocks: [],
      instances: [],
    }));

    const entities = generated.entities.map((name) => ({
      id: crypto.randomUUID(),
      name,
      fields: [],
      relations: [],
    }));

    const workflows = generated.workflows.map((name) => ({
      id: crypto.randomUUID(),
      name,
      description: undefined,
      nodes: [
        {
          id: crypto.randomUUID(),
          type: "trigger" as const,
          title: name,
          description: undefined,
        },
      ],
    }));

    const assistantSummary =
      `✓ Application generated\n\n` +
      `Pages: ${generated.pages.join(", ")}\n` +
      `Entities: ${generated.entities.length > 0 ? generated.entities.join(", ") : "None"}\n` +
      `Workflows: ${generated.workflows.length > 0 ? generated.workflows.join(", ") : "None"}`;

    setBuilderState((current) => ({
      ...current,
      pages: {
        ...current.pages,
        items: pages,
        status: "success",
        error: null,
      },
      entities: {
        ...current.entities,
        items: entities,
        status: "success",
        error: null,
      },
      workflows: {
        ...current.workflows,
        items: workflows,
        status: "success",
        error: null,
      },
      status: "success",
      errors: { ...current.errors, generation: null, project: null },
      ui: {
        ...current.ui,
        selectedPageId: pages[0]?.id ?? null,
        selectedEntityId: entities[0]?.id ?? null,
        selectedWorkflowId: workflows[0]?.id ?? null,
      },
      messages: [
        ...current.messages,
        {
          id: crypto.randomUUID(),
          message: assistantSummary,
          sender: "assistant",
          timestamp: getTimestamp(),
        },
      ],
    }));

    setPrompt("");
    updateUi({ isChatOpen: false });
  }

  return (
    <>
      {state.ui.isChatOpen && (
        <button
          aria-label="Close AI Builder"
          className="fixed inset-0 z-40 bg-gray-950/20 backdrop-blur-[1px] md:hidden"
          onClick={() => updateUi({ isChatOpen: false })}
        />
      )}

      {/*
        h-full   — fills the grid cell height exactly
        flex + flex-col — stacks Header / content / PromptInput vertically
        overflow-hidden — clips the aside; only the inner scroll div scrolls
      */}
      <aside
        className={`
          relative left-0 z-50
          flex h-full w-[min(90vw,420px)] flex-shrink-0 flex-col
          overflow-hidden
          border-r border-[#E5E7EB] bg-white
          shadow-2xl transition-transform duration-300
          md:static md:inset-auto md:z-auto md:w-full md:translate-x-0 md:shadow-none
          ${state.ui.isChatOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Header — fixed height, never scrolls ── */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-sm font-semibold text-gray-950">AI Builder</h2>
          </div>
          <button
            aria-label="Close AI Builder"
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 md:hidden"
            onClick={() => updateUi({ isChatOpen: false })}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/*
          ── Content wrapper — takes all remaining height between header
             and prompt input. No padding here; padding lives on children
             so it doesn't interfere with flex height resolution. ──
        */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">

          {/* Welcome card + chips — shrink-0 so they never compress the scroll area */}
          <div className="flex-shrink-0 px-6 pt-5">
            {state.messages.length === 0 && (
              <section className="mb-5 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.06)]">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-950">
                  Welcome to OneAtlas Builder
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Generate complete applications using natural language.
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5">
                  {["Pages", "Database Schema", "Workflows", "Integrations"].map(
                    (feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-1 text-[11px] font-medium text-gray-600"
                      >
                        <Check className="h-3.5 w-3.5 text-orange-500" />
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

            <SuggestionChips suggestions={[]} onSelect={setPrompt} />
          </div>

          {/* Divider */}
          <div className="flex-shrink-0 mx-6 mt-4 border-t border-gray-100" />

          {/*
            ── THE ONLY scrollable region ──
            min-h-0  — overrides flex child's default min-height: auto,
                       allowing it to shrink below its content size so
                       overflow-y-auto actually triggers a scrollbar.
            flex-1   — takes all remaining vertical space.
            overflow-y-auto — shows scrollbar only when content overflows.
          */}
          {state.status === "error" && state.errors.generation ? (
            <div className="flex-shrink-0 px-6 pt-4">
              <ErrorState
                title="Generation failed"
                message={state.errors.generation}
                onRetry={() => undefined}
              />
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {state.messages.length === 0 ? (
                  <div className="w-full overflow-hidden break-words rounded-2xl bg-gray-50 px-4 py-4 text-center">
                    <p className="text-sm font-medium text-gray-600">
                      Start a new conversation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Describe what you want to build. Your conversation will
                      appear here.
                    </p>
                  </div>
                ) : (
                  state.messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message.message}
                      sender={message.sender}
                      timestamp={message.timestamp}
                    />
                  ))
                )}

                {isLoading && (
                  <div className="flex items-center gap-2 break-words rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-sm text-gray-600">
                    <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
                    Generating application…
                  </div>
                )}

                {/* Auto-scroll anchor — always rendered at bottom of scroll content */}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* ── PromptInput — fixed height, always visible, never inside scroll ── */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white p-4">
          <div className="overflow-x-hidden break-words">
            <PromptInput
              disabled={isLoading}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              value={prompt}
            />
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            AI can make mistakes. Review generated changes.
          </p>
        </div>
      </aside>
    </>
  );
}
