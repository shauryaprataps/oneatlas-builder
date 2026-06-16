import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  pages: number;
  entities: number;
  timeAgo: string;
  previewType: 'crm' | 'analytics' | 'inventory';
}

function WireframePreview({ type }: { type: 'crm' | 'analytics' | 'inventory' }) {
  if (type === 'crm') {
    return (
      <div className="w-full h-40 bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/60 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-white/60 rounded w-1/3" />
            <div className="h-2 bg-white/40 rounded w-1/2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/60 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-white/60 rounded w-1/3" />
            <div className="h-2 bg-white/40 rounded w-1/2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/60 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-white/60 rounded w-1/3" />
            <div className="h-2 bg-white/40 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'analytics') {
    return (
      <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/60 rounded p-2 space-y-1">
            <div className="h-1.5 bg-blue-200/60 rounded w-1/2" />
            <div className="h-3 bg-blue-300/60 rounded w-2/3" />
          </div>
          <div className="bg-white/60 rounded p-2 space-y-1">
            <div className="h-1.5 bg-blue-200/60 rounded w-1/2" />
            <div className="h-3 bg-blue-300/60 rounded w-2/3" />
          </div>
          <div className="bg-white/60 rounded p-2 space-y-1">
            <div className="h-1.5 bg-blue-200/60 rounded w-1/2" />
            <div className="h-3 bg-blue-300/60 rounded w-2/3" />
          </div>
        </div>
        <div className="flex-1 bg-white/60 rounded flex items-end gap-1 p-2">
          <div className="w-full h-8 bg-blue-200/60 rounded-t" />
          <div className="w-full h-12 bg-blue-300/60 rounded-t" />
          <div className="w-full h-6 bg-blue-200/60 rounded-t" />
          <div className="w-full h-10 bg-blue-300/60 rounded-t" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-40 bg-gradient-to-br from-green-50 to-green-100/50 p-4">
      <div className="bg-white/60 rounded space-y-1.5 p-2">
        <div className="grid grid-cols-4 gap-2">
          <div className="h-2 bg-green-200/60 rounded" />
          <div className="h-2 bg-green-200/60 rounded" />
          <div className="h-2 bg-green-200/60 rounded" />
          <div className="h-2 bg-green-200/60 rounded" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
          <div className="h-2 bg-green-100/60 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ name, description, pages, entities, timeAgo, previewType }: ProjectCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer">
      {/* Wireframe Preview */}
      <WireframePreview type={previewType} />

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h4 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.4, color: '#111111' }}>
            {name}
          </h4>
          <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: '#6B7280' }}>
            {description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>
          <span>{pages} Pages</span>
          <span>•</span>
          <span>{entities} Entities</span>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 400, color: '#9CA3AF' }}>
          Updated {timeAgo}
        </div>

        {/* CTA */}
        <button className="inline-flex items-center gap-2 text-primary hover:text-[#E65C00] transition-all group-hover:gap-3 mt-1"
          style={{ fontSize: '14px', fontWeight: 600 }}>
          Open Builder
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
