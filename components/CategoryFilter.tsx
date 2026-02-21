"use client";

import { CATEGORIES, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  active: Category;
  onChange: (cat: Category) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const allCategory = "All";
  const otherCategories = CATEGORIES.filter((cat) => cat !== allCategory);

  return (
    <div className="flex justify-center w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-full">
        {/* All Button (Left Side) */}
        <button
          onClick={() => onChange(allCategory as Category)}
          className={cn(
            "px-4 py-6 sm:px-6 sm:py-3 rounded-md text-sm sm:text-md font-clash font-semibold transition-all duration-200 shrink-0",
            active === allCategory
              ? "bg-[#F7F7F7] text-black shadow-md"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
          )}
        >
          {allCategory}
        </button>

        {/* Big Container for Other Categories */}
        <div className="flex flex-wrap justify-center gap-2 bg-[#101214] border border-gray-800 rounded-xl px-3 py-2 sm:px-4 sm:py-2 min-w-0">
          {otherCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={cn(
                "px-2 py-1.5 sm:px-4 rounded-md text-sm sm:text-md font-grotesk font-semibold transition-all duration-400 whitespace-nowrap",
                active === cat
                  ? "bg-[#F7F7F7] text-black shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
