"use client";

import { useState } from "react";
import { Menu } from "lucide-react"; // Import Menu component
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  Megaphone,
  Users,
  Settings,
  HelpCircle,
  Bot,
  BarChart3,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    title: "Conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    badge: 2,
  },
  { title: "Tickets", icon: Ticket, href: "/dashboard/tickets", badge: 8 },
  { title: "Campagnes", icon: Megaphone, href: "/dashboard/campaigns" },
  { title: "IA Assistant", icon: Bot, href: "/dashboard/ai-assistant" },
  { title: "Contacts", icon: Users, href: "/dashboard/contacts" },
  { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
];

const bottomItems = [
  { title: "Paramètres", icon: Settings, href: "/dashboard/settings" },
  { title: "Aide", icon: HelpCircle, href: "/dashboard/help" },
];

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
        />
      )}
      {mobileOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-card z-50 flex flex-col shadow-xl"
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link
              href="/dashboard"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              {/* <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">
                  P
                </span>
              </div> */}
              <span className="font-heading font-bold text-xl text-foreground">
                PulsAI
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="py-4 px-3 border-t border-border space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}

            {/* User Profile */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-secondary-foreground font-medium">
                    HH
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    Hugues Hugo
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    Admin
                  </p>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
