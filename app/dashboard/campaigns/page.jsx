"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  Eye,
  MousePointer,
  Calendar,
  Edit2,
  Copy,
  Trash2,
  Play,
  Pause,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { campaigns, statusConfig } from "@/utils/data";

const typeConfig = {
  email: { label: "Email", icon: Mail, color: "text-primary" },
  sms: { label: "SMS", icon: MessageSquare, color: "text-[#10B981]" },
  whatsapp: { label: "WhatsApp", icon: Send, color: "text-[#25D366]" },
};

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCampaignType, setSelectedCampaignType] = useState(null);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStats = {
    campaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    totalAudience: campaigns.reduce((acc, c) => acc + c.audience, 0),
    totalSent: campaigns.reduce((acc, c) => acc + c.sent, 0),
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Campagnes"
        subtitle="Créez et gérez vos campagnes marketing"
      />

      <div className="p-4 lg:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {totalStats.campaigns}
                </p>
                <p className="text-sm text-muted-foreground">
                  Campagnes totales
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Play className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {totalStats.activeCampaigns}
                </p>
                <p className="text-sm text-muted-foreground">
                  Campagnes actives
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {(totalStats.totalAudience / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-muted-foreground">Audience totale</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                <Send className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {(totalStats.totalSent / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-muted-foreground">
                  Messages envoyés
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une campagne..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setShowNewCampaignModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle campagne
          </button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign, index) => {
            const StatusIcon = statusConfig[campaign.status].icon;
            const TypeIcon = typeConfig[campaign.type].icon;
            const openRate =
              campaign.sent > 0
                ? ((campaign.opened / campaign.sent) * 100).toFixed(1)
                : 0;
            const clickRate =
              campaign.opened > 0
                ? ((campaign.clicked / campaign.opened) * 100).toFixed(1)
                : 0;

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                {/* Header */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          campaign.type === "email" && "bg-primary/10",
                          campaign.type === "sms" && "bg-[#10B981]/10",
                          campaign.type === "whatsapp" && "bg-[#25D366]/10"
                        )}
                      >
                        <TypeIcon
                          className={cn(
                            "w-5 h-5",
                            typeConfig[campaign.type].color
                          )}
                        />
                      </div>
                      <div>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1",
                            statusConfig[campaign.status].color + "/10",
                            statusConfig[campaign.status].textColor
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[campaign.status].label}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === campaign.id ? null : campaign.id
                          )
                        }
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        aria-label="More options"
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <AnimatePresence>
                        {activeMenu === campaign.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-full mt-1 w-40 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-10"
                          >
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                              <Edit2 className="w-4 h-4" />
                              Modifier
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                              <Copy className="w-4 h-4" />
                              Dupliquer
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mt-3 line-clamp-1">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {campaign.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Audience</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {campaign.audience.toLocaleString()}
                    </span>
                  </div>

                  {campaign.status !== "draft" && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>Taux d'ouverture</span>
                        </div>
                        <span className="font-medium text-foreground">
                          {openRate}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MousePointer className="w-4 h-4" />
                          <span>Taux de clic</span>
                        </div>
                        <span className="font-medium text-foreground">
                          {clickRate}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Envoyés</span>
                          <span>
                            {campaign.sent.toLocaleString()} /{" "}
                            {campaign.audience.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${
                                (campaign.sent / campaign.audience) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{campaign.startDate}</span>
                    </div>
                    <span>→</span>
                    <span>{campaign.endDate}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-muted/30 border-t border-border">
                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir les détails
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* New Campaign Modal */}
      <AnimatePresence>
        {showNewCampaignModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewCampaignModal(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card rounded-2xl border border-border shadow-xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Nouvelle campagne
                </h2>
                <button
                  onClick={() => setShowNewCampaignModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nom de la campagne
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Soldes d'été 2024"
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez l'objectif de votre campagne..."
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Type de campagne
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(typeConfig).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedCampaignType(key)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          selectedCampaignType === key
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <config.icon className={cn("w-6 h-6", config.color)} />
                        <span className="text-sm font-medium text-foreground">
                          {config.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Date de début
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Audience cible
                  </label>
                  <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="all">Tous les contacts</option>
                    <option value="active">Clients actifs</option>
                    <option value="inactive">Clients inactifs</option>
                    <option value="vip">Clients VIP</option>
                    <option value="new">Nouveaux clients</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button
                  onClick={() => setShowNewCampaignModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Annuler
                </button>
                <button className="px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  Enregistrer brouillon
                </button>
                <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Créer la campagne
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
