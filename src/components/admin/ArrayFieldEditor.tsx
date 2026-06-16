"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ArrayFieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  preview?: boolean;
}

interface ArrayFieldEditorProps {
  name: string;
  label: string;
  fields: ArrayFieldConfig[];
  defaultItems?: Record<string, unknown>[];
  emptyItem: Record<string, unknown>;
  errors?: string[];
}

export default function ArrayFieldEditor({
  name,
  label,
  fields,
  defaultItems = [],
  emptyItem,
  errors,
}: ArrayFieldEditorProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>(defaultItems);

  function updateItem(index: number, key: string, value: unknown) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }]);
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const serialized = JSON.stringify(items.map((item, index) => ({ ...item, sortOrder: index })));
  const previewField = fields.find((field) => field.preview);

  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={serialized} />

      {items.length === 0 && (
        <p className="font-lato text-sm text-gray-text">Nothing added yet.</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 border border-border p-3 sm:flex-row sm:items-end sm:gap-3"
        >
          {previewField && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={String(item[previewField.key] ?? "")}
              alt=""
              className="size-16 shrink-0 border border-border bg-secondary object-cover"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
              onLoad={(e) => {
                e.currentTarget.style.visibility = "visible";
              }}
            />
          )}

          {fields.map((field) => (
            <div key={field.key} className="flex flex-1 flex-col gap-1.5">
              <Label className="text-xs">{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={String(item[field.key] ?? "")}
                  onValueChange={(value) => updateItem(index, field.key, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type === "number" ? "number" : "text"}
                  value={String(item[field.key] ?? "")}
                  placeholder={field.placeholder}
                  onChange={(e) => updateItem(index, field.key, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 sm:gap-1.5 sm:pb-3">
            <button
              type="button"
              aria-label="Move up"
              onClick={() => moveItem(index, -1)}
              disabled={index === 0}
              className="text-gray-text transition-colors hover:text-dark disabled:opacity-30"
            >
              <ChevronUp size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Move down"
              onClick={() => moveItem(index, 1)}
              disabled={index === items.length - 1}
              className="text-gray-text transition-colors hover:text-dark disabled:opacity-30"
            >
              <ChevronDown size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Remove"
              onClick={() => removeItem(index)}
              className="text-gray-text transition-colors hover:text-destructive"
            >
              <Trash2 size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-fit">
        <Plus size={16} strokeWidth={1.5} />
        Add {label}
      </Button>

      {errors?.map((message) => (
        <span key={message} className="font-lato text-[13px] text-destructive">
          {message}
        </span>
      ))}
    </div>
  );
}
