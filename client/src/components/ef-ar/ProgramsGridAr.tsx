import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface ProgramAr {
  id: string;
  category: 'المنح' | 'ضمانات القروض' | 'دعم القروض' | 'الجوائز';
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  applyLink: string;
}

const CATEGORIES_AR = ['الكل', 'المنح', 'ضمانات القروض', 'دعم القروض', 'الجوائز'] as const;

export const PROGRAMS_DATA_AR: ProgramAr[] = [
  {
    id: '1',
    category: 'المنح',
    title: 'منحة العمل للمنظمات غير الربحية',
    description:
      'منحة العمل البيئي للمنظمات غير الربحية هي برنامج يقدمه صندوق البيئة من خلال برنامج الحوافز والمنح، ويستهدف المنظمات غير الربحية لدعم تنفيذ المبادرات البيئية. بعد الموافقة، قد تغطي المنحة ما يصل إلى ١٠٠٪ من تكاليف المشروع.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/1'
  },
  {
    id: '2',
    category: 'المنح',
    title: 'منحة المؤسسات البحثية',
    description:
      'منحة البحث هي برنامج يقدمه صندوق البيئة من خلال برنامج الحوافز والمنح، ويستهدف المؤسسات البحثية والجامعات لإجراء دراسات تساهم في تطوير قطاع البيئة. بعد الموافقة، قد تغطي المنحة ما يصل إلى ١٠٠٪ من نفقات البحث.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/2'
  },
  {
    id: '3',
    category: 'ضمانات القروض',
    title: 'دعم المنشآت الصغيرة والمتوسطة البيئية',
    description:
      'ضمانات مالية مصممة للمنشآت الصغيرة والمتوسطة العاملة في الاستدامة البيئية وإدارة النفايات والتقنيات المتجددة لتسهيل الحصول على الائتمان من خلال البنوك الشريكة.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/3'
  },
  {
    id: '4',
    category: 'دعم القروض',
    title: 'قرض الامتثال الصناعي',
    description:
      'قروض منخفضة الفائدة للكيانات الصناعية لتحديث منشآتها لتحقيق امتثال بيئي أفضل وتقليل البصمة الكربونية، بما يتوافق مع المعايير البيئية الوطنية.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/4'
  },
  {
    id: '5',
    category: 'الجوائز',
    title: 'جائزة التميز في الابتكار الأخضر',
    description:
      'تكريم الإنجازات المتميزة في الابتكار البيئي. تحتفي هذه الجائزة السنوية بالمنظمات والأفراد الذين طوروا حلولاً رائدة للتحديات البيئية في المملكة العربية السعودية.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/5'
  },
  {
    id: '6',
    category: 'المنح',
    title: 'منحة التشجير المجتمعي',
    description:
      'دعم مشاريع التشجير المجتمعية في جميع أنحاء المملكة لمكافحة التصحر وتحسين الغطاء النباتي في المناطق الحضرية والريفية.',
    imageUrl:
      'https://www.ef.gov.sa/ar/programs/PublishingImages/%D8%A7%D9%84%D9%85%D9%86%D8%AD.jpg',
    link: '#',
    applyLink: '/ef-ar/apply/6'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'المنح':
      return 'bg-[#BDCD5C]';
    case 'ضمانات القروض':
      return 'bg-[#5CBDCD]';
    case 'دعم القروض':
      return 'bg-[#CD5C5C]';
    case 'الجوائز':
      return 'bg-[#CD985C]';
    default:
      return 'bg-[#BDCD5C]';
  }
};

export const ProgramsGridAr = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'الكل';
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
    return PROGRAMS_DATA_AR.filter((program) => {
      const matchesCategory =
        selectedCategory === 'الكل' || program.category === selectedCategory;
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleApply = (program: ProgramAr) => {
    navigate(`/ef-ar/apply/${program.id}`);
  };

  const handleReadMore = (program: ProgramAr) => {
    navigate(`/ef-ar/program/${program.id}`);
  };

  return (
    <div dir="rtl" className="w-full bg-white font-sans text-[#212529]">
      <section className="py-12 px-4 md:px-8 max-w-[1350px] mx-auto border-b border-gray-100">
        <div className="space-y-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2C3A82] mb-6">
              برنامج الحوافز والمنح
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              برنامج الحوافز والمنح هو مبادرة وطنية تدعم تحول المملكة العربية السعودية نحو الاستدامة البيئية. يهدف إلى تحفيز الاستثمار والابتكار والممارسات الصديقة للبيئة في القطاعات الرئيسية بالمملكة، بما في ذلك الأرصاد الجوية وإدارة النفايات والحفاظ على الحياة الفطرية والغطاء النباتي ومكافحة التصحر والامتثال البيئي.
            </p>
          </div>

          <div
            className="flex flex-col lg:flex-row-reverse lg:items-center justify-between gap-6 pt-8"
            id="ef-filters"
          >
            <div className="flex flex-wrap gap-3" id="ef-category-filters">
              {CATEGORIES_AR.map((category) => (
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
                placeholder="البحث في البرامج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2C3A82]/20 focus:border-[#2C3A82] transition-all text-right"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                      'absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-sm transition-transform group-hover:scale-105',
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
                        المزيد
                      </button>
                      <button
                        onClick={() => handleApply(program)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C3A82] text-[#BDCD5C] text-sm font-medium hover:bg-[#1f2963] transition-all duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                        قدم الآن
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
              لم يتم العثور على برامج مطابقة
            </p>
            <button
              onClick={() => {
                setSelectedCategory('الكل');
                setSearchQuery('');
              }}
              className="text-[#2C3A82] hover:underline font-medium"
            >
              مسح جميع الفلاتر
            </button>
          </div>
        )}
      </section>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} صندوق البيئة. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};
