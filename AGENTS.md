# AGENTS.md

## Purpose

This document describes the AI-assisted workflow, automation behavior, and agent responsibilities used during the development of the AI Spend Audit project.

---

## Project Context

AI Spend Audit is designed to help teams and startups evaluate AI-related expenses, identify redundant subscriptions, and receive optimization recommendations through automated analysis and AI-generated summaries.

---

## Agent Responsibilities

### 1. Audit Analysis Agent
Responsible for:
- Processing company input data
- Estimating AI-related operational costs
- Calculating potential savings opportunities
- Identifying unnecessary enterprise subscriptions

---

### 2. Recommendation Agent
Responsible for:
- Suggesting lower-cost AI alternatives
- Generating optimization recommendations
- Producing actionable audit summaries
- Tailoring suggestions based on company size and usage

---

### 3. UI Interaction Layer
Responsible for:
- Handling form submissions
- Managing dashboard rendering
- Displaying audit reports and metrics
- Providing responsive user experience

---

### 4. API Integration Layer
Responsible for:
- OpenRouter / OpenAI API communication
- AI summary generation
- Error handling and fallback responses
- Secure environment variable usage

---

## Workflow

1. User submits company audit form
2. Input data is validated
3. Audit analysis logic processes spending data
4. AI-generated recommendations are requested
5. Dashboard renders final results and savings insights

---

## Deployment Notes

- Hosted on Vercel
- Environment variables configured through deployment settings
- CAPTCHA verification enabled for spam prevention
- API requests handled through secure backend routes

---

## Known Limitations

- AI response quality depends on API availability
- Environment variable misconfiguration can interrupt summary generation
- Audit assumptions are generalized and not industry-specific

---

## Future Agent Improvements

- Dynamic pricing model support
- Team-specific optimization logic
- Historical usage trend analysis
- Multi-provider AI comparison engine
- Improved fallback intelligence

---

## Maintainer

Ajay Rajak
