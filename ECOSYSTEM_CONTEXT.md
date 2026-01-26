# RBS Website - Ecosystem Context

> **Last Updated**: January 24, 2026
> **Status**: Active Corporate Website
> **Role**: Red Broom Software Public Website

---

## Product Overview

**RBS Website** is the corporate marketing website for Red Broom Software. It showcases the company's services, technology stack, portfolio, and provides contact information for potential clients.

| Attribute | Value |
|-----------|-------|
| **Internal Name** | rbs-website |
| **Public URL** | redbroomsoftware.com |
| **Type** | Static Marketing Site |
| **Stack** | SvelteKit 4, Tailwind CSS, Static Adapter |
| **Hosting** | Vercel (Static) |

---

## Site Structure

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Home - Company overview, value proposition |
| `/servicios` | Services - Development, consulting, ecosystem |
| `/tecnologia` | Technology - Stack, methodology, tools |
| `/portafolio` | Portfolio - Case studies, ecosystem products |
| `/contacto` | Contact - Lead capture form |
| `/privacidad` | Privacy Policy |
| `/terminos` | Terms of Service |

---

## Ecosystem Role

### Marketing Hub
The RBS Website serves as the entry point for:
- **External SaaS clients** - Businesses seeking Constanza, Colectiva services
- **Enterprise prospects** - Companies interested in ecosystem integration
- **Partnership inquiries** - Technology and business partnerships

### Lead Funnel
```
Website → Contact Form → Camino CRM → Sales Pipeline
```

Contact form submissions are routed to Camino CRM for follow-up.

---

## File Structure

```
src/
├── routes/
│   ├── +layout.svelte            # Site layout
│   ├── +page.svelte              # Home page
│   ├── +page.js                  # Prerender config
│   ├── servicios/
│   │   └── +page.svelte
│   ├── tecnologia/
│   │   └── +page.svelte
│   ├── portafolio/
│   │   └── +page.svelte
│   ├── contacto/
│   │   └── +page.svelte
│   ├── privacidad/
│   │   └── +page.svelte
│   └── terminos/
│       └── +page.svelte
└── app.html
```

---

## Static Generation

The site uses `@sveltejs/adapter-static` for full static site generation:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    })
  }
};
```

---

## Ecosystem Products Showcased

### Core Platforms
- **Constanza** - Accounting & fiscal management
- **Colectiva** - Payment processing
- **Camino** - CRM & customer success
- **Mancha** - Reservation system

### B2C Products
- **Continua** - Blood donation (social responsibility)
- **Cosmos Pet** - Veterinary management
- **Goodbay** - Vacation rentals
- **Servilleta** - Task marketplace
- **Puppy Love** - Pet matching
- **Cookie Monster** - E-commerce

### Enterprise Solutions
- **Agora** - Legal technology platform
- **La Hoja** - Specialized solutions

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static site
npm run build

# Preview build
npm run preview

# Type checking
npm run check
```

---

## Environment Variables

None required for static site. Build-time only.

---

## SEO Configuration

- Meta tags per page
- Open Graph tags for social sharing
- Sitemap generation
- robots.txt

---

## Related Documentation

- [Ecosystem Roadmap 2026](/home/brillo/Projects/docs/ECOSYSTEM_ROADMAP_2026.md)
- Marketing materials in `/home/brillo/Projects/docs/`

---

*Maintained by: RBS Engineering*
*Review cadence: Quarterly*
