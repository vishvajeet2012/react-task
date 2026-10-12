/**
 * Web copy of the React Native Fastor palette.
 * Keep values aligned with ../../src/theme/colors.ts.
 */

export const Palette = {
  primary: {
    50: '#fff4ee',
    100: '#ffe4d6',
    200: '#ffdecf',
    300: '#ffb088',
    400: '#ff8a4c',
    500: '#ff5701',
    600: '#e95322',
    700: '#fb7632',
    800: '#c2410c',
    900: '#7c2d12',
  },
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e2e2e2',
    300: '#c7c7c7',
    400: '#a4a5b2',
    500: '#696969',
    600: '#391713',
    700: '#292e39',
    800: '#1c212b',
    900: '#111318',
    950: '#000000',
  },
  success: {
    light: '#10b981',
    dark: '#34d399',
    bgLight: '#ecfdf5',
    bgDark: '#064e3b',
  },
  warning: {
    light: '#f59e0b',
    dark: '#fbbf24',
    bgLight: '#fffbeb',
    bgDark: '#78350f',
  },
  danger: {
    light: '#ef4444',
    dark: '#f87171',
    bgLight: '#fef2f2',
    bgDark: '#7f1d1d',
  },
  info: {
    light: '#4a70c7',
    dark: '#83d4f3',
    bgLight: '#f0f9ff',
    bgDark: '#0c4a6e',
  },
} as const

const light = {
  text: '#292e39',
  background: '#ffffff',
  backgroundElement: '#f5f5f5',
  backgroundSelected: '#ffdecf',
  textSecondary: '#696969',
  textMuted: '#a4a5b2',
  textInverse: '#ffffff',
  backgroundCard: '#fafafa',
  backgroundSubtle: '#f8f8f8',
  border: '#c7c7c7',
  borderStrong: '#e2e2e2',
  tint: '#ff5701',
  tabIconDefault: '#a4a5b2',
  tabIconSelected: '#ff5701',
  primary: '#ff5701',
  primaryForeground: '#ffffff',
  secondary: '#ffdecf',
  secondaryForeground: '#e95322',
  accent: '#fb7632',
  accentForeground: '#ffffff',
  success: Palette.success.light,
  warning: Palette.warning.light,
  danger: Palette.danger.light,
  info: Palette.info.light,
  orange: '#e95322',
  orangeSoft: '#ffdecf',
  brown: '#391713',
  placeholder: '#a4a5b2',
  input: '#f5f5f5',
  dot: '#f3e9b5',
  divider: '#f0d8cc',
  keyboard: '#d1d5dc',
  callStart: '#ff986d',
  callEnd: '#ff6e6a',
  walletStart: '#83d4f3',
  walletEnd: '#4a70c7',
} as const

export const Colors = {
  light,
  dark: light,
} as const

export type ThemeColors = (typeof Colors)[keyof typeof Colors]

const toKebabCase = (value: string) =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

function setNestedVariables(
  root: HTMLElement,
  prefix: string,
  value: unknown,
) {
  if (typeof value === 'string') {
    root.style.setProperty(`--theme-${prefix}`, value)
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nestedValue]) => {
      setNestedVariables(root, `${prefix}-${toKebabCase(key)}`, nestedValue)
    })
  }
}

export function applyColorTheme(root: HTMLElement = document.documentElement) {
  setNestedVariables(root, 'palette', Palette)
  setNestedVariables(root, 'color', Colors.light)
}
