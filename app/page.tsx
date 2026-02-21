"use client";

import { useEffect, useState } from "react";
import { Resource, Category } from "@/lib/types";
import { getResources } from "@/lib/resources";
import { ResourceCard } from "@/components/ResourceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import ReactLenis from "@studio-freight/react-lenis";

export default function HomePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadResources() {
      const data = await getResources();
      setResources(data);
      setMounted(true);
    }
    loadResources();
  }, []);

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  if (!mounted) return null;

  return (
    <ReactLenis root>
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/3 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        {/* Header */}
        <header className="mb-10 sm:mb-14 md:mb-16 animate-fade-in text-center">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              {/* Your content here */}
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-1">
            <h1 className="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight mb-4">
              Best resources for frontend developers and web designers.
            </h1>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-8 sm:mb-10">
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        
        

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground font-body">
            No resources in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        
      </div>
    </div>
    </ReactLenis>
  );
}
