import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    formatPrice,
    isInWishlist,
    toggleWishlist,
    setQuickViewProduct,
    addToCart
  } = useShop();

  const [hovered, setHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Fallback high quality placeholder if remote image ever fails
  const fallbackImg =
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80';

  const primaryImg = imgError ? fallbackImg : product.images[0];
  const secondaryImg =
    product.images[1] && !imgError ? product.images[1] : primaryImg;

  const currentDisplayImg = hovered ? secondaryImg : primaryImg;

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking a button inside, let button handler deal with it
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate('product', { id: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const color = product.colors[selectedColorIdx]?.name || product.colors[0]?.name || 'Standard';
    const size = product.sizes ? product.sizes[0] : undefined;
    addToCart(product, color, size, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col cursor-pointer bg-white rounded-2xl p-3 border border-stone-200/70 hover:border-stone-400 hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
        <img
          src={currentDisplayImg}
          alt={product.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges / Indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs">
              New Arrival
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-rose-700 bg-rose-50/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-stone-700 hover:text-stone-950 hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorited ? 'fill-rose-600 scale-110' : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Quick View and Quick Add Desktop Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg shadow-md transition-colors flex items-center justify-center"
            aria-label="Add to bag"
            title="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-3 flex flex-col flex-1">
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center gap-1.5 text-[11px] text-stone-600 tracking-wider uppercase font-medium">
          <span>{product.category}</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>{product.origin}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-base font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-stone-700 transition-colors">
          {product.name}
        </h3>

        {/* Subtitle / Tagline */}
        <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">
          {product.tagline}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span className="ml-1 font-semibold text-stone-800 text-xs">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
        </div>

        {/* Pricing & Colors Bottom Row */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color swatch previews */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? 'ring-1.5 ring-stone-900 ring-offset-1 scale-110'
                      : 'border-stone-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
