export function RuleBuilder() {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">Access rules</h2>
      <p className="mb-4 text-sm text-gray-500">Define what this role can do.</p>
      {["View records", "Create records", "Edit records", "Delete records"].map((rule, index) => (
        <label key={rule} className="mb-2 flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm text-gray-700">
          {rule}
          <input type="checkbox" defaultChecked={index < 3} className="h-4 w-4 accent-orange-500" />
        </label>
      ))}
    </div>
  );
}
