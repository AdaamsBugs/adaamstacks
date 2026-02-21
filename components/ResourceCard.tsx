"use client";

import { Resource } from "@/lib/types";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
;
import { useState } from "react";

interface ResourceCardProps {
  resource: Resource;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export function ResourceCard({ resource, isAdmin, onDelete }: ResourceCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-hover group relative flex flex-col gap-3 rounded-xl bg-[#100C08] p-4 sm:p-5 h-full shadow-lg shadow-black/20 min-w-0">
      {/* Category badge */}
      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] text-[#C4C2BE] font-mono font-medium uppercase tracking-widest px-2 py-0.5 rounded-full">
        {resource.category}
      </span>

      {/* Icon + Name */}
      <div className="flex items-center gap-2 sm:gap-3 pr-12 sm:pr-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
  {resource.favicon && !imgError ? (
    <img
      src={resource.favicon}
      alt={resource.name}
      className="w-full h-full object-contain"
      onError={() => setImgError(true)}
    />
  )  : (
            <span className="text-lg font-display font-bold text-primary">
              {resource.name[0]}
            </span>
          )}
        </div>
       
      </div>

      <h3 className="font-display font-clash text-base sm:text-lg md:text-xl pl-2 uppercase leading-tight wrap-break-word">
        {resource.name}
      </h3>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0"
        >
          <Button size="sm" className="w-full gap-1 bg-gray-900 hover:bg-gray-800 ">
            Visit
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>
        {isAdmin && onDelete && (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(resource.id)}
            className="shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
