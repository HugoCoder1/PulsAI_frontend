"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  CheckCheck,
  Bot,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: 1,
    name: "Sophie Martin",
    avatar: "SM",
    lastMessage: "Bonjour, j'ai un problème avec ma commande #12345",
    time: "2 min",
    unread: 3,
    status: "online",
    channel: "whatsapp",
  },
  {
    id: 2,
    name: "Pierre Durand",
    avatar: "PD",
    lastMessage: "Merci pour votre aide rapide !",
    time: "15 min",
    unread: 0,
    status: "offline",
    channel: "email",
  },
  {
    id: 3,
    name: "Marie Lefevre",
    avatar: "ML",
    lastMessage: "Pouvez-vous me confirmer la date de livraison ?",
    time: "30 min",
    unread: 1,
    status: "online",
    channel: "chat",
  },
  {
    id: 4,
    name: "Thomas Bernard",
    avatar: "TB",
    lastMessage: "J'attends toujours une réponse concernant mon remboursement",
    time: "1h",
    unread: 0,
    status: "away",
    channel: "messenger",
  },
  {
    id: 5,
    name: "Julie Petit",
    avatar: "JP",
    lastMessage: "Super, merci beaucoup !",
    time: "2h",
    unread: 0,
    status: "offline",
    channel: "whatsapp",
  },
];

const messages = [
  {
    id: 1,
    sender: "customer",
    content: "Bonjour, j'ai un problème avec ma commande #12345",
    time: "10:30",
    status: "read",
  },
  {
    id: 2,
    sender: "agent",
    content:
      "Bonjour Sophie ! Je vais vérifier votre commande immédiatement. Pouvez-vous me donner plus de détails sur le problème rencontré ?",
    time: "10:32",
    status: "read",
  },
  {
    id: 3,
    sender: "customer",
    content:
      "J'ai commandé 3 articles mais je n'en ai reçu que 2. Il manque le t-shirt bleu taille M.",
    time: "10:35",
    status: "read",
  },
  {
    id: 4,
    sender: "ai",
    content:
      "D'après notre système, votre commande a été expédiée en 2 colis. Le second colis contenant le t-shirt bleu est en cours de livraison et devrait arriver demain.",
    time: "10:36",
    status: "read",
    isAI: true,
  },
  {
    id: 5,
    sender: "customer",
    content:
      "Ah d'accord ! Merci pour l'information. Est-ce que je peux suivre ce colis ?",
    time: "10:38",
    status: "delivered",
  },
];

const channelColors = {
  whatsapp: "bg-[#25D366]",
  email: "bg-primary",
  chat: "bg-secondary",
  messenger: "bg-[#0084FF]",
};

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread =
      activeFilter === "all" || (activeFilter === "unread" && conv.unread > 0);
    const matchesChannel =
      channelFilter === "all" || conv.channel === channelFilter;
    return matchesSearch && matchesUnread && matchesChannel;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle send message
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        title="Conversations"
        subtitle="Gérez vos conversations clients"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-card">
          {/* Search & Filter */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                  filterOpen
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <Filter className="w-4 h-4" />
                Filtres
              </button>
              <button
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  activeFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                Tous
              </button>
              <button
                onClick={() => setActiveFilter("unread")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  activeFilter === "unread"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                Non lus
              </button>
            </div>
            {filterOpen && (
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Canal:</span>
                {["all", "whatsapp", "email", "chat", "messenger"].map(
                  (channel) => (
                    <button
                      key={channel}
                      onClick={() => setChannelFilter(channel)}
                      className={cn(
                        "px-2 py-1 rounded-md text-xs transition-colors capitalize",
                        channelFilter === channel
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {channel === "all" ? "Tous" : channel}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "p-4 border-b border-border cursor-pointer transition-colors",
                  selectedConversation?.id === conv.id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-foreground font-medium">
                        {conv.avatar}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                        conv.status === "online" && "bg-[#10B981]",
                        conv.status === "offline" && "bg-muted-foreground",
                        conv.status === "away" && "bg-[#F59E0B]"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {conv.name}
                        </p>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            channelColors[conv.channel]
                          )}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-background">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-card">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-foreground font-medium text-sm">
                        {selectedConversation.avatar}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                        selectedConversation.status === "online" &&
                          "bg-[#10B981]",
                        selectedConversation.status === "offline" &&
                          "bg-muted-foreground",
                        selectedConversation.status === "away" && "bg-[#F59E0B]"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedConversation.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {selectedConversation.status === "online"
                        ? "En ligne"
                        : selectedConversation.status === "away"
                        ? "Absent"
                        : "Hors ligne"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Call"
                  >
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Video call"
                  >
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      showInfo
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                    aria-label="Info"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      msg.sender === "customer"
                        ? "justify-start"
                        : "justify-end"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-3",
                        msg.sender === "customer"
                          ? "bg-muted text-foreground rounded-bl-md"
                          : msg.isAI
                          ? "bg-secondary text-secondary-foreground rounded-br-md"
                          : "bg-primary text-primary-foreground rounded-br-md"
                      )}
                    >
                      {msg.isAI && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Bot className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            Assistant IA
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sender !== "customer" && (
                          <CheckCheck
                            className={cn(
                              "w-4 h-4",
                              msg.status === "read"
                                ? "text-primary-foreground"
                                : "opacity-50"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end gap-3">
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Attach file"
                  >
                    <Paperclip className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Tapez votre message..."
                      rows={1}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Emoji"
                  >
                    <Smile className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-secondary-foreground text-xs font-medium hover:bg-secondary transition-colors">
                    <Bot className="w-3 h-3" />
                    Suggérer réponse IA
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:text-foreground transition-colors">
                    Réponses rapides
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Sélectionnez une conversation
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && selectedConversation && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block border-l border-border bg-card overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">
                  Informations
                </h3>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close info panel"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <span className="text-foreground font-heading font-bold text-2xl">
                      {selectedConversation.avatar}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground mt-3">
                    {selectedConversation.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Client depuis 2023
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Informations de contact
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Email
                      </span>
                      <span className="text-sm text-foreground">
                        sophie@email.com
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Téléphone
                      </span>
                      <span className="text-sm text-foreground">
                        +33 6 12 34 56 78
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Localisation
                      </span>
                      <span className="text-sm text-foreground">
                        Paris, France
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Statistiques
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        12
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Conversations
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        3
                      </p>
                      <p className="text-xs text-muted-foreground">Tickets</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <button className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                    Voir le profil complet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
