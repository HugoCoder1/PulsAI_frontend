"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Ticket,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { activities } from "@/utils/data";

const statusConfig = {
  new: { color: "bg-primary", icon: MessageSquare },
  resolved: { color: "bg-[#10B981]", icon: CheckCircle },
  auto: { color: "bg-secondary", icon: User },
  urgent: { color: "bg-destructive", icon: AlertCircle },
  pending: { color: "bg-[#F59E0B]", icon: Clock },
};

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Activité récente
          </h3>
          <p className="text-sm text-muted-foreground">
            Dernières actions sur la plateforme
          </p>
        </div>
        {/* <button className="text-sm text-primary font-medium hover:underline">
          Voir tout
        </button> */}
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = statusConfig[activity.status];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  activity.avatar === "AI" ? "bg-primary" : "bg-muted"
                )}
              >
                {activity.avatar === "AI" ? (
                  <span className="text-primary-foreground font-heading font-bold text-xs">
                    AI
                  </span>
                ) : (
                  <span className="text-foreground font-medium text-sm">
                    {activity.avatar}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <div className={cn("w-2 h-2 rounded-full", config.color)} />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
