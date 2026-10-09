import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
  List,
  Search,
  Star
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { params, navigate, formatPrice } = useShop();

  // Filters state
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    params.department || 'all'
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(params.q || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [layoutView, setLayoutView] = useState<'grid-4' | 'grid-3' | 'list'>('grid-4');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync when params change
  useEffect(() => {
    if (params.department) setSelectedDepartment(params.department);
    if (params.q) setSearchQuery(params.q);
  }, [params]);

  // Extract all categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleResetFilters = () => {
    setSelectedDepartment('all');
    setSelectedCategories([]);
    setMaxPrice(3000);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedDepartment !== 'all' ||
    selectedCategories.length > 0 ||
    maxPrice < 3000 ||
    minRating > 0 ||
    inStockOnly ||
    onSaleOnly ||
    searchQuery.trim().length > 0;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Department
      if (selectedDepartment !== 'all' && p.department !== selectedDepartment) {
        return false;
      }
      // Categories
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      ) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // On sale
      if (onSaleOnly && !p.originalPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // 'featured' keeps original ordering
    });
  }, [
    selectedDepartment,
    selectedCategories,
    maxPrice,
    minRating,
    inStockOnly,
    onSaleOnly,
    searchQuery,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header Banner */}
      <div className="mb-10 pb-8 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
              <button
                onClick={() => navigate('home')}
                className="hover:text-stone-900 transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span>The Atelier Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              The Complete Collection
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Impeccably tailored outerwear, horological mechanical calibers, Danish acoustic
              instruments, and Italian stone vessels.
            </p>
          </div>

          {/* Department pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.department}
                onClick={() => setSelectedDepartment(cat.department)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedDepartment === cat.department
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Left Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 space-y-8 pr-4 border-r border-stone-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Refine Filter</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search within catalog */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-900 block mb-2">
              Search Catalog
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, material, or origin..."
                className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
              />
            </div>
          </div>

          {/* Category Checkboxes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-900 block mb-3">
              Categories
            </label>
            <div className="space-y-2">
              {allCategories.map((cat) => {
                const checked = selectedCategories.includes(cat);
                const count = PRODUCTS.filter((p) => p.category === cat).length;
                return (
                  <label
                    key={cat}
                    className="flex items-center justify-between text-xs text-stone-700 hover:text-stone-950 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-3.5 h-3.5"
                      />
                      <span>{cat}</span>
                    </div>
                    <span className="text-stone-400 text-[11px]">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Max Price
              </label>
              <span className="text-xs font-bold text-stone-900">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>{formatPrice(100)}</span>
              <span>{formatPrice(3000)}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-900 block mb-2">
              Customer Rating
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'All Ratings', value: 0 },
                { label: '4.8 & Above', value: 4.8 },
                { label: '4.9 & Above', value: 4.9 },
                { label: '5.0 Pure Perfection', value: 5.0 }
              ].map((rate) => (
                <button
                  key={rate.value}
                  onClick={() => setMinRating(rate.value)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    minRating === rate.value
                      ? 'bg-stone-900 text-stone-100 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {rate.value > 0 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    <span>{rate.label}</span>
                  </div>
                  {minRating === rate.value && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            <label className="flex items-center justify-between text-xs text-stone-800 cursor-pointer">
              <span>In-Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-stone-800 cursor-pointer">
              <span>Seasonal Archive Discount</span>
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Right Main Catalog Content */}
        <div className="lg:col-span-3">
          {/* Top Control Bar: Total Count, Sorting & Layout Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Showing {filteredProducts.length} of {PRODUCTS.length} creations
              </span>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              {/* Sorting dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-medium focus:outline-none focus:border-stone-500 shadow-2xs"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {/* View Layout Switcher (Desktop) */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
                <button
                  onClick={() => setLayoutView('grid-4')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layoutView === 'grid-4' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label="4 columns grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutView('grid-3')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layoutView === 'grid-3' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label="3 columns grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutView('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layoutView === 'list' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mr-1">
                Active:
              </span>
              {selectedDepartment !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium">
                  <span>Dept: {selectedDepartment}</span>
                  <button onClick={() => setSelectedDepartment('all')}>
                    <X className="w-3 h-3 text-stone-500 hover:text-stone-900" />
                  </button>
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium"
                >
                  <span>{cat}</span>
                  <button onClick={() => toggleCategory(cat)}>
                    <X className="w-3 h-3 text-stone-500 hover:text-stone-900" />
                  </button>
                </span>
              ))}
              {maxPrice < 3000 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium">
                  <span>Under {formatPrice(maxPrice)}</span>
                  <button onClick={() => setMaxPrice(3000)}>
                    <X className="w-3 h-3 text-stone-500 hover:text-stone-900" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium">
                  <span>★ {minRating}+</span>
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3 text-stone-500 hover:text-stone-900" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 text-stone-500 hover:text-stone-900" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-stone-500 hover:text-stone-900 underline ml-2 font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid / List rendering */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                layoutView === 'grid-4'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : layoutView === 'grid-3'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center bg-stone-50 rounded-3xl border border-stone-200 p-8">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                No matching creations found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto leading-relaxed">
                We could not find items matching your current filter selections. Try adjusting the
                price range, clearing specific categories, or resetting all filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">Filter Collection</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Category */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-900 block mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-xs text-stone-700">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-stone-300 text-stone-900 w-3.5 h-3.5"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-900 mb-2">
                  <span>Max Price:</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center justify-between text-xs text-stone-800">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 w-4 h-4"
                />
              </label>

              {/* Sale */}
              <label className="flex items-center justify-between text-xs text-stone-800">
                <span>On Sale Only</span>
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 w-4 h-4"
                />
              </label>
            </div>

            <div className="mt-auto pt-4 border-t border-stone-200 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-stone-900 text-stone-100 text-xs font-semibold rounded-xl"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
