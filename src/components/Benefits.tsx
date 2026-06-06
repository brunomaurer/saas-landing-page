import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Eye, Zap, TrendingUp, ChevronRight } from 'lucide-react';

export default function Benefits() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<keyof typeof t.benefits.targetGroups.roles>('leadership');

  const cards = [
    { icon: Eye, title: t.benefits.transparency.title, desc: t.benefits.transparency.desc, impact: t.benefits.transparency.impact, iconBg: 'bg-blue-100 text-blue-600', accentBg: 'bg-blue-50', accentText: 'text-blue-700' },
    { icon: Zap, title: t.benefits.speed.title, desc: t.benefits.speed.desc, impact: t.benefits.speed.impact, iconBg: 'bg-amber-100 text-amber-600', accentBg: 'bg-amber-50', accentText: 'text-amber-700' },
    { icon: TrendingUp, title: t.benefits.roi.title, desc: t.benefits.roi.desc, impact: t.benefits.roi.impact, iconBg: 'bg-green-100 text-green-600', accentBg: 'bg-green-50', accentText: 'text-green-700' },
  ];

  const roleKeys = Object.keys(t.benefits.targetGroups.tabs) as (keyof typeof t.benefits.targetGroups.roles)[];
  const roleLabels = t.benefits.targetGroups.tabs;

  return (
    <section ref={ref} className="section-gap bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className={`text-heading-sm sm:text-heading lg:text-display-sm font-bold text-gray-900 mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.benefits.headline}</h2>
          <p className={`text-body-lg text-gray-500 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.benefits.subheadline}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`card-elevated p-6 group hover:shadow-soft-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 100 + 200}ms` }}>
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}><Icon className="w-6 h-6" /></div>
                <h3 className="text-heading-sm font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-body text-gray-600 mb-5">{card.desc}</p>
                <div className={`${card.accentBg} rounded-xl px-4 py-3`}><p className={`text-body-sm font-semibold ${card.accentText}`}>{card.impact}</p></div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {roleKeys.map((key) => (
              <button key={key} onClick={() => setActiveTab(key)} className={`px-5 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-200 ${activeTab === key ? 'bg-accent-500 text-white shadow-accent' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-150 hover:border-gray-200'}`}>
                {roleLabels[key]}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            {roleKeys.map((key) => {
              const role = t.benefits.targetGroups.roles[key];
              if (activeTab !== key) return null;
              const labels = { challenge: t.problem.headline.includes('Welche') ? 'Herausforderung' : 'Challenge', benefit: t.problem.headline.includes('Welche') ? 'Nutzen' : 'Benefit', result: t.problem.headline.includes('Welche') ? 'Ergebnis' : 'Result' };
              return (
                <div key={key} className="card-elevated p-6 md:p-8 animate-scale-in">
                  <div className="grid gap-5">
                    <div className="flex gap-4"><div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-red-500 font-bold text-body-sm">!</span></div><div><span className="text-caption font-semibold uppercase tracking-wider text-red-500">{labels.challenge}</span><p className="text-body text-gray-700 mt-1">{role.challenge}</p></div></div>
                    <div className="flex gap-4"><div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center shrink-0 mt-0.5"><Zap className="w-4 h-4 text-accent-500" /></div><div><span className="text-caption font-semibold uppercase tracking-wider text-accent-600">{labels.benefit}</span><p className="text-body text-gray-700 mt-1">{role.benefit}</p></div></div>
                    <div className="flex gap-4"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5"><TrendingUp className="w-4 h-4 text-green-500" /></div><div><span className="text-caption font-semibold uppercase tracking-wider text-green-600">{labels.result}</span><p className="text-body text-gray-700 mt-1">{role.result}</p></div></div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-gray-100"><a href="#demo" className="inline-flex items-center gap-1.5 text-accent-600 font-semibold text-body-sm hover:text-accent-700 transition-colors group/link">{t.nav.cta}<ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" /></a></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}