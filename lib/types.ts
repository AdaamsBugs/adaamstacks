export interface Resource {
    id: string;
    name: string;
    url: string;
    category: string;
    favicon?: string;
    createdAt: number;
  }
  
  export const CATEGORIES = [
    "All",
    "Inspiration",
    "Typography",
    "Technologies",
    "AI Tools",
    "UI Libraries",
    "Others",
    
  ] as const;
  
  export type Category = (typeof CATEGORIES)[number];
  