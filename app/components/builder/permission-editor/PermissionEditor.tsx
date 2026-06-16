import { RoleManager } from "./RoleManager";
import { RuleBuilder } from "./RuleBuilder";

export function PermissionEditor() {
  return (
    <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 md:grid-cols-[14rem_1fr]">
      <RoleManager />
      <RuleBuilder />
    </section>
  );
}
