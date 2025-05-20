"use client";

import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Github, Tag, FileText, Layout, Sparkles } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Creatroomaction } from "./actions";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(2).max(160),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

export function CreateRoomForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await Creatroomaction(values);
    toast({
      title: "Room Created",
      description: "Your Room was created successfully",
      className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    });
    router.push("/browse-rooms");
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.23, 0.86, 0.39, 0.96],
      }
    })
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg -m-4 p-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 relative bg-slate-900 rounded-lg p-6 shadow-xl border border-blue-500/20 backdrop-blur-sm hover:shadow-blue-500/10 transition-shadow duration-500"
        >
          <motion.div custom={0} variants={inputVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-blue-100">
                    <Layout className="w-4 h-4 text-blue-400" />
                    Room Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Give your DevFinder room name"
                      className="border-blue-500/20 bg-slate-800/50 text-white focus:border-blue-500 transition-colors duration-300"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-200/70">
                    Choose a descriptive name for your room
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div custom={1} variants={inputVariants}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-blue-100">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Describe the bug in your code"
                      className="border-blue-500/20 bg-slate-800/50 text-white focus:border-blue-500 transition-colors duration-300"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-200/70">
                    Provide details about what you are working on
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div custom={2} variants={inputVariants}>
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-blue-100">
                    <Github className="w-4 h-4 text-blue-400" />
                    GitHub Repository
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your GitHub repository URL"
                      className="border-blue-500/20 bg-slate-800/50 text-white focus:border-blue-500 transition-colors duration-300"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-200/70">
                    Link to your project repository
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div custom={3} variants={inputVariants}>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2 text-blue-100">
                    <Tag className="w-4 h-4 text-blue-400" />
                    Tags
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="typescript, nextjs, tailwind"
                      className="border-blue-500/20 bg-slate-800/50 text-white focus:border-blue-500 transition-colors duration-300"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-200/70">
                    Add technologies you are using (comma-separated)
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={4} 
            variants={inputVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create Room
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}