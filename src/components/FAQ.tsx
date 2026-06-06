import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="section-gap bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`section-label justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}><HelpCircle className="w-3.5 h-3.5" />FAQ</div>
          <h2 className={`text-heading-sm sm:text-heading lg:text-display-sm font-bold text-gray-900 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.faq.headline}</h2>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-gray-100">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 60 + 200}ms` }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between py-5 text-left group" aria-expanded={isOpen}>
                  <span className={`text-body font-semibold pr-4 transition-colors ${isOpen ? 'text-accent-600' : 'text-gray-900 group-hover:text-accent-600'}`}>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-all duration-200 ${isOpen ? 'rotate-180 text-accent-500' : 'text-gray-400'}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden"><p className="text-body text-gray-600 leading-relaxed pr-10">{item.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}