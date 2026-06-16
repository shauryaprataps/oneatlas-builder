export function MonacoEditor() {
  return (
    <div className="min-h-64 overflow-hidden rounded-xl bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-200">
      <p><span className="text-purple-300">export async function</span> <span className="text-blue-300">handler</span>() {"{"}</p>
      <p className="pl-4"><span className="text-purple-300">return</span> {"{ status: \"ok\" };"}</p>
      <p>{"}"}</p>
    </div>
  );
}
