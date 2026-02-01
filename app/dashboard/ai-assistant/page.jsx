"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Zap,
  Brain,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { initialMessages, suggestedPrompts } from "@/utils/data";


export default function AIAssistantPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content = inputValue) => {
    if (!content.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        default:
          "Je comprends votre demande. Voici quelques suggestions pour vous aider :\n\n1. **Analysez les données** - Examinez les métriques de vos conversations récentes\n2. **Personnalisez vos réponses** - Utilisez le nom du client et référencez son historique\n3. **Automatisez les tâches répétitives** - Configurez des réponses automatiques pour les questions fréquentes\n\nSouhaitez-vous que je développe l'un de ces points ?",
        client:
          "Voici un modèle de réponse professionnelle pour un client mécontent :\n\n---\n\n**Objet : Suite à votre réclamation**\n\nCher(e) [Nom du client],\n\nJe vous remercie de nous avoir fait part de votre retour. Je comprends parfaitement votre frustration et je tiens à vous présenter nos sincères excuses pour cette expérience.\n\nNous prenons votre situation très au sérieux et voici les actions que nous allons entreprendre :\n\n1. [Action corrective spécifique]\n2. [Compensation si applicable]\n3. [Suivi prévu]\n\nN'hésitez pas à me contacter directement si vous avez d'autres questions.\n\nCordialement,\n[Votre nom]\n\n---\n\nVoulez-vous que je personnalise ce modèle pour un cas spécifique ?",
        campagne:
          'Voici quelques idées de campagne marketing pour la Saint-Valentin :\n\n💝 **1. "Match parfait"**\nCampagne de recommandation personnalisée basée sur les achats précédents du partenaire\n\n💌 **2. "Love Box"**\nOffre exclusive avec coffret cadeau personnalisable + livraison express garantie\n\n💕 **3. "Duo amoureux"**\nRéduction de 20% pour l\'achat de 2 produits complémentaires\n\n🎁 **4. "Dernière minute"**\nCampagne SMS ciblée J-3 avec e-carte cadeau instantanée\n\n📊 **Recommandation** : Je suggère de combiner l\'email marketing (J-14) + SMS de relance (J-3) pour maximiser les conversions.\n\nSouhaitez-vous que je développe l\'une de ces idées ?',
      };

      let responseContent = aiResponses.default;
      if (
        content.toLowerCase().includes("client") ||
        content.toLowerCase().includes("réponse")
      ) {
        responseContent = aiResponses.client;
      } else if (
        content.toLowerCase().includes("campagne") ||
        content.toLowerCase().includes("marketing") ||
        content.toLowerCase().includes("valentin")
      ) {
        responseContent = aiResponses.campagne;
      }

      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        title="Assistant IA"
        subtitle="Votre copilote intelligent pour le support client"
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      message.role === "assistant"
                        ? "bg-primary"
                        : "bg-secondary"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <User className="w-5 h-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex-1 max-w-[80%]",
                      message.role === "user" ? "flex flex-col items-end" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-5 py-4",
                        message.role === "assistant"
                          ? "bg-card border border-border"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "text-sm leading-relaxed whitespace-pre-wrap",
                          message.role === "assistant"
                            ? "text-foreground"
                            : "text-primary-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-2 mt-2",
                        message.role === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              handleCopy(message.id, message.content)
                            }
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Copy message"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-4 h-4 text-[#10B981]" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Like message"
                          >
                            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Dislike message"
                          >
                            <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Regenerate response"
                          >
                            <RefreshCw className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-5 py-4">
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestion Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 lg:px-6 pb-4">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm text-muted-foreground mb-3">
                  Suggestions :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSendMessage(prompt.prompt)}
                      className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl text-left hover:border-primary hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <prompt.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {prompt.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {prompt.prompt}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 lg:p-6 border-t border-border bg-card">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez votre question à l'assistant IA..."
                    rows={1}
                    className="w-full px-4 py-3 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-12 max-h-32"
                    style={{ height: "auto" }}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                L'IA peut faire des erreurs. Vérifiez les informations
                importantes.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-80 border-l border-border bg-card p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* AI Stats */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Statistiques IA
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground">
                        1,284
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requêtes ce mois
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Zap className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground">
                        94%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Taux de satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity*/}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Capacités
              </h3>
              <div className="space-y-2">
                {[
                  "Rédaction de réponses clients",
                  "Analyse de sentiment",
                  "Suggestions de campagnes",
                  "Résumé de conversations",
                  "Traduction multilingue",
                  "Génération de rapports",
                ].map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="pt-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-muted rounded-xl text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
                <Settings className="w-4 h-4" />
                Configurer l'IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
