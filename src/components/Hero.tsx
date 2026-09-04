import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

interface HeroProps {
  totalTools: number;
}

export default function Hero({ totalTools }: HeroProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500;
    const steps = 60;
    const increment = totalTools / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= totalTools) {
        setCount(totalTools);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, totalTools]);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <div className="h-72 w-[36rem] rounded-full bg-accent-cyan/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute right-0 top-32">
        <div className="h-64 w-64 rounded-full bg-accent-violet/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-1.5 text-xs font-medium text-accent-cyan animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          Curated & Community Approved
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl animate-fade-in-up">
          Supercharge Your Workflow with{' '}
          <span className="shimmer-text">NovaTools Hub</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 text-balance sm:text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          The ultimate curated ecosystem of premium AI tools, software, and digital resources to save you hours of manual work.
        </p>

        {/* Live counter */}
        <div
          ref={counterRef}
          className="mt-10 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-ink-700/60 bg-ink-850/60 px-6 py-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-cyan/10">
              <Zap className="h-5 w-5 text-accent-cyan" />
            </div>
            <div className="text-left">
              <div className="font-display text-3xl font-bold text-white tabular-nums sm:text-4xl">
                {count}
                <span className="text-accent-cyan">+</span>
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Total Tools Listed
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              100% Verified Links
            </span>
            <span className="hidden text-ink-600 sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent-cyan">⚡</span>
              Updated Daily
            </span>
            <span className="hidden text-ink-600 sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent-violet">👥</span>
              5,000+ Active Users
            </span>
          </div>
        </div>

        <a
          href="#directory"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-accent-cyan animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Browse the directory
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
