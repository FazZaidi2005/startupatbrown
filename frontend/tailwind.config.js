const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        display: ['sofia-pro', ...defaultTheme.fontFamily.sans],
      },
      ringWidth: {
        'DEFAULT': '2px',
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      ringOpacity: {
        'DEFAULT': '0.5',
        '0': '0',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
      ringColor: {
        'DEFAULT': '#ef4444',
        'red': {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'group-focus'],
    // Added variants
    ringColor: ['hover', 'focus', 'active'],
    ringOpacity: ['hover', 'focus', 'active'],
    ringWidth: ['hover', 'focus', 'active'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    outline: ['hover', 'focus', 'active'],
    animation: ['responsive', 'hover', 'focus'],
    transform: ['responsive', 'hover', 'focus'],
    translate: ['responsive', 'hover', 'focus', 'active'],
    scale: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
  }
}