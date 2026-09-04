import { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import type { Category } from '../types';

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

interface FormData {
  name: string;
  email: string;
  url: string;
  category: string;
  pitch: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  url: '',
  category: '',
  pitch: '',
};

export default function SubmitModal({ open, onClose, categories }: SubmitModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setForm(initialForm);
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.url.trim()) {
      newErrors.url = 'Tool URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(form.url)) {
      newErrors.url = 'Enter a valid URL (https://...)';
    }
    if (!form.category) newErrors.category = 'Select a category';
    if (!form.pitch.trim()) {
      newErrors.pitch = 'A short pitch is required';
    } else if (form.pitch.trim().length < 10) {
      newErrors.pitch = 'Pitch must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('toolhub_submissions');
        const submissions = stored ? JSON.parse(stored) : [];
        submissions.push({ ...form, createdAt: new Date().toISOString() });
        localStorage.setItem('toolhub_submissions', JSON.stringify(submissions));
      } catch {
        // localStorage may be unavailable; submission still succeeds in-session
      }
      setSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  const fieldClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all focus:outline-none ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-ink-700/60 focus:border-accent-cyan/50 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.15)]'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink-700/60 bg-ink-850 shadow-2xl animate-fade-in-up scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-700/40 bg-ink-850/95 px-6 py-4 backdrop-blur-xl">
          <h2 className="font-display text-lg font-bold text-white">Submit Your Tool</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-ink-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-white">
              Submission Received!
            </h3>
            <p className="mb-6 max-w-sm text-sm text-slate-400">
              Thank you for submitting <span className="font-medium text-white">{form.name}</span>.
              Our team will review your tool and reach out soon.
            </p>
            <button
              onClick={onClose}
              className="rounded-xl border border-ink-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-ink-800 hover:text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5">
            <p className="mb-5 text-sm text-slate-400">
              Got an AI tool or digital product? Submit it below to reach thousands of creators and professionals.
            </p>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className={fieldClass('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className={fieldClass('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Tool URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Tool URL
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://yourtool.com"
                  className={fieldClass('url')}
                />
                {errors.url && <p className="mt-1 text-xs text-red-400">{errors.url}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`${fieldClass('category')} cursor-pointer`}
                >
                  <option value="" className="bg-ink-850">Select a category...</option>
                  {categories
                    .filter((c) => c.id !== 'all')
                    .map((c) => (
                      <option key={c.id} value={c.id} className="bg-ink-850">
                        {c.icon} {c.label}
                      </option>
                    ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
              </div>

              {/* Pitch */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Short Pitch
                </label>
                <textarea
                  value={form.pitch}
                  onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                  placeholder="In 1-2 sentences, what makes your tool special?"
                  rows={3}
                  className={`${fieldClass('pitch')} resize-none`}
                />
                {errors.pitch && <p className="mt-1 text-xs text-red-400">{errors.pitch}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="glow-btn mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-ink-950 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Tool
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
