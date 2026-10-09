import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useShop();
  const [activeTab, setActiveTab] = useState<string>('all');

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const newArrivals = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    return p.department === activeTab;
  }).slice(0, 8);

  const departments = [
    { id: 'all', label: 'All Departures' },
    { id: 'apparel', label: 'Apparel & Tailoring' },
    { id: 'leather', label: 'Leather & Horology' },
    { id: 'audio', label: 'Acoustics' },
    { id: 'living', label: 'Living & Scents' }
  ];

  const pressQuotes = [
    {
      publication: 'VOGUE LIVING',
      quote:
        'Valoir represents a rare return to tactile purity. Every object possesses deliberate architectural gravity.',
      author: 'Milano Design Week Review'
    },
    {
      publication: 'MONOCLE',
      quote:
        'The antidote to ephemeral trends. Exceptional European provenance and uncompromising material selection.',
      author: 'Issue 178 Editorial'
    },
    {
      publication: 'WALLPAPER*',
      quote:
        'A masterclass in quiet luxury. From Danish acoustic design to Tuscan alabaster, craftsmanship takes center stage.',
      author: 'Design Awards Showcase'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900 text-stone-100">
        {/* Hero Background Image with Subtle Parallax feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Valoir Autumn Editorial Collection"
            className="w-full h-full object-cover object-center brightness-[0.45] scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 backdrop-blur-md border border-stone-700 text-stone-300 text-xs tracking-widest uppercase mb-6 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Maison Archive Series · Volume IV</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 max-w-4xl leading-[1.1]">
            Quiet Elegance. <br />
            <span className="italic font-normal text-amber-100/90">Enduring Substance.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-light">
            An uncompromising collection of tailored Italian outerwear, Swiss mechanical horology,
            and Danish acoustic engineering. Direct from Europe&apos;s most revered family workshops.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-stone-100 text-stone-950 hover:bg-white font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 hover:gap-3"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('about')}
              className="w-full sm:w-auto px-8 py-4 bg-stone-900/60 hover:bg-stone-800/80 text-stone-200 border border-stone-700/80 font-semibold text-xs uppercase tracking-widest rounded-xl backdrop-blur-md transition-all flex items-center justify-center"
            >
              The Valoir Story
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center text-stone-400 text-xs uppercase tracking-widest pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <span>Discover</span>
            <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Brand Value Pillars Bar */}
      <section className="bg-white border-b border-stone-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl text-stone-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Complimentary Express
              </h4>
              <p className="text-[11px] text-stone-500">Global dispatch on orders over $250</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl text-stone-900 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Artisan Provenance
              </h4>
              <p className="text-[11px] text-stone-500">100% verified European ateliers</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl text-stone-900 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                30-Day Courtesy Return
              </h4>
              <p className="text-[11px] text-stone-500">Complimentary courier doorstep pickup</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl text-stone-900 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Lifetime Restoration
              </h4>
              <p className="text-[11px] text-stone-500">Movement overhauls & leather care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Departments Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Curated Departments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Architectural Living & Design
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-600 flex items-center gap-1.5 group"
          >
            <span>Explore All 12 Pieces</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate('shop', { department: cat.department })}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-900 flex flex-col justify-end p-6 border border-stone-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.7] group-hover:brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold">
                  {cat.itemCount} Pieces Curated
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-100 mt-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-white font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Showcase */}
      <section className="py-20 bg-stone-100/70 border-y border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Maison Classics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              The Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              Objects that embody our uncompromising devotion to material weight, tactile grace,
              and timeless longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('shop')}
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-widest rounded-xl shadow-md transition-all"
            >
              View Full Collection
            </button>
          </div>
        </div>
      </section>

      {/* Split Editorial Lookbook Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-[#1C1917] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 border border-stone-800">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-stone-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Biella & Tuscany Dialogue</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-50 mt-4 leading-tight">
                Crafted for Decades, <br />
                <span className="italic font-normal text-stone-300">Not for Seasons.</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-400 mt-6 leading-relaxed">
                We believe the objects closest to you should tell stories of authentic provenance.
                Our double-faced cashmere overcoats are tailored slowly in Biella with buffalo horn buttons,
                while our vacchetta luggage absorbs sun, rain, and decades of journeying to cultivate
                an incomparable patina.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-stone-800 pt-6">
                <div>
                  <span className="font-serif text-2xl font-bold text-stone-100">42 Hours</span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Hand-finishing per cashmere coat</p>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-stone-100">28,800 vph</span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Swiss mechanical movement calibration</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate('about')}
                className="px-6 py-3 bg-stone-100 hover:bg-white text-stone-900 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Read The Atelier Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[350px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=85"
              alt="Artisanal tailoring in Biella"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals & Department Selector */}
      <section className="py-20 bg-white border-t border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                Fresh From Ateliers
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                New Arrivals
              </h2>
            </div>

            {/* Department interactive filter tabs */}
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl">
              {departments.map((dep) => (
                <button
                  key={dep.id}
                  onClick={() => setActiveTab(dep.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === dep.id
                      ? 'bg-stone-900 text-stone-50 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  {dep.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Press Accolades */}
      <section className="py-20 bg-[#FAF9F5] border-t border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Critique & Accolades
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
              Words From The Press
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="font-serif text-base italic text-stone-800 leading-relaxed">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-bold tracking-widest text-stone-900 uppercase">
                    {item.publication}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
