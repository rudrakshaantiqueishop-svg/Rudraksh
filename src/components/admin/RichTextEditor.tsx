"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  ImageIcon,
  Minus,
  Table as TableIcon,
  Video as YoutubeIcon,
  Columns3,
  Rows3,
  Trash2,
  Undo,
  Redo,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toEditorHtml } from "@/lib/blog-content";

interface RichTextEditorProps {
  label: string;
  name: string;
  defaultValue?: string;
  errors?: string[];
  helperText?: string;
}

// Module-level constants — stable references, never recreated between renders.
// This prevents Tiptap from calling setOptions/updateState on every keystroke,
// which was causing heading toggles to land on the wrong paragraph.
const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    link: { openOnClick: false, autolink: true },
    heading: { levels: [2, 3, 4] },
  }),
  Image.configure({ HTMLAttributes: { class: "max-w-full rounded-lg" } }),
  Placeholder.configure({ placeholder: "Write your post here..." }),
  TableKit.configure({ table: { resizable: true, HTMLAttributes: { class: "blog-table" } } }),
  Youtube.configure({ width: 640, height: 360, nocookie: true, HTMLAttributes: { class: "blog-video" } }),
];

const EDITOR_PROPS = {
  attributes: { class: "tiptap-editor" },
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex size-8 items-center justify-center rounded border border-transparent text-gray-text transition-colors hover:border-border hover:bg-secondary hover:text-dark disabled:pointer-events-none disabled:opacity-40",
        active && "border-border bg-brown text-cream hover:bg-brown hover:text-cream"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-0.5 h-5 w-px shrink-0 bg-border" />;
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL or path", "/assets/images/");
    if (!url) return;
    const alt = window.prompt("Image alt text (describe the image for accessibility & SEO)", "") ?? "";
    editor.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("YouTube video URL", "https://www.youtube.com/watch?v=");
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  const insertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-secondary/50 px-2 py-1.5">
      {/* Text formatting */}
      <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={15} strokeWidth={2} />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={15} strokeWidth={1.5} />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton label="Heading 2 (large section title)" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Heading 3 (sub-section title)" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Heading 4 (minor heading)" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        <Heading4 size={15} strokeWidth={1.5} />
      </ToolbarButton>

      <Divider />

      {/* Lists & quote */}
      <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={15} strokeWidth={1.5} />
      </ToolbarButton>

      <Divider />

      {/* Link & image */}
      <ToolbarButton label="Add / edit link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Remove link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}>
        <Unlink size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Insert image" onClick={addImage}>
        <ImageIcon size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Embed YouTube video" onClick={addYoutube}>
        <YoutubeIcon size={15} strokeWidth={1.5} />
      </ToolbarButton>

      <Divider />

      {/* Blocks: divider & table */}
      <ToolbarButton label="Horizontal divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Insert table" onClick={insertTable}>
        <TableIcon size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Add column" disabled={!editor.can().addColumnAfter()} onClick={() => editor.chain().focus().addColumnAfter().run()}>
        <Columns3 size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Add row" disabled={!editor.can().addRowAfter()} onClick={() => editor.chain().focus().addRowAfter().run()}>
        <Rows3 size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Delete table" disabled={!editor.can().deleteTable()} onClick={() => editor.chain().focus().deleteTable().run()}>
        <Trash2 size={15} strokeWidth={1.5} />
      </ToolbarButton>

      <Divider />

      {/* History */}
      <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo size={15} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo size={15} strokeWidth={1.5} />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({ label, name, defaultValue, errors, helperText }: RichTextEditorProps) {
  const [initialContent] = useState(() => toEditorHtml(defaultValue));
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = editor.getHTML();
      }
    },
    editorProps: EDITOR_PROPS,
  });

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="overflow-hidden rounded-lg border border-input bg-transparent">
        {editor ? (
          <>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
          </>
        ) : (
          <div className="min-h-[300px]" />
        )}
      </div>
      <input ref={hiddenInputRef} type="hidden" name={name} defaultValue={initialContent} />
      {helperText && <p className="font-lato text-xs text-gray-text">{helperText}</p>}
      {errors?.map((msg) => (
        <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
      ))}
    </div>
  );
}
