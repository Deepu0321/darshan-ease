import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, MobileTabs, type SidebarItem } from "@/components/Sidebar";

export function DashboardLayout({ title, subtitle, items, children }: { title: string; subtitle?: string; items: SidebarItem[]; children: ReactNode; }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar title={title} items={items} />
        <main className="flex-1 px-4 py-8 sm:px-8">
          {subtitle && <p className="mb-6 text-sm text-muted-foreground">{subtitle}</p>}
          <MobileTabs items={items} />
          {children}
        </main>
      </div>
    </div>
  );
}