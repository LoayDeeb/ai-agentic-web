import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type AccordionItemInternalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const AccordionItemInternal = ({
  id,
  title,
  children,
  defaultOpen = false
}: AccordionItemInternalProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return <div className="border-b border-gray-200">
      <button id={`${id}-header`} aria-controls={`${id}-body`} aria-expanded={isOpen} aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`} type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full py-4 px-0 text-left hover:bg-gray-50 transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 flex-1 pr-4">{title}</h3>
        <motion.span animate={{
        rotate: isOpen ? 180 : 0
      }} transition={{
        duration: 0.25,
        ease: [0.33, 1, 0.68, 1]
      }} className="flex-shrink-0">
          <ChevronDown className="w-6 h-6 text-gray-900" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && <motion.div id={`${id}-body`} role="region" aria-labelledby={`${id}-header`} initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.25,
        ease: [0.33, 1, 0.68, 1]
      }} className="overflow-hidden">
            <div className="pb-4 pt-2 text-gray-700">{children}</div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

type AccordionProps = {
  items?: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }>;
  dir?: 'ltr' | 'rtl';
  className?: string;
};

// @component: Accordion
export const Accordion = ({
  items,
  dir = 'ltr',
  className = ''
}: AccordionProps) => {
  const defaultItems = [{
    id: 'item-1',
    title: 'شروط احتساب عدد أفراد الأسرة',
    content: <div>
          <p className="mb-2">يتم احتساب عدد أفراد الأسرة بناءً على المعايير التالية:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>رب الأسرة والزوجة</li>
            <li>الأبناء غير المتزوجين</li>
            <li>الأبناء ذوي الإعاقة</li>
            <li>المطلقات والأرامل العائدات للأسرة</li>
          </ul>
        </div>,
    defaultOpen: false
  }, {
    id: 'item-2',
    title: 'What are the eligibility criteria?',
    content: <div>
          <p className="mb-2">To be eligible for the program, you must meet the following requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Be a citizen or permanent resident</li>
            <li>Have valid identification documents</li>
            <li>Meet the income requirements</li>
            <li>Complete the application process</li>
          </ul>
        </div>,
    defaultOpen: false
  }, {
    id: 'item-3',
    title: 'How do I apply?',
    content: <div>
          <p className="mb-2">The application process is simple and straightforward:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Visit our online portal</li>
            <li>Create an account or log in</li>
            <li>Fill out the application form</li>
            <li>Upload required documents</li>
            <li>Submit and wait for confirmation</li>
          </ol>
        </div>,
    defaultOpen: false
  }] as any[];

  const accordionItems = items || defaultItems;

  // @return
  return <div dir={dir} className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="divide-y divide-gray-200">
          {accordionItems.map(item => <AccordionItemInternal key={item.id} id={item.id} title={item.title} defaultOpen={item.defaultOpen}>
              {item.content}
            </AccordionItemInternal>)}
        </div>
      </div>
    </div>;
};







