import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useShop();

  const ateliers = [
    {
      region: 'Biella, Northern Italy',
      specialty: 'Double-Faced Cashmere & Natural Fibers',
      description:
        'Nestled at the foothills of the Italian Alps, our spinning and weaving partner draws upon glacial Alpine waters renowned for washing natural wool without synthetic softening additives.',
      image:
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
    },
    {
      region: 'Le Locle, Switzerland',
      specialty: 'Mechanical Calibers & Horology',
      description:
        'Located in the historic watchmaking cradle of the Jura Mountains. Certified master watchmakers assemble each 28,800 vph automatic caliber in sterile cleanrooms.',
      image:
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      region: 'Florence & Tuscany, Italy',
      specialty: 'Vegetable-Tanned Vacchetta Leather',
      description:
        'Generations of tannery artisans who eschew chrome salts in favor of natural tree bark tannins, allowing our luggage and cardholders to age with a magnificent honey-gold patina.',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    },
    {
      region: 'Copenhagen, Denmark',
      specialty: 'Acoustic Transducers & Sound Architecture',
      description:
        'Tuned by acoustic engineers with pedigrees in studio monitor mastering. Combining American walnut resonance cavities with pure beryllium driver membranes.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Editorial Header */}
      <section className="relative py-24 sm:py-32 bg-stone-900 text-stone-100 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-200 font-semibold">
            The Maison Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-4 leading-tight">
            Objects of Permanence in an Ephemeral Era.
          </h1>
          <p className="text-base sm:text-lg text-stone-300 mt-6 font-light leading-relaxed max-w-2xl mx-auto">
            Founded on the conviction that true luxury is not defined by disposable logos or seasonal
            hype, but by the tactile weight of pure natural fibers, mechanical precision, and slow
            European craft.
          </p>
        </div>
      </section>

      {/* Manifesto 3 Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
            <div className="p-3 bg-stone-100 rounded-2xl w-fit text-stone-900 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              01. The Slow Luxury Covenant
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              We reject industrial high-velocity production cycles. Every Valoir garment, timepiece, and
              vessel is created in limited runs aligned with the natural availability of grade-A
              fibers and master artisan capacity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
            <div className="p-3 bg-stone-100 rounded-2xl w-fit text-stone-900 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              02. Radical Material Purity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              No polyester blends, no chrome tanning, and no synthetic adhesives where natural horn,
              brass, and linen thread endure longer. What touches your skin or graces your living
              space should possess pure organic integrity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
            <div className="p-3 bg-stone-100 rounded-2xl w-fit text-stone-900 mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              03. Direct Atelier Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              By working directly with independent multi-generational family workshops across Italy,
              Switzerland, and Denmark, we support ancestral trades while offering collectors honest
              atelier pricing without intermediary markups.
            </p>
          </div>
        </div>
      </section>

      {/* Atelier Locations Section */}
      <section className="bg-stone-100/70 py-20 border-y border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              European & Global Network
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Our Master Ateliers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ateliers.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto">
                  <img src={a.image} alt={a.region} className="w-full h-full object-cover" />
                </div>
                <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      {a.specialty}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">
                      {a.region}
                    </h4>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Explore */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Experience the Difference of Real Craftsmanship
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
          Explore our current archive collection and discover heirlooms designed to accompany you
          for decades to come.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="mt-8 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-widest rounded-xl shadow-lg transition-all"
        >
          Explore Collection
        </button>
      </section>
    </div>
  );
};
