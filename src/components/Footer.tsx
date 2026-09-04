import { useState } from 'react';
import { Sparkles, CheckCircle2, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="about" className="relative mt-20 border-t border-ink-700/40 bg-ink-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + Newsletter */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-cyanGlow">
                <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-base font-bold text-white">
                NovaTools Hub <span className="text-accent-cyan">⚡</span>
              </span>
            </div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-slate-400">
              The curated hub for discovering the best AI and digital tools. Stay ahead of the curve.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-xl border border-ink-700/60 bg-ink-850/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent-cyan/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="glow-btn flex flex-shrink-0 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-ink-950"
                >
                  {subscribed ? <CheckCircle2 className="h-4 w-4" /> : 'Subscribe Now'}
                </button>
              </div>
              {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
              {subscribed && (
                <p className="mt-1.5 text-xs text-emerald-400">You're subscribed! Welcome aboard.</p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#directory" className="text-sm text-slate-400 transition-colors hover:text-accent-cyan">
                  Browse Directory
                </a>
              </li>
              <li>
                <a href="#categories" className="text-sm text-slate-400 transition-colors hover:text-accent-cyan">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-accent-cyan">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-accent-cyan">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-accent-cyan">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Top Categories</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-400 hover:text-accent-cyan">Writing</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-accent-cyan">Image Generation</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-accent-cyan">Video</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-accent-cyan">Developer Tools</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-accent-cyan">Productivity</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-700/40 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 NovaTools Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 transition-colors hover:text-accent-cyan" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-500 transition-colors hover:text-accent-cyan" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-500 transition-colors hover:text-accent-cyan" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
