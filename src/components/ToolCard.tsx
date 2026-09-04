import { BadgeCheck, ExternalLink, Tag } from 'lucide-react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const pricingStyles: Record<Tool['pricing'], string> = {
  '100% Free': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Freemium: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
  'Free Trial Available': 'text-accent-violet bg-accent-violet/10 border-accent-violet/20',
};

export default function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <div
      className="card-surface group relative flex flex-col p-5 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Exclusive Deal ribbon */}
      {tool.deal && (
        <div className="absolute -top-3 left-4 z-10">
          <div className="ribbon-glow rounded-lg px-3 py-1 text-xs font-bold text-black shadow-lg">
            {tool.deal}
          </div>
        </div>
      )}

      {/* Header: logo + name + approved badge */}
      <div className="mb-4 mt-1 flex items-start gap-3">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${tool.logoColor}cc 0%, ${tool.logoColor}66 100%)`,
            boxShadow: `0 4px 16px ${tool.logoColor}33`,
          }}
        >
          {tool.logoText}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-lg font-semibold text-white">
              {tool.name}
            </h3>
            {tool.approved && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <BadgeCheck className="h-3 w-3" />
                Approved
              </span>
            )}
          </div>
          <div className={`mt-1.5 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${pricingStyles[tool.pricing]}`}>
            <Tag className="h-3 w-3" />
            {tool.pricing}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
        {tool.description}
      </p>

      {/* CTA */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glow-btn flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-ink-950"
      >
        Visit Website
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
