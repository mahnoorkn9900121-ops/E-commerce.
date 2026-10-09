import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Heart, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigate
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);

  // Defaults if not selected yet
  const currentColor = selectedColor || product.colors[0]?.name || 'Standard';
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : '');

  const handleClose = () => {
    setQuickViewProduct(null);
    setActiveImageIdx(0);
    setSelectedColor('');
    setSelectedSize('');
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize || undefined, quantity);
    handleClose();
  };

  const handleViewFullPage = () => {
    navigate('product', { id: product.id });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-stone-50 flex flex-col justify-between">
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-200 relative">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-stone-900 ring-2 ring-stone-900/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-medium">
                  <span>{product.category}</span>
                  <span>·</span>
                  <span>{product.origin}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                  {product.name}
                </h2>

                <p className="text-sm text-stone-600 mt-1 italic">
                  {product.tagline}
                </p>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="ml-1.5 font-semibold text-stone-800">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-stone-400 text-xs ml-1">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {product.stock} in stock
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-stone-200">
                  <span className="text-2xl font-bold text-stone-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-stone-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 mt-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                      Color: <span className="text-stone-900 font-normal">{currentColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedColor(c.name);
                            if (c.imageIndex !== undefined) setActiveImageIdx(c.imageIndex);
                          }}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            currentColor === c.name
                              ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105'
                              : 'border-white shadow-xs hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          aria-label={c.name}
                        >
                          {currentColor === c.name && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                c.hex === '#1C1917' || c.hex === '#18181B' ? 'text-white' : 'text-stone-900'
                              }`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                      Size: <span className="text-stone-900 font-normal">{currentSize}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`w-10 h-10 rounded-xl text-xs font-semibold border transition-all ${
                            currentSize === s
                              ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-sm'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-950 font-medium"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-950 font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-[0.99]"
                  >
                    Add to Bag · {formatPrice(product.price * quantity)}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isFavorited
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullPage}
                  className="w-full py-2.5 text-stone-600 hover:text-stone-950 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Complete Specifications & Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
