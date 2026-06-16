export type GeneratedBuilderModel = {
  pages: string[];
  entities: string[];
  workflows: string[];
};

export function generateFromPrompt(prompt: string): GeneratedBuilderModel {
  const text = prompt.toLowerCase();

  // Simple keyword matching only (no AI, no backend).
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

  if (isCRM) {
    return {
      pages: ["Dashboard", "Customers", "Leads", "Reports"],
      entities: ["Customer", "Lead"],
      workflows: ["Lead Assignment"],
    };
  }

  if (isInventory) {
    return {
      pages: ["Dashboard", "Products", "Inventory", "Suppliers"],
      entities: ["Product", "Supplier"],
      workflows: ["Stock Alert"],
    };
  }

  // Fallback
  return {
    pages: ["Dashboard"],
    entities: [],
    workflows: [],
  };
}

