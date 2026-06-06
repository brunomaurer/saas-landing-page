import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FileText, CheckCircle2, Download, CheckCircle } from 'lucide-react';

export default function Whitepaper() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', privacy: false });
  const set = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section ref={ref} id="whitepaper" className="section-gap bg-white">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className={`md:col-span-3 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-5"><FileText className="w-6 h-6" /></div>
            <h2 className="text-heading-sm sm:text-heading font-bold text-gray-900 mb-4 text-balance">{t.whitepaper.headline}</h2>
            <p className="text-body-lg text-gray-500 mb-6 leading-relaxed">{t.whitepaper.desc}</p>
            <div className="space-y-2.5">
              {[t.whitepaper.bullet1, t.whitepaper.bullet2, t.whitepaper.bullet3].map((bullet, i) => (
                <div key={i} className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-accent-500 shrink-0" /><span className="text-body-sm text-gray-700">{bullet}</span></div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            {submitted ? (
              <div className="card-elevated p-6 md:p-8 text-center animate-scale-in">
                <CheckCircle2 className="w-14 h-14 text-accent-500 mx-auto mb-4" />
                <p className="text-body-lg font-semibold text-gray-900 mb-4">{t.whitepaper.success}</p>
                <button className="btn-primary gap-2"><Download className="w-4 h-4" />{t.whitepaper.download}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`card-elevated p-6 md:p-8 space-y-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
                {[{ key: 'name', label: t.whitepaper.name, type: 'text' }, { key: 'company', label: t.whitepaper.company, type: 'text' }, { key: 'email', label: t.whitepaper.email, type: 'email' }].map((f) => (
                  <div key={f.key}><label className="input-label">{f.label}</label><input type={f.type} value={form[f.key as keyof typeof form] as string} onChange={(e) => set(f.key, e.target.value)} className="input-field" required /></div>
                ))}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input type="checkbox" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-accent-500 focus:ring-accent-500" required />
                  <span className="text-body-sm text-gray-500 leading-relaxed">{t.whitepaper.privacy}</span>
                </label>
                <button type="submit" className="btn-primary w-full py-3.5">{t.whitepaper.cta}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}