# Mayari SMP — React Port

Converted from the static HTML/CSS/JS site into a Vite + React app.

## Setup
```
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

## What changed from the static site
- 3 HTML pages -> 3 route components (`src/pages/Home.jsx`, `Rules.jsx`, `AdminTeam.jsx`) rendered via React Router, sharing one `Layout` (Navbar + Footer).
- `js/script.js` was split into:
  - `src/config.js` — server info, staff roster, rank colors (was `config` object).
  - `src/api.js` — Discord/Minecraft stats + Mojang/Visage skin lookups, still with the same 60s in-memory cache.
  - `src/hooks/useCopyIp.js` — "Copy IP" button + confirmation alert as React state (was DOM manipulation).
  - `src/hooks/useScrollReveal.js` — the scroll-in IntersectionObserver.
  - `src/hooks/useParallax.js` — throttled parallax on the header logo.
  - `src/components/Accordion.jsx` — FAQ accordion, now driven by component state instead of event delegation + manual maxHeight.
  - Admin team rendering (`renderAdminTeam`) became `AdminTeam.jsx`, fetching skins in parallel and rendering via JSX instead of manual DOM/documentFragment building.
- CSS files are unchanged (just copied into `src/styles/`) — all the CSS variables, animations, and responsive breakpoints from `global.css`, `home.css`, `rules.css`, `admin-team.css` are preserved as-is.
- `robots.txt`, `sitemap.xml`, and `sw.js` moved into `public/` so Vite serves them verbatim. `sw.js`'s cache list was trimmed since this is now a single-page app (hashed build filenames are cached at fetch time instead of being hardcoded).
- **Not ported**: `contact.css` has no matching `contact.html`/route in what was uploaded — the CSS file is not currently used anywhere. Say the word if you want a Contact page added.

## You still need to add
Copy your actual image assets into `public/images/` (logo.png, header-background.jpg, about-section-person-image.png, survival-minigames-image.jpg, staff/arcain7.png, staff/mizzuu.png, staff/crisrion1.png, staff/jei.png). The build works without them, but images won't render until they're in place.
