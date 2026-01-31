import {
  BarChart3,
  Bot,
  MessageCircle,
  Settings,
  Users,
  Zap,
} from "lucide-react";

export const notifications = [
  {
    id: 1,
    type: "message",
    title: "Nouveau message",
    description: "Marie a envoyé un message dans le ticket #1234",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: 2,
    type: "ticket",
    title: "Ticket résolu",
    description: "Le ticket #1232 a été marqué comme résolu",
    time: "Il y a 15 min",
    unread: true,
  },
  {
    id: 3,
    type: "system",
    title: "Mise à jour système",
    description: "Une nouvelle version de PulsAI est disponible",
    time: "Il y a 1h",
    unread: false,
  },
];

export const activities = [
  {
    id: 1,
    type: "message",
    title: "Nouvelle conversation",
    description: "Sophie Martin a démarré une conversation via WhatsApp",
    time: "Il y a 2 min",
    avatar: "SM",
    status: "new",
  },
  {
    id: 2,
    type: "ticket",
    title: "Ticket #1234 résolu",
    description: "Le ticket de réclamation a été fermé avec succès",
    time: "Il y a 15 min",
    avatar: "JD",
    status: "resolved",
  },
  {
    id: 3,
    type: "message",
    title: "Réponse automatique",
    description: "L'IA a répondu à 5 questions fréquentes",
    time: "Il y a 30 min",
    avatar: "AI",
    status: "auto",
  },
  {
    id: 4,
    type: "ticket",
    title: "Nouveau ticket urgent",
    description: "Pierre Durand a soumis un ticket prioritaire",
    time: "Il y a 45 min",
    avatar: "PD",
    status: "urgent",
  },
  {
    id: 5,
    type: "message",
    title: "Conversation transférée",
    description: "Marie a transféré une conversation au support niveau 2",
    time: "Il y a 1h",
    avatar: "ML",
    status: "pending",
  },
];

export const categories = [
  {
    id: "getting-started",
    label: "Demarrage",
    icon: Zap,
    color: "text-primary",
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: MessageCircle,
    color: "text-[#25D366]",
  },
  {
    id: "ai-assistant",
    label: "Assistant IA",
    icon: Bot,
    color: "text-[#F59E0B]",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    color: "text-[#10B981]",
  },
  { id: "team", label: "Gestion d'equipe", icon: Users, color: "text-primary" },
  {
    id: "settings",
    label: "Parametres",
    icon: Settings,
    color: "text-muted-foreground",
  },
];

export const faqs = [
  {
    question: "Comment connecter mon compte WhatsApp Business ?",
    answer:
      "Pour connecter votre compte WhatsApp Business, rendez-vous dans Parametres > Integrations > WhatsApp Business. Suivez les instructions pour scanner le QR code avec votre telephone. La connexion sera active en quelques secondes.",
    category: "getting-started",
  },
  {
    question: "Comment configurer les reponses automatiques de l'IA ?",
    answer:
      "Allez dans le menu IA Assistant et selectionnez 'Configuration'. Vous pouvez y definir les scenarios de reponse, le ton de communication et les limites d'intervention de l'IA. N'oubliez pas de tester vos configurations avant de les activer.",
    category: "ai-assistant",
  },
  {
    question: "Comment ajouter un membre a mon equipe ?",
    answer:
      "Dans Parametres > Equipe, cliquez sur 'Inviter un membre'. Entrez l'adresse email de la personne et selectionnez son role (Admin, Agent, Observateur). Un email d'invitation sera envoye automatiquement.",
    category: "team",
  },
  {
    question: "Comment exporter mes donnees analytics ?",
    answer:
      "Sur la page Analytics, utilisez le bouton 'Exporter' en haut a droite. Vous pouvez choisir le format (CSV, PDF, Excel) et la periode souhaitee. Les rapports personnalises sont disponibles dans le plan Pro.",
    category: "analytics",
  },
  {
    question: "Comment gerer les conversations multicanales ?",
    answer:
      "PulsAI centralise automatiquement toutes vos conversations (WhatsApp, Email, Messenger, Chat) dans une interface unique. Utilisez les filtres pour trier par canal ou le bouton de recherche pour retrouver une conversation specifique.",
    category: "conversations",
  },
  {
    question: "Comment personnaliser les notifications ?",
    answer:
      "Dans Parametres > Notifications, vous pouvez configurer les alertes par canal (email, push, SMS). Definissez des regles specifiques selon le type de message ou la priorite des tickets.",
    category: "settings",
  },
];

export const guides = [
  { title: "Guide de demarrage rapide", duration: "5 min", type: "article" },
  {
    title: "Configurer votre premier chatbot",
    duration: "10 min",
    type: "video",
  },
  {
    title: "Meilleures pratiques pour le support client",
    duration: "8 min",
    type: "article",
  },
  {
    title: "Tutoriel: Automatisation avancee",
    duration: "15 min",
    type: "video",
  },
];
