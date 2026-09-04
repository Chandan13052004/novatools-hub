import type { Category, CategoryId } from '../types';

interface CategoryPillsProps {
  categories: Category[];
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
}

export default function CategoryPills({ categories, active, onSelect }: CategoryPillsProps) {
  return (
    <div id="categories" className="scrollbar-hide overflow-x-auto px-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl gap-2.5 pb-2">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'border-accent-cyan/50 bg-accent-cyan/10 text-white shadow-[0_0_16px_rgba(34,211,238,0.2)]'
                  : 'border-ink-700/60 bg-ink-850/60 text-slate-400 hover:border-ink-600 hover:text-slate-200'
              }`}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
