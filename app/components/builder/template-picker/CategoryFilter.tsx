export function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      {["All", "Internal tools", "Commerce", "Operations"].map((category, index) => (
        <button
          key={category}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            index === 0 ? "bg-orange-500 text-white" : "border border-gray-200 bg-white text-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
