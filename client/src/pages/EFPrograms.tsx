import React from 'react';
import { NavigationHeader } from '../components/ef/NavigationHeader';
import { ProgramHeader } from '../components/ef/ProgramHeader';
import { ProgramsGrid } from '../components/ef/ProgramsGrid';

export default function EFPrograms() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <NavigationHeader />
      <ProgramHeader
        title="Incentives & Grants"
        breadcrumbs={[
          { label: 'Environment Fund', href: '/ef' },
          { label: 'Programs', href: '/ef', active: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560"
      />
      <ProgramsGrid />
    </div>
  );
}
