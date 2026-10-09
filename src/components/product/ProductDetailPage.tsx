import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductReview, Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
  Maximize2,
  X,
  MessageSquarePlus
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    params,
    navigate,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    addRecentlyViewed,
    recentlyViewed,
    showToast
  } = useShop();

  const productId = params.id || 'val-01';
  const product: Product | undefined = PRODUCTS.find((p) => p.id === productId);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'provenance' | 'care'>('details');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);

  // Reviews state (can add reviews locally)
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIdx(0);
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setQuantity(1);
      setReviewsList(product.reviews || []);
    }
  }, [productId, product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900">Creation Not Found</h2>
        <p className="text-sm text-stone-500 mt-2">
          The requested atelier piece does not exist in our current catalog.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="mt-6 px-6 py-3 bg-stone-900 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle Add To Cart
  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize || undefined, quantity);
  };

  // Handle Buy Now (adds to cart & routes straight to checkout)
  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize || undefined, quantity);
    navigate('checkout');
  };

  // Submit new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) {
      showToast('Form Incomplete', 'Please fill out all review fields.', 'warning');
      return;
    }
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      date: 'Just now',
      rating: newReviewRating,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewFormOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Review Published', 'Thank you for contributing your perspective.', 'success');
  };

  // Related products (same department, excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.department === product.department && p.id !== product.id
  ).slice(0, 3);

  // Recently viewed products
  const recentProducts = PRODUCTS.filter(
    (p) => recentlyViewed.includes(p.id) && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium mb-8">
        <button onClick={() => navigate('home')} className="hover:text-stone-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button onClick={() => navigate('shop')} className="hover:text-stone-900 transition-colors">
          Collection
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button
          onClick={() => navigate('shop', { department: product.department })}
          className="hover:text-stone-900 transition-colors capitalize"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery & Zoom (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails strip */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-18 h-22 sm:w-20 sm:h-26 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-stone-100 ${
                  activeImageIdx === idx
                    ? 'border-stone-900 ring-2 ring-stone-900/20 shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`View angle ${idx + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Primary Viewport with Zoom trigger */}
          <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 group">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Enlarge Lightbox Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs transition-colors"
              aria-label="Enlarge image in fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 bg-stone-900 text-stone-100 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-md">
                  New Arrival
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-3 py-1 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-md">
                  Archive Save {discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details, Variant Selection & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Origin & Provenance Eyebrow */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
              <span>{product.origin}</span>
              <span>·</span>
              <span>{product.category}</span>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              {product.name}
            </h1>
            <p className="text-sm text-stone-600 mt-1 italic font-light">
              {product.tagline}
            </p>

            {/* Rating & Stock */}
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-stone-200 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="ml-1 font-bold text-stone-900 text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-stone-400">·</span>
                <a
                  href="#reviews"
                  className="text-stone-500 hover:text-stone-900 underline font-medium"
                >
                  {reviewsList.length} verified reviews
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>In Stock ({product.stock} available)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-stone-500 ml-auto">
                Taxes calculated at checkout
              </span>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Finish / Color: <strong className="text-stone-950 font-bold">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105'
                          : 'border-white shadow-xs hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      {selectedColor === c.name && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex === '#1C1917' || c.hex === '#18181B' ? 'text-white' : 'text-stone-900'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector (if clothing) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Size: <strong className="text-stone-950 font-bold">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-stone-500 hover:text-stone-900 underline font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === s
                          ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Wishlist */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-2.5 text-xs font-bold text-stone-900 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 text-xs font-semibold ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                <span>{isFavorited ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-4 flex flex-col gap-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-amber-100 hover:bg-amber-200 text-stone-900 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Instant Checkout
              </button>
            </div>

            {/* Service & Delivery Reassurance */}
            <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-2 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Dispatched in 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-800 shrink-0" />
                <span>30-Day Courtesy Return</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Verified Origin Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Heirloom Restoration Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion / Tabbed Specifications & Craft Story */}
      <div className="mt-20 pt-10 border-t border-stone-200">
        <div className="flex border-b border-stone-200 gap-8 overflow-x-auto">
          {[
            { id: 'details', label: 'Story & Details' },
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'provenance', label: 'Provenance & Materials' },
            { id: 'care', label: 'Care & Maintenance' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-4 text-xs sm:text-sm uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-stone-900 text-stone-950 font-bold'
                  : 'border-transparent text-stone-400 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'details' && (
            <div className="max-w-3xl space-y-4">
              <p className="text-base text-stone-800 leading-relaxed font-light">
                {product.description}
              </p>
              <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200/80">
                <h4 className="font-serif text-base font-semibold text-stone-900 mb-2">
                  The Master Artisan&apos;s Perspective
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                  &quot;{product.story}&quot;
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl divide-y divide-stone-200">
              {product.specifications.map((spec, i) => (
                <div key={i} className="py-3 flex justify-between text-xs sm:text-sm">
                  <span className="font-medium text-stone-500">{spec.label}</span>
                  <span className="font-semibold text-stone-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'provenance' && (
            <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                <strong>Origin of Manufacture:</strong> {product.origin}
              </p>
              <p>
                <strong>Primary Materials:</strong> {product.materials}
              </p>
              <p>
                Each component is audited under our strict Zero-Compromise Provenance standard.
                No chrome-tanned residues, synthetic microplastics, or unverified secondary suppliers.
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p className="font-semibold text-stone-900">Recommended Care Instructions:</p>
              <p>{product.care}</p>
              <p className="text-xs text-stone-500">
                For complete overhaul, replacement parts, or bespoke conditioning, contact our
                client concierge at any time.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" className="mt-16 pt-12 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Client Perspectives & Reviews
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Verified evaluations from our worldwide collectors.
            </p>
          </div>

          <button
            onClick={() => setReviewFormOpen(!reviewFormOpen)}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{reviewFormOpen ? 'Close Form' : 'Write a Perspective'}</span>
          </button>
        </div>

        {/* Review Form Drawer/Section */}
        {reviewFormOpen && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-10 p-6 bg-stone-100 rounded-2xl border border-stone-200 max-w-2xl"
          >
            <h4 className="font-serif text-lg font-bold text-stone-900 mb-4">
              Submit Your Review
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Rating
                </label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none"
                >
                  <option value={5}>5 Stars - Exceptional</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Extraordinary drape and tactile depth"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Your Review
              </label>
              <textarea
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Describe the fit, material feel, and craftsmanship..."
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-xl uppercase tracking-wider"
            >
              Post Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h5 className="text-sm font-semibold text-stone-900 mb-1">{rev.title}</h5>
                <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-stone-800">{rev.author}</span>
                {rev.verifiedPurchase && (
                  <span className="text-emerald-700 font-medium">✓ Verified Collector</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-stone-200">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Complementary Pieces
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              From the Same Department
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Your Session History
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Recently Viewed
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 bg-stone-800 text-stone-200 rounded-full hover:bg-stone-700"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIdx]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              European Tailoring Size Guide
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Garments are cut for a relaxed, architectural silhouette.
            </p>

            <table className="w-full mt-6 text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest (cm)</th>
                  <th className="py-2">Sleeve (cm)</th>
                  <th className="py-2">EU Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800 font-medium">
                <tr>
                  <td className="py-2.5 font-bold">S</td>
                  <td>94 - 98</td>
                  <td>64</td>
                  <td>46 - 48</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">M</td>
                  <td>100 - 104</td>
                  <td>65.5</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">L</td>
                  <td>106 - 110</td>
                  <td>67</td>
                  <td>52</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">XL</td>
                  <td>112 - 116</td>
                  <td>68.5</td>
                  <td>54</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full mt-6 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-xl uppercase tracking-wider"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
