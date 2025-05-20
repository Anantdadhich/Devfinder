"use client";

import { motion } from "framer-motion";
import { Code2, GitBranch } from "lucide-react";
import { Fira_Code } from "next/font/google";
import { CreateRoomForm } from "./create-room-file";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fira-code",
});

function FloatingIcon({
  className,
  delay = 0,
  rotate = 0,
  icon,
}: {
  className?: string;
  delay?: number;
  rotate?: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={className}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="w-16 h-16 bg-blue-500/30 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-blue-400/20">
          {icon}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CreateRoom() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8884_1px,transparent_1px),linear-gradient(to_bottom,#8884_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating elements */}
      <FloatingIcon 
        className="absolute top-24 left-[15%] z-0" 
        delay={0.6} 
        rotate={-5}
        icon={<Code2 size={28} className="text-blue-200" />} 
      />
      <FloatingIcon 
        className="absolute bottom-32 right-[15%] z-0" 
        delay={1.2} 
        rotate={5}
        icon={<GitBranch size={28} className="text-blue-200" />} 
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24 relative z-10">
        <motion.div 
          custom={0} 
          variants={fadeUpVariants} 
          initial="hidden" 
          animate="visible"
          className="flex flex-col gap-4"
        >
          
          
          <h1 className={`text-4xl md:text-5xl font-bold ${firaCode.variable}`}>
            <span className="text-white">Create a </span>
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">DevFinder Room</span>
          </h1>
          
          <p className="text-blue-100/80 max-w-2xl">
            Set up a collaborative debugging space for your project. Share your repository,
            describe the issue, and connect with developers who can help solve it.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl w-full mx-auto"
        >
          <CreateRoomForm />
        </motion.div>
      </div>
    </div>
  );
}