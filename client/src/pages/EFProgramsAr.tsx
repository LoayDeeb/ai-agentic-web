import React from 'react';
import { NavigationHeaderAr } from '../components/ef-ar/NavigationHeaderAr';
import { ProgramHeaderAr } from '../components/ef-ar/ProgramHeaderAr';
import { ProgramsGridAr } from '../components/ef-ar/ProgramsGridAr';

export default function EFProgramsAr() {
  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
      <NavigationHeaderAr />
      <ProgramHeaderAr
        title="الحوافز والمنح"
        breadcrumbs={[
          { label: 'صندوق البيئة', href: '/ef-ar' },
          { label: 'البرامج', href: '/ef-ar', active: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560"
      />
      <ProgramsGridAr />
    </div>
  );
}
