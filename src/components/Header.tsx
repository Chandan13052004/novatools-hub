import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSubmitClick: () => void;
}

export default function Header({ onSubmitClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/40 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyanGlow shadow-lg shadow-accent-cyan/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            NovaTools Hub <span className="text-accent-cyan">⚡</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#directory" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Directory
          </a>
          <a href="#categories" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Categories
          </a>
          <a href="#about" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onSubmitClick}
            className="glow-btn rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-950 sm:px-5"
          >
            Submit a Tool
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink-700/40 px-4 py-3 md:hidden">
          <a
            href="#directory"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-ink-800 hover:text-white"
          >
            Directory
          </a>
          <a
            href="#categories"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-ink-800 hover:text-white"
          >
            Categories
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-ink-800 hover:text-white"
          >
            About
          </a>
        </nav>
      )}
    </header>
  );
}
