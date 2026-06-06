import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FileStack, Eye, Database, Gauge, Target, TrendingDown, ArrowRight, AlertCircle } from 'lucide-react';

const icons = [FileStack, Eye, Database, Gauge, Target, TrendingDown];

export default function ProblemProfiling() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section ref={ref} id="benefits" className="section-gap bg-gray-50/50">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`section-label justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <AlertCircle className="w-3.5 h-3.5" />
            {t.problem.headline}
          </div>
          <h2 className={`text-heading-sm sm:text-heading lg:text-display-sm font-bold text-gray-900 mb-3 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {t.problem.headline}
          </h2>
          <p className={`text-body-lg text-gray-500 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {t.problem.subheadline}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {t.problem.options.map((option, i) => {
            const Icon = icons[i];
            const isSelected = selected === option.id;
            return (
              <button key={option.id} onClick={() => setSelected(option.id)} className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? 'border-accent-400 bg-accent-50/70 shadow-accent scale-[1.02]' : 'border-gray-100 bg-white hover:border-accent-200 hover:shadow-soft'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 60 + 300}ms`, transitionProperty: 'opacity, transform, border-color, background-color, box-shadow' }}>
                <Icon className={`w-5 h-5 mb-3 transition-colors duration-200 ${isSelected ? 'text-accent-600' : 'text-gray-300 group-hover:text-accent-400'}`} />
                <h3 className="font-semibold text-gray-900 mb-1 text-body">{option.title}</h3>
                <p className="text-body-sm text-gray-500 leading-relaxed">{option.desc}</p>
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="text-center mt-8 animate-fade-up">
            <a href="#roi-calculator" className="btn-primary text-body px-8 py-4">
              {t.problem.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}