"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Clock,
  User,
  Tag,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Calendar,
  MessageSquare,
  Paperclip,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tickets = [
  {
    id: "TK-1234",
    title: "Problème de livraison - Colis non reçu",
    description:
      "Le client n'a pas reçu son colis malgré le statut 'livré' dans le suivi.",
    status: "open",
    priority: "high",
    customer: {
      name: "Sophie Martin",
      email: "sophie@email.com",
      avatar: "SM",
    },
    assignee: { name: "Jean Dupont", avatar: "JD" },
    category: "Livraison",
    createdAt: "2024-01-15 10:30",
    updatedAt: "Il y a 2h",
    messages: 5,
    attachments: 2,
  },
  {
    id: "TK-1233",
    title: "Demande de remboursement",
    description:
      "Le client souhaite être remboursé suite à un article défectueux.",
    status: "in_progress",
    priority: "medium",
    customer: {
      name: "Pierre Durand",
      email: "pierre@email.com",
      avatar: "PD",
    },
    assignee: { name: "Marie Lefevre", avatar: "ML" },
    category: "Remboursement",
    createdAt: "2024-01-14 15:45",
    updatedAt: "Il y a 4h",
    messages: 8,
    attachments: 3,
  },
  {
    id: "TK-1232",
    title: "Question sur les modes de paiement",
    description:
      "Le client demande si le paiement en plusieurs fois est disponible.",
    status: "resolved",
    priority: "low",
    customer: {
      name: "Thomas Bernard",
      email: "thomas@email.com",
      avatar: "TB",
    },
    assignee: { name: "Jean Dupont", avatar: "JD" },
    category: "Paiement",
    createdAt: "2024-01-13 09:15",
    updatedAt: "Il y a 1j",
    messages: 3,
    attachments: 0,
  },
  {
    id: "TK-1231",
    title: "Réclamation produit endommagé",
    description: "Article reçu cassé, photos jointes en pièces jointes.",
    status: "open",
    priority: "urgent",
    customer: { name: "Julie Petit", email: "julie@email.com", avatar: "JP" },
    assignee: null,
    category: "Réclamation",
    createdAt: "2024-01-15 14:20",
    updatedAt: "Il y a 30min",
    messages: 2,
    attachments: 4,
  },
  {
    id: "TK-1230",
    title: "Modification d'adresse de livraison",
    description:
      "Le client souhaite changer l'adresse de livraison de sa commande en cours.",
    status: "closed",
    priority: "medium",
    customer: { name: "Lucas Moreau", email: "lucas@email.com", avatar: "LM" },
    assignee: { name: "Marie Lefevre", avatar: "ML" },
    category: "Livraison",
    createdAt: "2024-01-12 11:00",
    updatedAt: "Il y a 2j",
    messages: 4,
    attachments: 1,
  },
];

const statusConfig = {
  open: { label: "Ouvert", color: "bg-primary", textColor: "text-primary" },
  in_progress: {
    label: "En cours",
    color: "bg-[#F59E0B]",
    textColor: "text-[#F59E0B]",
  },
  resolved: {
    label: "Résolu",
    color: "bg-[#10B981]",
    textColor: "text-[#10B981]",
  },
  closed: {
    label: "Fermé",
    color: "bg-muted-foreground",
    textColor: "text-muted-foreground",
  },
};

