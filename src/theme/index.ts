export * from './colors'
export * from './fonts'
export * from './spacing'

import { applyColorTheme } from './colors'
import { applyFontTheme } from './fonts'
import { applySpacingTheme } from './spacing'

export function applyFastorTheme(root: HTMLElement = document.documentElement) {
  applyColorTheme(root)
  applyFontTheme(root)
  applySpacingTheme(root)
}
