export function FunctionList() {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Functions</p>
      {["sendWelcomeEmail", "syncCustomer", "createInvoice"].map((name, index) => (
        <button
          key={name}
          className={`mb-1 w-full truncate rounded-lg px-3 py-2 text-left text-sm ${
            index === 0 ? "bg-white font-medium text-gray-900 shadow-sm" : "text-gray-600"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
