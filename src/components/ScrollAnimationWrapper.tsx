"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollAnimationWrapper({ children, direction = "up", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const x = useTransform(scrollYProgress, [0, 1], 
    direction === "left" ? [100, 0] : 
    direction === "right" ? [-100, 0] : 
    [0, 0]
  );

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        x: direction === "left" || direction === "right" ? x : 0,
        y: direction === "up" || direction === "down" ? y : 0,
      }}
      className={`transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}