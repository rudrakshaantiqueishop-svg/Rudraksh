"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductCollectionsFieldProps {
  collections: { id: string; name: string }[];
  defaultValue?: string[];
}

export default function ProductCollectionsField({
  collections,
  defaultValue = [],
}: ProductCollectionsFieldProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  function toggle(id: string, checked: boolean) {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((collectionId) => collectionId !== id)));
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Collections</Label>
      <input type="hidden" name="collectionIds" value={JSON.stringify(selected)} />
      <div className="flex flex-wrap gap-4">
        {collections.map((collection) => (
          <label key={collection.id} className="flex items-center gap-2 font-lato text-sm text-dark">
            <Checkbox
              checked={selected.includes(collection.id)}
              onCheckedChange={(checked) => toggle(collection.id, checked === true)}
            />
            {collection.name}
          </label>
        ))}
      </div>
    </div>
  );
}
