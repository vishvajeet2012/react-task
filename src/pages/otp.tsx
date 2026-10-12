import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AuthShell } from '../components/auth/auth-shell'
import { PrimaryButton } from '../components/auth/primary-button'
import {
  useLoginMutation,
  useRequestOtpMutation,
} from '../hooks/use-auth'
import { useAuthStore } from '../store/use-auth-store'

function formatPhone(phone: string | undefined) {
  const digits = (phone ?? '').replace(/\D/g, '')

  if (digits.length === 0) {
    return 'your mobile number'
  }

  if (digits.length <= 5) {
    return `+91 ${digits}`
  }

  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

export function OtpPage() {
  const navigate = useNavigate()
  const phone = useAuthStore((state) => state.phone)
  const inputRef = useRef<HTMLInputElement>(null)
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(30)
  const [validationError, setValidationError] = useState<string | null>(null)
  const loginMutation = useLoginMutation()
  const resendMutation = useRequestOtpMutation()

  useEffect(() => {
    if (seconds === 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setSeconds((current) => current - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [seconds])

  const clock = `00:${String(seconds).padStart(2, '0')}`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (code.length !== 6) {
      setValidationError('Please enter complete 6-digit OTP')
      return
    }

    setValidationError(null)

    loginMutation.mutate(
      { phone, otp: code, dial_code: '+91' },
      {
        onSuccess: () => {
          void navigate({ to: '/dashboard' })
        },
      },
    )
  }

  const handleResend = () => {
    if (seconds > 0 || resendMutation.isPending) {
      return
    }

    setValidationError(null)

    resendMutation.mutate(
      { phone, dial_code: '+91' },
      {
        onSuccess: () => {
          setSeconds(30)
        },
      },
    )
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    void navigate({ to: '/' })
  }

  const activeError =
    validationError ||
    loginMutation.error?.message ||
    resendMutation.error?.message ||
    null

  return (
    <AuthShell step={2}>
      <form
        onSubmit={handleSubmit}
        className="safe-area-screen mx-auto flex min-h-svh w-full max-w-auth flex-col bg-background md:min-h-0 md:max-w-none md:py-0"
        noValidate
      >
        <div className="flex-1 px-xl md:flex-none md:px-0">
          <button
            type="button"
            onClick={handleBack}
            className="mt-lg block h-6 w-6 rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:mt-0 md:flex md:h-xxl md:w-auto md:items-center md:gap-sm md:font-mulish md:text-xs md:font-semibold md:text-text-secondary md:hover:text-orange"
            aria-label="Back"
          >
            <img src="/back.svg" alt="" className="h-6 w-6 md:h-lg md:w-lg" />
            <span className="hidden md:inline">Change number</span>
          </button>

          <h1 className="mt-[18px] font-mulish text-2xl font-bold text-text md:mt-xl md:text-3xl">
            6-digit code
          </h1>
          <p className="mt-sm font-mulish text-sm leading-subtitle text-text-secondary">
            Please enter the code we’ve sent to
            <br />
            <strong className="font-bold text-text">{formatPhone(phone)}</strong>
          </p>

          <div
            className="relative mt-xxl flex cursor-text items-center gap-[14px] self-start md:gap-md"
            onClick={() => inputRef.current?.focus()}
          >
            <CodeGroup start={0} code={code} />
            <span className="font-mulish text-base text-text" aria-hidden="true">
              -
            </span>
            <CodeGroup start={3} code={code} />
            <input
              ref={inputRef}
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                if (validationError) {
                  setValidationError(null)
                }
                if (loginMutation.error) {
                  loginMutation.reset()
                }
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              autoFocus
              maxLength={6}
              aria-label="6-digit verification code"
              className="absolute inset-0 cursor-text opacity-0"
            />
          </div>

          {activeError && (
            <div
              className="mt-md rounded-sm border border-danger bg-danger-bg-light px-md py-sm"
              role="alert"
            >
              <p className="font-mulish text-xs font-medium text-danger">
                {activeError}
              </p>
            </div>
          )}

          <div className="mt-md">
            {seconds > 0 ? (
              <p className="font-mulish text-sm font-medium leading-[15px] text-text md:leading-subtitle md:text-text-secondary">
                I didn’t receive a code{' '}
                <strong className="font-bold text-accent">({clock})</strong>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendMutation.isPending}
                className="flex items-center gap-sm font-mulish text-sm font-bold text-accent underline disabled:cursor-not-allowed disabled:opacity-[0.65]"
              >
                Resend Code
                {resendMutation.isPending && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
                    aria-label="Resending OTP"
                  />
                )}
              </button>
            )}
          </div>
        </div>

        <div className="px-xl pb-[20px] md:mt-xl md:px-0 md:pb-0">
          <PrimaryButton
            label="Continue"
            loading={loginMutation.isPending}
            loadingLabel="Verifying OTP"
            disabled={code.length !== 6 || loginMutation.isPending}
            className="md:h-14"
          />
        </div>
      </form>
    </AuthShell>
  )
}

function CodeGroup({ start, code }: { start: number; code: string }) {
  return (
    <div className="flex gap-[10px] md:gap-sm">
      {[0, 1, 2].map((offset) => {
        const index = start + offset
        const value = code[index] ?? ''
        const active = index === code.length && code.length < 6

        return (
          <span
            key={index}
            className={`flex h-12 w-9 items-center justify-center rounded-xs border font-mulish text-base font-medium text-accent md:h-14 md:w-10 md:rounded-md md:bg-background-card md:text-xl lg:h-huge lg:w-xxxl ${
              active ? 'border-accent md:border-orange md:ring-2 md:ring-orange/10' : 'border-border md:border-border-strong'
            }`}
            aria-hidden="true"
          >
            {value || (active ? '|' : '')}
          </span>
        )
      })}
    </div>
  )
}
