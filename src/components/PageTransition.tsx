import React from 'react';
import { motion } from 'motion/react';

export const PageTransition = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);
