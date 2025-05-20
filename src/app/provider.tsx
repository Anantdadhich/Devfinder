"use client"
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
export function Provider({children}:{children:React.ReactNode}){
return     <html lang="en" suppressHydrationWarning>
      <body >
     <SessionProvider>
     <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div>
        
            </div>
            {children}
          </ThemeProvider>
</SessionProvider>
      </body>
    </html>


}