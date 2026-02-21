"use client";

import { useState } from "react";
import { CATEGORIES, Category } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { addResource } from "@/lib/resources";
import { Resource } from "@/lib/types";

interface AddResourceFormProps {
  onAdd: (resource: Resource) => void;
}

export function AddResourceForm({ onAdd }: AddResourceFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    category: "Others" as Category,
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.url) {
      setError("All fields are required.");
      return;
    }

    try {
      let url = form.url;
      if (!url.startsWith("http")) url = "https://" + url;
      new URL(url);
      const resource = await addResource({ ...form, url });
      onAdd(resource);
      setForm({ name: "", url: "", category: "Others" });
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Please enter a valid URL.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#ED5B30] hover:bg-[#ED5B30]/80">
          <Plus className="w-4 h-4 " />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Figma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cat">Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({ ...form, category: value as Category })
              }
            >
              <SelectTrigger id="cat">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-sm text-red-400 font-body">{error}</p>
          )}
          <div className="flex gap-2 justify-end mt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Resource</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
