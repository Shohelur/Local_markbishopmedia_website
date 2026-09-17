---
name: mbm-blog-generator
description: >-
  Generates and designs individual blog post pages (e.g., post-002.html) for Mark Bishop Media. 
  Follows a strict AEO/SEO-friendly human copywriting standard (zero AI words, zero long dashes) 
  and a highly specific Premium Dark Navy side-by-side UI layout. Triggers on: "create a new blog", 
  "design a new blog post", "generate post", "write a blog page".
---

# MBM Blog Page Generator Rulebook

This skill must be invoked whenever you create or redesign an individual blog read page (e.g., `agency-website/blog/post-002-title.html`). It enforces Mark Bishop Media's strict design architecture and humanized copywriting standards.

---

## 1. Copywriting & Tone Standards (Strict Human & AEO Focus)

**A. SEO & LLM Friendly (AEO - Answer Engine Optimization):**
- Write specifically for both traditional Google Search and AI-driven Answer Engines (Perplexity, ChatGPT, Gemini). 
- Use clear, question-based headings (`<h2>`, `<h3>`) that directly answer search queries.
- Structure content with bullet points, numbered lists, and bolded terms so LLMs can easily extract the context.

**B. 100% Human Style (Zero "AI Vibe"):**
- Write exactly like a seasoned local SEO strategist talking to a business owner. Direct, confident, and conversational.
- Start with a real-world story or localized hook (e.g., "Last Tuesday, an HVAC owner in Phoenix called me...").
- **CRITICAL - NO AI WORDS:** Never use words like: *delve, unlock, testament, crucial, moreover, overarching, tapestry, landscape, navigate*.
- **CRITICAL - NO LONG DASHES:** Never use em-dashes (`—`) or en-dashes (`–`). Keep sentences punchy. Use commas, periods, or standard hyphens where absolutely necessary.

**C. Insight-Driven (No Fear-Based Selling):**
- Do not use generic "take your business to the next level" fluff.
- Rely on evidence and real local scenarios.

---

## 2. Design & Layout Architecture (Premium Dark Navy)

Every blog post must look like a standalone premium website, not a standard WordPress blog.

**A. Page Layout & Stacking:**
- **Theme:** Deep Navy (`#0b1121`) with `Inter` for body and `Outfit` for headings.
- **Side-by-Side (Stripe-like) Structure:** The left side must house a sticky Table of Contents (TOC), and the right side houses the main reading content.
- **Width:** Max layout width `1200px` (`max-width: 1200px`), centered.
- **Scroll Fix:** `html, body { overflow-x: hidden; width: 100%; }` must be applied to prevent horizontal scroll issues on load.

**B. Top Hero / Header Section (`.blog-top-header`):**
- **NO Full-Width Dark Navbars.** The header space must remain empty/clean.
- **Floating Back Button:** On the extreme top-left, place a floating fixed button (`.floating-back-btn`) containing "← Back". It must have a colorful gradient, glassmorphism (`backdrop-filter: blur`), and `position: fixed` so it scrolls with the reader.
- **Hero Container (`.blog-header-container`):**
  - Must be a side-by-side flexbox container (Image left, Content right).
  - **Unique Background:** The background of this container must be a vibrant, colorful CSS gradient (`linear-gradient`) unique to each blog post. Never use plain dark blue.
  - **Author Image:** Use the real photograph of Mark Bishop (`../assets/images/mark-bishop-real.png`). **Do not apply a glass border/ring** to the author image to prevent it from looking like AI/shiny glass when scaled down. Use `object-fit: cover; object-position: top center; border: none;`.

**C. Premium Components:**
- **Glass Tips (`.glass-tip`):** Important callouts must use a transluscent glassmorphism box with a glowing left border.
- **FAQ Section:** Must be located at the very bottom, built using native HTML5 `<details>` and `<summary>` tags for accordion dropdowns.
- **Bottom Back Button:** Right above the FAQ, provide a secondary "← Back to Blog" button for user convenience.

---

## 3. Implementation Workflow Checklist

When asked to write a new blog post:
1. **Create the file** in the `blog/` folder (e.g., `post-002-keyword.html`).
2. **Apply the Structure:** Copy the HTML/CSS shell from an approved blog post (e.g., `post-001`). 
   - **CRITICAL:** Do NOT accidentally delete the `</article>` tag before the `<aside class="post-sidebar">` when replacing the main content, or the side-by-side layout will break and push the TOC to the bottom.
3. **Change the Hero Gradient:** Assign a brand new `linear-gradient` to `.blog-header-container`. Do not reuse the exact gradient from the copied post.
4. **Write the Content:** 
   - Strictly follow the SEO/LLM and Human Style rules. Check for long dashes and AI words before saving.
   - You MUST write between 1,400 to 1,800 words. Do not write short 600-word posts.
   - You MUST include at least two or three `<div class="glass-tip">` callout boxes within the content to break up the text visually.
5. **Update Index (`blog.html`):** Add the new blog card to `blog.html` to ensure it is linked and accessible.
   - **CRITICAL:** When injecting the card into `blog.html`, you MUST copy the exact HTML structure of the previous cards (e.g., `<span class="card-tag">`, `<p class="card-excerpt">`, `<div class="card-author">`, and the full-card absolute link). Do not invent a simpler card layout.
