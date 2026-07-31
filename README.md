# Alan Lo - Portfolio

Live site: [alanl0.github.io](https://alanl0.github.io)

## Positioning

AI Backend / Platform Engineer with production backend credibility.

Two signals:

1. **Ability to ship** production backend systems (ownership labeled honestly: solo / co-built / team).
2. **Disciplined AI integration** — guardrails, retrieval, fallbacks, clear authority boundaries — without claiming production ML as a primary job function.

## Site structure

- Hero: role-explicit CTA path (case study, selected work, resume)
- **Selected work** — Weedmaps reliability + product, Dish media/platform contribution
- **AI Proof / case study** — ethStable trust-boundary story on-page (screenshot, architecture, engineering decisions)
- **Experience** — compact employment timeline
- Stack + AI tooling strip
- Contact / resume

## Client scripts

Static GitHub Pages site with light progressive enhancement:

- `index.html` / `styles.css` — core layout and content
- `nav.js` — mobile menu only (classic script, no network dependency)
- `script.js` — optional Mermaid diagram upgrade via CDN (6s timeout); never required for a complete page
- assets in `img/`

### Degradation contract

The architecture section is **default-safe**:

1. Resting state (no JS, CDN blocked, hang, or timeout): text trust-boundary summary is visible.
2. Successful Mermaid render: JS adds `diagram-ready` and upgrades to the SVG.
3. Mobile menu never depends on the Mermaid module graph (`nav.js` is a classic script).

This matches the page’s own pattern: deterministic fallback protects the core workflow; optional enhancement must not leave a blank panel.

## What was intentionally removed

- Role-Fit Workbench
- Long course matrices / kitchen-sink skills lists
- Live links to private repositories (restore when public)

Prototype retained at `prototype/ai-backend-portfolio.html` for reference.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Contact

alomo@uci.edu — [LinkedIn](https://www.linkedin.com/in/alanlo2023/) — [GitHub](https://github.com/AlanL0)
