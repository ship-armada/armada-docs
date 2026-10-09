# Armada protocol docs

This directory is the source for the Armada protocol documentation site, built with
[VitePress](https://vitepress.dev). Each top-level directory is one section of the site's sidebar.

## Working on the docs

Install dependencies once, then run a hot-reloading dev server (default `http://localhost:5173`):

```sh
npm install
npm run docs:dev
```

To preview the exact production build instead of the dev server:

```sh
npm run docs:build && npm run docs:preview
```

## Layout

| Path | What it is |
| --- | --- |
| `index.md` | Landing page |
| `guide/` | Introduction — what Armada is, core concepts, architecture at a glance |
| `architecture/` | Hub-and-spoke topology, the PrivacyPool, cross-chain flow, contract map |
| `flows/` | Core flows — shield, transfer, unshield, shielded yield, payments |
| `crypto/` | Notes, the proof system, and the privacy model |
| `fees/` | Protocol, integrator, and relayer fees |
| `token/` | The ARM token — transfer restrictions, voting and delegation |
| `governance/` | Governance model, proposals, voting, scope, treasury, Security Council, upgrades |
| `revenue/` | Revenue-based unlock — the revenue counter and the revenue lock |
| `wind-down/` | Wind-down and redemption |
| `build/` | Building on Armada (API detail lives in the SDK docs) |
| `reference/` | Parameters, and security & limitations |
| `.vitepress/config.mts` | Site config — nav, sidebar, search, Mermaid |
| `.vitepress/theme/` | Armada brand accents and Mermaid diagram layout fixes over the default VitePress theme |
| `public/` | Static assets — logo, favicons, and `CNAME` (custom domain `docs.armada.blue`) |

New pages must also be added to the sidebar in `.vitepress/config.mts`.

Diagrams are written in Mermaid. Check them in `npm run docs:dev` rather than an external renderer:
the site's theme CSS affects how diagram labels fit.

## Deployment

The site deploys to GitHub Pages via `.github/workflows/docs.yml` on every push to `main`. The
workflow runs `docs:build` and publishes `docs/.vitepress/dist`.

Generated output (`docs/.vitepress/dist`, `docs/.vitepress/cache`) is git-ignored and produced in
CI — it is not committed.
