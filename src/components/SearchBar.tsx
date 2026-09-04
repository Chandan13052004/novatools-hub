import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
      <div className={`group relative rounded-2xl ${value ? 'glow-border-focused' : 'glow-border'} bg-ink-850/80 backdrop-blur-sm`}>
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-accent-cyan" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for AI tools, categories, or keywords..."
          className="w-full rounded-2xl bg-transparent py-4 pl-14 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none sm:text-base"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 transition-colors hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
