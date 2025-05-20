"use client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Code, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export const SearchBar = () => {
  const params = useSearchParams()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: params.get("search") ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.search) {
      router.push(`/?search=${values.search}`)
    }
    else {
      router.push('/')
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="pl-10 bg-slate-800/70 border-blue-500/30 focus:border-blue-400/60 rounded-lg h-12 text-blue-100 placeholder:text-blue-300/50 shadow-md focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-300" />
                </FormItem>
              )}
            />
            
            {params.get("search") && (
              <button 
                type="button"
                onClick={() => {
                  form.setValue("search", "")
                  router.push("/")
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-200 transition-colors bg-transparent p-1 rounded-full hover:bg-blue-800/30"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 border border-blue-500/50 rounded-lg transition-all duration-300 h-12 min-w-[120px]"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            
            {params.get("search") && (
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => {
                  form.setValue("search", "")
                  router.push("/")
                }}
                className="border-blue-500/30 text-blue-300 hover:text-blue-100 hover:bg-blue-800/30 h-12"
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      {/* Optional Quick Filter Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {["React", "Next.js", "TypeScript", "Python", "Debugging"].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              form.setValue("search", tag)
              router.push(`/?search=${tag}`)
            }}
            className="px-3 py-1 bg-blue-800/30 text-blue-300 text-xs rounded-full border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-700/30 transition-all flex items-center gap-1"
          >
            <Code className="w-3 h-3" />
            {tag}
          </button>
        ))}
        <button className="px-3 py-1 bg-blue-900/40 text-blue-300 text-xs rounded-full border border-blue-500/30 hover:border-blue-500/50 transition-all flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Popular
        </button>
      </div>
    </div>
  )
}