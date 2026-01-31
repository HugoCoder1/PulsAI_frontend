"use client";

import { Header } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  ConversationsChart,
  TicketsChart,
  ChannelsChart,
} from "@/components/dashboard/charts";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { MessageSquare, Ticket, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Tableau de bord"
        subtitle="Bienvenue, Jean ! Voici un aperçu de votre activité."
      />

      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Conversations actives"
            value="1,284"
            change="+12.5%"
            changeType="positive"
            icon={MessageSquare}
            delay={0}
          />
          <StatsCard
            title="Tickets ouverts"
            value="42"
            change="-8.2%"
            changeType="positive"
            icon={Ticket}
            delay={0.1}
          />
          <StatsCard
            title="Nouveaux contacts"
            value="856"
            change="+23.1%"
            changeType="positive"
            icon={Users}
            delay={0.2}
          />
          <StatsCard
            title="Taux de résolution"
            value="94.2%"
            change="+2.4%"
            changeType="positive"
            icon={TrendingUp}
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversationsChart />
          <TicketsChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <ChannelsChart />
        </div>
      </div>
    </div>
  );
}
