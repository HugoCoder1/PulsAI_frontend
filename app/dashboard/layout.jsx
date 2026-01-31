"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/sidebar-context";

function DashboardContent({ children }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      <main
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          collapsed ? "lg:ml-20" : "lg:ml-70"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