const priorityConfig = {
  urgent: {
    label: "Urgent",
    color: "bg-destructive text-destructive-foreground",
  },
  high: { label: "Haute", color: "bg-[#F59E0B] text-foreground" },
  medium: { label: "Moyenne", color: "bg-primary text-primary-foreground" },
  low: { label: "Basse", color: "bg-muted text-muted-foreground" },
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <Header title="Tickets" subtitle="Gérez les demandes de support client" />

      <div className="p-4 lg:p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un ticket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="open">Ouverts</option>
                <option value="in_progress">En cours</option>
                <option value="resolved">Résolus</option>
                <option value="closed">Fermés</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nouveau ticket</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  12
                </p>
                <p className="text-xs text-muted-foreground">Ouverts</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  8
                </p>
                <p className="text-xs text-muted-foreground">En cours</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  156
                </p>
                <p className="text-xs text-muted-foreground">Résolus ce mois</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  3
                </p>
                <p className="text-xs text-muted-foreground">Urgents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4">Ticket</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-2">Assigné</div>
            <div className="col-span-1">Priorité</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTicket(ticket)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/30 cursor-pointer transition-colors"
              >
                {/* Ticket Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-2 shrink-0",
                        statusConfig[ticket.status].color
                      )}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {ticket.category}
                        </span>
                      </div>
                      <p className="font-medium text-foreground mt-1 line-clamp-1">
                        {ticket.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1 lg:hidden">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 lg:hidden">
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            priorityConfig[ticket.priority].color
                          )}
                        >
                          {priorityConfig[ticket.priority].label}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            statusConfig[ticket.status].textColor
                          )}
                        >
                          {statusConfig[ticket.status].label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer */}
                <div className="hidden lg:flex lg:col-span-2 items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground">
                      {ticket.customer.avatar}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {ticket.customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {ticket.customer.email}
                    </p>
                  </div>
                </div>

                {/* Assignee */}
                <div className="hidden lg:flex lg:col-span-2 items-center gap-2">
                  {ticket.assignee ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xs font-medium text-secondary-foreground">
                          {ticket.assignee.avatar}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">
                        {ticket.assignee.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      Non assigné
                    </span>
                  )}
                </div>

                {/* Priority */}
                <div className="hidden lg:flex lg:col-span-1 items-center">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      priorityConfig[ticket.priority].color
                    )}
                  >
                    {priorityConfig[ticket.priority].label}
                  </span>
                </div>

                {/* Status */}
                <div className="hidden lg:flex lg:col-span-2 items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        statusConfig[ticket.status].textColor
                      )}
                    >
                      {statusConfig[ticket.status].label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ticket.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-end">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs">{ticket.messages}</span>
                    </div>
                    {ticket.attachments > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-xs">{ticket.attachments}</span>
                      </div>
                    )}
                    <button
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="More options"
                    >
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="flex items-center justify-between lg:hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground">
                        {ticket.customer.avatar}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">
                      {ticket.customer.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {ticket.updatedAt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicketModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewTicketModal(false)}
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
                  Nouveau ticket
                </h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Titre
                  </label>
                  <input
                    type="text"
                    placeholder="Décrivez brièvement le problème..."
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Détaillez le problème rencontré..."
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Priorité
                    </label>
                    <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Catégorie
                    </label>
                    <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="livraison">Livraison</option>
                      <option value="paiement">Paiement</option>
                      <option value="remboursement">Remboursement</option>
                      <option value="reclamation">Réclamation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Client
                  </label>
                  <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Pieces jointes
                  </label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Paperclip className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Glissez vos fichiers ici ou{" "}
                        <span className="text-primary hover:underline">
                          parcourir
                        </span>
                      </p>
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-2 bg-muted rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground truncate max-w-[200px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {file.size}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(file.id)}
                            className="p-1 rounded hover:bg-background transition-colors"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Annuler
                </button>
                <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Créer le ticket
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-card border-l border-border shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      {selectedTicket.id}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        priorityConfig[selectedTicket.priority].color
                      )}
                    >
                      {priorityConfig[selectedTicket.priority].label}
                    </span>
                  </div>
                  <h2 className="font-heading font-semibold text-lg text-foreground mt-1">
                    {selectedTicket.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Statut</p>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        statusConfig[selectedTicket.status].textColor
                      )}
                    >
                      {statusConfig[selectedTicket.status].label}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      Catégorie
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedTicket.category}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Client
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium text-foreground">
                        {selectedTicket.customer.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {selectedTicket.customer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTicket.customer.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Assigné à
                  </h3>
                  {selectedTicket.assignee ? (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-secondary-foreground">
                          {selectedTicket.assignee.avatar}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">
                        {selectedTicket.assignee.name}
                      </p>
                    </div>
                  ) : (
                    <button className="w-full p-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      + Assigner un agent
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Activité
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Jean Dupont</span> a
                          répondu au ticket
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Il y a 2h
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          Ticket créé par{" "}
                          <span className="font-medium">
                            {selectedTicket.customer.name}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedTicket.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border flex gap-3">
                <button className="flex-1 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  Marquer résolu
                </button>
                <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Répondre
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
