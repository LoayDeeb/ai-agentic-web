import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface Program {
  id: string;
  category: 'Grants' | 'Loan Guarantee' | 'Loan Support' | 'Awards';
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  applyLink: string;
}

const CATEGORIES = ['All', 'Grants', 'Loan Guarantee', 'Loan Support', 'Awards'] as const;

export const PROGRAMS_DATA: Program[] = [
  {
    id: '1',
    category: 'Grants',
    title: 'Non-Profit Organization (NPO) Action Grant',
    description:
      'The NPO Environment Action Grant is a scheme provided by the Environment Fund through its Incentives and Grants Program, specifically targeting non-profit organizations to support the implementation of environment-focused initiatives. Once approved, the grant may cover up to 100% of project costs.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/1'
  },
  {
    id: '2',
    category: 'Grants',
    title: 'Research Institution Grant',
    description:
      'The Research Grant is a scheme provided by the Environment Fund through its Incentives and Grants Program, targeting research institutions and universities to conduct studies that contribute to the development of the environment sector. Once approved, the grant may cover up to 100% of research expenses.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/2'
  },
  {
    id: '3',
    category: 'Loan Guarantee',
    title: 'Environmental SME Support',
    description:
      'Financial guarantees designed for small and medium enterprises working in environmental sustainability, waste management, and renewable technologies to facilitate access to credit through partner banks.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/3'
  },
  {
    id: '4',
    category: 'Loan Support',
    title: 'Industrial Compliance Loan',
    description:
      'Low-interest loans for industrial entities to upgrade their facilities for better environmental compliance and reduced carbon footprint, aligning with national environmental standards.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/4'
  },
  {
    id: '5',
    category: 'Awards',
    title: 'Green Innovation Excellence Award',
    description:
      "Recognizing outstanding achievements in environmental innovation. This annual award celebrates organizations and individuals who have developed groundbreaking solutions for Saudi Arabia's environmental challenges.",
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/5'
  },
  {
    id: '6',
    category: 'Grants',
    title: 'Reforestation Community Grant',
    description:
      'Supporting community-led reforestation projects across the Kingdom to combat desertification and improve vegetation cover in urban and rural areas.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef/apply/6'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Grants':
      return 'bg-[#BDCD5C]';
    case 'Loan Guarantee':
      return 'bg-[#5CBDCD]';
    case 'Loan Support':
      return 'bg-[#CD5C5C]';
    case 'Awards':
      return 'bg-[#CD985C]';
    default:
      return 'bg-[#BDCD5C]';
  }
};

export const ProgramsGrid = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((program) => {
      const matchesCategory =
        selectedCategory === 'All' || program.category === selectedCategory;
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleApply = (program: Program) => {
    navigate(`/ef/apply/${program.id}`);
  };

  const handleReadMore = (program: Program) => {
    navigate(`/ef/program/${program.id}`);
  };

  return (
    <div className="w-full bg-white font-sans text-[#212529]">
      <section className="py-12 px-4 md:px-8 max-w-[1350px] mx-auto border-b border-gray-100">
        <div className="space-y-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2C3A82] mb-6">
              Incentives and Grants Program
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              The Incentives and Grants Program is a national initiative that supports Saudi
              Arabia's transition to environmental sustainability. It aims to stimulate investment,
              innovation, and environmentally friendly practices across the Kingdom's key sectors,
              including meteorology, waste management, wildlife conservation, vegetation cover,
              desertification control, and environmental compliance.
            </p>
          </div>

          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-8"
            id="ef-filters"
          >
            <div className="flex flex-wrap gap-3" id="ef-category-filters">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  data-category={category}
                  className={cn(
                    'px-8 py-3 rounded-full text-sm font-medium transition-all duration-300',
                    selectedCategory === category
                      ? 'bg-[#2C3A82] text-white shadow-md'
                      : 'bg-[#2C3A82]/10 text-[#2C3A82] hover:bg-[#2C3A82]/20'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C3A82]/20 focus:border-[#2C3A82] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-12 px-4 md:px-8 max-w-[1350px] mx-auto min-h-[600px]"
        id="ef-programs-grid"
      >
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program) => (
                <motion.div
                  layout
                  key={program.id}
                  id={`ef-program-${program.id}`}
                  data-program-id={program.id}
                  data-program-category={program.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col h-[520px] bg-white border-b-2 border-transparent hover:border-[#2C3A82]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div
                    className={cn(
                      'absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-sm transition-transform group-hover:scale-105',
                      getCategoryColor(program.category)
                    )}
                  >
                    {program.category}
                  </div>

                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="flex flex-col flex-grow p-6 pt-8 space-y-4">
                    <h3 className="text-xl font-bold text-[#2C3A82] line-clamp-2 leading-tight group-hover:text-[#3d4fa8] transition-colors h-14">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-grow">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                      <button
                        onClick={() => handleReadMore(program)}
                        className="px-6 py-2.5 rounded-full border border-[#2C3A82] text-[#2C3A82] text-sm font-medium hover:bg-[#2C3A82] hover:text-white transition-all duration-300"
                      >
                        Read More
                      </button>
                      <button
                        onClick={() => handleApply(program)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C3A82] text-[#BDCD5C] text-sm font-medium hover:bg-[#1f2963] transition-all duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5px] scale-x-[-1]" />
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="p-6 bg-gray-50 rounded-full">
              <Filter className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-xl text-gray-400 font-medium text-center">
              No programs found matching your criteria
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[#2C3A82] hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Environment Fund. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
