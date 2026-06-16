import {
  ArrowUpRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const projects = [
  {
    name: "Sales CRM",
    type: "Business App",
    status: "Ready",
    updated: "2 hours ago",
  },
  {
    name: "Support Desk",
    type: "Customer Service",
    status: "Building",
    updated: "Yesterday",
  },
  {
    name: "Inventory Manager",
    type: "Operations",
    status: "Ready",
    updated: "3 days ago",
  },
  {
    name: "HR Portal",
    type: "Internal Tool",
    status: "Ready",
    updated: "4 days ago",
  },
];

export default function RecentProjects() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[32px] font-semibold text-[#111111]">
            Recent Projects
          </h2>

          <p className="mt-2 text-[#6B7280]">
            Projects generated with OneAtlas.
          </p>
        </div>

        <button className="text-[#FF6600] font-medium hover:opacity-80">
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
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
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#111111]">
                  {project.name}
                </h3>

                <p className="text-[#6B7280] mt-1">
                  {project.type}
                </p>
              </div>

              <button className="w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#FF6600]">
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Clock3 size={14} />
                {project.updated}
              </div>

              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={14} />
                {project.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}