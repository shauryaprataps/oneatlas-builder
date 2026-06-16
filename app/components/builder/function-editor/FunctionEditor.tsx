import { FunctionList } from "./FunctionList";
import { FunctionLogs } from "./FunctionLogs";
import { MonacoEditor } from "./MonacoEditor";

export function FunctionEditor() {
  return (
    <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 lg:grid-cols-[14rem_1fr]">
      <FunctionList />
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">sendWelcomeEmail</h2>
          <p className="text-sm text-gray-500">Edit and test your server function.</p>
        </div>
        <MonacoEditor />
        <FunctionLogs />
      </div>
    </section>
  );
}
