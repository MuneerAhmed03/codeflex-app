import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar } from "@/components/app-bar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Flex",
  description: "Compare your LeetCode and Github",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen ">
        <AppBar />
        <div className="pattern-background">
          
          {children}
        </div>
        </div>
      </body>
    </html>
  );
}
