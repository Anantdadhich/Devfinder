import Link from "next/link";
import { GithubIcon, Video, Users, Code2 } from "lucide-react";
import { Splittags, Taglist } from "@/components/tagslist";
import { Vedioplayer } from "./vedioplayer";
import { unstable_noStore } from "next/cache";
import { getRoom } from "@/data-access/rooms";


function safeString(value: any): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return JSON.stringify(value);
}

export default async function RoomPage({ params }: { params: { roomId: string } }) {
  unstable_noStore();
  const room = await getRoom(params.roomId);
   
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Room Not Found</h1>
          <Link
            href="/browse-rooms"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Browse Other Rooms
          </Link>
        </div>
      </div>
    );
  }

  const tags = Splittags(safeString(room.tags));

  return (
    <div className="min-h-screen bg-slate-900 relative text-white">
      {/* Background effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5553_1px,transparent_1px),linear-gradient(to_bottom,#5553_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <main className="relative z-10 px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player + Main */}
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl shadow-xl p-4 backdrop-blur-sm">
            <Vedioplayer room={room} />
          </div>
        </div>

        {/* Sidebar Panel */}
        <aside className="col-span-1 space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Users size={18} /> Room Details
            </h2>
            <p className="text-blue-100/80 text-sm">Room ID: <span className="font-mono text-blue-300">{room.id}</span></p>
            <p className="text-blue-100/80 text-sm mt-1">Room Name: <span className="font-semibold">{room.name}</span></p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Code2 size={18} /> Tech Stack
            </h2>
            <p className="text-blue-100/80 text-sm font-mono">   <Taglist tags={Splittags(safeString(room.tags))} /></p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <GithubIcon size={18} /> GitHub Repo
            </h2>
            {room.githubRepo ? (
              <Link
                href={room.githubRepo}
                target="_blank"
                className="text-sm text-blue-400 underline hover:text-blue-300 transition-all"
              >
                {room.githubRepo}
              </Link>
            ) : (
              <p className="text-blue-100/60 text-sm italic">Not provided</p>
            )}
          </div>

         
        </aside>
      </main>
    </div>
  );
}
