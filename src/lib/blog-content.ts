const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

export function isHtmlContent(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function plainTextToHtml(value: string): string {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export function toEditorHtml(body?: string): string {
  if (!body) return "";
  return isHtmlContent(body) ? body : plainTextToHtml(body);
}
