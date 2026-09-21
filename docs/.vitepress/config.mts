// ABOUTME: VitePress site config for the Armada protocol docs — nav, sidebar, search, and
// ABOUTME: Mermaid diagram rendering.
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid({
  title: 'Armada',
  description: 'Documentation for the Armada protocol.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  // This directory's README.md documents the docs workflow for contributors; it is not a site page.
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],

  themeConfig: {
    // The full-color Armada mark (vector), next to the "Armada" site title.
    logo: '/armada-mark-color.svg',

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'SDK docs', link: 'https://sdk.armada.blue' },
      { text: 'armada.blue', link: 'https://armada.blue' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/guide/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ship-armada/armada-docs' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/ship-armada/armada-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  vite: {
    // Mermaid pulls in CommonJS-only transitive deps (fastdom via cytoscape); force Vite to
    // pre-bundle them so the dev server resolves their default exports (production build is unaffected).
    optimizeDeps: {
      include: ['mermaid', 'fastdom', 'cytoscape', 'cytoscape-cose-bilkent'],
    },
  },
});
