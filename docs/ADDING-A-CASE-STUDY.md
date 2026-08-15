# Guide: Adding a Future Case Study to the Portfolio

This guide outlines the exact, repeatable procedure for adding future research case studies and engineering projects to the Talha Rehman AI Engineering Portfolio (`portfolio-tallha-7ql2.vercel.app`).

---

## Where It Goes

New case studies belong in one of two dedicated sections inside [`index.html`](../index.html):

1. **Research & Deep Evidence Case Studies**:
   - **DOM Location**: `<section id="work">` → `<div class="case-list">`
   - **Element**: `<article class="case" id="case-[slug]">`
   - **Purpose**: In-depth research manuscripts, clinical pipelines, empirical benchmarks, and mathematical/protocol analyses (e.g., DSPD, AutismLens, Brazilian Energy NLP, Cradle Labs Multimodal RAG).

2. **Featured Projects & Systems Prototypes**:
   - **DOM Location**: `<section id="projects">` → `<div class="other-projects-grid">`
   - **Element**: `<div class="project-card">`
   - **Purpose**: Applied AI apps, agency tools, open-source repositories, and developer utilities (e.g., EDU360, HAT Agency OS, PyPI packages).

---

## Case Study Structure

Every future case study must strictly adhere to the three-part evidence framework:

### 1. Problem
* **What real problem was being solved?**
* **Why did it matter?** (Identify domain friction, latency bottlenecks, clinical gaps, or cryptographic limitations).

### 2. What I Did
* **My role and ownership** (Lead researcher, co-author, system architect).
* **Approach & methodology** (Pipeline architecture, mathematical proof models, data processing workflows).
* **Technologies & tools used** (e.g., Python, LangChain, ChromaDB, OpenCV, FastAPI, PyTorch, etc.).
* **Important decisions and engineering trade-offs** made during the implementation or research process.

### 3. What Came Of It
* **Genuine, verifiable outcomes only**:
  * Formal review status (e.g., *Under Peer Review at Elsevier journal*).
  * Measurable findings or validated benchmarks.
  * Live working prototypes, deployed services, or published packages (e.g., PyPI).
  * Impact, clinical evaluation milestones, or lessons learned.
* ⚠️ **Strict Anti-Hallucination Policy**: Never invent users, metrics, revenue, citations, or claimed publication venues if not confirmed.

---

## How to Add It (Step-by-Step)

Follow these 10 steps to add a new case study:

1. **Draft Content**: Write the case study using the template in [`docs/CASE-STUDY-TEMPLATE.md`](CASE-STUDY-TEMPLATE.md).
2. **Open `index.html`**: Navigate to `<section id="work">` (around line 2780) or `<section id="projects">` (around line 2968).
3. **Add HTML Article**:
   ```html
   <article class="case" id="case-yourproject">
     <div class="case-top">
       <div>
         <div class="case-id">CASE 05 — [DOMAIN / CATEGORY]</div>
         <h3>[Project Title]: [Descriptive Subtitle]</h3>
       </div>
       <div class="case-tags">
         <span class="tag">Python</span>
         <span class="tag">FastAPI</span>
         <span class="tag">ChromaDB</span>
       </div>
     </div>
     <div class="case-grid">
       <div class="case-field">
         <div class="k">Research Problem</div>
         <div class="v">[Clear 2-sentence description of the problem and its significance.]</div>
       </div>
       <div class="case-field">
         <div class="k">Theoretical Approach</div>
         <div class="v">[System architecture, mathematical models, or research methodology.]</div>
       </div>
       <div class="case-field">
         <div class="k">What I Engineered</div>
         <div class="v">[Specific engineering ownership, components built, and key technical decisions.]</div>
       </div>
       <div class="case-field">
         <div class="k">Verified Status</div>
         <div class="v">[Genuine verified milestone: working prototype, PyPI release, paper under review.]</div>
       </div>
     </div>
     <div class="case-status">
       <span class="case-status-badge">✓ [Key technical milestone completed]</span>
       <span style="color:var(--text-dimmer); font-size:11px;">Status: [Active / Under Review / Deployed]</span>
     </div>
   </article>
   ```
4. **Add Supporting Assets**: Place any images, diagrams, or links (`img/`, `resume.pdf`, GitHub URL, PyPI URL).
5. **Update Voice Agent Knowledge Base (Optional)**: If visitors should be able to ask the Voice Agent about this project, add an entry to `const knowledgeBase = [...]` in the `<script>` section of `index.html`:
   ```javascript
   {
     id: "yourproject",
     phrases: ["tell me about yourproject", "what is yourproject"],
     keywords: ["yourproject", "keyword1", "keyword2"],
     answer: "For [Project Name], I built [Problem & Approach]. It achieved [Verified Result].",
     citation: "Source: Selected Research · [Project Name]"
   }
   ```
6. **Check Visual Layout**: Ensure card typography, tags, borders, and margins align with the existing CSS theme.
7. **Test Responsive Behavior**: Preview across desktop (1440px+), tablet (768px), and mobile (375px).
8. **Run Local Server**:
   ```bash
   node server.js
   ```
   Open `http://localhost:8080/` and verify voice agent and interactive elements.
9. **Commit & Push**:
   ```bash
   git add index.html docs/
   git commit -m "feat(work): add [Project Name] case study"
   git push origin main
   ```
10. **Verify Live Deployment**: Open `https://portfolio-tallha-7ql2.vercel.app/` and verify that the new case study renders cleanly with zero console errors.

---

## Future Workflow (AI / Claude Project Context Preservation)

To keep updates frictionless:
* Re-use the existing repository and conversation context.
* Reference the `docs/PORTFOLIO-UPDATE-CHECKLIST.md` before deploying.
* Maintain consistency with existing color tokens (`var(--verify)`, `var(--accent)`, `var(--bg-surface-2)`) and monospace label hierarchy (`var(--font-mono)`).
