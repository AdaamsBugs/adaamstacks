import { Resource } from "./types";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "resources.json");

// Simple in-memory lock to prevent concurrent writes
let writeLock: Promise<void> = Promise.resolve();

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Pillar Stack",
    url: "https://www.pillerstack.com",
    category: "",
    favicon: "https://www.google.com/s2/favicons?domain=pillerstack.com&sz=64",
    createdAt: Date.now(),
  },
  {
    id: "2",
    name: "Figma",
    url: "https://www.figma.com",
    category: "Design",
    favicon: "https://www.google.com/s2/favicons?domain=figma.com&sz=64",
    createdAt: Date.now(),
  },
  {
    id: "3",
    name: "Vercel",
    url: "https://vercel.com",
    category: "Development",
    favicon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=64",
    createdAt: Date.now(),
  },
  {
    id: "4",
    name: "ChatGPT",
    url: "https://chat.openai.com",
    category: "AI Tools",
    favicon: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
    createdAt: Date.now(),
  },
  {
    id: "5",
    name: "Notion",
    url: "https://notion.so",
    category: "Productivity",
    favicon: "https://www.google.com/s2/favicons?domain=notion.so&sz=64",
    createdAt: Date.now(),
  },
  {
    id: "6",
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "Learning",
    favicon: "https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=64",
    createdAt: Date.now(),
  },
];

async function ensureDataFile(): Promise<void> {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(DEFAULT_RESOURCES, null, 2), "utf-8");
  }
}

export async function getResources(): Promise<Resource[]> {
  await ensureDataFile();
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return DEFAULT_RESOURCES;
  }
}

export async function saveResources(resources: Resource[]): Promise<void> {
  await ensureDataFile();
  
  // Use a lock to prevent concurrent writes
  writeLock = writeLock.then(async () => {
    // Write to a temporary file first, then rename (atomic operation)
    const tempFile = `${DATA_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(resources, null, 2), "utf-8");
    await fs.rename(tempFile, DATA_FILE);
  });
  
  await writeLock;
}

export async function addResource(resource: Omit<Resource, "id" | "createdAt">): Promise<Resource> {
  // Ensure we wait for any pending writes before reading
  await writeLock;
  
  const resources = await getResources();
  const newResource: Resource = {
    ...resource,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    favicon: resource.favicon || `https://www.google.com/s2/favicons?domain=${new URL(resource.url).hostname}&sz=64`,
  };
  resources.unshift(newResource);
  await saveResources(resources);
  return newResource;
}

export async function deleteResource(id: string): Promise<void> {
  // Ensure we wait for any pending writes before reading
  await writeLock;
  
  const resources = await getResources();
  const filtered = resources.filter((r) => r.id !== id);
  await saveResources(filtered);
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<void> {
  // Ensure we wait for any pending writes before reading
  await writeLock;
  
  const resources = await getResources();
  const updated = resources.map((r) =>
    r.id === id ? { ...r, ...data } : r
  );
  await saveResources(updated);
}
