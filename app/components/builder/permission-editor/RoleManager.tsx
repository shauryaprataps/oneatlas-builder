export function RoleManager() {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Roles</p>
      {["Admin", "Editor", "Viewer"].map((role, index) => (
        <button
          key={role}
          className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-sm ${
            index === 0 ? "bg-white font-medium text-gray-900 shadow-sm" : "text-gray-600"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}
