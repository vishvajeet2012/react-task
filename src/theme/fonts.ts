export const FontFamily = {
  mulish: 'Mulish',
  spartan: 'League Spartan',
  inter: 'Inter',
  mono: 'ui-monospace, monospace',
} as const

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 48,
} as const

export const LineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 26,
  xl: 28,
  xxl: 32,
  xxxl: 44,
  display: 52,
} as const

export const Typography = {
  display: { family: FontFamily.spartan, size: FontSizes.xxxl, lineHeight: 36 },
  title: { family: FontFamily.mulish, size: FontSizes.xxl, lineHeight: LineHeights.xxl },
  subtitle: { family: FontFamily.mulish, size: FontSizes.sm, lineHeight: 21 },
  h1: { family: FontFamily.mulish, size: FontSizes.xxl, lineHeight: LineHeights.xxl },
  h2: { family: FontFamily.spartan, size: FontSizes.xl, lineHeight: 24 },
  h3: { family: FontFamily.spartan, size: FontSizes.lg, lineHeight: 22 },
  body: { family: FontFamily.mulish, size: FontSizes.base, lineHeight: LineHeights.base },
  bodyMedium: { family: FontFamily.mulish, size: FontSizes.base, lineHeight: LineHeights.base },
  bodyBold: { family: FontFamily.mulish, size: FontSizes.base, lineHeight: LineHeights.base },
  small: { family: FontFamily.mulish, size: FontSizes.sm, lineHeight: LineHeights.sm },
  smallBold: { family: FontFamily.mulish, size: FontSizes.sm, lineHeight: LineHeights.sm },
  caption: { family: FontFamily.mulish, size: 10, lineHeight: 15 },
  button: { family: FontFamily.mulish, size: FontSizes.base, lineHeight: FontSizes.base, letterSpacing: 1.25 },
  code: { family: FontFamily.mono, size: FontSizes.xs, lineHeight: LineHeights.xs },
  link: { family: FontFamily.mulish, size: FontSizes.sm, lineHeight: 21 },
  foodTitle: { family: FontFamily.spartan, size: 20, lineHeight: 24 },
  foodPrice: { family: FontFamily.spartan, size: 24, lineHeight: 26 },
  foodBody: { family: FontFamily.spartan, size: 16, lineHeight: 20, letterSpacing: -0.48 },
  foodMeta: { family: FontFamily.spartan, size: 14, lineHeight: 14 },
} as const

function setFontVariable(root: HTMLElement, name: string, value: string) {
  root.style.setProperty(`--theme-font-${name}`, value)
}

export function applyFontTheme(root: HTMLElement = document.documentElement) {
  setFontVariable(root, 'mulish', `'${FontFamily.mulish}', sans-serif`)
  setFontVariable(root, 'spartan', `'${FontFamily.spartan}', sans-serif`)
  setFontVariable(root, 'inter', `'${FontFamily.inter}', sans-serif`)
  setFontVariable(root, 'mono', FontFamily.mono)

  Object.entries(FontSizes).forEach(([key, value]) => {
    root.style.setProperty(`--theme-font-size-${key}`, `${value}px`)
  })
  Object.entries(LineHeights).forEach(([key, value]) => {
    root.style.setProperty(`--theme-line-height-${key}`, `${value}px`)
  })

  root.style.setProperty('--theme-font-size-caption', `${Typography.caption.size}px`)
  root.style.setProperty('--theme-line-height-caption', `${Typography.caption.lineHeight}px`)
  root.style.setProperty('--theme-line-height-subtitle', `${Typography.subtitle.lineHeight}px`)
  root.style.setProperty('--theme-letter-spacing-button', `${Typography.button.letterSpacing}px`)
  root.style.setProperty('--theme-letter-spacing-input', '0.4px')
}
