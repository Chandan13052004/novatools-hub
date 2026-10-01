import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryPills from './components/CategoryPills';
import ToolCard from './components/ToolCard';
import SubmitModal from './components/SubmitModal';
import Footer from './components/Footer';
import { categories, tools } from './data';
import type { CategoryId } from './types';

function getCategoryFromUrl(): CategoryId {
  const param = new URLSearchParams(window.location.search).get('category');
  return categories.some((c) => c.id === param) ? (param as CategoryId) : 'all';
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>(getCategoryFromUrl);
  const [modalOpen, setModalOpen] = useState(false);

  // Keep ?category= in the URL in sync so sitemap links open the right filter
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeCategory);
    }
    if (url.href !== window.location.href) {
      window.history.replaceState(null, '', url);
    }
  }, [activeCategory]);

  // Scroll to the directory when landing on a category URL
  useEffect(() => {
    if (getCategoryFromUrl() !== 'all') {
      document.getElementById('directory')?.scrollIntoView();
    }
  }, []);

  const handleFooterCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setSearchQuery('');
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === 'all' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-ink-950">
      <Header onSubmitClick={() => setModalOpen(true)} />

      <Hero totalTools={50} />

      {/* FIXED ANCHOR ID ADDED BELOW */}
      <section id="directory" className="px-4 pb-8 sm:px-6 lg:px-8 scroll-mt-20">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-8">
          <CategoryPills
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Results count */}
        <div className="mx-auto mt-8 max-w-7xl">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-white">{filteredTools.length}</span> of{' '}
            <span className="font-medium text-white">{tools.length}</span> tools
          </p>
        </div>

        {/* Grid */}
        {filteredTools.length > 0 ? (
          <div className="mx-auto mt-5 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink-800">
              <Search className="h-7 w-7 text-slate-500" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-white">
              No tools found
            </h3>
            <p className="text-sm text-slate-400">
              Try a different search term or category filter.
            </p>
          </div>
        )}
      </section>

      <Footer
        categories={categories}
        onCategorySelect={handleFooterCategory}
        onSubmitClick={() => setModalOpen(true)}
      />

      <SubmitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
