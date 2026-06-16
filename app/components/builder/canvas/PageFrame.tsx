import { BarChart3, FileText, MoreHorizontal } from "lucide-react";
import type { Page, PageBlock } from "../types";

interface PageFrameProps {
  page: Page;
}

function BlockCard({ block }: { block: PageBlock }) {
  if (block.type === "heading") {
    return (
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-gray-950">
          {block.title}
        </h2>
        {block.description && (
          <p className="mt-1 text-sm text-gray-500">{block.description}</p>
        )}
      </header>
    );
  }

  if (block.type === "metrics") {
    return (
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {(block.items ?? []).map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <p className="text-xs font-medium text-gray-500">{item.label}</p>
            <p className="mt-2 text-xl font-bold text-gray-950">{item.value}</p>
          </article>
        ))}
      </section>
    );
  }

  if (block.type === "table") {
    return (
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">{block.title}</p>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {(block.columns ?? []).map((column) => (
                  <th key={column} className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {(block.rows ?? []).map((row, index) => (
                <tr key={`${block.id}-${index}`}>
                  {(block.columns ?? []).map((column) => (
                    <td key={column} className="px-4 py-3">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (block.type === "chart") {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">{block.title}</p>
          <BarChart3 className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-6 flex h-40 items-end gap-2">
          {(block.items ?? []).map((item) => (
            <div
              key={item.id}
              className="flex-1 rounded-t bg-orange-100"
              style={{ height: `${Math.max(8, Number(item.value) || 8)}%` }}
              title={item.label}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-semibold text-gray-900">{block.title}</p>
      {block.description && (
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {block.description}
        </p>
      )}
      {(block.items ?? []).map((item) => (
        <div
          key={item.id}
          className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600"
        >
          <span>{item.label}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </section>
  );
}

export function PageFrame({ page }: PageFrameProps) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_10px_30px_rgba(17,24,39,0.08)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 rounded-xl bg-[#F5F5EE] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-1 flex min-w-0 flex-1 items-center">
            <div className="truncate rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-500">
              {page.name}
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[11px] font-semibold text-gray-500">localhost</span>
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Responsive viewport */}
        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-[#FAFAF8]">
          <div className="aspect-[16/9] w-full bg-white">
            <div className="h-full w-full p-5 sm:p-7">
              <div className="space-y-5">
                {page.blocks.length > 0 ? (
                  page.blocks.map((block) => (
                    <BlockCard key={block.id} block={block} />
                  ))
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                      <FileText className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">
                      This page is empty
                    </h3>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                      Add content blocks in your generator flow to see them appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

