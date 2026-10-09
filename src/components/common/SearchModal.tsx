import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, navigate, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  // Global Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchModalOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  const searchResults = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.tagline.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.department.toLowerCase().includes(clean) ||
        p.materials.toLowerCase().includes(clean) ||
        p.origin.toLowerCase().includes(clean)
      );
    });
  }, [query]);

  if (!searchModalOpen) return null;

  const quickTags = [
    'Cashmere',
    'Horology',
    'Turntable',
    'Silk Trench',
    'Brass Lamp',
    'Weekender'
  ];

  const handleSelectProduct = (id: string) => {
    navigate('product', { id });
    setSearchModalOpen(false);
  };

  const handleViewAllResults = () => {
    navigate('shop', { q: query });
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input Box */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, material, or origin (e.g. Cashmere, Le Locle, Silk)..."
              className="w-full text-sm sm:text-base bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-stone-400 hover:text-stone-700"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setSearchModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors text-xs font-semibold px-2"
            >
              ESC
            </button>
          </div>

          {/* Quick suggestions when query is empty */}
          {!query && (
            <div className="p-6">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-3">
                Curated Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-3">
                  Featured Categories
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      navigate('shop', { department: 'apparel' });
                      setSearchModalOpen(false);
                    }}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded-xl font-medium text-stone-800 transition-colors"
                  >
                    Apparel & Tailoring
                  </button>
                  <button
                    onClick={() => {
                      navigate('shop', { department: 'leather' });
                      setSearchModalOpen(false);
                    }}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded-xl font-medium text-stone-800 transition-colors"
                  >
                    Leather & Horology
                  </button>
                  <button
                    onClick={() => {
                      navigate('shop', { department: 'audio' });
                      setSearchModalOpen(false);
                    }}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded-xl font-medium text-stone-800 transition-colors"
                  >
                    Acoustic & Audio
                  </button>
                  <button
                    onClick={() => {
                      navigate('shop', { department: 'living' });
                      setSearchModalOpen(false);
                    }}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded-xl font-medium text-stone-800 transition-colors"
                  >
                    Living & Botanical
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results list */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-100">
              {searchResults.length > 0 ? (
                <>
                  <div className="p-3 bg-stone-50/70 text-xs text-stone-500 flex justify-between items-center px-6">
                    <span>Found {searchResults.length} matching creations</span>
                    <button
                      onClick={handleViewAllResults}
                      className="text-stone-900 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View in Shop</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </button>
                  </div>

                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="p-4 sm:px-6 flex items-center gap-4 hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <div className="w-14 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                          {product.category} · {product.origin}
                        </span>
                        <h4 className="text-sm font-semibold text-stone-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-stone-900">
                          {formatPrice(product.price)}
                        </span>
                        <div className="text-[11px] text-emerald-700">In Stock</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-sm text-stone-700 font-medium">
                    No creations found matching &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Try searching for cashmere, horology, turntable, alabaster, or leather.
                  </p>
                  <button
                    onClick={() => setQuery('')}
                    className="mt-4 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
