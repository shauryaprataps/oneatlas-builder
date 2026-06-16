import type {
  BuilderMessage,
  Entity,
  Integration,
  Page,
  Project,
  Workflow,
} from "./types";

export interface GenerateRequest {
  projectId?: string;
  prompt: string;
  currentProject?: Project;
  pages?: Page[];
  entities?: Entity[];
  workflows?: Workflow[];
  integrations?: Integration[];
}

export interface GenerateResponse {
  project: Project;
  pages: Page[];
  entities: Entity[];
  workflows: Workflow[];
  integrations: Integration[];
  messages?: BuilderMessage[];
}

export interface BuilderApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
