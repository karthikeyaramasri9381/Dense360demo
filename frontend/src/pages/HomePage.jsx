import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import Concept360Section from '../sections/Concept360Section';
import WhyMattersSection from '../sections/WhyMattersSection';
import WhatIsDenseSection from '../sections/WhatIsDenseSection';
import OfferingsSection from '../sections/OfferingsSection';
import JourneySection from '../sections/JourneySection';
import SchoolsBenefitsSection from '../sections/SchoolsBenefitsSection';
import PartnershipWorksSection from '../sections/PartnershipWorksSection';
import PartnershipInvitationSection from '../sections/PartnershipInvitationSection';
import FinalCTASection from '../sections/FinalCTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA]">
      <Navbar />
      <main>
        <HeroSection />
        <Concept360Section />
        <WhyMattersSection />
        <WhatIsDenseSection />
        <OfferingsSection />
        <JourneySection />
        <SchoolsBenefitsSection />
        <PartnershipWorksSection />
        <PartnershipInvitationSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
