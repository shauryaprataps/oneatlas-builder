import {
  Briefcase,
  Boxes,
  Users,
  BarChart3,
  Headphones,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const templates = [
  {
    title: "CRM",
    description: "Manage customers, pipelines and sales.",
    icon: Briefcase,
  },
  {
    title: "Inventory",
    description: "Track stock, orders and suppliers.",
    icon: Boxes,
  },
  {
    title: "HR Portal",
    description: "Employee onboarding and workflows.",
    icon: Users,
  },
  {
    title: "Analytics",
    description: "Business intelligence dashboards.",
    icon: BarChart3,
  },
  {
    title: "Support Desk",
    description: "Customer ticketing and support.",
    icon: Headphones,
  },
  {
    title: "Internal Wiki",
    description: "Knowledge base and documentation.",
    icon: BookOpen,
  },
];

export default function Templates() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[32px] font-semibold text-[#111111]">
            Start from a Template
          </h2>

          <p className="mt-2 text-[#6B7280]">
            Launch faster with pre-built foundations.
          </p>
        </div>

        <button className="text-[#FF6600] font-medium hover:opacity-80">
          Browse all templates
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;

          return (
            <div
              key={template.title}
              className="
                group
                bg-white
                border
                border-[#E5E7EB]
                rounded-[24px]
                overflow-hidden
                hover:shadow-lg
                transition-all
              "
            >
              {/* Preview Area */}
              <div className="h-40 bg-[#FAFAF8] border-b border-[#E5E7EB] flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:scale-110 transition-all">
                  <Icon size={28} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#111111]">
                  {template.title}
                </h3>

                <p className="mt-2 text-[#6B7280]">
                  {template.description}
                </p>

                <button
                  className="
                    mt-6
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-[#FF6600]
                    text-white
                    hover:bg-[#E65C00]
                    transition-all
                  "
                >
                  Use Template
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}