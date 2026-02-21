import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RollingAnimation from "./RollingAnimation";

export default function Footer() {
  return (
    <div className="bg-[#10100E] w-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] flex flex-col mt-20 sm:mt-32 md:mt-40">
      {/* Top Title Section */}
      <div className="border-b border-[#2C2E30] overflow-hidden">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center py-6 sm:py-8 md:py-10 break-words">
          ADAAMSTACK
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-auto px-4 sm:px-6 md:px-10 py-6 text-base sm:text-lg md:text-xl font-clash text-center sm:text-left">
        <h1>
          Made & Crafted by{" "}
          <Link
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block font-logo text-[#ED5B30]"
            aria-label="Visit ADAAMSTUDIOS website"
          >
            ADAAMSTUDIOS
            <ArrowUpRight
              size={14}
              className="absolute -top-2 -right-4 text-white transition-transform duration-300 ease-in-out
                         group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </h1>

        <ul className="flex gap-4 sm:gap-6">
          <li className="hover:text-[#ED5B30]">
            <RollingAnimation href="/about">About</RollingAnimation>
          </li>
        </ul>
      </div>
    </div>
  );
}
