import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LogoWall from './components/LogoWall';
import ProblemProfiling from './components/ProblemProfiling';
import Benefits from './components/Benefits';
import PlatformFeatures from './components/PlatformFeatures';
import ROICalculator from './components/ROICalculator';
import ROILeadCapture from './components/ROILeadCapture';
import Whitepaper from './components/Whitepaper';
import Demo from './components/Demo';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <LogoWall />
          <ProblemProfiling />
          <Benefits />
          <PlatformFeatures />
          <ROICalculator />
          <ROILeadCapture />
          <Whitepaper />
          <Demo />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}