import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate, setSearchModalOpen } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center">
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400 mb-6">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
        Error 404 · Uncharted Route
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mt-2">
        This Destination Does Not Exist
      </h1>

      <p className="text-xs sm:text-sm text-stone-500 mt-3 max-w-md mx-auto leading-relaxed">
        The archive page or piece you are searching for may have been relocated or retired to the
        private atelier collection.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate('home')}
          className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all"
        >
          Return to Maison
        </button>

        <button
          onClick={() => navigate('shop')}
          className="w-full sm:w-auto px-8 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
        >
          Explore Collection
        </button>

        <button
          onClick={() => setSearchModalOpen(true)}
          className="w-full sm:w-auto text-xs font-semibold text-stone-600 hover:text-stone-950 underline px-4 py-2"
        >
          Search Catalog
        </button>
      </div>
    </div>
  );
};
