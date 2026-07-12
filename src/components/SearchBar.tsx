import { Search } from "lucide-react";

export function SearchBar({ value, onChange, placeholder = "Search temples, cities…" }: { value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border/70 bg-card py-3 pl-11 pr-4 text-sm shadow-[var(--shadow-card)] outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}