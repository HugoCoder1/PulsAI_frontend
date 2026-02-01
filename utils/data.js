import {
  BarChart3,
  Bot,
  CheckCircle,
  Clock,
  Edit2,
  FileText,
  Lightbulb,
  Mail,
  MessageCircle,
  MessageSquare,
  Pause,
  Play,
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

// CONTACT DATA
export const contacts = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78",
    company: "Tech Solutions",
    location: "Paris, France",
    status: "active",
    tags: ["VIP", "Enterprise"],
    lastContact: "2024-01-15",
    totalOrders: 12,
    totalSpent: 2450,
    avatar: "SM",
  },
  {
    id: 2,
    name: "Pierre Durand",
    email: "pierre.durand@email.com",
    phone: "+33 6 98 76 54 32",
    company: "Startup Inc",
    location: "Lyon, France",
    status: "active",
    tags: ["Premium"],
    lastContact: "2024-01-14",
    totalOrders: 8,
    totalSpent: 1890,
    avatar: "PD",
  },
  {
    id: 3,
    name: "Marie Lefevre",
    email: "marie.lefevre@email.com",
    phone: "+33 6 55 44 33 22",
    company: "Design Studio",
    location: "Bordeaux, France",
    status: "inactive",
    tags: ["Prospect"],
    lastContact: "2024-01-10",
    totalOrders: 3,
    totalSpent: 450,
    avatar: "ML",
  },
  {
    id: 4,
    name: "Thomas Bernard",
    email: "thomas.bernard@email.com",
    phone: "+33 6 11 22 33 44",
    company: "Consulting Group",
    location: "Marseille, France",
    status: "active",
    tags: ["VIP", "Partner"],
    lastContact: "2024-01-13",
    totalOrders: 25,
    totalSpent: 5680,
    avatar: "TB",
  },
  {
    id: 5,
    name: "Julie Petit",
    email: "julie.petit@email.com",
    phone: "+33 6 77 88 99 00",
    company: "E-commerce Plus",
    location: "Toulouse, France",
    status: "active",
    tags: ["Enterprise"],
    lastContact: "2024-01-12",
    totalOrders: 15,
    totalSpent: 3200,
    avatar: "JP",
  },
  {
    id: 6,
    name: "Lucas Moreau",
    email: "lucas.moreau@email.com",
    phone: "+33 6 44 55 66 77",
    company: "Media Agency",
    location: "Nantes, France",
    status: "inactive",
    tags: ["Standard"],
    lastContact: "2024-01-05",
    totalOrders: 2,
    totalSpent: 320,
    avatar: "LM",
  },
];

// TAGCOLORS DATA
export const tagColors = {
  VIP: "bg-[#F59E0B] text-foreground",
  Enterprise: "bg-primary text-primary-foreground",
  Premium: "bg-secondary text-secondary-foreground",
  Partner: "bg-[#10B981] text-primary-foreground",
  Prospect: "bg-muted text-muted-foreground",
  Standard: "bg-muted text-muted-foreground",
};

export const campaigns = [
  {
    id: 1,
    name: "Soldes d'hiver 2024",
    description:
      "Campagne promotionnelle pour les soldes d'hiver avec réductions jusqu'à 50%",
    type: "email",
    status: "active",
    audience: 12500,
    sent: 11234,
    opened: 6740,
    clicked: 2156,
    startDate: "15 Jan 2024",
    endDate: "28 Fév 2024",
  },
  {
    id: 2,
    name: "Lancement nouveau produit",
    description:
      "Annonce du lancement de notre nouvelle gamme de produits premium",
    type: "sms",
    status: "scheduled",
    audience: 8500,
    sent: 0,
    opened: 0,
    clicked: 0,
    startDate: "01 Fév 2024",
    endDate: "15 Fév 2024",
  },
  {
    id: 3,
    name: "Fidélité VIP",
    description:
      "Programme de fidélité exclusif pour nos clients les plus fidèles",
    type: "email",
    status: "completed",
    audience: 2500,
    sent: 2500,
    opened: 1875,
    clicked: 750,
    startDate: "01 Jan 2024",
    endDate: "14 Jan 2024",
  },
  {
    id: 4,
    name: "Récupération panier abandonné",
    description: "Relance automatique des clients ayant abandonné leur panier",
    type: "whatsapp",
    status: "active",
    audience: 3200,
    sent: 2890,
    opened: 2312,
    clicked: 1156,
    startDate: "01 Déc 2023",
    endDate: "En cours",
  },
  {
    id: 5,
    name: "Newsletter mensuelle",
    description:
      "Newsletter avec les dernières actualités et offres exclusives",
    type: "email",
    status: "draft",
    audience: 15000,
    sent: 0,
    opened: 0,
    clicked: 0,
    startDate: "-",
    endDate: "-",
  },
];

