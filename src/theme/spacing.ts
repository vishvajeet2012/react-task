export const Spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const

export const Radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const

export const DashboardMetrics = {
  'seller-width': 112,
  'seller-height': 160,
  'promotion-height': 208,
  'restaurant-image': 96,
} as const

export function applySpacingTheme(root: HTMLElement = document.documentElement) {
  Object.entries(Spacing).forEach(([key, value]) => {
    root.style.setProperty(`--theme-spacing-${key}`, `${value}px`)
  })
  Object.entries(Radii).forEach(([key, value]) => {
    root.style.setProperty(`--theme-radius-${key}`, `${value}px`)
  })
  Object.entries(DashboardMetrics).forEach(([key, value]) => {
    root.style.setProperty(`--theme-dashboard-${key}`, `${value}px`)
  })
}
