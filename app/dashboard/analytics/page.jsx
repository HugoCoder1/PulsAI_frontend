"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Target,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  channelPerformance,
  hourlyData,
  monthlyData,
  satisfactionData,
} from "@/utils/data";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}:{" "}
            <span className="font-medium text-foreground">
              {entry.value.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("12m");

  return (
    <div className="min-h-screen">
      <Header
        title="Analytics"
        subtitle="Analysez les performances de votre support client"
      />

      <div className="p-4 lg:p-6 space-y-6">
        {/* Date Range Selector */}
        <div className="flex justify-end">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="3m">3 derniers mois</option>
              <option value="12m">12 derniers mois</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Conversations totales
                </p>
                <p className="text-3xl font-heading font-bold text-foreground mt-2">
                  24,521
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">
                    +18.2%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs période précédente
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Temps de réponse moyen
                </p>
                <p className="text-3xl font-heading font-bold text-foreground mt-2">
                  3.2 min
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingDown className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">
                    -24%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs période précédente
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#F59E0B]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Taux de résolution
                </p>
                <p className="text-3xl font-heading font-bold text-foreground mt-2">
                  94.8%
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">
                    +2.1%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs période précédente
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Score de satisfaction
                </p>
                <p className="text-3xl font-heading font-bold text-foreground mt-2">
                  4.6/5
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">
                    +0.3
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs période précédente
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  Volume de conversations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Évolution sur 12 mois
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">
                    Conversations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">
                    Résolutions
                  </span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3590E3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3590E3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BAF09D" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#BAF09D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="conversations"
                    name="Conversations"
                    stroke="#3590E3"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorConv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolutions"
                    name="Résolutions"
                    stroke="#BAF09D"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Peak Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-foreground">
                Heures de pointe
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribution des conversations par heure
              </p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    name="Conversations"
                    fill="#3590E3"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Satisfaction Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-foreground">
                Satisfaction client
              </h3>
              <p className="text-sm text-muted-foreground">
                Répartition des avis
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {satisfactionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground flex-1">
                      {item.name}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Channel Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2 bg-card rounded-2xl border border-border p-6"
          >
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-foreground">
                Performance par canal
              </h3>
              <p className="text-sm text-muted-foreground">
                Comparaison des métriques clés
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Canal
                    </th>
                    <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Conversations
                    </th>
                    <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Temps de réponse
                    </th>
                    <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {channelPerformance.map((channel, index) => (
                    <motion.tr
                      key={channel.channel}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              channel.channel === "WhatsApp" &&
                                "bg-[#25D366]/10",
                              channel.channel === "Email" && "bg-primary/10",
                              channel.channel === "Chat Web" && "bg-secondary",
                              channel.channel === "Messenger" &&
                                "bg-[#0084FF]/10"
                            )}
                          >
                            <MessageSquare
                              className={cn(
                                "w-4 h-4",
                                channel.channel === "WhatsApp" &&
                                  "text-[#25D366]",
                                channel.channel === "Email" && "text-primary",
                                channel.channel === "Chat Web" &&
                                  "text-secondary-foreground",
                                channel.channel === "Messenger" &&
                                  "text-[#0084FF]"
                              )}
                            />
                          </div>
                          <span className="font-medium text-foreground">
                            {channel.channel}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="font-medium text-foreground">
                          {channel.conversations.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span className="font-medium text-foreground">
                          {channel.responseTime} min
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={cn(
                            "font-medium",
                            channel.satisfaction >= 90
                              ? "text-[#10B981]"
                              : "text-[#F59E0B]"
                          )}
                        >
                          {channel.satisfaction}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                Exporter les données
              </h3>
              <p className="text-sm text-muted-foreground">
                Téléchargez un rapport détaillé de vos performances
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2.5 bg-muted rounded-xl text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
                Exporter CSV
              </button>
              <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                Générer rapport PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
