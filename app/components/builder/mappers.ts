import type { GenerateResponse } from "./contracts";
import {
  createInitialBuilderState,
  type BuilderState,
  type ResourceCollection,
} from "./types";

function successCollection<T>(items: T[]): ResourceCollection<T> {
  return {
    items,
    status: "success",
    error: null,
  };
}

export function mapResponseToBuilderState(
  response: GenerateResponse,
  currentState: BuilderState = createInitialBuilderState(),
): BuilderState {
  return {
    ...currentState,
    project: response.project,
    pages: successCollection(response.pages),
    entities: successCollection(response.entities),
    workflows: successCollection(response.workflows),
    integrations: successCollection(response.integrations),
    messages: response.messages ?? currentState.messages,
    status: "success",
    errors: {
      generation: null,
      project: null,
    },
    ui: {
      ...currentState.ui,
      selectedPageId: response.pages[0]?.id ?? null,
      selectedEntityId: response.entities[0]?.id ?? null,
      selectedWorkflowId: response.workflows[0]?.id ?? null,
      selectedIntegrationId: response.integrations[0]?.id ?? null,
    },
  };
}
