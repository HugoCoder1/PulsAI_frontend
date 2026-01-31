"use client";

import { useState } from "react";

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
  ChevronLeft,
  ChevronRight,
  Bot,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations",
    badge: 12,
  },
  {
    title: "Tickets",
    icon: Ticket,
    href: "/dashboard/tickets",
    badge: 5,
  },
  {
    title: "Campagnes",
    icon: Megaphone,
    href: "/dashboard/campaigns",
  },
  {
    title: "IA Assistant",
    icon: Bot,
    href: "/dashboard/ai-assistant",
  },
  {
    title: "Contacts",
    icon: Users,
    href: "/dashboard/contacts",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
];

const bottomItems = [
  {
    title: "Paramètres",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Aide",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen bg-card border-r border-border flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">
              P
            </span>
          </div> */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-heading font-bold text-xl text-foreground"
              >
                PulsAI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
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
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive && "text-primary-foreground"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {item.badge}
                </motion.span>
              )}
              {item.badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
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
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* User Profile */}
        <div className="mt-4 pt-4 border-t border-border">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2",
              collapsed && "justify-center"
            )}
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <span className="text-secondary-foreground font-medium text-sm">
                JD
              </span>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    Hugues Hugo
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Admin
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && (
              <button
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
