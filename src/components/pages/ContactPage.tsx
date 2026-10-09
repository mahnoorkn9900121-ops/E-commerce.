import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiries & Materials');
  const [orderRef, setOrderRef] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Form Incomplete', 'Please fill in your name, email, and message.', 'warning');
      return;
    }

    setIsSent(true);
    showToast(
      'Inquiry Dispatched',
      'Your message has been assigned to a senior Valoir atelier concierge. We respond within 4 hours.',
      'success'
    );
    setName('');
    setEmail('');
    setOrderRef('');
    setMessage('');
  };

  const showrooms = [
    {
      city: 'Paris Flagship',
      address: '18 Place Vendôme, 75001 Paris, France',
      hours: 'Mon – Sat: 10:00 – 19:00 CET',
      phone: '+33 1 42 68 00 20'
    },
    {
      city: 'New York Salon',
      address: '740 Madison Avenue, New York, NY 10065',
      hours: 'Mon – Sat: 10:00 – 18:30 EST',
      phone: '+1 (212) 555-0198'
    },
    {
      city: 'Tokyo Residence',
      address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061',
      hours: 'Daily: 11:00 – 20:00 JST',
      phone: '+81 3 5555 8920'
    },
    {
      city: 'Milano Atelier',
      address: 'Via Montenapoleone 8, 20121 Milano, Italy',
      hours: 'Mon – Sat: 10:00 – 19:00 CET',
      phone: '+39 02 8990 4110'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
          Client Care & Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
          Contact The Maison
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          Whether you seek private consultation regarding a mechanical chronograph, customized
          tailoring measurements, or order assistance, our senior advisors are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">
            Dispatch An Inquiry
          </h2>

          {isSent ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
              <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Inquiry Received
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Thank you for contacting Valoir. A client advisor will review your message and reply
                shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-6 px-6 py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded-xl uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Vane"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@residence.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Subject / Department
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="Product Inquiries & Materials">Product Inquiries & Materials</option>
                    <option value="Order & Global Courier Support">Order & Global Courier Support</option>
                    <option value="Horology & Mechanical Overhaul">Horology & Mechanical Overhaul</option>
                    <option value="Custom Sizing & Tailoring">Custom Sizing & Tailoring</option>
                    <option value="Press & Archival Acquisition">Press & Archival Acquisition</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Order Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderRef}
                    onChange={(e) => setOrderRef(e.target.value)}
                    placeholder="e.g. VAL-78219"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How may our advisors assist your inquiry?"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Dispatch Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Showrooms & Direct Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-100/80 p-6 rounded-3xl border border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">
              Direct Concierge Lines
            </h3>
            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-stone-900" />
                <span>Global Concierge: +1 (800) 555-VALOIR</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-stone-900" />
                <span>Email: concierge@valoir-atelier.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-stone-900" />
                <span>Response Time: Under 4 hours, 7 days a week</span>
              </div>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 mt-6 mb-4">
            Showroom Salons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {showrooms.map((room) => (
              <div
                key={room.city}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs"
              >
                <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  <span>{room.city}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">{room.address}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{room.hours}</p>
                <p className="text-xs font-semibold text-stone-800 mt-2">{room.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
