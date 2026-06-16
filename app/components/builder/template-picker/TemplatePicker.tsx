import { ArchetypeCard } from "./ArchetypeCard";
interface Template {
  id: string;
  title: string;
  description?: string;
}

export function TemplatePicker({ templates = [] }: { templates?: Template[] }) {
  return (
    <section className="space-y-5 rounded-2xl border border-gray-200 bg-[#F5F5EE] p-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Choose a template</h2>
        <p className="text-sm text-gray-500">Start with an archetype and customize it.</p>
      </div>
      {templates.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <ArchetypeCard key={template.id} {...template} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
          No templates available.
        </div>
      )}
    </section>
  );
}
