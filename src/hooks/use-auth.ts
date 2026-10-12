import { useMutation } from '@tanstack/react-query'
import { loginWithOtp, requestOtp } from '../api/auth'
import type {
  LoginRequest,
  LoginResult,
  RegisterRequest,
} from '../api/types'
import { useAuthStore } from '../store/use-auth-store'

export function useRequestOtpMutation() {
  const setPhone = useAuthStore((state) => state.setPhone)

  return useMutation<string, Error, RegisterRequest>({
    mutationFn: requestOtp,
    onSuccess: (_message, variables) => {
      setPhone(variables.phone, variables.dial_code ?? '+91')
    },
  })
}

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<LoginResult, Error, LoginRequest>({
    mutationFn: loginWithOtp,
    onSuccess: ({ token, user }) => {
      setAuth(token, user)
    },
  })
}
