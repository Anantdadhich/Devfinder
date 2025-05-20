"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {  Users, LogOut, Trash2, GitBranch, Sparkles } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { Fira_Code } from "next/font/google"

import { motion } from "framer-motion"
import Image from "next/image"

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fira-code",
})

function AccountDropdown() {
  const session = useSession()
  const [open, setOpen] = useState(false)

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-slate-900 backdrop-blur-lg border border-blue-500/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-blue-100/80">
              This action cannot be undone. This will permanently remove your account and any data you have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-white border-blue-500/20 hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                // Replace with your delete account action
                signOut({ callbackUrl: "/" })
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative group flex items-center gap-2 hover:bg-blue-500/10 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Avatar className="h-8 w-8 ring-2 ring-blue-500/20 transition-all duration-300 group-hover:ring-blue-500/40">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback className="bg-blue-600/20 text-blue-200">CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-semibold text-white">
              {session.data?.user?.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-slate-900/90 backdrop-blur-lg border border-blue-500/20">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-blue-100 hover:bg-blue-500/10 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-blue-500/20" />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-400 hover:bg-red-500/10 transition-colors duration-200"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function Header() {
  const session = useSession()
  const isLoggedIn = !!session.data
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 0.86, 0.39, 0.96]
      }
    }
  }

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/10"
    >
      <div className="container mx-auto relative">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className={`flex items-center gap-3 mr-8 group ${firaCode.variable}`}>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-20 group-hover:opacity-30 blur transition-opacity duration-300" />
              <Image src="/icon.png" alt="logo" width={32} height={32} />
            </div>
            <span className="hidden sm:inline text-xl font-bold text-white">Devfinder</span>
          </Link>

          <nav className="flex gap-8 flex-1">
            {isLoggedIn && (
              <>
                <Link
                  href="/browse-rooms"
                  className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors duration-300"
                >
                  <Users className="h-4 w-4" />
                  Browse Rooms
                </Link>
                <Link
                  href="/your-rooms"
                  className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors duration-300"
                >
                  <GitBranch className="h-4 w-4" />
                  Your Rooms
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <AccountDropdown />
            ) : (
              <Button
                onClick={() => signIn()}
                className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Sparkles className="mr-2 h-4 w-4" /> Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}