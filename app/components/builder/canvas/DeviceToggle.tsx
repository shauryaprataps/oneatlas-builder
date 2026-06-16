export function DeviceToggle() {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs font-medium">
      <button className="rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm">Desktop</button>
      <button className="px-3 py-1.5 text-gray-500">Tablet</button>
      <button className="px-3 py-1.5 text-gray-500">Mobile</button>
    </div>
  );
}
