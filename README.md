# DroneCatalyst

Professional marketing website for [dronecatalyst.com](https://dronecatalyst.com) — aerial intelligence for inspection, surveying and commercial imaging.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

## Project structure

```
dronecatalyst/
├── src/
│   ├── app/                    # App Router pages and layouts
│   │   ├── layout.tsx          # Root layout (Inter, Navbar, Footer, JsonLd)
│   │   ├── page.tsx            # Home
│   │   ├── globals.css         # Theme tokens and global styles
│   │   ├── robots.ts           # robots.txt generation
│   │   ├── sitemap.ts          # sitemap.xml generation
│   │   ├── inspection/         # Inspection service page
│   │   ├── surveying/          # Surveying service page
│   │   ├── commercial-imaging/ # Commercial imaging page
│   │   ├── industries/         # Industries overview
│   │   ├── about/              # About page
│   │   └── contact/            # Contact page with form
│   ├── components/
│   │   ├── JsonLd.tsx          # Structured data script helper
│   │   ├── layout/             # Navbar, Footer, MobileMenu
│   │   ├── sections/           # Hero, CTA, SectionHeader
│   │   └── ui/                 # ServiceCard, IndustryCard, ContactForm, FeatureGrid
│   └── lib/
│       ├── site.ts             # Site config, nav links, contact info
│       ├── metadata.ts         # createPageMetadata helper
│       ├── structured-data.ts  # JSON-LD schema builders
│       └── content.ts          # Page content and service data
├── next.config.ts              # Unsplash remote image patterns
├── postcss.config.mjs
└── package.json
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

## Content and configuration

- **Site constants** — edit `src/lib/site.ts` for contact details, navigation and SEO keywords.
- **Page copy** — edit `src/lib/content.ts` for services, industries and feature lists.
- **Metadata** — each page uses `createPageMetadata()` from `src/lib/metadata.ts`.
- **Structured data** — JSON-LD schemas from `src/lib/structured-data.ts`, rendered via `JsonLd`.

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended) or any Node.js host that supports Next.js:

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the production domain to **dronecatalyst.com**.
4. Configure DNS at your registrar:
   - **A record** → Vercel IP (or use Vercel nameservers)
   - **CNAME** for `www` → `cname.vercel-dns.com` (if using www)

Verify `robots.txt` and `sitemap.xml` after deployment:

- https://dronecatalyst.com/robots.txt
- https://dronecatalyst.com/sitemap.xml

## Domain

Production URL: **https://dronecatalyst.com**

`metadataBase`, canonical URLs, sitemap and structured data all reference this domain via `SITE_URL` in `src/lib/site.ts`.

## Design

- Dark theme (`#050816` background, `#2563EB` accent)
- Inter font via `next/font/google`
- Premium Stripe/Vercel/Linear-inspired layout
- Unsplash images via `next/image`
