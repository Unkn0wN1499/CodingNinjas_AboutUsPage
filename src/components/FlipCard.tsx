"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  teamName: string;
  description: string;
  icon?: string;
  color?: string;
}

export default function FlipCard({ teamName, description, icon, color = "orange" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card-container bg-blue-950 rounded-4xl w-full" style={{ width: 320, height: 420 }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
        style={{ transformStyle: "preserve-3d", width: '100%', height: '100%' }}
      >
        <div
          className={`absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer bg-gradient-to-br from-${color}-600 to-${color}-800 backface-hidden`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ width: '100%', height: '100%' }}
        >
          {icon && <span className="text-4xl mb-4">{icon}</span>}
          <h3 className="text-2xl font-bold text-white mb-2">{teamName}</h3>
          <button className="mt-4 px-4 py-2 bg-white/10 rounded-md text-white text-sm hover:bg-white/20 transition-colors">
            Learn More
          </button>
        </div>
        <div
          className="absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-4xl cursor-pointer bg-black text-white backface-hidden"
          style={{ transform: "rotateY(180deg)", width: '100%', height: '100%' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <p className="text-center text-lg font-semibold">{description}</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 rounded-4xl text-white text-sm hover:bg-orange-600 transition-colors">
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}