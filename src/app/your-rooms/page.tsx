import React from "react";
import Link from "next/link";
import Image from "next/image";
import { unstable_noStore } from "next/cache";
import { Code2, GitBranch, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRoomCard } from "./user-room-card";
import { getMyRooms } from "@/data-access/rooms";




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
    <div className={`absolute ${className}`}>
      <div className="relative">
        <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-blue-400/20">
          {icon}
        </div>
      </div>
    </div>
  );
}



export default async function Home() {
  unstable_noStore();
  const rooms = await getMyRooms();

  return (
    <div className={`min-h-screen bg-slate-900 relative overflow-hidden `}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8884_1px,transparent_1px),linear-gradient(to_bottom,#8884_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      
      {/* Floating elements */}
      <FloatingIcon 
        className="top-24 left-[8%] hidden lg:flex" 
        rotate={-5}
        icon={<Code2 size={24} className="text-blue-200" />} 
      />
      <FloatingIcon 
        className="bottom-32 left-[5%] hidden lg:flex" 
        rotate={5}
        icon={<GitBranch size={24} className="text-blue-200" />} 
      />
      <FloatingIcon 
        className="top-40 right-[8%] hidden lg:flex" 
        rotate={10} 
        icon={<Star size={24} className="text-blue-200" />} 
      />

      <main className="relative isolate px-6 pt-14 lg:px-8 z-10">
        <div className="mx-auto max-w-6xl">
          {/* Header with gradient badge */}
          <div className="flex flex-col items-start mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 mb-4">
              <span className="text-sm font-medium text-blue-200 tracking-wide font-mono">
                Developer Collaboration
              </span>
            </div>
          
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4 sm:mb-0">
                Your Rooms
              </h1>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 border border-blue-500/50 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/create-room">Create Room</Link>
              </Button>
            </div>
            
            <p className="text-blue-100/80 mt-4 max-w-xl">
              Connect with developers worldwide and solve coding challenges together in real-time peer-to-peer sessions.
            </p>
          </div>

        

          {/* Room cards grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room: any) => (
              <UserRoomCard key={room.id} room={room} />
            ))}
          </div>

          {/* Empty state with matching styling */}
          {rooms.length === 0 && (
            <div className="flex flex-col gap-6 justify-center items-center mt-24 sm:mt-16 md:mt-12 lg:mt-8 p-8 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-blue-500/20">
              <Image 
                src="/no-data.svg" 
                alt="no data image" 
                width="200" 
                height="200" 
                className="w-48 h-48 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-28 lg:h-28"
              />
              <h2 className="text-2xl sm:text-xl md:text-lg text-blue-100">
                No rooms available
              </h2>
              <p className="text-blue-200/70 text-center max-w-md">
                Be the first to create a collaboration room and start coding together!
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 border border-blue-500/50 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/create-room">Create Room</Link>
              </Button>
            </div>
          )}
          
        
        </div>
      </main>
    </div>
  );
}