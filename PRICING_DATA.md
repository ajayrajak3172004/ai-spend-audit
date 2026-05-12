# PRICING_DATA.md

# AI Tool Pricing Sources

This document contains the pricing structures used inside the audit engine for the AI Spend Audit Platform.

The pricing system was designed to simulate realistic AI software spend optimization scenarios for startups, developers, agencies, and growing teams.

All pricing references were manually verified using official vendor pricing pages where available.

---

# Verification Date

All pricing data below was verified on:

```txt
2026-05-12
```

---

# Pricing Engine Notes

The audit engine uses:
- Estimated per-seat pricing
- Team-size recommendations
- Optimization thresholds
- Suggested alternatives
- Credit discount assumptions

The system is intentionally simplified for:
- Faster calculations
- Clear recommendations
- Assignment scope limitations

Enterprise contracts, custom negotiations, and regional pricing differences are not modeled currently.

---

# ChatGPT (OpenAI)

Vendor: OpenAI  
Alternative Recommendation: Claude  
Credit Discount Assumption: 15%

Official Pricing Sources:
- https://openai.com/chatgpt/pricing
- https://openai.com/business/chatgpt-pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Plus | $20/month | Small teams, writing, research |
| Team | $30/month | Mixed workflows, coding teams |
| Enterprise | $60/month | Large organizations |
| API Direct | $25/month (estimated equivalent) | Coding, data workflows |

---

# Claude (Anthropic)

Vendor: Anthropic  
Alternative Recommendation: ChatGPT  
Credit Discount Assumption: 12%

Official Pricing Source:
- https://www.anthropic.com/pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Free | $0 | Light writing usage |
| Pro | $20/month | Writing and research |
| Max | $40/month | Research-heavy workflows |
| Team | $30/month | Collaborative teams |
| Enterprise | $75/month | Enterprise environments |
| API Direct | $35/month (estimated equivalent) | Coding and data applications |

---

# Cursor

Vendor: Cursor  
Alternative Recommendation: GitHub Copilot  
Credit Discount Assumption: 10%

Official Pricing Source:
- https://cursor.com/pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Hobby | $0 | Individual developers |
| Pro | $20/month | Small developer teams |
| Business | $40/month | Collaborative engineering teams |
| Enterprise | $60/month | Large engineering organizations |

---

# GitHub Copilot

Vendor: GitHub  
Alternative Recommendation: Cursor  
Credit Discount Assumption: 8%

Official Pricing Source:
- https://github.com/features/copilot/plans

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Individual | $10/month | Solo developers |
| Business | $19/month | Team collaboration |
| Enterprise | $39/month | Enterprise coding workflows |

---

# Gemini

Vendor: Google  
Alternative Recommendation: ChatGPT  
Credit Discount Assumption: 10%

Official Pricing Sources:
- https://gemini.google.com/pricing
- https://ai.google.dev/pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Pro | $20/month | Research and data workflows |
| Ultra | $40/month | Mixed advanced workflows |
| API | $30/month (estimated equivalent) | Coding and AI integrations |

---

# Anthropic API

Vendor: Anthropic  
Alternative Recommendation: OpenAI API  
Credit Discount Assumption: 15%

Official Pricing Source:
- https://www.anthropic.com/api

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| API Direct | $30/month (estimated equivalent) | Coding and data integrations |

---

# OpenAI API

Vendor: OpenAI  
Alternative Recommendation: Anthropic API  
Credit Discount Assumption: 15%

Official Pricing Source:
- https://platform.openai.com/pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| API Direct | $25/month (estimated equivalent) | Coding and AI integrations |

---

# Windsurf

Vendor: Windsurf  
Alternative Recommendation: Cursor  
Credit Discount Assumption: 10%

Official Pricing Source:
- https://windsurf.com/pricing

## Plans

| Plan | Price Per Seat | Intended Usage |
|---|---|---|
| Free | $0 | Individual developers |
| Pro | $15/month | Small coding teams |
| Teams | $30/month | Collaborative engineering teams |
| Enterprise | $50/month | Enterprise environments |

---

# Recommendation Logic Used

The audit engine generates optimization suggestions using:
- Team size thresholds
- Usage category matching
- Seat recommendations
- Alternative tool comparisons
- Estimated pricing efficiency

Example:
- Small teams using expensive enterprise plans may receive downgrade recommendations.
- Teams using overlapping coding assistants may receive consolidation recommendations.

---

# Credit Discount Logic

The `creditDiscount` field simulates estimated savings opportunities through:
- Vendor credits
- Startup programs
- Annual billing discounts
- Consolidated procurement

These are not guaranteed discounts, but estimated optimization opportunities used for audit simulations.

---

# Pricing Assumptions

The platform currently assumes:

- USD pricing
- Monthly billing
- Publicly available plans
- Standard seat pricing
- Simplified enterprise estimates

The pricing engine does not currently account for:
- Taxes
- Regional pricing
- Volume contract negotiations
- Custom enterprise agreements
- API token-level billing complexity

---

# Why Estimated API Pricing Was Used

Some API services charge based on:
- Token usage
- Request volume
- Context size
- Model selection

To simplify calculations for the assignment:
- API services were converted into estimated monthly equivalent pricing
- This improves readability and keeps audit outputs understandable

---

# Future Pricing Improvements

Future versions of the platform could support:

## Real-Time Pricing Sync

Automatically fetch pricing updates from:
- Official APIs
- Vendor pricing pages
- Scheduled background jobs

---

## Token-Based API Estimation

Instead of fixed API pricing:
- Estimate token usage
- Track API consumption
- Model real infrastructure costs

---

## Historical Pricing Analysis

Track:
- AI pricing inflation
- Subscription growth trends
- Tool switching behavior

---

# Final Notes

Pricing transparency is essential for trust in financial optimization products.

For this reason:
- Every pricing assumption is documented
- Official pricing sources are linked
- Simplifications are clearly disclosed

The goal of the pricing engine is not perfect enterprise accounting accuracy, but fast and understandable AI spend optimization insights for startups and small teams.