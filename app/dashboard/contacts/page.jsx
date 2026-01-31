"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  Eye,
  Download,
  Upload,
  ChevronDown,
  X,
  Star,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contacts, tagColors } from "@/utils/data";


export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <Header
        title="Contacts"
        subtitle="Gérez votre base de contacts clients"
      />

      <div className="p-4 lg:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <p className="text-3xl font-heading font-bold text-foreground">
              {contacts.length}
            </p>
            <p className="text-sm text-muted-foreground">Contacts totaux</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <p className="text-3xl font-heading font-bold text-foreground">
              {contacts.filter((c) => c.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Contacts actifs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <p className="text-3xl font-heading font-bold text-foreground">
              {contacts.filter((c) => c.tags.includes("VIP")).length}
            </p>
            <p className="text-sm text-muted-foreground">Clients VIP</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <p className="text-3xl font-heading font-bold text-foreground">
              {(
                contacts.reduce((acc, c) => acc + c.totalSpent, 0) / 1000
              ).toFixed(1)}
              k€
            </p>
            <p className="text-sm text-muted-foreground">Valeur totale</p>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exporter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Importer</span>
            </button>
            <button
              onClick={() => setShowNewContactModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nouveau contact</span>
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-heading font-bold">
                        {contact.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-semibold text-foreground">
                          {contact.name}
                        </h3>
                        {contact.tags.includes("VIP") && (
                          <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contact.company}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      contact.status === "active"
                        ? "bg-[#10B981]"
                        : "bg-muted-foreground"
                    )}
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{contact.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {contact.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        tagColors[tag] || tagColors.Standard
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-heading font-bold text-foreground">
                      {contact.totalOrders}
                    </p>
                    <p className="text-xs text-muted-foreground">Commandes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-heading font-bold text-foreground">
                      {contact.totalSpent}€
                    </p>
                    <p className="text-xs text-muted-foreground">Dépensé</p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Dernier contact: {contact.lastContact}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="View contact"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Edit contact"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Send message"
                  >
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Contact Modal */}
      <AnimatePresence>
        {showNewContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewContactModal(false)}
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
                  Nouveau contact
                </h2>
                <button
                  onClick={() => setShowNewContactModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Prénom
                    </label>
                    <input
                      type="text"
                      placeholder="Jean"
                      className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nom
                    </label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="jean.dupont@email.com"
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Localisation
                  </label>
                  <input
                    type="text"
                    placeholder="Paris, France"
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Tags
                  </label>
                  <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ajoutez des notes sur ce contact..."
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button
                  onClick={() => setShowNewContactModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Annuler
                </button>
                <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Créer le contact
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Detail Panel */}
      <AnimatePresence>
        {selectedContact && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Détails du contact
                </h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Profile */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-primary font-heading font-bold text-2xl">
                      {selectedContact.avatar}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mt-4">
                    {selectedContact.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedContact.company}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {selectedContact.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          tagColors[tag] || tagColors.Standard
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Informations de contact
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {selectedContact.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {selectedContact.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {selectedContact.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Statistiques
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted/50 rounded-xl text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {selectedContact.totalOrders}
                      </p>
                      <p className="text-xs text-muted-foreground">Commandes</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {selectedContact.totalSpent}€
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total dépensé
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">
                    Activité récente
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          Conversation initiée
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Il y a 2 jours
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          Commande #12345 passée
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Il y a 5 jours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border flex gap-3">
                <button className="flex-1 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  Modifier
                </button>
                <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Contacter
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
