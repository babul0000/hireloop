"use client";

import React from "react";
import { motion } from "framer-motion";

export const fadeSlideIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function FadeSlideIn({
  children,
  className,
  style,
  delay = 0,
  duration,
  y = 18,
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration ?? 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

