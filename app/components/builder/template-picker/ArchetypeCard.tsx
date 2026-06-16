interface ArchetypeCardProps {
  title: string;
  description?: string;
}

export function ArchetypeCard({ title, description }: ArchetypeCardProps) {
  return (
    <button className="rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-orange-300 hover:shadow-sm">
      <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </button>
  );
}
