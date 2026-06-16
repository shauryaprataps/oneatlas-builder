"use client";

import { Info, Copy, Trash2 } from "lucide-react";

import { EmptyState } from "../shared/EmptyState";
import type { ComponentInstance } from "../types";
import { useBuilder } from "../store/BuilderContext";
import { PropertyField } from "./PropertyField";
import { PropertyGroup } from "./PropertyGroup";

export function ComponentInspector({
  instance,
}: {
  instance: ComponentInstance | null;
}) {
  const { updateInstance, duplicateInstance, deleteInstance } = useBuilder();

  if (!instance) {
    return (
      <EmptyState
        title="Select an instance"
        description="Click an instance on the canvas to edit its properties."
        icon={Info}
      />
    );
  }

  return (
    <>
      <PropertyGroup title="Selected Instance">
        <PropertyField label="Text">
          <input
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-orange-300"
            value={instance.text ?? ""}
            placeholder="Text"
            onChange={(e) => {
              updateInstance(instance.id, { text: e.target.value });
            }}
          />
        </PropertyField>

        <PropertyField label="Width">
          <input
            inputMode="numeric"
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-orange-300"
            value={instance.width}
            type="number"
            onChange={(e) => {
              updateInstance(instance.id, {
                width: Number(e.target.value),
              });
            }}
          />
        </PropertyField>

        <PropertyField label="Height">
          <input
            inputMode="numeric"
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-orange-300"
            value={instance.height}
            type="number"
            onChange={(e) => {
              updateInstance(instance.id, {
                height: Number(e.target.value),
              });
            }}
          />
        </PropertyField>

        <PropertyField label="Padding">
          <input
            inputMode="numeric"
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-orange-300"
            value={instance.padding}
            type="number"
            onChange={(e) => {
              updateInstance(instance.id, {
                padding: Number(e.target.value),
              });
            }}
          />
        </PropertyField>

        <PropertyField label="Margin">
          <input
            inputMode="numeric"
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-orange-300"
            value={instance.margin}
            type="number"
            onChange={(e) => {
              updateInstance(instance.id, {
                margin: Number(e.target.value),
              });
            }}
          />
        </PropertyField>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100"
            onClick={() => {
              duplicateInstance(instance.id);
            }}
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </button>

          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            onClick={() => {
              deleteInstance(instance.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </PropertyGroup>
    </>
  );
}


