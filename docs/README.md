# Armada protocol docs

This directory is the source for the Armada protocol documentation site, built with
[VitePress](https://vitepress.dev). Hand-written guides live in `guide/`.

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
| `guide/*.md` | Hand-written guide pages |
| `index.md` | Landing page |
| `.vitepress/config.mts` | Site config — nav, sidebar, search |
| `.vitepress/theme/` | Armada brand accents over the default VitePress theme |
| `public/CNAME` | Custom domain for GitHub Pages (`docs.armada.blue`) |

## Deployment

The site deploys to GitHub Pages via `.github/workflows/docs.yml` on every push to `main`. The
workflow runs `docs:build` and publishes `docs/.vitepress/dist`.

Generated output (`docs/.vitepress/dist`, `docs/.vitepress/cache`) is git-ignored and produced in
CI — it is not committed.
