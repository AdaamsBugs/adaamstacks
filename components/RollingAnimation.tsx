"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function RollingAnimation({
  href,
  children,
  className = "",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative overflow-hidden group inline-block h-fit font-medium ${className}`}
    >
      {/* Top Text */}
      <span className="block transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
        {children}
      </span>

      {/* Bottom Text */}
      <span className="absolute inset-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 ">
        {children}
      </span>
    </Link>
  );
}
