import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { UserProfile } from '../api/types'

type AuthState = {
  phone: string
  dialCode: string
  token: string | null
  user: UserProfile | null
  isAuthenticated: boolean
  setPhone: (phone: string, dialCode?: string) => void
  setAuth: (token: string, user: UserProfile) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phone: '',
      dialCode: '+91',
      token: null,
      user: null,
      isAuthenticated: false,
      setPhone: (phone, dialCode = '+91') => set({ phone, dialCode }),
      setAuth: (token, user) =>
        set({
          token,
          user,
          phone: user.user_mobile,
          dialCode: user.dial_code,
          isAuthenticated: Boolean(token),
        }),
      logout: () =>
        set({
          phone: '',
          dialCode: '+91',
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'fastor-auth',
      storage: createJSONStorage(() => window.localStorage),
      partialize: ({ phone, dialCode, token, user, isAuthenticated }) => ({
        phone,
        dialCode,
        token,
        user,
        isAuthenticated,
      }),
    },
  ),
)
