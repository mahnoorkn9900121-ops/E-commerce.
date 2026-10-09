import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { FAQ_DATA, FaqItem } from '../../data/faq';
import { Search, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigate } = useShop();
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-01']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFaq = useMemo(() => {
    if (!search.trim()) return FAQ_DATA;
    const q = search.toLowerCase();
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by category
  const categories = useMemo(() => {
    const map = new Map<string, FaqItem[]>();
    filteredFaq.forEach((item) => {
      const list = map.get(item.category) || [];
      list.push(item);
      map.set(item.category, list);
    });
    return Array.from(map.entries());
  }, [filteredFaq]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
          Client Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
          Frequently Answered Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2">
          Everything regarding our international courier dispatch, authenticity standards,
          and lifetime restoration guarantees.
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries (e.g. shipping, warranty, returns)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Categories & Accordions */}
      <div className="space-y-8">
        {categories.map(([categoryName, items]) => (
          <div key={categoryName} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
              {categoryName}
            </h3>

            <div className="divide-y divide-stone-100">
              {items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left flex items-center justify-between gap-4 py-1 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-stone-600 leading-relaxed font-light">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredFaq.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-900">No matching questions found</p>
            <p className="text-xs text-stone-500 mt-1">Try another keyword or reach out directly.</p>
          </div>
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-12 p-8 bg-stone-900 text-stone-100 rounded-3xl text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold">Require Individual Consultation?</h4>
          <p className="text-xs text-stone-300 mt-1">
            Our atelier specialists are standing by 7 days a week for collectors worldwide.
          </p>
        </div>
        <button
          onClick={() => navigate('contact')}
          className="px-6 py-3 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 shadow-md"
        >
          <span>Speak with Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
