import { useLanguage } from '../i18n/LanguageContext';
import { Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const platformLinks = [{ label: t.footer.navDashboard, href: '#platform' }, { label: t.footer.navReporting, href: '#platform' }, { label: t.footer.navIntegrationen, href: '#platform' }, { label: t.footer.navAnalytics, href: '#platform' }];
  const resourceLinks = [{ label: t.footer.navWhitepaper, href: '#whitepaper' }, { label: t.footer.navROIRechner, href: '#roi-calculator' }, { label: t.footer.navDemo, href: '#demo' }];
  const companyLinks = [{ label: t.footer.navAbout, href: '#' }, { label: t.footer.navCareers, href: '#' }, { label: t.footer.contact, href: '#demo' }];
  const legalLinks = [{ label: t.footer.privacy, href: '#' }, { label: t.footer.imprint, href: '#' }];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center"><span className="text-white font-bold text-sm">SP</span></div>
              <span className="font-semibold text-white text-[1.1rem]">SaaS Platform</span>
            </div>
            <p className="text-body-sm text-gray-500 leading-relaxed mb-6 max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent-500/20 hover:text-accent-400 flex items-center justify-center transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent-500/20 hover:text-accent-400 flex items-center justify-center transition-colors" aria-label="Email"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div><h4 className="text-body-sm font-semibold text-white mb-4">{t.footer.platform}</h4><ul className="space-y-2.5">{platformLinks.map((link) => (<li key={link.label}><a href={link.href} className="text-body-sm text-gray-500 hover:text-accent-400 transition-colors">{link.label}</a></li>))}</ul></div>
          <div><h4 className="text-body-sm font-semibold text-white mb-4">{t.footer.resources}</h4><ul className="space-y-2.5">{resourceLinks.map((link) => (<li key={link.label}><a href={link.href} className="text-body-sm text-gray-500 hover:text-accent-400 transition-colors">{link.label}</a></li>))}</ul></div>
          <div><h4 className="text-body-sm font-semibold text-white mb-4">{t.footer.company}</h4><ul className="space-y-2.5">{companyLinks.map((link) => (<li key={link.label}><a href={link.href} className="text-body-sm text-gray-500 hover:text-accent-400 transition-colors">{link.label}</a></li>))}</ul></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
          <p className="text-caption text-gray-600">{t.footer.copyright}</p>
          <div className="flex items-center gap-6">{legalLinks.map((link) => (<a key={link.label} href={link.href} className="text-caption text-gray-600 hover:text-accent-400 transition-colors">{link.label}</a>))}</div>
        </div>
      </div>
    </footer>
  );
}