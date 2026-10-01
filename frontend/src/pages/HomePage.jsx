import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import WhatIsDenseSection from '../sections/WhatIsDenseSection';
import CoreIdeaSection from '../sections/CoreIdeaSection';
import StudentBenefitsSection from '../sections/StudentBenefitsSection';
import StreamsSection from '../sections/StreamsSection';
import StallExperienceSection from '../sections/StallExperienceSection';
import SessionsSection from '../sections/SessionsSection';
import TimelineSection from '../sections/TimelineSection';
import WhyParentsSection from '../sections/WhyParentsSection';
import WhyCollegesSection from '../sections/WhyCollegesSection';
import CollegeValueSection from '../sections/CollegeValueSection';
import WhatCollegesPresentSection from '../sections/WhatCollegesPresentSection';
import DenseConnectionSection from '../sections/DenseConnectionSection';
import WhyExistsSection from '../sections/WhyExistsSection';
import PositioningSection from '../sections/PositioningSection';
import ExperienceStagesSection from '../sections/ExperienceStagesSection';
import WhoShouldAttendSection from '../sections/WhoShouldAttendSection';
import EventDetailsSection from '../sections/EventDetailsSection';
import FinalCTASection from '../sections/FinalCTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#0B2344]">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatIsDenseSection />
        <CoreIdeaSection />
        <StudentBenefitsSection />
        <StreamsSection />
        <StallExperienceSection />
        <SessionsSection />
        <TimelineSection />
        <WhyParentsSection />
        <WhyCollegesSection />
        <CollegeValueSection />
        <WhatCollegesPresentSection />
        <DenseConnectionSection />
        <WhyExistsSection />
        <PositioningSection />
        <ExperienceStagesSection />
        <WhoShouldAttendSection />
        <EventDetailsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
