import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "ADAAMSTACKS |Best Resources in Town",
  description: "This is Resoures provider website Develop by Adaamstudios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[#10100E] text-[#F7F7F7] w-full min-h-full overflow-x-hidden"
      >
        <Navbar />
        {children}
        <Footer/>
       
      </body>
    </html>
  );
}
