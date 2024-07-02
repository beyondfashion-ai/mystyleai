
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomTabWrapper from "@/components/common/BottomTabWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mystyleAI",
  description: "mystyle AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body 
        className="flex justify-center"
      >
        <div
          className="w-full"
          style={{ maxWidth: 'var(--max-width)', backgroundColor: 'var(--background-color)' }}

        >
          {children}
          <BottomTabWrapper />
        </div>
        
      </body>
    </html>
  );
}
