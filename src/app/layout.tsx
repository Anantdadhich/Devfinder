import type { Metadata } from "next";
import {Cabin_Sketch } from "next/font/google";
import "./globals.css";

import { Provider } from "./provider";
import { Header } from "./header";
import NextTopLoader from 'nextjs-toploader';

const cabinSketch = Cabin_Sketch({ subsets: ["latin"],weight:["400","700"] });

export const metadata: Metadata = {
  title: "Devfinder",
  description: "An application to help with pair code with other developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cabinSketch.className}>
       <Provider>
        <NextTopLoader></NextTopLoader>
          <Header>
          </Header>
          <div className=" mx-auto">
                      {children}

          </div>
       </Provider>
      </body>
    </html>
  );
}
