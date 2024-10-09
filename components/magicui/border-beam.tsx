import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}


interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderRadius?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 10,
  duration = 2.5,
  colorFrom = "#4ade80",
  colorTo = "#22c55e",
  borderRadius = 7 // Ajusta este valor según el radio de borde de tus tarjetas
}) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <svg className="absolute w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>
        <motion.rect
          x={size / 1.25}
          y={size / 1.25}
          width={`calc(100% - ${size}px)`}
          height={`calc(100% - ${size}px)`}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={size}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};
