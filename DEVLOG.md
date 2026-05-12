# DEVLOG.md

## Day 1 — 2026-05-05

**Hours worked:** 5

**What I did:**  
Started planning the AI Spend Audit Platform idea and researched how startups currently manage AI software subscriptions. Defined the core problem: many small teams adopt multiple AI tools quickly without tracking total spending. Decided to build a lightweight audit platform that calculates optimization opportunities and generates AI-powered summaries. Created the initial Next.js project setup, installed Tailwind CSS, and structured the folder architecture.

**What I learned:**  
I learned that many early-stage startups are rapidly increasing AI software spending but do not have clear visibility into overlapping subscriptions or wasted costs. I also learned that Next.js simplifies full-stack development significantly because API routes and frontend pages can exist inside the same project.

**Blockers / what I'm stuck on:**  
I was unsure how detailed the audit engine should be and whether to make recommendations rule-based or AI-generated.

**Plan for tomorrow:**  
Build the audit calculation logic and define pricing structures for AI tools.

---

## Day 2 — 2026-05-06

**Hours worked:** 6

**What I did:**  
Implemented the first version of the audit engine. Added pricing structures for tools like ChatGPT, Cursor, Claude, and Notion AI. Built logic to calculate current spend, optimized spend, and total savings. Created reusable calculation functions and connected them to the frontend audit form.

**What I learned:**  
I learned that most of the core value of the platform comes from deterministic pricing logic rather than AI itself. The AI summary works best as a presentation layer on top of structured calculations.

**Blockers / what I'm stuck on:**  
Pricing structures vary significantly between tools and change frequently. I also struggled with organizing pricing data cleanly.

**Plan for tomorrow:**  
Improve the UI and build the results dashboard.

---

## Day 3 — 2026-05-07

**Hours worked:** 7

**What I did:**  
Built the results dashboard and connected the audit engine outputs to the frontend UI. Added cards for current spend, optimized spend, annual savings, and AI optimization opportunities. Improved responsiveness using Tailwind CSS and added loading states and transitions. Started integrating Supabase for storing audit reports.

**What I learned:**  
I learned how useful utility-first CSS can be for rapid UI iteration. Tailwind made it easier to build responsive layouts quickly without maintaining separate CSS files.

**Blockers / what I'm stuck on:**  
I faced issues while saving nested audit data into Supabase because some fields were not properly formatted as JSON.

**Plan for tomorrow:**  
Finish Supabase integration and begin AI summary generation.

---

## Day 4 — 2026-05-08

**Hours worked:** 6

**What I did:**  
Integrated Supabase successfully and created the `audits` table for storing reports. Implemented the `/api/generate-summary` API route and connected it to Gemini API initially. Built prompt generation logic and added AI-generated summaries to the results dashboard.

**What I learned:**  
I learned that prompt engineering matters even for relatively simple AI outputs. Structured prompts produced more professional and consistent summaries than generic prompts.

**Blockers / what I'm stuck on:**  
Gemini API rate limits and quota issues caused repeated failures during testing. The API frequently returned quota exceeded errors even on a new account.

**Plan for tomorrow:**  
Replace Gemini integration with a more stable alternative and improve error handling.

---

## Day 5 — 2026-05-09

**Hours worked:** 5

**What I did:**  
Migrated from Gemini API to OpenRouter with the DeepSeek Chat model. Refactored the API route to use the OpenAI-compatible SDK. Added fallback summaries for failed AI requests and improved error handling using try/catch blocks. Improved loading states and added animated UI interactions for the audit generation button.

**What I learned:**  
I learned that free AI APIs can become unreliable under repeated testing. Building proper fallback handling is essential for production-style systems.

**Blockers / what I'm stuck on:**  
Some API responses were inconsistent during testing, especially when response formatting changed unexpectedly.

**Plan for tomorrow:**  
Write documentation files and improve overall project structure.

---

## Day 6 — 2026-05-10

**Hours worked:** 7

**What I did:**  
Started writing project documentation including README.md, ARCHITECTURE.md, PROMPTS.md, and TESTS.md. Organized the repository structure and reviewed assignment requirements carefully. Improved environment variable handling and ensured no secrets were exposed in the repository.

**What I learned:**  
I learned that documentation quality has a major impact on how a project is evaluated. Clear architecture explanations and reasoning behind decisions are as important as the implementation itself.

**Blockers / what I'm stuck on:**  
I still need to complete the business-focused deliverables like GTM strategy and economics modeling.

**Plan for tomorrow:**  
Finish remaining documentation, testing details, and deployment preparation.

---

## Day 7 — 2026-05-11

**Hours worked:** 6

**What I did:**  
Completed GTM.md, ECONOMICS.md, and additional project documentation. Reviewed the application for deployment readiness and improved UI polish. Added better error handling across API requests and finalized the audit workflow from input submission to results generation. Verified environment variables and prepared the project for public GitHub deployment.

**What I learned:**  
I learned that building a product is not only about engineering. Distribution, positioning, pricing logic, and operational reliability are equally important for turning a project into something usable in the real world.

**Blockers / what I'm stuck on:**  
I still want to improve automated testing coverage and add end-to-end testing in the future.

**Plan for tomorrow:**  
Deploy the project publicly, run Lighthouse audits, and finalize repository cleanup before submission.