import React, { useState } from 'react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex border-b border-stone-200 gap-8 mb-8">
        <button
          onClick={() => setTab('privacy')}
          className={`pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            tab === 'privacy'
              ? 'border-stone-900 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          Privacy Policy & Data Security
        </button>

        <button
          onClick={() => setTab('terms')}
          className={`pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
            tab === 'terms'
              ? 'border-stone-900 text-stone-950 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-800'
          }`}
        >
          Terms of Service & Atelier Conditions
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-stone-700">
        {tab === 'privacy' ? (
          <div className="space-y-6">
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Privacy Policy & Client Data Protection
            </h1>
            <p className="text-xs text-stone-500">Last updated: October 2026</p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              1. LocalStorage Architecture & Client-Side Privacy
            </h3>
            <p>
              VALOIR respects your sovereignty over your personal computing environment. Cart contents,
              wishlist items, and simulated demo order records are stored strictly within your browser&apos;s
              local memory (LocalStorage). No sensitive financial numbers, passwords, or personal
              identifiers are transmitted to third-party ad networks.
            </p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              2. Newsletter Enrollment
            </h3>
            <p>
              When subscribing to the Valoir Circle newsletter, your email address is utilized solely
              for sending seasonal lookbooks, archive collection announcements, and private salon
              invitations. You may revoke consent at any moment.
            </p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              3. Telemetry & Analytics Ban
            </h3>
            <p>
              In adherence to our quiet luxury aesthetic constitution, our application operates
              free of invasive third-party tracking pixels, biometric scraping, or commercial data resale.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Terms of Service & Atelier Sale Conditions
            </h1>
            <p className="text-xs text-stone-500">Last updated: October 2026</p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              1. Craftsmanship & Authenticity Guarantees
            </h3>
            <p>
              All Valoir creations are guaranteed to be authentic products handcrafted in verified
              European and Japanese ateliers. Minor variations in stone veining, leather grain, or hand-spun
              silk slub textures are hallmarks of authentic artisanal production.
            </p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              2. 30-Day Courtesy Return Right
            </h3>
            <p>
              Collectors may return unworn items in pristine original condition with packaging intact
              within thirty (30) days of receipt. Complimentary doorstep courier pickup is provided.
            </p>

            <h3 className="font-serif text-base font-bold text-stone-900 mt-6">
              3. Simulated Payment Demonstration Notice
            </h3>
            <p>
              This web platform represents a live demonstration build. In sandbox mode, orders processed
              simulate official transactions and do not debit genuine commercial payment instruments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
