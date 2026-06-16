"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>;
  confirmText: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label="Delete"
        className="text-gray-text transition-colors hover:text-destructive"
      >
        <Trash2 size={18} strokeWidth={1.5} />
      </button>
    </form>
  );
}
