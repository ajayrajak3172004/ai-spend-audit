# AI Spend Audit Platform

An AI-powered audit platform that helps startups and small teams analyze their AI software spending, identify overspending patterns, and discover cost optimization opportunities. The platform generates detailed audit reports, estimated savings, and AI-generated business summaries to help teams reduce unnecessary SaaS expenses.

Built for founders, operations teams, and growing startups that use multiple AI tools such as ChatGPT, Cursor, Claude, Notion AI, Midjourney, and other subscription-based AI products.

---

# Live Demo

Deployed URL:  
[Add Your Deployment URL Here]

---

# Screenshots

## Landing Page
![Landing Page ](./screenshots/home1.png)
![Landing Page ](./screenshots/home2.png)
![Landing Page ](./screenshots/home3.png)

## Audit Form
![Audit Form](./screenshots/auditForm1.png)
![Audit Form](./screenshots/auditForm2.png)

## Audit Results Dashboard
![Results Dashboard](./screenshots/resultpage1.png)
![Results Dashboard](./screenshots/resultpage2.png)
![Results Dashboard](./screenshots/resultpage3.png)
![Results Dashboard](./screenshots/resultpage4.png)

---

# Features

- AI software spend audit engine
- AI-generated business optimization summaries
- Real-time savings calculations
- Annual savings estimation
- AI tool pricing comparison
- Supabase database integration
- Dynamic report generation
- Responsive modern UI
- Professional audit reports
- Mobile-friendly design

---

# Tech Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- React Icons

## Backend
- Next.js API Routes
- Supabase

## AI Integration
- OpenRouter API
- DeepSeek Chat Model

## Deployment
- Vercel

---

# How It Works

1. Users enter their AI tool usage and spending details.
2. The audit engine analyzes current subscriptions and pricing.
3. The platform calculates optimization opportunities and potential savings.
4. AI-generated summaries provide professional business insights.
5. Audit reports are stored in Supabase and displayed in a dedicated results dashboard.

---

# Quick Start

## 1. Clone the Repository

```bash
git clone https://github.com/AJAY8839/frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY = 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

NEXT_PUBLIC_SUPABASE_URL=https://twxlcqjknxolnmjtzerl.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_mMyvgq9kgEzmPyaWZkBaCA_j9rCfg2r

NEXT_PUBLIC_TURNSTILE_SITE_KEY= 0x4AAAAAADNDhIi6k025eb8V
TURNSTILE_SECRET_KEY= 0x4AAAAAADNDhLmwf56e22e2GY7mni_0ByU
```

---

## 4. Run Locally

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Deployment

The project can be deployed easily using:

- Vercel
- Netlify
- Cloudflare Pages

Recommended platform:

- Vercel

Deploy command:

```bash
npm run build
```

---

# Decisions & Trade-Offs

## 1. Next.js Instead of Plain React
Next.js was chosen because it provides built-in routing, API routes, optimized performance, and easier deployment on Vercel.

---

## 2. JavaScript Instead of TypeScript
JavaScript was used to prioritize rapid iteration and faster prototyping during the assignment timeline. The project architecture is structured in a way that allows future migration to TypeScript.

---

## 3. Supabase Instead of Traditional Backend
Supabase reduced backend complexity and allowed rapid database integration without building a custom authentication and database server.

---

## 4. OpenRouter Instead of Gemini API
Gemini API rate limits caused reliability issues during development. OpenRouter provided more stable free-tier access and support for multiple open-source AI models.

---

## 5. Tailwind CSS Instead of Component Libraries
Tailwind CSS enabled faster UI customization and better control over performance, responsiveness, and design consistency.

---

# Folder Structure

```txt
app/
 ├── api/
 ├── results/
 ├── components/
 ├── lib/
 

public/
screenshots/
```

---

# Performance Goals

Target Lighthouse Mobile Scores:

- Performance ≥ 85
- Accessibility ≥ 90
- Best Practices ≥ 90

---

# Future Improvements

- Team collaboration dashboards
- PDF export support
- Advanced pricing intelligence
- Historical spend analytics
- Multi-company audit management
- AI-powered optimization recommendations
- Email-based audit delivery

---

# Environment & Security

- API keys are stored securely using environment variables.
- No secrets are committed to the repository.
- Sensitive operations are handled server-side.

---

# Author

Ajay Rajak

B.Tech Mathematics and Computing Engineering  
MITS Gwalior

---

# License

This project is developed for an engineering assignment and educational purposes.