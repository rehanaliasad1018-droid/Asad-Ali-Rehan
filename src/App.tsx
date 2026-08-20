/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CustomizerProvider } from './context/CustomizerContext';
import { CustomCursor } from './components/CustomCursor';
import { Toast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { SelectedWork } from './components/SelectedWork';
import { DesignLabSection } from './components/DesignLabSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { DesignToolsSection } from './components/DesignToolsSection';
import { CreativeProcess } from './components/CreativeProcess';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ProfileCustomizerDrawer } from './components/ProfileCustomizerDrawer';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { GridOverlayHUD } from './components/GridOverlayHUD';

export default function App() {
  return (
    <CustomizerProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] relative selection:bg-[#FF4E00] selection:text-white">
        {/* Custom Trailing Interactive Cursor */}
        <CustomCursor />

        {/* Global Toast Notifications */}
        <Toast />

        {/* Sticky Minimal Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10">
          <Hero />
          <AboutSection />
          <SelectedWork />
          <DesignLabSection />
          <ExpertiseSection />
          <ExperienceTimeline />
          <DesignToolsSection />
          <CreativeProcess />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Editorial Footer */}
        <Footer />

        {/* Interactive Modals, Palettes, HUD & Drawers */}
        <GridOverlayHUD />
        <CaseStudyModal />
        <ProjectInquiryModal />
        <ProjectEstimatorModal />
        <ResumeModal />
        <CommandPalette />
        <ProfileCustomizerDrawer />
      </div>
    </CustomizerProvider>
  );
}
