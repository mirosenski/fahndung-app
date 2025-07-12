# Fahndung BW App

Eine moderne Webanwendung für die Verwaltung und Anzeige von Fahndungen in Baden-Württemberg.

## 🚀 Features

- **Öffentliche Fahndungsliste** - Responsive Kartenansicht
- **Admin Dashboard** - Geschützte Verwaltung
- **5-Step Wizard** - Intuitive Fahndungserstellung
- **tRPC API** - Type-safe Backend
- **PostgreSQL** - Robuste Datenbank
- **Next.js 15** - Moderne React-Framework
- **Tailwind CSS** - Responsive Design

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: tRPC, Prisma ORM
- **Datenbank**: PostgreSQL
- **Styling**: Tailwind CSS, shadcn/ui
- **Auth**: NextAuth.js (Discord OAuth)
- **Deployment**: Vercel

## 📋 Voraussetzungen

- Node.js 18+
- PostgreSQL Datenbank
- Discord OAuth App (für Admin-Login)

## 🚀 Lokale Entwicklung

### 1. Repository klonen
```bash
git clone https://github.com/mirosenski/fahndung-app.git
cd fahndung-app
```

### 2. Dependencies installieren
```bash
pnpm install
```

### 3. Umgebungsvariablen konfigurieren
```bash
cp .env.example .env
```

Bearbeiten Sie `.env`:
```env
# Datenbank
DATABASE_URL="postgresql://user:password@localhost:5432/fahndung"

# NextAuth
AUTH_SECRET="your-secret-key"
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Datenbank einrichten
```bash
# Migration ausführen
pnpm db:push

# Prisma Client generieren
pnpm db:generate
```

### 5. Entwicklungsserver starten
```bash
pnpm dev
```

Die App ist dann unter `http://localhost:3000` verfügbar.

## 🌐 Vercel Deployment

### 1. Vercel CLI installieren
```bash
npm i -g vercel
```

### 2. Bei Vercel anmelden
```bash
vercel login
```

### 3. Projekt deployen
```bash
vercel
```

### 4. Umgebungsvariablen in Vercel Dashboard setzen
- `DATABASE_URL` - PostgreSQL Connection String
- `AUTH_SECRET` - NextAuth Secret
- `AUTH_DISCORD_ID` - Discord OAuth Client ID
- `AUTH_DISCORD_SECRET` - Discord OAuth Client Secret
- `NEXTAUTH_URL` - Production URL

### 5. Datenbank-Migration auf Production
```bash
vercel env pull .env.production.local
pnpm db:push
```

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Dashboard
│   ├── api/               # API Routes
│   └── page.tsx           # Homepage
├── components/            # React Komponenten
│   ├── ui/               # UI Komponenten
│   └── wizard/           # Wizard Komponenten
├── lib/                  # Utilities
├── server/               # Backend Logic
│   ├── api/              # tRPC Router
│   ├── auth/             # Authentication
│   └── db.ts            # Database
└── trpc/                # tRPC Client
```

## 🔧 Scripts

- `pnpm dev` - Entwicklungsserver
- `pnpm build` - Production Build
- `pnpm start` - Production Server
- `pnpm db:push` - Datenbank-Migration
- `pnpm db:generate` - Prisma Client generieren

## 🤝 Beitragen

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert.

## 🆘 Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue auf GitHub.
