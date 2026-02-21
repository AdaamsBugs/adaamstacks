"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 1) {
        router.push("/");
      } else if (clickCountRef.current >= 2) {
        router.push("/admin");
      }
      clickCountRef.current = 0;
      clickTimeoutRef.current = null;
    }, 300);
  };

  return (
    <nav className="flex justify-center px-4 sm:px-6 md:px-10 py-4 sm:py-6">
      <div className="w-full max-w-6xl border-b border-[#2C2E30] pb-4 flex flex-row justify-between items-center gap-4 flex-wrap">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-logo font-bold">
          <h1
            className="relative inline-block overflow-hidden cursor-pointer group h-fit"
            onClick={handleLogoClick}
          >
            <span className="block font-logo font-bold transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
              ADAAMSTACK
            </span>
            <span className="absolute left-0 top-0 block font-logo font-bold transition-all duration-500 ease-in-out translate-y-full group-hover:translate-y-0">
              ADAAMSTACK
            </span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-3 sm:gap-4">
          <ul className="flex gap-3 sm:gap-4">
            <li>
              <Link
                href="/"
                className="bg-[#ED5B30] hover:bg-[#ED5B30]/80 text-shadow-white text-sm sm:text-md font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md inline-block transition-colors duration-200"
              >
                ADAAMSTUDIO
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
