import React from 'react';
import { motion } from 'framer-motion';

const GuideSection = ({ title, children, number }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <h2 className="flex items-center text-2xl font-bold text-white mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">{number}</span>
        {title}
      </h2>
      <div className="prose prose-invert max-w-none text-slate-300 prose-p:my-2 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-slate-200">
        {children}
      </div>
    </motion.section>
  );
};

export default GuideSection;