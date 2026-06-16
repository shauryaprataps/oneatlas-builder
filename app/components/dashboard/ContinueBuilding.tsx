import { ArrowRight } from "lucide-react";

const projects = [
  {
    name: "Sales CRM",
    description: "Customer management and reporting",
    progress: 85,
    updated: "2 hours ago",
  },
  {
    name: "HR Portal",
    description: "Employee onboarding workflow",
    progress: 60,
    updated: "Yesterday",
  },
  {
    name: "Inventory System",
    description: "Stock tracking and analytics",
    progress: 40,
    updated: "3 days ago",
  },
];

export default function ContinueBuilding() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-[32px] font-semibold text-[#111111]">
          Continue Building
        </h2>

        <p className="mt-2 text-[#6B7280]">
          Pick up where you left off.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="
              bg-white
              border
              border-[#E5E7EB]
              rounded-[24px]
              p-6
              hover:shadow-md
              transition-all
            "
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#111111]">
                  {project.name}
                </h3>

                <p className="text-sm text-[#6B7280] mt-1">
                  {project.description}
                </p>
              </div>

              <span className="text-xs text-[#9CA3AF]">
                {project.updated}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Progress</span>
                <span className="font-medium">
                  {project.progress}%
                </span>
              </div>

              <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6600] rounded-full"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>

            <button
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-xl
                border
                border-[#E5E7EB]
                hover:border-[#FF6600]
                hover:text-[#FF6600]
                transition-all
              "
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}