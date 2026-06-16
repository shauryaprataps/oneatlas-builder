export function FunctionLogs() {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">Logs</p>
        <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Success</span>
      </div>
      <p className="mt-2 font-mono text-xs text-gray-500">Function completed in 128ms.</p>
    </div>
  );
}
