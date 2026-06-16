import type { Entity, Page, Workflow } from "../types";
import type { GeneratedBuilderModel } from "./keywords";

function toSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function modelToPages(model: GeneratedBuilderModel): Page[] {
  return model.pages.map((name) => {
    const id = crypto.randomUUID();
    return {
      id,
      name,
      slug: toSlug(name),
      description: undefined,
      blocks: [],
      instances: [],
    };
  });
}

export function modelToEntities(model: GeneratedBuilderModel): Entity[] {
  return model.entities.map((name) => {
    const id = crypto.randomUUID();
    return {
      id,
      name,
      fields: [],
      relations: [],
    };
  });
}

export function modelToWorkflows(model: GeneratedBuilderModel): Workflow[] {
  return model.workflows.map((name) => {
    const id = crypto.randomUUID();
    const nodeId = crypto.randomUUID();

    return {
      id,
      name,
      description: undefined,
      nodes: [
        {
          id: nodeId,
          type: "trigger",
          title: name,
          description: undefined,
        },
      ],
    };
  });
}

