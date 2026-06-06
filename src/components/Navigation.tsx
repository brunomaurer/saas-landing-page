import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navigation() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { label: t.nav.platform, href: '#platform' },
    { label: t.nav.benefits, href: '#benefits' },
    { label: t.nav.roiCalculator, href: '#roi-calculator' },
    { label: t.nav.whitepaper, href: '#whitepaper' },
    { label: t.nav.contact, href: '#demo' },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-gray-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-accent transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="font-semibold text-gray-900 text-[1.1rem] hidden sm:inline">
              SaaS Platform
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-body-sm font-medium text-gray-600 hover:text-accent-600 rounded-lg hover:bg-accent-50/60 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="btn-ghost text-body-sm gap-1.5"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{lang === 'de' ? 'EN' : 'DE'}</span>
            </button>

            <a href="#demo" className="btn-primary text-body-sm px-5 py-2.5 hidden lg:inline-flex">
              {t.nav.cta}
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container-wide py-6 space-y-1">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-body-lg font-medium text-gray-700 hover:text-accent-600 hover:bg-accent-50 rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 px-4">
            <a href="#demo" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}