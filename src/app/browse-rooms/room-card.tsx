"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, Users, Code } from "lucide-react";
import { Splittags, Taglist } from "@/components/tagslist";
import { Button } from "@/components/ui/button";
import { Room } from "@prisma/client";

function safeString(value: any): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null || value === undefined) {
    return "";
  }
  return JSON.stringify(value);
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="relative border-0 bg-slate-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] rounded-xl overflow-hidden group">
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-bl-3xl"></div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center border border-blue-400/30">
              <Code className="w-4 h-4 text-blue-300" />
            </div>
            <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              {room.name}
            </CardTitle>
          </div>
        </div>

        <CardDescription className="text-blue-100/70 mt-2">
          {room.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-4 pb-2">
        <div className="flex flex-wrap gap-2">
          <Taglist tags={Splittags(safeString(room.tags))} />
        </div>
        
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-1 rounded bg-slate-700/50 border border-blue-500/20 group-hover:border-blue-500/40 transition-all">
              <GithubIcon className="w-4 h-4" />
            </div>
            <span className="text-sm">GitHub Project</span>
          </Link>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between w-full text-xs text-blue-300/60 mb-2">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Active Now</span>
            </div>
           
          </div>
          
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 border border-blue-500/50 rounded-lg transition-all duration-300"
            asChild
          >
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}