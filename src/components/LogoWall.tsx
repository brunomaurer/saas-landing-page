import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function LogoWall() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const logos = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section ref={ref} className="py-14 md:py-18 bg-white border-y border-gray-100/60">
      <div className="container-wide text-center">
        <p className={`text-body-sm text-gray-400 font-medium mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          {t.logoWall.headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
          {logos.map((i) => (
            <div key={i} className={`h-10 px-6 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 80 + 200}ms` }}>
              <span className="text-gray-300 text-body-sm font-semibold tracking-wide">Logo {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}