export const statusConfig = {
  active: {
    label: "Active",
    color: "bg-[#10B981]",
    textColor: "text-[#10B981]",
    icon: Play,
  },
  scheduled: {
    label: "Planifiée",
    color: "bg-[#F59E0B]",
    textColor: "text-[#F59E0B]",
    icon: Clock,
  },
  completed: {
    label: "Terminée",
    color: "bg-primary",
    textColor: "text-primary",
    icon: CheckCircle,
  },
  draft: {
    label: "Brouillon",
    color: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    icon: Edit2,
  },
  paused: {
    label: "En pause",
    color: "bg-destructive",
    textColor: "text-destructive",
    icon: Pause,
  },
};

export const monthlyData = [
  { name: "Jan", conversations: 1200, tickets: 450, resolutions: 420 },
  { name: "Fév", conversations: 1400, tickets: 520, resolutions: 490 },
  { name: "Mar", conversations: 1100, tickets: 380, resolutions: 360 },
  { name: "Avr", conversations: 1600, tickets: 580, resolutions: 550 },
  { name: "Mai", conversations: 1800, tickets: 620, resolutions: 600 },
  { name: "Juin", conversations: 2100, tickets: 750, resolutions: 720 },
  { name: "Juil", conversations: 1900, tickets: 680, resolutions: 660 },
  { name: "Août", conversations: 1700, tickets: 590, resolutions: 570 },
  { name: "Sep", conversations: 2200, tickets: 820, resolutions: 790 },
  { name: "Oct", conversations: 2500, tickets: 900, resolutions: 870 },
  { name: "Nov", conversations: 2800, tickets: 980, resolutions: 950 },
  { name: "Déc", conversations: 3100, tickets: 1100, resolutions: 1050 },
];

export const hourlyData = [
  { hour: "00h", value: 12 },
  { hour: "02h", value: 8 },
  { hour: "04h", value: 5 },
  { hour: "06h", value: 15 },
  { hour: "08h", value: 45 },
  { hour: "10h", value: 78 },
  { hour: "12h", value: 65 },
  { hour: "14h", value: 82 },
  { hour: "16h", value: 70 },
  { hour: "18h", value: 55 },
  { hour: "20h", value: 35 },
  { hour: "22h", value: 20 },
];

export const satisfactionData = [
  { name: "Très satisfait", value: 45, color: "#10B981" },
  { name: "Satisfait", value: 30, color: "#3590E3" },
  { name: "Neutre", value: 15, color: "#F59E0B" },
  { name: "Insatisfait", value: 7, color: "#EF4444" },
  { name: "Très insatisfait", value: 3, color: "#DC2626" },
];

export const channelPerformance = [
  {
    channel: "WhatsApp",
    conversations: 4500,
    responseTime: 2.3,
    satisfaction: 94,
  },
  {
    channel: "Email",
    conversations: 3200,
    responseTime: 8.5,
    satisfaction: 88,
  },
  {
    channel: "Chat Web",
    conversations: 2800,
    responseTime: 1.8,
    satisfaction: 92,
  },
  {
    channel: "Messenger",
    conversations: 1500,
    responseTime: 3.1,
    satisfaction: 90,
  },
];

export const suggestedPrompts = [
  {
    icon: MessageSquare,
    title: "Répondre à un client",
    prompt:
      "Aide-moi à rédiger une réponse professionnelle pour un client mécontent",
  },
  {
    icon: Lightbulb,
    title: "Idées de campagne",
    prompt:
      "Propose-moi des idées de campagne marketing pour la Saint-Valentin",
  },
  {
    icon: FileText,
    title: "Résumer un ticket",
    prompt: "Résume les points clés de cette conversation client",
  },
  {
    icon: Mail,
    title: "Email de relance",
    prompt: "Écris un email de relance pour les paniers abandonnés",
  },
];

export const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Bonjour ! Je suis l'assistant IA de PulsAI. Je suis là pour vous aider à gérer vos conversations clients, créer des campagnes marketing et optimiser votre support. Comment puis-je vous aider aujourd'hui ?",
    timestamp: new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];
