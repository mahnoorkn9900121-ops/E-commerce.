import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, addToCart, navigate, showToast } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((p) => {
      const color = p.colors[0]?.name || 'Standard';
      const size = p.sizes ? p.sizes[0] : undefined;
      addToCart(p, color, size, 1);
    });
    showToast('Wishlist Moved', 'All saved items have been added to your bag.', 'success');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
          Explore our creations and tap the heart icon on any piece to save it for future curation.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="mt-8 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-stone-200 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Saved Creations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Private Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'piece' : 'pieces'} bookmarked in your session
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMoveAllToBag}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Bag</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => navigate('shop')}
          className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 flex items-center gap-1.5 mx-auto"
        >
          <span>Continue Browsing Atelier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
