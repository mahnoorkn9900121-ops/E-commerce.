import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast(
      'Welcome to the Valoir Circle',
      'You are now registered for private archive access and seasonal previews.',
      'success'
    );
    setEmail('');
  };

  return (
    <footer className="bg-[#181615] text-stone-300 border-t border-stone-800">
      {/* Brand Value Pillars */}
      <div className="border-b border-stone-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-xl text-amber-200 border border-stone-800 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">
                Global Express
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Complimentary 2–4 day insured courier delivery worldwide on orders over $250.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-xl text-amber-200 border border-stone-800 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">
                30-Day Courtesy Return
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Complimentary doorstep pickup and full refund guarantee on all catalog pieces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-xl text-amber-200 border border-stone-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">
                Artisan Provenance
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct partnership with European & Japanese multi-generational family ateliers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-xl text-amber-200 border border-stone-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">
                Lifetime Restoration
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Dedicated repair pathways for horology overhauls, leather re-waxing, and drivers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Newsletter / Brand statement */}
          <div className="lg:col-span-5">
            <span className="font-brand text-2xl tracking-[0.25em] text-stone-100 font-bold">
              VALOIR
            </span>
            <p className="text-[10px] tracking-[0.3em] text-amber-200/80 uppercase mt-0.5 font-sans">
              Atelier & Design Maison
            </p>

            <p className="text-xs text-stone-400 mt-4 leading-relaxed max-w-sm">
              Dedicated to slow luxury, enduring materials, and quiet aesthetic discipline. We curate
              architectural apparel, Swiss mechanical horology, and Scandinavian acoustic objects.
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                Join the Valoir Circle
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Receive private archive invitations and curated design essays.
              </p>

              {subscribed ? (
                <div className="mt-3 p-3 bg-stone-900 border border-stone-800 rounded-xl text-xs text-amber-200">
                  ✓ Thank you. You are enrolled in the Valoir seasonal dispatch.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 rounded-xl text-xs focus:outline-none focus:border-stone-600 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-100 text-stone-900 hover:bg-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* The Collections */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-100 mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => navigate('shop', { department: 'apparel' })}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Apparel & Tailoring
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('shop', { department: 'leather' })}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Leather & Horology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('shop', { department: 'audio' })}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Acoustics & Technology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('shop', { department: 'living' })}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Living & Botanical Scents
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('shop')}
                    className="hover:text-stone-100 transition-colors text-amber-200/90"
                  >
                    View All 12 Creations →
                  </button>
                </li>
              </ul>
            </div>

            {/* Client Concierge */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-100 mb-4">
                Client Concierge
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => navigate('faq')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Global Shipping & Tax
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('faq')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('account')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Track Demo Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('contact')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    VIP Atelier Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('about')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Material Sourcing Ethos
                  </button>
                </li>
              </ul>
            </div>

            {/* The Maison & Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-100 mb-4">
                The Maison
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => navigate('about')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Our History & Ateliers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('contact')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Flagship Showrooms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('privacy')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('terms')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('faq')}
                    className="hover:text-stone-100 transition-colors"
                  >
                    Authenticity Guarantee
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Line */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-6">
            <span className="text-stone-400 font-medium">Connect with Maison:</span>
            <div className="flex items-center gap-4 text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors p-1"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors p-1"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors p-1"
                aria-label="YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200 transition-colors p-1"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p>© {new Date().getFullYear()} VALOIR Atelier & Design Inc. All rights reserved.</p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Client cart, wishlist, and demo orders are safely preserved in browser LocalStorage.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
