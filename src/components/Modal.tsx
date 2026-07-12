import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-border/60 bg-muted/40 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmModal({ open, onClose, title, message, onConfirm, confirmLabel = "Confirm", tone = "primary" }: { open: boolean; onClose: () => void; title: string; message: string; onConfirm: () => void; confirmLabel?: string; tone?: "primary" | "destructive"; }) {
  return (
    <Modal open={open} onClose={onClose} title={title} footer={
      <>
        <button onClick={onClose} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} className={`rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] ${tone === "destructive" ? "bg-destructive" : "bg-primary"}`}>{confirmLabel}</button>
      </>
    }>
      <p className="text-sm text-muted-foreground">{message}</p>
    </Modal>
  );
}