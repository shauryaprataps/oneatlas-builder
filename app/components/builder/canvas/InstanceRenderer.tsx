"use client";

import type { ComponentInstance } from "../types";

export function InstanceRenderer({
  instance,
  selected,
  onClick,
}: {
  instance: ComponentInstance;
  selected: boolean;
  onClick: () => void;
}) {
  const sharedStyle: React.CSSProperties = {
    position: "absolute",
    left: instance.x,
    top: instance.y,
    width: instance.width,
    height: instance.height,
    padding: instance.padding,
    margin: instance.margin,
  };

  const selectedClass = selected
    ? "ring-2 ring-orange-500 shadow-[0_0_0_1px_rgba(249,115,22,0.2),0_0_22px_rgba(249,115,22,0.25)]"
    : "ring-1 ring-transparent";

  const wrapperBase =
    "group select-none overflow-hidden rounded-xl bg-white/90 transition hover:bg-white";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={selected ? "Selected instance" : "Instance"}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={sharedStyle}
      className={`${wrapperBase} ${selectedClass} ${instance.type === "text" ? "p-2" : "p-0"}`}
    >
      {instance.type === "text" ? (
        <p className="text-sm font-medium text-gray-900">
          {instance.text ?? "Text"}
        </p>
      ) : null}

      {instance.type === "button" ? (
        <button
          type="button"
          className="h-full w-full rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white hover:bg-orange-700"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Button
        </button>
      ) : null}

      {instance.type === "input" ? (
        <input
          className="h-full w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-300"
          placeholder="Input"
          onClick={(e) => e.stopPropagation()}
        />
      ) : null}

      {instance.type === "container" ? (
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-white">
          <div className="w-full text-center text-sm font-semibold text-gray-700">
            Container
          </div>
        </div>
      ) : null}

      {instance.type === "card" ? (
        <div className="h-full w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <div className="text-sm font-semibold text-gray-900">Card</div>
        </div>
      ) : null}

      {instance.type === "hero" ? (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-orange-50">
          <div className="text-sm font-bold text-orange-700">Hero</div>
        </div>
      ) : null}

      {instance.type === "image" ? (
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <div className="text-sm font-semibold text-gray-600">Image</div>
        </div>
      ) : null}

      {instance.type === "navbar" ? (
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-white">
          <div className="text-sm font-semibold text-gray-600">Navbar</div>
        </div>
      ) : null}

      {instance.type === "table" ? (
        <div className="h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="h-full w-full text-left text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 font-semibold text-gray-600">Header</th>
                <th className="px-2 py-2 font-semibold text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-2 py-2 text-gray-700">Row</td>
                <td className="px-2 py-2 text-gray-700">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}


