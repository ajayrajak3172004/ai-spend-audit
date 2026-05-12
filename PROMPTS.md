# PROMPTS.md

# AI Prompt Engineering Documentation

This document explains the prompts used in the AI Spend Audit Platform, why they were designed this way, iterations that failed, and lessons learned during development.

---

# Overview

The platform uses AI-generated summaries to convert raw audit calculations into professional business insights.

The AI system receives:
- Current spend data
- Optimized spend estimates
- Savings opportunities
- Tool usage information

It returns:
- Executive-style summaries
- Overspending observations
- Optimization opportunities
- Business-friendly recommendations

---

# AI Model Used

## Provider
- OpenRouter

## Model
- DeepSeek Chat

## Why This Model?

The original implementation used Gemini API, but development faced:
- Free-tier quota issues
- Rate limiting
- Reliability problems during repeated testing

OpenRouter was selected because:
- It provides access to multiple models
- Stable free-tier testing
- OpenAI-compatible API structure
- Faster development iteration

DeepSeek Chat was selected because it produced:
- More structured summaries
- Better business tone
- More consistent formatting
- Lower hallucination rate during testing

---

# Main Production Prompt

## Final Prompt Used

```txt
You are an AI spend optimization consultant.

Analyze the following AI tool spending audit.

Current Spend: $${currentSpend}
Optimized Spend: $${optimizedSpend}
Potential Savings: $${totalSavings}

Audit Results:
${JSON.stringify(auditResults)}

Generate:
- Professional summary
- Around 100 words
- Mention overspending patterns
- Mention optimization opportunities
- Mention potential savings
- Business friendly tone
```

---

# Why This Prompt Was Written This Way

The prompt was intentionally designed to be:
- Short
- Structured
- Constraint-driven
- Easy for smaller AI models to follow

Key design decisions:

## 1. Explicit Role Definition

```txt
You are an AI spend optimization consultant.
```

This improved:
- Business language quality
- Professional tone
- Recommendation relevance

Without the role definition, outputs became generic and less actionable.

---

## 2. Structured Input Data

The prompt includes:
- Current spend
- Optimized spend
- Potential savings
- Raw audit data

This gives the AI enough numerical context to generate realistic business insights.

---

## 3. Output Constraints

The instructions:
- "Around 100 words"
- "Business friendly tone"
- "Mention optimization opportunities"

were added to reduce:
- Overly long responses
- Repetitive wording
- Generic AI explanations

---

# Prompt Iterations That Did Not Work

## Version 1 — Too Generic

```txt
Analyze this audit report and summarize it.
```

### Problems
- Extremely vague outputs
- Generic financial advice
- No mention of specific savings
- Inconsistent formatting

### Lesson Learned
The model required explicit structure and constraints.

---

# Version 2 — Overly Detailed Prompt

```txt
You are a senior enterprise SaaS cost optimization consultant...
```

### Problems
- Responses became too long
- Generated unrealistic recommendations
- Included unnecessary enterprise terminology
- Increased latency

### Lesson Learned
Smaller prompts produced more reliable outputs.

---

# Version 3 — JSON Output Prompt

```txt
Return the response in JSON format.
```

### Problems
- Invalid JSON responses
- Broken formatting
- Escaping issues
- Increased frontend parsing complexity

### Lesson Learned
Plain text summaries were more reliable for the assignment scope.

---

# Prompt Engineering Decisions

## Temperature & Creativity

The application prioritizes:
- Stability
- Readability
- Predictable outputs

Instead of:
- Creativity
- Marketing-heavy language
- Complex analysis

This was important because audit summaries need to feel:
- Professional
- Consistent
- Business-safe

---

# AI Failure Handling

The application includes fallback summaries if:
- API requests fail
- AI providers rate-limit requests
- Invalid responses are returned

Fallback response:

```txt
Your team has several opportunities to optimize AI spending through better plan allocation, removing unnecessary enterprise subscriptions, and switching to more cost-efficient AI tooling.
```

This prevents empty audit reports and improves user experience.

---

# Prompt Injection Considerations

Because the platform primarily processes structured numerical audit data rather than free-form user text, prompt injection risk is relatively low.

However:
- AI requests are generated server-side
- Raw prompts are not exposed to users
- Environment variables protect API keys

---

# Cost Optimization Considerations

AI-generated summaries were intentionally limited to:
- Approximately 100 words
- Single-response generation

This reduces:
- Token usage
- API costs
- Response latency

while still providing meaningful insights.

---

# Future Prompt Improvements

Future versions of the platform could support:

## 1. Personalized Recommendations

Examples:
- Team-size-specific advice
- Industry-specific optimization
- Startup-stage recommendations

---

## 2. Structured AI Output

Potential improvements:
- Markdown formatting
- Bullet-point recommendations
- Risk scoring
- Priority levels

---

## 3. Multi-Step AI Analysis

Future pipeline:

```txt
Raw Audit Data
    ↓
Tool Categorization
    ↓
Savings Prioritization
    ↓
Business Impact Analysis
    ↓
Executive Summary
```

---

# What I Learned

Key lessons from prompt engineering during this project:

- Smaller prompts often outperform overly complex prompts
- Explicit constraints improve output consistency
- Structured numerical context greatly improves business summaries
- Free AI APIs can become unreliable under repeated testing
- Stable fallback handling is essential for production-style systems

---

# Final Thoughts

The prompt system was designed to balance:
- Simplicity
- Reliability
- Cost efficiency
- Business readability

The final implementation focuses on generating concise, professional summaries that improve the usability of the audit platform without overcomplicating the AI workflow.