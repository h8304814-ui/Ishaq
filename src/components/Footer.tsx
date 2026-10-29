import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Truck, ShieldCheck, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#141210] text-stone-300 border-t border-stone-800 pt-12 sm:pt-16 pb-24 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase">
              HS COLLECTION
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Pakistan's luxury fashion and handcrafted jewelry maison. Specializing in bespoke bridal couture, festive pret, pure unstitched lawn, Kundan jewelry, and handcrafted accessories.
            </p>
            
            <div className="pt-2 flex flex-col gap-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cash on Delivery across all 150+ Pakistani cities</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Worldwide Express Delivery via DHL (USA, UK, UAE, Canada)</span>
              </div>
            </div>
          </div>

          {/* Boutique Locations */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Boutiques & Ateliers
            </div>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <strong className="text-stone-200 block">Karachi Flagship</strong>
                <span>Zamzama Commercial, DHA Phase 5</span>
              </li>
              <li>
                <strong className="text-stone-200 block">Lahore Atelier</strong>
                <span>MM Alam Road, Gulberg III</span>
              </li>
              <li>
                <strong className="text-stone-200 block">Islamabad Boutique</strong>
                <span>Beverly Centre, Blue Area</span>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Concierge & Care
            </div>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-stone-200 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: +92 300 1234567</span>
                </a>
              </li>
              <li>
                <a href="tel:+9221111472655" className="hover:text-white transition-colors">
                  Helpline: (021) 111-HS-COL
                </a>
              </li>
              <li>
                <span className="block">Hours: Mon-Sat, 11am - 9pm PKT</span>
              </li>
              <li>
                <span className="block">Custom Stitching & Bridal Inquiries</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Festive Previews
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive private invitations to our seasonal lawn and bridal collection launches.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} HS Collection. All rights reserved. Designed for Pakistani couture excellence.
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>TCS Express</span>
            <span>·</span>
            <span>Meezan Bank</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
