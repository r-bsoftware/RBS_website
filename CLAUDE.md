# Workflow Orchestration

## 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

## 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

## 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management
- **Plan First**: Write plan to tasks/todo.md with checkable items
- **Verify Plan**: Check in before starting implementation
- **Track Progress**: Mark items complete as you go
- **Explain Changes**: High-level summary at each step
- **Document Results**: Add review section to tasks/todo.md
- **Capture Lessons**: Update tasks/lessons.md after corrections

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

# RBS Website — Claude Working Instructions

## Purpose
Corporate marketing website for Red Broom Software S.A.S. Showcases the 18-product ecosystem to potential customers.
- **URL**: `redbroomsoftware.com`

## Decision Boundaries — ALWAYS FOLLOW

### Act freely (no approval needed)
- Copy/text changes, styling fixes
- Animation improvements
- SEO metadata updates

### Propose before implementing
- New sections or pages
- Contact form changes (affects Camino CRM)
- Product showcase additions

### NEVER act autonomously — always present and wait for explicit approval
- `git push` to main/master
- CRM integration changes
- Analytics/tracking changes

## Tech Stack
- **Framework**: SvelteKit 2 with Svelte 5 runes ($state, $derived, $effect, $props)
- **UI**: Tailwind CSS 3.3 + custom animations (fadeInUp, float, glow, marquee, countUp)
- **Fonts**: Inter Variable (@fontsource-variable/inter)
- **Deployment**: GitHub Pages (static adapter)
- **i18n**: svelte-i18n (547 keys ES/EN, language switcher built — NOT wired to UI yet)
- **Error Tracking**: Sentry (@sentry/sveltekit)

## Portfolio (18 Products + 3 B2C Services)
1. Caracol — Restaurant POS
2. La Hoja — ERP for Restaurants
3. Cosmos Pet — Veterinary SaaS
4. Camino — CRM + AI Agents
5. Colectiva — B2B Payments + Capital
6. Constanza — Accounting
7. Comal — E-commerce SaaS
8. Plenura — Wellness Platform
9. Rito — Real Estate PE
10. Agora — Legal Tech
11. Goodbay — Farewell Marketplace
12. Mancha — Restaurant Reservations
13. Cookie Monster — Bakery E-commerce
14. Continua — Blood Donation
15. Puppy Love — Pet Matching
16. Baul — Storage Marketplace
17. Servilleta — Task Marketplace
18. Hospitality Fiscal — Vacation Rentals

## Components
| Component | Purpose |
|-----------|---------|
| Header | Sticky nav, mobile menu, scroll shadow |
| Footer | Links, ecosystem strip, GitHub |
| LanguageSwitcher | ES/EN toggle (stores in localStorage) |
| TypewriterText | Animated cycling text for hero |
| AnimatedCounter | Count-up animation on scroll |
| EcosystemDiagram | Product connection visual |

## Custom Actions
- `scrollReveal.ts` — IntersectionObserver for fade-in-up animations

## Routes (8 pages, all prerendered)
| Route | Purpose |
|-------|---------|
| `/` | Hero, stats, capabilities, products grid |
| `/portafolio` | 18 products + 3 B2C services |
| `/servicios` | Service offerings |
| `/tecnologia` | Tech stack showcase |
| `/contacto` | Contact form → Camino CRM |
| `/privacidad` | Privacy policy |
| `/terminos` | Terms of service |

## Key Patterns
- Contact form submits to Camino CRM API with UTM tracking
- All pages statically prerendered via `+layout.js`
- Glassmorphism with backdrop-blur effects
- Design: dark slate backgrounds, blue→purple gradients

## Deployment
- GitHub Pages (branch: `master`, directory: `/build`)
- Custom domain via CNAME: `redbroomsoftware.com`

## Build & Dev
```bash
npm run dev       # Local dev server
npm run build     # Production build
npm run preview   # Preview
```

## Known Gaps
- i18n translation files exist (547 keys ES/EN) but $_() is NOT called in any .svelte file — all UI text is hardcoded Spanish
