"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Fira_Code } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Sparkles, GitBranch, Star, GitPullRequest, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { AvatarImage } from "./ui/avatar"

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fira-code",
})

function FloatingIcon({
  className,
  delay = 0,
  rotate = 0,
  icon,
}: {
  className?: string
  delay?: number
  rotate?: number
  icon: React.ReactNode
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
      className={cn("absolute", className)}
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
  )
}

export default function HeroSection() {

  const router = useRouter()
  
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Video Background */}
      <div className="absolute inset-0 z-1">
        <video   
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
        <source src="/video.mov" ></source>
        
        </video>
        {/* Overlay to enhance text visibility */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8884_1px,transparent_1px),linear-gradient(to_bottom,#8884_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating elements that match the 3D cubes theme */}
      <FloatingIcon 
        className="top-24 left-[20%]" 
        delay={0.6} 
        rotate={-5}
        icon={<Code2 size={28} className="text-blue-200" />} 
      />
      <FloatingIcon 
        className="bottom-32 left-[15%]" 
        delay={1.2} 
        rotate={5}
        icon={<GitBranch size={28} className="text-blue-200" />} 
      />
      <FloatingIcon 
        className="top-40 right-[18%]" 
        delay={0.9}
        rotate={10} 
        icon={<Star size={28} className="text-blue-200" />} 
      />
        <FloatingIcon
      className='bottom-32 right-[10%] '
      rotate={5}
      icon={<GitPullRequest size={24} className="text-blue-200" />} 
      />


      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-2">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 mb-4">
              <span className="text-sm font-medium text-blue-200 tracking-wide font-mono">
                Developer Collaboration Platform
              </span>
            </div>
          </motion.div>
          
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight ${firaCode.variable}`}>
              <span className="text-white">Connect with developers and </span>
              <br className="hidden md:block" />
              <span className="text-white">solve bugs </span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">in P2P mode</span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-blue-100/80 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              Share your screen, debug together, and collaborate on GitHub repositories in real-time. Your next coding breakthrough is just a click away.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 border border-blue-500/50" 
              onClick={() => router.push("/browse-rooms")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Start Collaborating
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white/90 hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-12">
            <div className="flex justify-center space-x-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/20">
                <div className="flex -space-x-2 mr-2">
                 <Users></Users>
                </div>
                <span className="text-sm font-medium text-blue-100">+99 developers online</span>
              </div>
              
            </div>
           
            
          </motion.div>
          <div className=" bottom-2  justify-center items-center  mt-10">
      🚀 Built by <a href="https://github.com/Anantdadhich" target="_blank" className="underline hover:text-blue-300">Adtech</a>
    </div>
        </div>
      </div>
    </div>
  )
}