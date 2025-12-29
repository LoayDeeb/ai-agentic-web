import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderMenuNav } from '../components/jico/HeaderMenuNav';
import { LogoLink } from '../components/jico/LogoLink';
import { PersonalInsuranceMenu } from '../components/jico/PersonalInsuranceMenu';
import { Heart, Car, Plane, Home } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

const ServiceCard = ({ title, description, icon, onClick }: ServiceCardProps) => (
  <div
    onClick={onClick}
    className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#CD9E51]/30"
  >
    <div className="w-14 h-14 rounded-full bg-[#CD9E51]/10 flex items-center justify-center mb-4 group-hover:bg-[#CD9E51]/20 transition-colors">
      <div className="text-[#CD9E51]">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-[#111111] mb-2 group-hover:text-[#CD9E51] transition-colors">
      {title}
    </h3>
    <p className="text-[#666666] text-sm leading-relaxed">{description}</p>
  </div>
);

export default function JicoServices() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'التأمين الطبي',
      description: 'حلول تأمين طبي شاملة لك ولعائلتك مع تغطية واسعة للخدمات الصحية',
      icon: <Heart size={28} />,
      href: '/jico/medical'
    },
    {
      title: 'تأمين السيارات',
      description: 'حماية شاملة لسيارتك ضد الحوادث والسرقة والأضرار',
      icon: <Car size={28} />,
      href: '#'
    },
    {
      title: 'تأمين السفر',
      description: 'سافر بأمان مع تغطية شاملة للطوارئ الطبية والحوادث',
      icon: <Plane size={28} />,
      href: '#'
    },
    {
      title: 'تأمين المنزل',
      description: 'حماية منزلك وممتلكاتك ضد الحريق والسرقة والكوارث الطبيعية',
      icon: <Home size={28} />,
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IBM_Plex_Sans_Arabic, sans-serif' }} dir="rtl">
      {/* Top Navigation Bar */}
      <div className="w-full bg-transparent">
        <HeaderMenuNav />
      </div>

      {/* Header with Logo */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <LogoLink href="/jico" />
          <div className="flex items-center gap-4">
            <PersonalInsuranceMenu />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#111111] mb-4">
            التأمين الشخصي
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            نقدم لك مجموعة شاملة من خدمات التأمين الشخصي لحماية ما يهمك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
              onClick={() => navigate(service.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

