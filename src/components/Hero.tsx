import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  TrendingUp, BarChart3, Activity, Users, CheckCircle2, ArrowUpRight, Clock, Zap,
} from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section className="relative min-h-screen flex items-center section-gap pt-28 md:pt-34 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-50/60 via-white to-white" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={isVisible ? 'animate-fade-up' : 'opacity-0'}>
            <div className="section-label mb-5">
              <Zap className="w-3.5 h-3.5" />
              {t.hero.badge}
            </div>
            <h1 className="text-display-sm sm:text-display font-bold text-gray-900 mb-6 text-balance">
              {t.hero.headline}
            </h1>
            <p className="text-body-lg text-gray-600 max-w-xl mb-8 leading-relaxed">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#roi-calculator" className="btn-primary text-body px-8 py-4">{t.hero.ctaRoi}</a>
              <a href="#whitepaper" className="btn-secondary text-body px-8 py-4">{t.hero.ctaWhitepaper}</a>
            </div>
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-gray-200/60">
              {[
                { value: t.hero.stat1Value, label: t.hero.stat1Label },
                { value: t.hero.stat2Value, label: t.hero.stat2Label },
                { value: t.hero.stat3Value, label: t.hero.stat3Label },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-accent-600">{stat.value}</div>
                  <div className="text-body-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-200/40 to-accent-100/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl shadow-soft-lg border border-gray-100/80 p-5 sm:p-6 space-y-4 animate-float">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse" />
                    <span className="text-caption font-semibold text-gray-500 uppercase tracking-wider">Dashboard</span>
                  </div>
                  <span className="text-caption font-medium text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-gradient-to-br from-accent-50 to-accent-50/50 rounded-xl p-3 text-center">
                    <TrendingUp className="w-4 h-4 text-accent-500 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">+24%</div>
                    <div className="text-[0.65rem] text-gray-500 font-medium">Effizienz</div>
                  </div>
                  <div className="bg-gradient-to-br from-success-50 to-success-50/50 rounded-xl p-3 text-center">
                    <BarChart3 className="w-4 h-4 text-success-500 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">€182k</div>
                    <div className="text-[0.65rem] text-gray-500 font-medium">ROI</div>
                  </div>
                  <div className="bg-gradient-to-br from-warning-50 to-warning-50/50 rounded-xl p-3 text-center">
                    <Activity className="w-4 h-4 text-warning-500 mx-auto mb-1" />
                    <div className="text-xl font-bold text-gray-900">94%</div>
                    <div className="text-[0.65rem] text-gray-500 font-medium">KPIs</div>
                  </div>
                </div>
                <div className="bg-gray-50/80 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-body-sm font-medium text-gray-700">Performance</span>
                    <span className="text-body-sm text-accent-600 font-semibold flex items-center gap-0.5">
                      +18% <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Revenue', value: 85, color: 'bg-accent-500' },
                      { label: 'Efficiency', value: 72, color: 'bg-success-500' },
                      { label: 'Retention', value: 91, color: 'bg-accent-400' },
                      { label: 'NPS', value: 58, color: 'bg-warning-500' },
                    ].map((bar, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[0.7rem] text-gray-500 w-16 text-right shrink-0">{bar.label}</span>
                        <div className="flex-1 h-2 bg-gray-200/80 rounded-full overflow-hidden">
                          <div className={`h-full ${bar.color} rounded-full`} style={{ width: isVisible ? `${bar.value}%` : '0%', transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)', transitionDelay: `${300 + i * 150}ms` }} />
                        </div>
                        <span className="text-[0.7rem] text-gray-400 w-8">{bar.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-accent-50/70 rounded-xl p-3.5">
                    <Users className="w-4 h-4 text-accent-600 mb-1.5" />
                    <div className="text-body-sm font-semibold text-gray-900">Pipeline</div>
                    <div className="text-[0.7rem] text-gray-500 mt-0.5">12 Projekte aktiv</div>
                  </div>
                  <div className="bg-success-50/70 rounded-xl p-3.5">
                    <CheckCircle2 className="w-4 h-4 text-success-600 mb-1.5" />
                    <div className="text-body-sm font-semibold text-gray-900">Aktivitäten</div>
                    <div className="text-[0.7rem] text-gray-500 mt-0.5">48 diese Woche</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-accent-50 to-white rounded-xl p-3 border border-accent-100/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent-500" />
                    <span className="text-body-sm text-gray-600">Amortisation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-body-sm font-bold text-accent-600">4.2 Monate</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}