import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default <Partial<Config>>{
  content: ['./components/**/*.vue', './pages/**/*.vue', './app.vue', './data/**/*.ts'],
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        ink: token('ink'),
        muted: token('muted'),
        rule: token('rule'),
        plate: token('plate'),
        accent: token('accent'),
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        meta: ['0.875rem', { lineHeight: '1.45' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
        lead: ['clamp(1.25rem, 1rem + 1vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        sub: ['clamp(1.75rem, 1.2rem + 2vw, 2.75rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        series: ['clamp(2.5rem, 1.3rem + 4.6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        display: ['clamp(3rem, 1rem + 6vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
      },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
}
