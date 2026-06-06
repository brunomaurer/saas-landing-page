import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CheckCircle2, FileBarChart } from 'lucide-react';

export default function ROILeadCapture() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', position: '', email: '', phone: '', privacy: false });
  const set = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <section id="roi-lead" className="section-gap bg-accent-50/50">
        <div className="container-wide text-center max-w-lg">
          <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-5" />
          <p className="text-heading-sm font-semibold text-gray-900">{t.roiLead.success}</p>
        </div>
      </section>
    );
  }

  const fields = [
    { key: 'firstName', label: t.roiLead.firstName, type: 'text' },
    { key: 'lastName', label: t.roiLead.lastName, type: 'text' },
    { key: 'company', label: t.roiLead.company, type: 'text' },
    { key: 'position', label: t.roiLead.position, type: 'text' },
    { key: 'email', label: t.roiLead.email, type: 'email' },
    { key: 'phone', label: t.roiLead.phone, type: 'tel' },
  ];

  return (
    <section id="roi-lead" className="section-gap bg-accent-50/50">
      <div className="container-wide">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4"><FileBarChart className="w-6 h-6" /></div>
            <h2 className="text-heading-sm font-bold text-gray-900 mb-2">{t.roiLead.headline}</h2>
            <p className="text-body text-gray-500">{t.roiLead.subheadline}</p>
          </div>
          <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="input-label">{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form] as string} onChange={(e) => set(f.key, e.target.value)} className="input-field" required />
                </div>
              ))}
            </div>
            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input type="checkbox" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-accent-500 focus:ring-accent-500" required />
              <span className="text-body-sm text-gray-500 leading-relaxed">{t.roiLead.privacy}</span>
            </label>
            <button type="submit" className="btn-primary w-full py-4">{t.roiLead.cta}</button>
          </form>
        </div>
      </div>
    </section>
  );
}