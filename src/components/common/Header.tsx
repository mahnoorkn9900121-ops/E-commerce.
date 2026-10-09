import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Currency } from '../../types';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    page,
    navigate,
    cartCount,
    setCartDrawerOpen,
    wishlist,
    currency,
    setCurrency,
    setSearchModalOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNav = (targetPage: string, targetParams: Record<string, string> = {}) => {
    navigate(targetPage, targetParams);
    setMobileMenuOpen(false);
  };

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-stone-200 text-xs tracking-wider uppercase py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          <div className="hidden sm:flex items-center gap-2 text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Atelier Direct · Dispatched from European Fulfillment in 24h</span>
          </div>

          <div className="mx-auto sm:mx-0 text-center font-medium text-stone-200">
            Complimentary Worldwide Express on Orders over $250
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-400">
            <button
              onClick={() => handleNav('faq')}
              className="hover:text-stone-100 transition-colors"
            >
              Concierge Care
            </button>
            <span className="text-stone-700">|</span>
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-stone-100 transition-colors cursor-pointer"
                aria-label="Select currency"
              >
                <Globe className="w-3 h-3 text-stone-400" />
                <span className="font-semibold text-stone-200">{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-stone-900 border border-stone-800 rounded-lg shadow-2xl py-1 z-50 w-28">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        currency === c
                          ? 'bg-stone-800 text-amber-200 font-semibold'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                      }`}
                    >
                      <span>{c}</span>
                      {currency === c && <span className="text-amber-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-stone-800 hover:text-stone-950 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-stone-700">
              <button
                onClick={() => handleNav('shop')}
                className={`transition-colors hover:text-stone-950 py-1 border-b-2 ${
                  page === 'shop' && !window.location.hash.includes('department')
                    ? 'border-stone-900 text-stone-950 font-semibold'
                    : 'border-transparent'
                }`}
              >
                Collection
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'apparel' })}
                className="transition-colors hover:text-stone-950 py-1 border-b-2 border-transparent"
              >
                Apparel
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'leather' })}
                className="transition-colors hover:text-stone-950 py-1 border-b-2 border-transparent"
              >
                Horology & Leather
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'audio' })}
                className="transition-colors hover:text-stone-950 py-1 border-b-2 border-transparent"
              >
                Acoustics
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'living' })}
                className="transition-colors hover:text-stone-950 py-1 border-b-2 border-transparent"
              >
                Living
              </button>
              <button
                onClick={() => handleNav('about')}
                className={`transition-colors hover:text-stone-950 py-1 border-b-2 ${
                  page === 'about' ? 'border-stone-900 text-stone-950 font-semibold' : 'border-transparent'
                }`}
              >
                Maison
              </button>
            </nav>

            {/* Brand Logo */}
            <div className="flex flex-col items-center cursor-pointer text-center select-none" onClick={() => handleNav('home')}>
              <span className="font-brand text-2xl sm:text-3xl tracking-[0.25em] text-stone-900 font-bold">
                VALOIR
              </span>
              <span className="text-[9px] tracking-[0.35em] text-stone-500 uppercase -mt-0.5 font-sans">
                Atelier & Design
              </span>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 text-xs rounded-full hover:bg-stone-200/50"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-stone-500 text-[11px] uppercase tracking-wider font-medium">
                  Search
                </span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNav('wishlist')}
                className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative rounded-full hover:bg-stone-200/50"
                aria-label={`Wishlist with ${wishlist.length} saved items`}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-stone-900 text-stone-100 text-[9px] font-semibold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              <button
                onClick={() => handleNav('account')}
                className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/50"
                aria-label="Account and orders"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="p-2 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-all rounded-full flex items-center gap-2 pl-3 pr-3.5 shadow-sm active:scale-95"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-stone-950 text-[8px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                  Bag {cartCount > 0 && `(${cartCount})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF9F5] shadow-2xl flex flex-col z-50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <div>
                <span className="font-brand text-xl tracking-[0.2em] text-stone-900 font-bold">
                  VALOIR
                </span>
                <p className="text-[10px] tracking-widest text-stone-500 uppercase">
                  Atelier & Design
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-600 hover:text-stone-950"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-stone-200/70 rounded-xl text-stone-600 text-sm"
              >
                <Search className="w-4 h-4 text-stone-500" />
                <span>Search collection...</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 flex flex-col gap-1">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-2 px-2">
                Departments
              </p>
              <button
                onClick={() => handleNav('shop')}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Full Collection</span>
                <span className="text-xs text-stone-500">12 items</span>
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'apparel' })}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors"
              >
                Apparel & Tailoring
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'leather' })}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors"
              >
                Leather Goods & Horology
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'audio' })}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors"
              >
                Acoustic & Technology
              </button>
              <button
                onClick={() => handleNav('shop', { department: 'living' })}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors"
              >
                Living & Botanical Fragrance
              </button>

              <div className="my-4 border-t border-stone-200" />

              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-2 px-2">
                The Maison
              </p>
              <button
                onClick={() => handleNav('about')}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-200/50 rounded-lg"
              >
                Our Heritage & Ateliers
              </button>
              <button
                onClick={() => handleNav('account')}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-200/50 rounded-lg"
              >
                My Account & Order History
              </button>
              <button
                onClick={() => handleNav('wishlist')}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-200/50 rounded-lg flex items-center justify-between"
              >
                <span>Saved Wishlist</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-stone-200 rounded-full">
                  {wishlist.length}
                </span>
              </button>
              <button
                onClick={() => handleNav('faq')}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-200/50 rounded-lg"
              >
                FAQ & Global Shipping
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-200/50 rounded-lg"
              >
                VIP Concierge Contact
              </button>
            </div>

            {/* Mobile Currency Selector */}
            <div className="mt-auto pt-6 border-t border-stone-200">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-3">
                Select Currency
              </p>
              <div className="grid grid-cols-4 gap-2">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      currency === c
                        ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
