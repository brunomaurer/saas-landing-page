import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calculator, TrendingUp, Clock, DollarSign, BarChart3, RotateCcw, ArrowRight } from 'lucide-react';

interface ROIResult {
  monthlySaving: number;
  annualBenefit: number;
  roi: number;
  paybackMonths: number;
  monthlyCost: number;
}

export default function ROICalculator() {
  const { t, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [employees, setEmployees] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursLost, setHoursLost] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [softwareCost, setSoftwareCost] = useState('');
  const [calculated, setCalculated] = useState(false);

  const result = useMemo<ROIResult | null>(() => {
    const emp = parseFloat(employees) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const lost = parseFloat(hoursLost) || 0;
    const eff = parseFloat(efficiency) || 0;
    const cost = parseFloat(softwareCost) || 0;
    if (!emp || !rate || !lost || !eff || !cost) return null;
    const weeklySavings = emp * lost * (eff / 100) * rate;
    const monthlySaving = weeklySavings * 4.33;
    const monthlyCost = cost;
    const annualBenefit = monthlySaving * 12;
    const annualCost = cost * 12;
    const roi = annualCost > 0 ? ((annualBenefit - annualCost) / annualCost) * 100 : 0;
    const paybackMonths = annualBenefit > 0 ? (annualCost / annualBenefit) * 12 : 0;
    return { monthlySaving, annualBenefit, roi, paybackMonths, monthlyCost };
  }, [employees, hourlyRate, hoursLost, efficiency, softwareCost]);

  const handleCalculate = () => { if (result) setCalculated(true); };
  const handleReset = () => { setEmployees(''); setHourlyRate(''); setHoursLost(''); setEfficiency(''); setSoftwareCost(''); setCalculated(false); };

  const fmt = (n: number) => new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  const fields = [
    { label: t.roiCalc.employees, value: employees, set: setEmployees, placeholder: '50' },
    { label: t.roiCalc.hourlyRate, value: hourlyRate, set: setHourlyRate, placeholder: '60' },
    { label: t.roiCalc.hoursLost, value: hoursLost, set: setHoursLost, placeholder: '3' },
    { label: t.roiCalc.efficiency, value: efficiency, set: setEfficiency, placeholder: '30' },
    { label: t.roiCalc.softwareCost, value: softwareCost, set: setSoftwareCost, placeholder: '2.000' },
  ];

  const barMax = result ? Math.max(result.monthlySaving, result.monthlyCost) : 1;

  return (
    <section ref={ref} id="roi-calculator" className="section-gap bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className={`text-heading-sm sm:text-heading lg:text-display-sm font-bold text-gray-900 mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.roiCalc.headline}</h2>
          <p className={`text-body-lg text-gray-500 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>{t.roiCalc.subheadline}</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="card-elevated p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center"><Calculator className="w-5 h-5" /></div>
              <div><h3 className="text-heading-sm font-bold text-gray-900">{t.roiCalc.headline}</h3></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3 mb-6">
              {fields.map((field, i) => (
                <div key={i}>
                  <label className="input-label">{field.label}</label>
                  <input type="number" value={field.value} onChange={(e) => field.set(e.target.value)} placeholder={field.placeholder} className="input-field" min="0" step="any" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleCalculate} disabled={!result} className="btn-primary flex-1 sm:flex-none">{t.roiCalc.calculate}</button>
              {calculated && (<button onClick={handleReset} className="btn-ghost gap-1.5"><RotateCcw className="w-4 h-4" />{t.roiCalc.reset}</button>)}
            </div>
            {calculated && result && (
              <div className="mt-8 animate-fade-up">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <div className="kpi-card bg-gradient-to-br from-accent-50 to-accent-50/30 border border-accent-100/50"><DollarSign className="w-5 h-5 text-accent-500 mb-2" /><div className="text-2xl sm:text-3xl font-bold text-gray-900">{fmt(result.monthlySaving)}</div><div className="text-caption text-gray-500 mt-1 font-medium">{t.roiCalc.results.monthlySaving}</div></div>
                  <div className="kpi-card bg-gradient-to-br from-success-50 to-success-50/30 border border-success-100/50"><TrendingUp className="w-5 h-5 text-success-500 mb-2" /><div className="text-2xl sm:text-3xl font-bold text-gray-900">{fmt(result.annualBenefit)}</div><div className="text-caption text-gray-500 mt-1 font-medium">{t.roiCalc.results.annualBenefit}</div></div>
                  <div className="kpi-card bg-gradient-to-br from-warning-50 to-warning-50/30 border border-warning-100/50"><BarChart3 className="w-5 h-5 text-warning-500 mb-2" /><div className="text-2xl sm:text-3xl font-bold text-gray-900">{Math.round(result.roi)}%</div><div className="text-caption text-gray-500 mt-1 font-medium">{t.roiCalc.results.roi}</div></div>
                  <div className="kpi-card bg-gradient-to-br from-blue-50 to-blue-50/30 border border-blue-100/50"><Clock className="w-5 h-5 text-blue-500 mb-2" /><div className="text-2xl sm:text-3xl font-bold text-gray-900">{result.paybackMonths.toFixed(1)}</div><div className="text-caption text-gray-500 mt-1 font-medium">{t.roiCalc.results.months} ({t.roiCalc.results.payback})</div></div>
                </div>
                <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100/50">
                  <h4 className="text-body-sm font-semibold text-gray-700 mb-5">{t.roiCalc.results.summary}</h4>
                  <div className="space-y-4">
                    <div><div className="flex justify-between text-body-sm mb-1.5"><span className="text-gray-600 font-medium">{t.roiCalc.results.savingsLabel}</span><span className="font-semibold text-gray-900">{fmt(result.monthlySaving)}/mo</span></div><div className="h-8 bg-gray-200/70 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((result.monthlySaving / barMax) * 100, 100)}%` }} /></div></div>
                    <div><div className="flex justify-between text-body-sm mb-1.5"><span className="text-gray-600 font-medium">{t.roiCalc.results.costLabel}</span><span className="font-semibold text-gray-900">{fmt(result.monthlyCost)}/mo</span></div><div className="h-8 bg-gray-200/70 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((result.monthlyCost / barMax) * 100, 100)}%` }} /></div></div>
                    <div className="pt-3 border-t border-gray-200/60"><div className="flex justify-between text-body-sm mb-1.5"><span className="text-gray-600 font-medium">{t.roiCalc.results.netLabel}</span><span className="font-bold text-success-600">{fmt(result.monthlySaving - result.monthlyCost)}/mo</span></div><div className="h-8 bg-gray-200/70 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(((result.monthlySaving - result.monthlyCost) / barMax) * 100, 100)}%` }} /></div></div>
                  </div>
                </div>
                <div className="mt-6 text-center"><a href="#roi-lead" className="btn-primary text-body px-8 py-4">{t.roiLead.cta}<ArrowRight className="w-4 h-4" /></a></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}