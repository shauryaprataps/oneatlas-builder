export type BuilderStatus = "idle" | "loading" | "success" | "error";
// Back-compat for partially migrated components
export type ResourceStatus = BuilderStatus;


export interface ResourceCollection<T> {
  items: T[];
  status: BuilderStatus;
  error: string | null;
}

export interface Project {
  id: string | null;
  name: string;
  description?: string;
  status: "draft" | "published";
}

export type PageBlockType =
  | "heading"
  | "metrics"
  | "chart"
  | "table"
  | "form"
  | "list"
  | "text";

export interface PageBlock {
  id: string;
  type: PageBlockType;
  title?: string;
  description?: string;
  columns?: string[];
  rows?: Array<Record<string, string | number>>;
  items?: Array<{ id: string; label: string; value?: string }>;
}

export type ComponentInstance = {
  id: string;
  componentId: string;
  type: string;

  x: number;
  y: number;

  width: number;
  height: number;

  padding: number;
  margin: number;

  text?: string;
};

export interface Page {
  id: string;
  name: string;
  slug: string;
  description?: string;
  blocks: PageBlock[];

  // Stage 8: persisted rendered component instances on this page
  instances: ComponentInstance[];
}


export interface EntityField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
}

export interface EntityRelation {
  id: string;
  targetEntityId: string;
  type: "one-to-one" | "one-to-many" | "many-to-many";
  label?: string;
}

export interface Entity {
  id: string;
  name: string;
  fields: EntityField[];
  relations: EntityRelation[];
}

export interface WorkflowNode {
  id: string;
  type: "trigger" | "condition" | "action";
  title: string;
  description?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
}

export interface Integration {
  id: string;
  name: string;
  description?: string;
  category?: string;
  status: "connected" | "disconnected" | "pending";
}

export interface BuilderMessage {
  id: string;
  message: string;
  sender: "user" | "assistant";
  timestamp: string;
}

export type WorkspaceKey =
  | "design"
  | "data"
  | "workflows"
  | "integrations"
  | "settings";

export interface BuilderUiState {
  activeWorkspace: WorkspaceKey;
  isChatOpen: boolean;
  selectedPageId: string | null;
  selectedEntityId: string | null;
  selectedWorkflowId: string | null;
  selectedIntegrationId: string | null;

  // Stage 7: component definition selection
  selectedComponentId: string | null;

  // Stage 8: component instance selection
  selectedInstanceId: string | null;
}



export interface BuilderErrors {
  generation: string | null;
  project: string | null;
}

export interface ComponentDefinition {
  id: string;
  type:
    | "container"
    | "text"
    | "button"
    | "input"
    | "card"
    | "image"
    | "navbar"
    | "hero"
    | "table";
  name: string;
  width: number;
  height: number;
  padding: number;
  margin: number;
}

export interface BuilderState {
  project: Project;
  pages: ResourceCollection<Page>;
  entities: ResourceCollection<Entity>;
  workflows: ResourceCollection<Workflow>;
  integrations: ResourceCollection<Integration>;
  components: ResourceCollection<ComponentDefinition>;
  messages: BuilderMessage[];
  status: BuilderStatus;
  errors: BuilderErrors;
  ui: BuilderUiState;
}

export function createEmptyCollection<T>(): ResourceCollection<T> {
  return { items: [], status: "idle", error: null };
}

export function createInitialBuilderState(): BuilderState {
  return {
    project: {
      id: null,
      name: "Untitled Project",
      status: "draft",
    },
    pages: createEmptyCollection<Page>(),
    entities: createEmptyCollection<Entity>(),
    workflows: createEmptyCollection<Workflow>(),
    integrations: createEmptyCollection<Integration>(),
    components: createEmptyCollection<ComponentDefinition>(),
    messages: [],
    status: "idle",
    errors: {
      generation: null,
      project: null,
    },
    ui: {
      activeWorkspace: "design",
      isChatOpen: false,
      selectedPageId: null,
      selectedEntityId: null,
      selectedWorkflowId: null,
      selectedIntegrationId: null,
      selectedComponentId: null,
      selectedInstanceId: null,
    },
  };
}


