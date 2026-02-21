"use client";

import { useEffect, useState } from "react";
import { Resource, Category } from "@/lib/types";
import { getResources, deleteResource } from "@/lib/resources";
import { ResourceCard } from "@/components/ResourceCard";
import { AddResourceForm } from "@/components/AddResourceForm";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadResources() {
      setMounted(true);
      const stored = sessionStorage.getItem("admin_authed");
      if (stored === "1") {
        setAuthed(true);
        const data = await getResources();
        setResources(data);
      }
    }
    loadResources();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        sessionStorage.setItem("admin_authed", "1");
        setAuthed(true);
        const data = await getResources();
        setResources(data);
        setPassword("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Incorrect password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
    setPassword("");
    // Redirect to home page
    router.push("/");
  }

  async function handleDelete(id: string) {
    try {
      await deleteResource(id);
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error("Failed to delete resource:", error);
      if (error instanceof Error) {
        alert(`Failed to delete: ${error.message}`);
      } else {
        alert("Failed to delete resource. Please make sure you're logged in.");
      }
    }
  }

  async function handleAdd(resource: Resource) {
    const data = await getResources();
    setResources(data);
  }

  if (!mounted) return null;

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-x-hidden">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />
        <div className="relative w-full max-w-sm mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground mb-1">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Enter your password to manage resources
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 text-center tracking-widest"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-400 text-center font-body">{error}</p>
            )}
            <Button type="submit" size="lg" className="w-full mt-1">
              Unlock
            </Button>
            <Link href="/" className="text-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground w-full">
                ← Back to site
              </Button>
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[150px] sm:h-[200px] md:h-[300px] bg-primary/4 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
             
             
             <h1 className="text-3xl font-grotesk font-bold ">Welcome Muhammad Adaam <span className="text-[#ED5B30] pl-3">:)</span></h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight">
                Manage Resources
              </h1>
              <p className="text-muted-foreground font-body mt-1">
                {resources.length} total resources
              </p>
            </div>
            <AddResourceForm onAdd={handleAdd} />
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Count */}
        <p className="text-sm font-mono text-muted-foreground mb-5">
          {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground font-body">
            No resources yet. Add one above!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isAdmin
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
