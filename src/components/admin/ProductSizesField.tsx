"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRESET_SIZES = ["18", "20", "24", "28"];

interface ProductSizesFieldProps {
  defaultItems?: { label: string }[];
  errors?: string[];
}

export default function ProductSizesField({ defaultItems = [], errors }: ProductSizesFieldProps) {
  const [selected, setSelected] = useState<string[]>(defaultItems.map((s) => s.label));
  const [custom, setCustom] = useState("");

  function toggle(size: string) {
    setSelected((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function addCustom() {
    const trimmed = custom.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    setSelected((prev) => [...prev, trimmed]);
    setCustom("");
  }

  function remove(size: string) {
    setSelected((prev) => prev.filter((s) => s !== size));
  }

  const serialized = JSON.stringify(selected.map((label, i) => ({ label, sortOrder: i })));

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name="sizes" value={serialized} />

      <div className="flex flex-col gap-2">
        <Label className="text-xs text-gray-text">Quick select</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggle(size)}
              className={cn(
                "rounded border px-3 py-1 font-lato text-sm transition-colors",
                selected.includes(size)
                  ? "border-brown bg-brown text-cream"
                  : "border-border bg-transparent text-dark hover:border-brown hover:text-brown"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
          placeholder="Custom size (e.g. 16mm)"
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addCustom}>
          <Plus size={15} strokeWidth={1.5} />
          Add
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-gray-text">Selected sizes (in order)</Label>
          <div className="flex flex-wrap gap-2">
            {selected.map((size) => (
              <span
                key={size}
                className="flex items-center gap-1 rounded border border-brown/40 bg-cream px-2.5 py-0.5 font-lato text-sm text-dark"
              >
                {size}
                <button
                  type="button"
                  onClick={() => remove(size)}
                  aria-label={`Remove ${size}`}
                  className="text-gray-text transition-colors hover:text-destructive"
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <p className="font-lato text-sm text-gray-text">No sizes selected — product will show without size options.</p>
      )}

      {errors?.map((msg) => (
        <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
      ))}
    </div>
  );
}
