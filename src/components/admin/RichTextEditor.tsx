"use client";

import { useCallback, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
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
        "flex size-8 items-center justify-center border border-transparent text-gray-text transition-colors hover:border-border hover:text-dark disabled:pointer-events-none disabled:opacity-40",
        active && "border-border bg-brown text-cream hover:text-cream"
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-input bg-secondary/40 p-1.5">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        label="Bullet List"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered List"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Add Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Remove Link"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Unlink size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo size={16} strokeWidth={1.5} />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo size={16} strokeWidth={1.5} />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  label,
  name,
  defaultValue,
  errors,
  helperText,
}: RichTextEditorProps) {
  const [html, setHtml] = useState(() => toEditorHtml(defaultValue));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your post..." }),
    ],
    content: html,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] max-w-none px-3 py-2 font-lato text-sm text-dark focus:outline-none [&_p]:my-2 [&_h2]:font-prata [&_h2]:text-xl [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:font-prata [&_h3]:text-lg [&_h3]:mt-3 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-brown [&_blockquote]:pl-3 [&_blockquote]:text-gray-text [&_a]:text-brown [&_a]:underline",
      },
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="rounded-lg border border-input bg-transparent">
        {editor ? (
          <>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
          </>
        ) : (
          <div className="min-h-[300px]" />
        )}
      </div>
      <input type="hidden" name={name} value={html} />
      {helperText && <p className="font-lato text-xs text-gray-text">{helperText}</p>}
      {errors?.map((message) => (
        <span key={message} className="font-lato text-[13px] text-destructive">
          {message}
        </span>
      ))}
    </div>
  );
}
