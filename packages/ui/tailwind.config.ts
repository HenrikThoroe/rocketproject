import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.slate[50],
        secondary: colors.slate[900],
        'on-primary': colors.slate[900],
        'on-secondary': colors.slate[50],
        'on-primary-light': colors.gray[500],
        'action-primary': colors.blue[800],
        'action-primary-active': colors.blue[600],
        'action-invalid': colors.red[500],
        'action-destructive': colors.red[800],
        'action-destructive-active': colors.red[600],
        'primary-hover': colors.gray[200],
        'primary-accent': colors.gray[100],
        'primary-accent-border': colors.gray[300],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

export default config
