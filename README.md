# Trinadha Kumar Achanta · Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion. Static export (no server needed), so it runs on Vercel, Netlify, GitHub Pages or any static host.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build into ./out
```

## Editing content (no design knowledge needed)

Almost everything lives in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Name, headline, intro, email, LinkedIn, GitHub | `profile` |
| Portrait | `profile.portrait` → put the file in `public/photos/` |
| Downloadable resume | put the PDF in `public/` and set `profile.resumeUrl: "/resume.pdf"` |
| About story | `story` |
| Education timeline | `education` (Master's `field` is `null` until confirmed) |
| Jobs | `experience` |
| Skills | `skills` |
| Projects (+ GitHub/demo links) | `projects[].links` |
| Certifications | `certifications` → set `status: "earned"`, `date`, `verifyUrl` |
| Cricket championship name | `sports.championship.competition` |
| Achievements wall | `achievements` |
| Photo gallery | `gallery` → add files to `public/photos/` and set `src` |

Anything set to `null` is hidden on purpose until it is verified.

## Contact form

Works out of the box by opening the visitor's email app. To receive messages directly in your inbox instead:
1. Create a free form at https://formspree.io and copy its ID (e.g. `xyzabcd`).
2. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_FORMSPREE_ID` = that ID, then redeploy.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new, import the repository, keep the defaults (Framework: Next.js) and click **Deploy**.
3. Rename the project to `trinadha-kumar` (Settings → General) to get `https://trinadha-kumar.vercel.app` if it is free.
4. Every push to `main` redeploys automatically. HTTPS is automatic.

### Custom domain (e.g. trinadhakumar.dev)
Buy the domain, then Vercel → Project → Settings → Domains → Add. Follow the DNS records Vercel shows. Afterwards update `profile.siteUrl` in `site.ts` so SEO links use the new address.

## Accessibility & performance notes
- Respects `prefers-reduced-motion` (animations, particles and cursor effects switch off).
- Keyboard-navigable: skip link, focus rings, accessible tabs, modals with focus trapping and Escape to close.
- Light/dark toggle remembers the visitor's choice.
- Static HTML with ~186 kB first-load JS.
