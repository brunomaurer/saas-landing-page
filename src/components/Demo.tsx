import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Presentation, CheckCircle2 } from 'lucide-react';

export default function Demo() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', challenge: '', message: '', privacy: false });
  const set = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section ref={ref} id="demo" className="section-gap bg-gray-50/50">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className={`md:col-span-2 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-5"><Presentation className="w-6 h-6" /></div>
            <h2 className="text-heading-sm sm:text-heading font-bold text-gray-900 mb-3 text-balance">{t.demo.headline}</h2>
            <p className="text-body-lg text-gray-500">{t.demo.subheadline}</p>
          </div>
          <div className="md:col-span-3">
            {submitted ? (
              <div className="card-elevated p-6 md:p-8 text-center animate-scale-in">
                <CheckCircle2 className="w-14 h-14 text-accent-500 mx-auto mb-4" />
                <p className="text-body-lg font-semibold text-gray-900">{t.demo.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`card-elevated p-6 md:p-8 space-y-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="input-label">{t.demo.name}</label><input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="input-field" required /></div>
                  <div><label className="input-label">{t.demo.company}</label><input type="text" value={form.company} onChange={(e) => set('company', e.target.value)} className="input-field" required /></div>
                </div>
                <div><label className="input-label">{t.demo.email}</label><input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="input-field" required /></div>
                <div><label className="input-label">{t.demo.challenge}</label><select value={form.challenge} onChange={(e) => set('challenge', e.target.value)} className="input-field" required><option value="">—</option>{t.problem.options.map((opt) => (<option key={opt.id} value={opt.id}>{opt.title}</option>))}</select></div>
                <div><label className="input-label">{t.demo.message}</label><textarea value={form.message} onChange={(e) => set('message', e.target.value)} className="input-field min-h-[80px] resize-y" rows={3} /></div>
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input type="checkbox" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-accent-500 focus:ring-accent-500" required />
                  <span className="text-body-sm text-gray-500 leading-relaxed">{t.demo.privacy}</span>
                </label>
                <button type="submit" className="btn-primary w-full py-4">{t.demo.cta}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}