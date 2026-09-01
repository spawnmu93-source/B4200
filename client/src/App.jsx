import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import Solutions from './components/Solutions';
import BackingObema from './components/BackingObema';
import Partners from './components/Partners';
import CampConfigurator from './components/CampConfigurator';
import ContactFooter from './components/ContactFooter';
import AdminDashboard from './pages/AdminDashboard';
import './i18n';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#141619] font-sans antialiased selection:bg-[#F3A801] selection:text-[#141619]">
      {/* Fixed Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      <main>
        {/* 1. IMPACTO - Hero Section */}
        <Hero />

        {/* 2. QUÉ RESOLVEMOS - Presentation Section (White) */}
        <Presentation />

        {/* 3. SOLUCIONES - Solutions Section (Graphite #202328) */}
        <Solutions />

        {/* 4. RESPALDO - OBEMA Endorsement Section (White) */}
        <BackingObema />

        {/* 5. ALIADOS - Partners & Supplier Intake Section (Light Gray #F4F5F7) */}
        <Partners />

        {/* 6. CONFIGURÁ TU CAMPAMENTO - Conversion Form (Technical Black #141619) */}
        <CampConfigurator />
      </main>

      {/* 7. CONTACTO & FOOTER */}
      <ContactFooter onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Backoffice Modal */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
