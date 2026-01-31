"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Search,
  Book,
  MessageCircle,
  Video,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Headphones,
  Zap,
  Settings,
  Users,
  BarChart3,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, faqs, guides } from "@/utils/data";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Header
        title="Centre d'aide"
        subtitle="Trouvez des reponses a vos questions"
      />

      <div className="p-4 lg:p-6">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? "all" : category.id
                )
              }
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all",
                selectedCategory === category.id
                  ? "bg-primary/5 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              <category.icon className={cn("w-6 h-6", category.color)} />
              <span className="text-sm font-medium text-foreground">
                {category.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border">
              <div className="p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary" />
                  Questions frequentes
                </h2>
              </div>
              <div className="divide-y divide-border">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                            expandedFaq === index && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Aucun resultat trouve pour votre recherche.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Guides */}
            <div className="bg-card rounded-2xl border border-border">
              <div className="p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Guides rapides
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {guides.map((guide, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        guide.type === "video"
                          ? "bg-destructive/10"
                          : "bg-primary/10"
                      )}
                    >
                      {guide.type === "video" ? (
                        <Video className="w-5 h-5 text-destructive" />
                      ) : (
                        <FileText className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {guide.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {guide.duration}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  Besoin d'aide ?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Notre equipe est la pour vous
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Demarrer un chat
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  <Mail className="w-4 h-4" />
                  Envoyer un email
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Reponse sous 2h en moyenne</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Ressources</h3>
              <div className="space-y-2">
                {[
                  { label: "Documentation API", href: "#" },
                  { label: "Changelog", href: "#" },
                  { label: "Statut des services", href: "#" },
                  { label: "Communaute", href: "#" },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
