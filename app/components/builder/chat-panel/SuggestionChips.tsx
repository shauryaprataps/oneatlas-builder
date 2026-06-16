interface SuggestionChipsProps {
  suggestions: Array<{ id: string; label: string; prompt: string }>;
  onSelect?: (prompt: string) => void;
}

export function SuggestionChips({
  suggestions,
  onSelect,
}: SuggestionChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <section>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        Suggestions
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            onClick={() => onSelect?.(suggestion.prompt)}
            type="button"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </section>
  );
}
