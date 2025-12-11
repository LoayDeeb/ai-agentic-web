import React from 'react';
import { motion } from 'framer-motion';

type RTLListItem = {
  id: string;
  text: string;
};

type RTLListProps = {
  items?: RTLListItem[];
  direction?: 'rtl' | 'ltr';
  bulletColor?: string;
  bulletSize?: number;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  className?: string;
};

const defaultItems: RTLListItem[] = [{
  id: '1',
  text: 'تمويل يبدأ من 18 ألف ويصل إلى 100 ألف ♦ (عند عدم الاستفادة من أحد منتجات التمويل الاجتماعي سابقًا).'
}, {
  id: '2',
  text: 'فترة السداد تصل إلى 4 سنوات.'
}, {
  id: '3',
  text: 'يتم السداد بشكل شهري.'
}, {
  id: '4',
  text: 'بدون رسوم إدارية.'
}, {
  id: '5',
  text: 'يكون الإعفاء في حالة الوفاة لا سمح الله.'
}];

// @component: RTLList
export const RTLList = ({
  items = defaultItems,
  direction = 'rtl',
  bulletColor = '#333333',
  bulletSize = 5,
  fontFamily = 'Arial, sans-serif',
  fontSize = 16,
  lineHeight = 24,
  className = ''
}: RTLListProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === 'rtl' ? 20 : -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const isRTL = direction === 'rtl';

  // @return
  return <motion.ul variants={containerVariants} initial="hidden" animate="visible" style={{
    fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    direction,
    textAlign: isRTL ? 'right' : 'left',
    paddingRight: isRTL ? '24px' : '0',
    paddingLeft: isRTL ? '0' : '24px'
  }} className={`m-0 w-full max-w-4xl list-none ${className}`}>
      {items.map((item, index) => <motion.li key={item.id} variants={itemVariants} className="relative mb-0 transition-colors duration-200 hover:text-gray-600" style={{
      height: `${lineHeight}px`,
      width: '100%'
    }}>
          <span style={{
        position: 'absolute',
        left: isRTL ? 'auto' : `${-19.2}px`,
        right: isRTL ? `${-19.2}px` : 'auto',
        top: `${(lineHeight - bulletSize) / 2}px`,
        height: `${bulletSize}px`,
        width: `${bulletSize}px`,
        backgroundColor: bulletColor,
        borderRadius: '50%'
      }} />
          {item.text}
        </motion.li>)}
    </motion.ul>;
};



