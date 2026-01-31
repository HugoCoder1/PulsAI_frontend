"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Users,
  Key,
  Mail,
  Phone,
  MapPin,
  Camera,
  Check,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profil", icon: User },
  { id: "company", label: "Entreprise", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Securite", icon: Shield },
  { id: "appearance", label: "Apparence", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "billing", label: "Facturation", icon: CreditCard },
  { id: "team", label: "Equipe", icon: Users },
];

const teamMembers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean@pulsai.com",
    role: "Admin",
    avatar: "JD",
    status: "active",
  },
  {
    id: 2,
    name: "Marie Lefevre",
    email: "marie@pulsai.com",
    role: "Agent",
    avatar: "ML",
    status: "active",
  },
  {
    id: 3,
    name: "Pierre Martin",
    email: "pierre@pulsai.com",
    role: "Agent",
    avatar: "PM",
    status: "invited",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  return (
    <div className="min-h-screen">
      <Header
        title="Parametres"
        subtitle="Gerez les parametres de votre compte"
      />

      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 shrink-0">
            <nav className="bg-card rounded-2xl border border-border p-2 space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border"
            >
              {/* Profile Section */}
              {activeSection === "profile" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Informations du profil
                  </h2>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center">
                        <span className="text-3xl font-heading font-bold text-secondary-foreground">
                          HH
                        </span>
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-foreground">
                        Hugues Hugo
                      </h3>
                      <p className="text-muted-foreground">Administrateur</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Prenom
                      </label>
                      <input
                        type="text"
                        defaultValue="Hugo"
                        className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom
                      </label>
                      <input
                        type="text"
                        defaultValue="Hugues"
                        className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          defaultValue="hugo.dupont@pulsai.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Telephone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          defaultValue="+33 6 12 34 56 78"
                          className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              )}

              {/* Company Section */}
              {activeSection === "company" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Informations de l'entreprise
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom de l'entreprise
                      </label>
                      <input
                        type="text"
                        defaultValue="PulsAI Solutions"
                        className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Site web
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="url"
                          defaultValue="https://pulsai.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Adresse
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <textarea
                          rows={3}
                          defaultValue="123 Avenue des Champs-Elysees&#10;75008 Paris, France"
                          className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Secteur d'activite
                        </label>
                        <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          <option>Technologie</option>
                          <option>E-commerce</option>
                          <option>Services</option>
                          <option>Finance</option>
                          <option>Sante</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Taille de l'entreprise
                        </label>
                        <select className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                          <option>1-10 employes</option>
                          <option>11-50 employes</option>
                          <option>51-200 employes</option>
                          <option>201-500 employes</option>
                          <option>500+ employes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      Enregistrer
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Preferences de notifications
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: "Notifications par email",
                        desc: "Recevez des mises a jour par email",
                      },
                      {
                        key: "push",
                        label: "Notifications push",
                        desc: "Notifications en temps reel dans le navigateur",
                      },
                      {
                        key: "sms",
                        label: "Notifications SMS",
                        desc: "Alertes importantes par SMS",
                      },
                      {
                        key: "marketing",
                        label: "Emails marketing",
                        desc: "Nouveautes et offres speciales",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }))
                          }
                          className={cn(
                            "relative w-12 h-7 rounded-full transition-colors",
                            notifications[item.key] ? "bg-primary" : "bg-border"
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                              notifications[item.key]
                                ? "translate-x-6"
                                : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Securite du compte
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Key className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              Mot de passe
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Derniere modification il y a 3 mois
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          Modifier
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Shield className="w-5 h-5 text-secondary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              Authentification a deux facteurs
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ajoutez une couche de securite supplementaire
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          Activer
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground mb-3">
                        Sessions actives
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Chrome sur MacOS
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Paris, France - Actif maintenant
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                            Cette session
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Safari sur iPhone
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Paris, France - Il y a 2h
                              </p>
                            </div>
                          </div>
                          <button className="text-xs text-destructive hover:underline">
                            Deconnecter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Apparence
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "light", label: "Clair", icon: Sun },
                        { id: "dark", label: "Sombre", icon: Moon },
                        { id: "system", label: "Systeme", icon: Monitor },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setTheme(option.id)}
                          className={cn(
                            "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                            theme === option.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <option.icon
                            className={cn(
                              "w-6 h-6",
                              theme === option.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {option.label}
                          </span>
                          {theme === option.id && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Team Section */}
              {activeSection === "team" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-semibold text-xl text-foreground">
                      Membres de l'equipe
                    </h2>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      Inviter un membre
                    </button>
                  </div>

                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-sm font-medium text-secondary-foreground">
                              {member.avatar}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              member.status === "active"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {member.status === "active"
                              ? member.role
                              : "Invitation en attente"}
                          </span>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Integrations Section */}
              {activeSection === "integrations" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Integrations
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "WhatsApp Business",
                        desc: "Connectez votre compte WhatsApp",
                        connected: true,
                      },
                      {
                        name: "Messenger",
                        desc: "Integrez Facebook Messenger",
                        connected: true,
                      },
                      {
                        name: "Slack",
                        desc: "Notifications dans Slack",
                        connected: false,
                      },
                      {
                        name: "Zapier",
                        desc: "Automatisez vos workflows",
                        connected: false,
                      },
                    ].map((integration, idx) => (
                      <div key={idx} className="p-4 bg-muted/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {integration.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {integration.desc}
                            </p>
                          </div>
                          <button
                            className={cn(
                              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                              integration.connected
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                          >
                            {integration.connected ? "Connecte" : "Connecter"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing Section */}
              {activeSection === "billing" && (
                <div className="p-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Facturation
                  </h2>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Plan actuel
                        </p>
                        <p className="text-2xl font-heading font-bold text-foreground">
                          Pro
                        </p>
                        <p className="text-sm text-muted-foreground">
                          99EUR/mois - Renouvellement le 15 fevrier
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                        Changer de plan
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-3">
                      Historique des factures
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          date: "15 Jan 2024",
                          amount: "99EUR",
                          status: "Payee",
                        },
                        {
                          date: "15 Dec 2023",
                          amount: "99EUR",
                          status: "Payee",
                        },
                        {
                          date: "15 Nov 2023",
                          amount: "99EUR",
                          status: "Payee",
                        },
                      ].map((invoice, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {invoice.date}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {invoice.amount}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                              {invoice.status}
                            </span>
                            <button className="text-sm text-primary hover:underline">
                              Telecharger
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
