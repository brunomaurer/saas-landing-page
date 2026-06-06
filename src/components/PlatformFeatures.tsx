import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LayoutDashboard, FolderKanban, Workflow, FileBarChart, Plug, FileStack, UsersRound, LineChart } from 'lucide-react';

const icons = [LayoutDashboard, FolderKanban, Workflow, FileBarChart, Plug, FileStack, UsersRound, LineChart];

export default function PlatformFeatures() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} id="platform" className="section-gap bg-gray-50/50">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className={`text-heading-sm sm:text-heading lg:text-display-sm font-bold text-gray-900 mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.platform.headline}</h2>
          <p className={`text-body-lg text-gray-500 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.platform.subheadline}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.platform.modules.map((mod, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className={`group p-5 rounded-2xl bg-white border border-gray-100/80 hover:border-accent-200 hover:bg-accent-50/40 transition-all duration-300 hover:shadow-soft cursor-default ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 50 + 200}ms`, transitionProperty: 'opacity, transform, background-color, border-color, box-shadow' }}>
                <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-3.5 group-hover:bg-accent-100 transition-colors duration-200"><Icon className="w-5 h-5" /></div>
                <h3 className="text-body font-semibold text-gray-900 mb-1">{mod.title}</h3>
                <p className="text-body-sm text-gray-500 leading-relaxed">{mod.benefit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}