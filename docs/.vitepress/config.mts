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
      { text: 'Protocol docs', link: '/guide/', activeMatch: '/guide/' },
      { text: 'SDK docs', link: 'https://sdk.armada.blue' },
      { text: 'armada.blue', link: 'https://armada.blue' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Armada?', link: '/guide/' },
          { text: 'Core concepts', link: '/guide/concepts' },
          { text: 'Architecture at a glance', link: '/guide/architecture' },
        ],
      },
      {
        text: 'Protocol architecture',
        items: [
          { text: 'Hub-and-spoke topology', link: '/architecture/' },
          { text: 'The PrivacyPool', link: '/architecture/privacy-pool' },
          { text: 'Cross-chain flow', link: '/architecture/cross-chain' },
          { text: 'Contract map', link: '/architecture/contracts' },
        ],
      },
      {
        text: 'Core flows',
        items: [
          { text: 'Overview', link: '/flows/' },
          { text: 'Shielded yield', link: '/flows/shielded-yield' },
          { text: 'Payments', link: '/flows/payments' },
        ],
      },
      {
        text: 'Cryptography & privacy',
        items: [
          { text: 'Notes & the shielded ledger', link: '/crypto/' },
          { text: 'The proof system', link: '/crypto/proofs' },
          { text: 'The privacy model', link: '/crypto/privacy' },
        ],
      },
      {
        text: 'Fees',
        items: [
          { text: 'Overview', link: '/fees/' },
          { text: 'Integrator fees', link: '/fees/integrators' },
          { text: 'Relayer fees', link: '/fees/relayers' },
        ],
      },
      {
        text: 'ARM token',
        items: [
          { text: 'Overview', link: '/token/' },
          { text: 'Transfer restrictions', link: '/token/transfers' },
          { text: 'Voting & delegation', link: '/token/voting' },
        ],
      },
      {
        text: 'Governance',
        items: [
          { text: 'Model', link: '/governance/' },
          { text: 'Proposals', link: '/governance/proposals' },
          { text: 'Voting & quorum', link: '/governance/voting' },
          { text: 'Scope', link: '/governance/scope' },
          { text: 'Treasury', link: '/governance/treasury' },
          { text: 'Security Council', link: '/governance/security-council' },
          { text: 'Upgrades & adapters', link: '/governance/upgrades' },
        ],
      },
      {
        text: 'Revenue-based unlock',
        items: [
          { text: 'Overview', link: '/revenue/' },
          { text: 'Recognizing revenue', link: '/revenue/counter' },
          { text: 'Releasing tokens', link: '/revenue/lock' },
        ],
      },
      {
        text: 'Wind-down',
        items: [
          { text: 'Overview', link: '/wind-down/' },
          { text: 'Redemption', link: '/wind-down/redemption' },
        ],
      },
      {
        text: 'Building on Armada',
        link: '/build/',
      },
      {
        text: 'Reference',
        items: [
          { text: 'Parameters', link: '/reference/' },
          { text: 'Security & limitations', link: '/reference/security' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ship-armada' },
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
