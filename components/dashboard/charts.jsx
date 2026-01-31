"use client";

import { motion } from "framer-motion";
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

const conversationsData = [
  { name: "Lun", value: 120, resolved: 95 },
  { name: "Mar", value: 180, resolved: 140 },
  { name: "Mer", value: 150, resolved: 120 },
  { name: "Jeu", value: 220, resolved: 180 },
  { name: "Ven", value: 200, resolved: 165 },
  { name: "Sam", value: 80, resolved: 70 },
  { name: "Dim", value: 60, resolved: 55 },
];

const ticketsData = [
  { name: "Jan", open: 45, closed: 38 },
  { name: "Fév", open: 52, closed: 48 },
  { name: "Mar", open: 38, closed: 35 },
  { name: "Avr", open: 65, closed: 58 },
  { name: "Mai", open: 48, closed: 45 },
  { name: "Juin", open: 58, closed: 52 },
];

const channelsData = [
  { name: "WhatsApp", value: 45, color: "#25D366" },
  { name: "Email", value: 25, color: "#3590E3" },
  { name: "Chat Web", value: 20, color: "#BAF09D" },
  { name: "Messenger", value: 10, color: "#0084FF" },
];


// TOOLTIP COMPOSANT

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}:{" "}
            <span className="font-medium text-foreground">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// CONVERSATION COMPOSANT

export function ConversationsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Conversations
          </h3>
          <p className="text-sm text-muted-foreground">
            Activité de la semaine
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">Résolues</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={conversationsData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3590E3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3590E3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="value"
              name="Total"
              stroke="#3590E3"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Résolues"
              stroke="#BAF09D"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorResolved)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}


// TICKET COMPOSANT
export function TicketsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Tickets
          </h3>
          <p className="text-sm text-muted-foreground">6 derniers mois</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Ouverts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">Fermés</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ticketsData} barGap={8}>
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
            <Bar
              dataKey="open"
              name="Ouverts"
              fill="#3590E3"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="closed"
              name="Fermés"
              fill="#BAF09D"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function ChannelsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-foreground">Canaux</h3>
        <p className="text-sm text-muted-foreground">
          Répartition des conversations
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelsData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {channelsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {channelsData.map((channel) => (
            <div key={channel.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: channel.color }}
              />
              <span className="text-sm text-foreground flex-1">
                {channel.name}
              </span>
              <span className="text-sm font-medium text-foreground">
                {channel.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
