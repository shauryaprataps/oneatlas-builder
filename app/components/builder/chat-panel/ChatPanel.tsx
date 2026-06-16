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
    const el = messagesEndRef.current;

    if (el) {
      console.log("MESSAGE VIEWPORT", {
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
      });
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [state.messages]);

  function handleSubmit() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    // 1) Append user message
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

    // 2) Generate JSON via simple keyword matching
    const text = trimmedPrompt.toLowerCase();
    const isCRM = [
      "crm",
      "customer",
      "lead",
      "deal",
      "pipeline",
      "sales",
    ].some((k) => text.includes(k));

    const isInventory = [
      "inventory",
      "product",
      "supplier",
      "stock",
      "warehouse",
      "sku",
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

    const pages = generated.pages.map((name) => {
      const id = crypto.randomUUID();
      return {
        id,
        name,
        slug: name
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        description: undefined,
        blocks: [],
        instances: [],
      };
    });

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

    // 3) Replace generated state in BuilderContext
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
          message: JSON.stringify(
            {
              pages: generated.pages,
              entities: generated.entities,
              workflows: generated.workflows,
            },
            null,
            2,
          ),
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

      <aside
        className={`relative left-0 z-50 flex w-[min(90vw,420px)] flex-shrink-0 flex-col border-r border-[#E5E7EB] bg-white shadow-2xl transition-transform duration-300 md:static md:inset-auto md:z-auto md:w-[420px] md:translate-x-0 md:shadow-none xl:w-[420px] ${
          state.ui.isChatOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-x-hidden`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">

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

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="flex min-h-0 flex-1 flex-col gap-5">
            <section className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.06)]">
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

            <SuggestionChips suggestions={[]} onSelect={setPrompt} />

            {state.status === "error" && state.errors.generation ? (
              <ErrorState
                title="Generation failed"
                message={state.errors.generation}
                onRetry={() => undefined}
              />
            ) : (
              <div className="flex min-h-0 flex-1 flex-col border-t border-gray-100 pt-4">
                {state.messages.length > 0 ? (
                  <div
                    className="min-h-0 flex-1 overflow-y-auto space-y-4 pr-2"
                    ref={messagesEndRef}
                  >
                    {state.messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message.message}
                        sender={message.sender}
                        timestamp={message.timestamp}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full max-w-full overflow-hidden break-words rounded-2xl bg-gray-50 px-4 py-4 text-center">
                    <p className="text-sm font-medium text-gray-600">
                      Start a new conversation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Describe what you want to build. Your conversation will
                      appear here.
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="max-w-full break-words rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-sm text-gray-600">
                    <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
                    Generating application...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

            <div className="shrink-0 border-t border-gray-100 bg-white p-4">
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
